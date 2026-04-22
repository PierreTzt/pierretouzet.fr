/* eslint-disable no-console -- CLI script used via npm run check:parity or direct node */
import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Load photo as base64
let photoBase64 = '';
try {
  const photoBuffer = readFileSync(resolve(rootDir, 'public/images/pierre-touzet-sm.png'));
  photoBase64 = `data:image/png;base64,${photoBuffer.toString('base64')}`;
} catch {
  photoBase64 = '';
}

// Load fonts as base64
function loadFont(path) {
  try {
    const buf = readFileSync(resolve(rootDir, path));
    return buf.toString('base64');
  } catch { return ''; }
}

const interRegular = loadFont('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2');
const interMedium = loadFont('node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2');
const interSemibold = loadFont('node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2');
const interBold = loadFont('node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2');
const soraBold = loadFont('node_modules/@fontsource/sora/files/sora-latin-700-normal.woff2');

const accent = '#4f46e5';
const accentLight = '#eef2ff';

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  @font-face { font-family: 'Inter'; font-weight: 400; src: url('data:font/woff2;base64,${interRegular}') format('woff2'); }
  @font-face { font-family: 'Inter'; font-weight: 500; src: url('data:font/woff2;base64,${interMedium}') format('woff2'); }
  @font-face { font-family: 'Inter'; font-weight: 600; src: url('data:font/woff2;base64,${interSemibold}') format('woff2'); }
  @font-face { font-family: 'Inter'; font-weight: 700; src: url('data:font/woff2;base64,${interBold}') format('woff2'); }
  @font-face { font-family: 'Sora'; font-weight: 700; src: url('data:font/woff2;base64,${soraBold}') format('woff2'); }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 8.5pt;
    color: #27272a;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    height: 297mm;
    display: grid;
    grid-template-columns: 64mm 1fr;
    overflow: hidden;
  }

  /* === SIDEBAR === */
  .sidebar {
    background: #18181b;
    color: #d4d4d8;
    padding: 20pt 14pt;
    display: flex;
    flex-direction: column;
    gap: 14pt;
    height: 297mm;
  }

  .sidebar .photo {
    width: 80pt;
    height: 80pt;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
    border: 2pt solid ${accent};
    margin: 0 auto 2pt;
  }

  .sidebar h3 {
    font-size: 6.5pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2pt;
    color: ${accent};
    margin-bottom: 6pt;
    padding-bottom: 3pt;
    border-bottom: 0.5pt solid #3f3f46;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 5pt;
    font-size: 7pt;
    color: #a1a1aa;
    margin-bottom: 3.5pt;
    word-break: break-all;
  }
  .contact-icon {
    width: 9pt;
    height: 9pt;
    flex-shrink: 0;
    fill: ${accent};
  }

  .skill-tags { display: flex; flex-wrap: wrap; gap: 2.5pt; }
  .skill-tag {
    font-size: 6pt;
    font-weight: 500;
    padding: 1.5pt 4pt;
    border: 0.5pt solid #3f3f46;
    color: #d4d4d8;
    border-radius: 1pt;
  }
  .skill-tag.hl {
    background: ${accent};
    border-color: ${accent};
    color: white;
  }

  .lang-item { font-size: 7pt; color: #a1a1aa; margin-bottom: 2pt; }
  .lang-item strong { color: #e4e4e7; }

  .edu-item { margin-bottom: 6pt; }
  .edu-school { font-size: 7pt; font-weight: 600; color: #e4e4e7; }
  .edu-degree { font-size: 6.5pt; color: #a1a1aa; }
  .edu-date { font-size: 6pt; color: #71717a; }

  /* === MAIN === */
  .main {
    padding: 20pt 20pt 16pt;
    display: flex;
    flex-direction: column;
    gap: 10pt;
  }

  .header h1 {
    font-family: 'Sora', sans-serif;
    font-size: 20pt;
    font-weight: 700;
    color: #09090b;
    line-height: 1.1;
  }
  .header h1 span {
    background: linear-gradient(135deg, ${accent}, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .header .title {
    font-size: 9pt;
    font-weight: 600;
    color: #52525b;
    margin-top: 3pt;
  }
  .header .loc {
    font-size: 7pt;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1pt;
    color: #a1a1aa;
    margin-top: 3pt;
  }
  .gradient-line {
    height: 1.5pt;
    background: linear-gradient(90deg, ${accent}, #818cf8, transparent);
    margin-top: 6pt;
  }

  .summary {
    font-size: 8pt;
    color: #52525b;
    line-height: 1.55;
  }

  .section-title {
    font-size: 7pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    color: ${accent};
    margin-bottom: 6pt;
    padding-bottom: 3pt;
    border-bottom: 0.5pt solid #e4e4e7;
  }

  .exp-item { margin-bottom: 9pt; }
  .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1pt; }
  .exp-position { font-size: 9pt; font-weight: 700; color: #09090b; }
  .exp-dates { font-size: 6.5pt; font-weight: 500; color: #a1a1aa; white-space: nowrap; }
  .exp-company { font-size: 7.5pt; font-weight: 600; color: ${accent}; margin-bottom: 2pt; }
  .exp-desc { font-size: 7.5pt; color: #52525b; margin-bottom: 3pt; line-height: 1.45; }

  .exp-achievements { list-style: none; padding: 0; }
  .exp-achievements li {
    font-size: 7pt;
    color: #52525b;
    padding-left: 8pt;
    position: relative;
    margin-bottom: 1pt;
    line-height: 1.45;
  }
  .exp-achievements li::before {
    content: '';
    position: absolute;
    left: 0; top: 4pt;
    width: 2.5pt; height: 2.5pt;
    background: ${accent};
    border-radius: 50%;
  }

  .exp-tags { display: flex; flex-wrap: wrap; gap: 2.5pt; margin-top: 3pt; }
  .exp-tag {
    font-size: 5.5pt;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3pt;
    padding: 1pt 3.5pt;
    background: ${accentLight};
    color: ${accent};
    border-radius: 1pt;
  }

  .project-name { font-size: 8.5pt; font-weight: 700; color: #09090b; }
  .project-url { font-size: 6.5pt; color: ${accent}; }
  .project-desc { font-size: 7pt; color: #52525b; line-height: 1.5; margin-top: 2pt; }

  .footer {
    margin-top: auto;
    text-align: right;
    font-size: 5.5pt;
    color: #a1a1aa;
  }
</style>
</head>
<body>
<div class="page">
  <!-- SIDEBAR -->
  <div class="sidebar">
    ${photoBase64 ? `<img src="${photoBase64}" class="photo" alt="Pierre Touzet" />` : ''}

    <div>
      <h3>Contact</h3>
      <div class="contact-item">
        <svg class="contact-icon" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        pierre.touzet@mecontacter.eu
      </div>
      <div class="contact-item">
        <svg class="contact-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
        Valenciennes, France
      </div>
      <div class="contact-item">
        <svg class="contact-icon" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        linkedin.com/in/pierre-touzet
      </div>
      <div class="contact-item">
        <svg class="contact-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        www.pierretouzet.fr
      </div>
    </div>

    <div>
      <h3>Compétences clés</h3>
      <div class="skill-tags">
        <span class="skill-tag hl">RNCP & Qualiopi</span>
        <span class="skill-tag hl">Conception de programmes</span>
        <span class="skill-tag hl">Coordination multi-campus</span>
        <span class="skill-tag hl">Conduite du changement</span>
        <span class="skill-tag hl">RGPD / DPO</span>
        <span class="skill-tag hl">Automatisation</span>
        <span class="skill-tag">Management transversal</span>
        <span class="skill-tag">Gestion de projet</span>
        <span class="skill-tag">Pilotage qualité</span>
        <span class="skill-tag">No-code / Low-code</span>
        <span class="skill-tag">IA générative</span>
        <span class="skill-tag">Veille EdTech</span>
        <span class="skill-tag">LMS / ERP (Yparéo)</span>
        <span class="skill-tag">Reporting & Data</span>
        <span class="skill-tag">Graphisme & PAO</span>
      </div>
    </div>

    <div>
      <h3>Langues</h3>
      <div class="lang-item"><strong>Français</strong> — Langue maternelle</div>
      <div class="lang-item"><strong>Anglais</strong> — Professionnel</div>
    </div>

    <div>
      <h3>Formation</h3>
      <div class="edu-item">
        <div class="edu-school">OpenClassrooms</div>
        <div class="edu-degree">Responsable d'Ingénierie pédagogique</div>
        <div class="edu-date">2025</div>
      </div>
      <div class="edu-item">
        <div class="edu-school">Anaxil</div>
        <div class="edu-degree">RGPD — DPO & CIL labéllisé CNIL</div>
        <div class="edu-date">2018</div>
      </div>
      <div class="edu-item">
        <div class="edu-school">Lycée du Hainaut</div>
        <div class="edu-degree">Bac pro Électrotechnique</div>
        <div class="edu-date">2006 — 2007</div>
      </div>
    </div>

    <div>
      <h3>Engagement</h3>
      <div class="lang-item">Team for the Planet — Investisseur privé depuis 2022</div>
    </div>
  </div>

  <!-- MAIN -->
  <div class="main">
    <div class="header">
      <h1>Pierre <span>Touzet</span></h1>
      <div class="title">Ingénierie pédagogique & Innovation digitale</div>
      <div class="loc">Valenciennes, France</div>
      <div class="gradient-line"></div>
    </div>

    <div class="summary">
      15 ans à la croisée de la tech et de la pédagogie. Je pilote les programmes de formation de 6 campus nationaux et je crée des outils qui simplifient le quotidien des équipes pédagogiques. Fondateur de Gradly. Disponible en consulting et freelance.
    </div>

    <div>
      <div class="section-title">Expériences</div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-position">Responsable national des programmes</span>
          <span class="exp-dates">Jan 2026 — Présent</span>
        </div>
        <div class="exp-company">IEFT — Tourism Management School</div>
        <div class="exp-desc">Pilotage des programmes, de la qualité et du corps professoral sur 6 campus nationaux pour ~500 apprenants.</div>
        <ul class="exp-achievements">
          <li>Harmonisation pédagogique nationale : maquettes, évaluations et modalités unifiées</li>
          <li>Déploiement de nouveaux programmes de la conception à l'ouverture</li>
          <li>Conception des syllabi, blocs de compétences et grilles d'évaluation conformes RNCP</li>
          <li>Préparation et obtention des dossiers de certification et jurys (RNCP, Qualiopi)</li>
          <li>Management transversal des coordinateurs et responsables pédagogiques</li>
          <li>Pilotage budgétaire et optimisation de la rentabilité des programmes</li>
        </ul>
        <div class="exp-tags">
          <span class="exp-tag">RNCP</span><span class="exp-tag">Qualiopi</span><span class="exp-tag">Management</span><span class="exp-tag">6 campus</span>
        </div>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-position">Coordinateur pédagogique national</span>
          <span class="exp-dates">Jan 2024 — Jan 2026</span>
        </div>
        <div class="exp-company">IEFT — Tourism Management School</div>
        <div class="exp-desc">Déploiement et harmonisation pédagogique des programmes sur l'ensemble des campus.</div>
        <ul class="exp-achievements">
          <li>Coordination et animation des équipes pédagogiques</li>
          <li>Suivi de l'activité des formateurs et contribution à l'organisation pédagogique</li>
          <li>Contribution au respect des normes Qualité</li>
        </ul>
        <div class="exp-tags">
          <span class="exp-tag">Coordination</span><span class="exp-tag">Qualité</span><span class="exp-tag">Formation continue</span>
        </div>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-position">Coordinateur pédagogique national</span>
          <span class="exp-dates">Avr 2022 — Jan 2024</span>
        </div>
        <div class="exp-company">IFAG / Compétences & Développement</div>
        <div class="exp-desc">Transformation digitale des outils pédagogiques au sein d'un réseau national d'écoles.</div>
        <ul class="exp-achievements">
          <li>Déploiement d'outils numériques adoptés par l'ensemble des campus du réseau</li>
          <li>Développement sur mesure d'outils pour automatiser les tâches récurrentes</li>
          <li>Veille EdTech et pilotage de POC sur des solutions innovantes</li>
          <li>Mise en place d'indicateurs data pour le suivi qualité des formations</li>
        </ul>
        <div class="exp-tags">
          <span class="exp-tag">EdTech</span><span class="exp-tag">Automatisation</span><span class="exp-tag">Data</span><span class="exp-tag">POC</span>
        </div>
      </div>

      <div class="exp-item">
        <div class="exp-header">
          <span class="exp-position">Executive Office Manager & Tech. informatique</span>
          <span class="exp-dates">Oct 2010 — Nov 2021</span>
        </div>
        <div class="exp-company">ICM Aulnoye Aymeries</div>
        <div class="exp-desc">11 ans en double casquette : pilotage administratif et opérationnel + gestion complète de l'infrastructure IT.</div>
        <ul class="exp-achievements">
          <li>Création de process d'approvisionnement : rationalisation fournisseurs, OTD > 90%</li>
          <li>Migration complète du parc informatique — Support IT N1 à N3</li>
          <li>Facturation, suivi clients, reporting et graphisme</li>
        </ul>
        <div class="exp-tags">
          <span class="exp-tag">IT</span><span class="exp-tag">Gestion</span><span class="exp-tag">Process</span><span class="exp-tag">Graphisme</span>
        </div>
      </div>
    </div>

    <div>
      <div class="section-title">Projet fondateur</div>
      <div>
        <span class="project-name">Gradly</span> <span class="project-url">— gradly.fr</span>
        <div class="project-desc">
          Outil d'automatisation des bulletins de compétences RNCP pour les centres de formation. Solution 100% offline, import/export Excel/CSV, génération de bulletins PDF conformes. Compatible ERP (Yparéo). Résultat : temps administratif ÷ 3.
        </div>
        <div class="exp-tags" style="margin-top:3pt">
          <span class="exp-tag">No-code</span><span class="exp-tag">Offline-first</span><span class="exp-tag">PDF</span><span class="exp-tag">ERP</span>
        </div>
      </div>
    </div>

    <div class="footer">
      www.pierretouzet.fr — Février 2026
    </div>
  </div>
</div>
</body>
</html>`;

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Rendering HTML...');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  const outputPath = resolve(rootDir, 'public/cv-pierre-touzet.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log(`CV generated: ${outputPath}`);
}

generatePDF().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
