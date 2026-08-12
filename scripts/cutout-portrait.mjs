/* eslint-disable no-console -- CLI script lancé directement via node */
/**
 * Détourage d'un portrait sur fond dégradé.
 *
 * Le fond de la photo n'est pas uni. Il porte à la fois un dégradé d'éclairage
 * (de ~191 à ~127 en luminance d'un bord à l'autre) et un vignetage d'objectif.
 * Le comparer à une couleur unique ne marche pas : la tolérance nécessaire pour
 * effacer le coin le plus sombre mange déjà le front du sujet, éclairé par le
 * reflet studio. Les deux plages ne se recoupent pas.
 *
 * On compare donc chaque pixel au fond *prédit à sa position* :
 *
 *  1. Amorçage paramétrique. Une surface quadratique par canal,
 *     bg_c(u,v) = a + b·u + c·v + d·u² + e·uv + f·v², est ajustée par moindres
 *     carrés sur un anneau de bordure. Le sujet touchant le bas du cadre,
 *     l'anneau contient de la peau et du chino : l'ajustement rejette donc
 *     itérativement les échantillons aberrants.
 *
 *  2. Raffinement local, itéré. Une surface globale ne peut pas représenter ce
 *     fond : mesuré, l'ajustement qui corrige le côté droit dégrade le coin
 *     bas-droit. On remplace donc la prédiction paramétrique par une moyenne
 *     locale du fond déjà identifié (convolution normalisée sur le masque
 *     courant). Le champ suit alors le fond réel où il est connu et l'interpole
 *     à travers le sujet ; à chaque itération le masque s'étend et le champ se
 *     précise, ce qui permet de remonter l'ombre portée du sujet sur le mur.
 *     La surface quadratique ne sert plus que d'amorce et de repli au cœur du
 *     sujet, hors de portée de tout fond connu.
 *
 *  3. Remplissage par diffusion depuis les bords. Seules les zones de fond
 *     reliées au bord deviennent transparentes, ce qui préserve le chino beige
 *     dont la luminance est voisine de celle du fond.
 *
 *  4. Récupération des enclaves de fond, que la diffusion ne peut pas atteindre.
 *
 *  5. Érosion puis adoucissement du masque alpha.
 *
 * La tolérance est étroite par nature sur cette photo : mesuré, 15 donne un
 * détourage propre et 16 fait céder le front. Ne pas l'augmenter sans regarder
 * le résultat composé sur un fond opaque — un PNG à canal alpha prévisualisé
 * seul est trompeur.
 *
 * Usage : node scripts/cutout-portrait.mjs <source> <sortie> [tolérance]
 */
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = process.argv[3];
const TOL = Number(process.argv[4] ?? 15);

/** Épaisseur, en pixels, de l'anneau de bordure servant à l'amorçage. */
const BORDER = 6;
/** Passes de réjection des échantillons aberrants sur l'anneau. */
const ROBUST_PASSES = 5;
/** Rayon de la moyenne locale du fond, en pixels. */
const FIELD_RADIUS = 20;
/** Itérations de raffinement du champ de fond. */
const REFINE_ITERS = 10;
/** Poids minimal sous lequel on retombe sur la prédiction paramétrique. */
const MIN_WEIGHT = 0.02;
/** Aire minimale, en pixels, d'une enclave rouverte — filtre le moucheté. */
const HOLE_MIN_AREA = 200;
/**
 * Écart max-min entre canaux toléré pour une enclave. Le mur est neutre (écart
 * mesuré de 0 à 8) ; le chino beige et la peau ne le sont pas du tout (51 et 81).
 * Ce test sépare les deux là où la couleur seule échoue.
 */
const HOLE_MAX_SPREAD = 20;
/**
 * Rayon d'érosion du sujet avant le flou. Les pixels du contour sont un mélange
 * de sujet et de fond ; laissés opaques, ils forment une frange grise visible
 * contre la peau. On rogne donc le sujet de quelques pixels — invisible à la
 * taille d'affichage, contrairement à la frange.
 */
const ERODE_RADIUS = 2;
/** Rayon du flou appliqué au masque alpha, pour éviter l'escalier. */
const BLUR_RADIUS = 1.2;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const N = W * H;

// ---------------------------------------------------------------- utilitaires

/** Résout un système linéaire n×n par élimination de Gauss avec pivot partiel. */
function solve(matrix, rhs) {
  const n = rhs.length;
  const m = matrix.map((row, i) => [...row, rhs[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
    }
    [m[col], m[pivot]] = [m[pivot], m[col]];
    if (Math.abs(m[col][col]) < 1e-12) throw new Error('système singulier');
    for (let r = col + 1; r < n; r++) {
      const f = m[r][col] / m[col][col];
      for (let k = col; k <= n; k++) m[r][k] -= f * m[col][k];
    }
  }
  const out = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let acc = m[r][n];
    for (let k = r + 1; k < n; k++) acc -= m[r][k] * out[k];
    out[r] = acc / m[r][r];
  }
  return out;
}

/** Termes de la surface quadratique, en coordonnées normalisées dans [0,1]. */
const basis = (u, v) => [1, u, v, u * u, u * v, v * v];
const NB = 6;

/** Ajuste la surface, par canal, sur les pixels marqués dans `mask`. */
function fitSurface(mask) {
  const coefs = [];
  for (let ch = 0; ch < 3; ch++) {
    const ata = Array.from({ length: NB }, () => new Array(NB).fill(0));
    const atb = new Array(NB).fill(0);
    for (let p = 0; p < N; p++) {
      if (!mask[p]) continue;
      const x = p % W;
      const b = basis(x / (W - 1), (p - x) / W / (H - 1));
      const val = data[p * 4 + ch];
      for (let i = 0; i < NB; i++) {
        atb[i] += b[i] * val;
        for (let j = 0; j < NB; j++) ata[i][j] += b[i] * b[j];
      }
    }
    coefs.push(solve(ata, atb));
  }
  return coefs;
}

/** Évalue la surface sur toute l'image, en RGB entrelacé. */
function evalSurface(coefs) {
  const field = new Float32Array(N * 3);
  for (let y = 0; y < H; y++) {
    const v = y / (H - 1);
    for (let x = 0; x < W; x++) {
      const b = basis(x / (W - 1), v);
      const j = (y * W + x) * 3;
      for (let c = 0; c < 3; c++) {
        let s = 0;
        for (let k = 0; k < NB; k++) s += b[k] * coefs[c][k];
        field[j + c] = s;
      }
    }
  }
  return field;
}

/** Distance de Manhattan entre le pixel `p` et le fond prédit à sa position. */
const distanceTo = (field, p) => {
  const i = p * 4;
  const j = p * 3;
  return (
    Math.abs(data[i] - field[j]) + Math.abs(data[i + 1] - field[j + 1]) + Math.abs(data[i + 2] - field[j + 2])
  );
};

/** Flou par boîte séparable, trois passes — approxime une gaussienne. */
function boxBlur(plane, r) {
  const norm = 1 / (2 * r + 1);
  let src = plane;
  let dst = new Float32Array(N);
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < H; y++) {
      const off = y * W;
      let sum = 0;
      for (let k = -r; k <= r; k++) sum += src[off + Math.min(W - 1, Math.max(0, k))];
      for (let x = 0; x < W; x++) {
        dst[off + x] = sum * norm;
        sum += src[off + Math.min(W - 1, x + r + 1)] - src[off + Math.max(0, x - r)];
      }
    }
    [src, dst] = [dst, src];
    for (let x = 0; x < W; x++) {
      let sum = 0;
      for (let k = -r; k <= r; k++) sum += src[Math.min(H - 1, Math.max(0, k)) * W + x];
      for (let y = 0; y < H; y++) {
        dst[y * W + x] = sum * norm;
        sum += src[Math.min(H - 1, y + r + 1) * W + x] - src[Math.max(0, y - r) * W + x];
      }
    }
    [src, dst] = [dst, src];
  }
  return src;
}

/**
 * Champ de fond local : moyenne pondérée du fond connu au voisinage de chaque
 * pixel (convolution normalisée). Là où aucun fond connu n'est à portée — au
 * cœur du sujet — on retombe sur la prédiction paramétrique.
 */
function localField(mask, fallback, radius) {
  const weight = new Float32Array(N);
  const num = [new Float32Array(N), new Float32Array(N), new Float32Array(N)];
  for (let p = 0; p < N; p++) {
    if (!mask[p]) continue;
    weight[p] = 1;
    for (let c = 0; c < 3; c++) num[c][p] = data[p * 4 + c];
  }
  const wb = boxBlur(weight, radius);
  const nb = num.map((plane) => boxBlur(plane, radius));
  const field = new Float32Array(N * 3);
  let fellBack = 0;
  for (let p = 0; p < N; p++) {
    if (wb[p] > MIN_WEIGHT) {
      for (let c = 0; c < 3; c++) field[p * 3 + c] = nb[c][p] / wb[p];
    } else {
      fellBack++;
      for (let c = 0; c < 3; c++) field[p * 3 + c] = fallback[p * 3 + c];
    }
  }
  return { field, weight: wb, fellBack };
}

/**
 * Remplissage par diffusion depuis les bords, contre un champ de fond donné. Les
 * pixels de bord ne sont que des amorces candidates : ils doivent passer le test
 * de proximité, sans quoi le chino qui touche le bas du cadre serait effacé.
 */
function flood(field, threshold) {
  const seen = new Uint8Array(N);
  const stack = new Int32Array(N);
  let top = 0;
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (seen[p]) return;
    if (distanceTo(field, p) >= threshold) return;
    seen[p] = 1;
    stack[top++] = p;
  };
  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }
  while (top > 0) {
    const p = stack[--top];
    const x = p % W;
    const y = (p - x) / W;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  return seen;
}

/**
 * Retrouve le fond enclavé — les interstices bras/torse, fermés en haut par
 * l'aisselle et en bas par la main dans la poche, donc hors de portée d'une
 * diffusion partie des bords.
 *
 * Ces enclaves sont trop loin de tout fond connu pour que le champ fin les
 * atteigne, et une moyenne locale grossière y est biaisée par le vignetage : au
 * milieu du cadre le fond est nettement plus clair qu'au bord droit tout proche.
 * On les juge donc contre la surface quadratique réajustée sur tout le fond déjà
 * identifié, qui elle représente correctement la forme du vignetage.
 *
 * Deux garde-fous, parce qu'une diffusion ne protège plus rien ici : le pixel
 * doit être neutre — le mur l'est, le chino et la peau ne le sont pas — et sa
 * composante doit être assez étendue pour ne pas être du bruit.
 */
function recoverEnclaves(mask, threshold) {
  const refitted = evalSurface(fitSurface(mask));
  const candidate = new Uint8Array(N);
  for (let p = 0; p < N; p++) {
    if (mask[p]) continue;
    const i = p * 4;
    const spread =
      Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
    if (spread > HOLE_MAX_SPREAD) continue;
    if (distanceTo(refitted, p) >= threshold) continue;
    candidate[p] = 1;
  }
  const seeds = [];
  const visited = new Uint8Array(N);
  const queue = new Int32Array(N);
  for (let start = 0; start < N; start++) {
    if (!candidate[start] || visited[start]) continue;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    visited[start] = 1;
    const component = [];
    while (head < tail) {
      const p = queue[head++];
      component.push(p);
      const x = p % W;
      const y = (p - x) / W;
      const neighbours = [
        x + 1 < W ? p + 1 : -1,
        x > 0 ? p - 1 : -1,
        y + 1 < H ? p + W : -1,
        y > 0 ? p - W : -1,
      ];
      for (const q of neighbours) {
        if (q < 0 || visited[q] || !candidate[q]) continue;
        visited[q] = 1;
        queue[tail++] = q;
      }
    }
    if (component.length >= HOLE_MIN_AREA) seeds.push(...component);
  }
  return seeds;
}

// ------------------------------------------- 1. amorçage sur l'anneau de bord

const ring = new Uint8Array(N);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (x < BORDER || x >= W - BORDER || y < BORDER || y >= H - BORDER) ring[y * W + x] = 1;
  }
}

let coefs = fitSurface(ring);
let ringKept = 0;
for (let pass = 0; pass < ROBUST_PASSES; pass++) {
  const field = evalSurface(coefs);
  const residuals = [];
  for (let p = 0; p < N; p++) if (ring[p]) residuals.push(distanceTo(field, p));
  residuals.sort((a, b) => a - b);
  // Un pixel de sujet sur l'anneau s'écarte de plusieurs dizaines d'unités du
  // fond prédit ; un seuil relatif à la médiane les élimine sans toucher au
  // bruit normal du capteur.
  const cut = Math.max(10, 2.5 * residuals[Math.floor(residuals.length / 2)]);
  const kept = new Uint8Array(N);
  ringKept = 0;
  for (let p = 0; p < N; p++) {
    if (ring[p] && distanceTo(field, p) <= cut) {
      kept[p] = 1;
      ringKept++;
    }
  }
  coefs = fitSurface(kept);
}
const surface = evalSurface(coefs);

// ------------------------------------ 2. raffinement local puis 3. diffusion

const threshold = TOL * 3;
let mask = flood(surface, threshold);
let fellBack = 0;
const refine = () => {
  for (let iter = 0; iter < REFINE_ITERS; iter++) {
    const refined = localField(mask, surface, FIELD_RADIUS);
    fellBack = refined.fellBack;
    mask = flood(refined.field, threshold);
  }
};
refine();
// Les enclaves sont ajoutées telles quelles, sans diffusion : le champ fin n'est
// pas fiable à l'intérieur du sujet, et une diffusion partie de là déborderait
// sur le chino. Leur contour est déjà donné par les tests de neutralité et de
// proximité au champ grossier.
const enclaves = recoverEnclaves(mask, threshold);
for (const p of enclaves) mask[p] = 1;

// Érosion du sujet : tout pixel à moins de ERODE_RADIUS d'un pixel de fond
// devient transparent lui aussi (dilatation du masque, distance de Tchebychev).
if (ERODE_RADIUS > 0) {
  const pass = (input, horizontal) => {
    const out = new Uint8Array(N);
    const outer = horizontal ? H : W;
    const inner = horizontal ? W : H;
    const at = (a, b) => (horizontal ? a * W + b : b * W + a);
    for (let a = 0; a < outer; a++) {
      for (let b = 0; b < inner; b++) {
        let hit = 0;
        for (let k = -ERODE_RADIUS; k <= ERODE_RADIUS && !hit; k++) {
          const bb = b + k;
          if (bb >= 0 && bb < inner && input[at(a, bb)]) hit = 1;
        }
        out[at(a, b)] = hit;
      }
    }
    return out;
  };
  mask = pass(pass(mask, true), false);
}

let transparent = 0;
for (let p = 0; p < N; p++) {
  if (mask[p]) {
    data[p * 4 + 3] = 0;
    transparent++;
  }
}

// ------------------------------------------ adoucissement du masque alpha

// `.toColourspace('b-w')` est indispensable : sans lui, sharp 0.34 réinterprète
// le buffer mono-canal en sRGB 3 canaux à la sortie du pipeline, et le masque
// réassigné est décalé d'un facteur 3, ce qui corrompt entièrement l'image.
const alpha = Buffer.alloc(N);
for (let p = 0; p < N; p++) alpha[p] = data[p * 4 + 3];
const softened = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
  .toColourspace('b-w')
  .blur(BLUR_RADIUS)
  .raw()
  .toBuffer();
for (let p = 0; p < N; p++) data[p * 4 + 3] = softened[p];

await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const pct = (n) => `${((100 * n) / N).toFixed(1)}%`;
console.log(`tolérance ${TOL} (seuil Manhattan ${threshold})`);
console.log('surface d\'amorçage bg_c(u,v) = a + b·u + c·v + d·u² + e·uv + f·v²');
for (const [i, name] of ['R', 'G', 'B'].entries()) {
  console.log(`  ${name}: ${coefs[i].map((k) => k.toFixed(2).padStart(9)).join(' ')}`);
}
console.log(`anneau : ${ringKept}/${2 * BORDER * (W + H) - 4 * BORDER * BORDER} échantillons retenus`);
console.log(`champ local r=${FIELD_RADIUS} : repli paramétrique sur ${pct(fellBack)} de l'image`);
console.log(`enclaves de fond rouvertes : ${enclaves.length} px`);
console.log(`fraction transparente ${pct(transparent)} → ${OUT}`);
