# Studio — refonte de la section "Projets" en hub thématique

**Date :** 2026-04-18
**Statut :** validé pour implémentation
**Auteur :** Pierre Touzet (brainstorm + Claude)

---

## Contexte & motivation

Le portfolio actuel présente 4 projets détaillés (Distil Academy, Gradly, Innovation pédagogique, Portfolio) dans une section `/fr/projets/` + `/en/projects/`. Pierre lance en parallèle plusieurs micro-SaaS thématiques (trois sites autour du deuil sont déjà en ligne) et prévoit d'autres univers (santé, outils, etc.) dans les mois à venir.

Ajouter ces sites un à un dans la liste actuelle :
- dilue les cas d'usage détaillés parmi des sites externes à format différent ;
- ne raconte pas la cohérence thématique entre sites liés ;
- ne scale pas à 10-20-50 sites.

**Objectif :** remplacer la section "Projets" par une section "Studio" organisée en **clusters thématiques**, capable d'accueillir à la fois des cas d'usage internes (avec page détail) et des sites externes (lien direct).

## Décisions arrêtées

| Décision | Valeur |
|---|---|
| Nom de section | **Studio** (FR et EN, même mot) |
| Route FR | `/fr/studio/` |
| Route EN | `/en/studio/` |
| Position nav | **Remplace** `Projets`/`Projects` |
| Pages détails | Déplacées sous `/fr/studio/[slug]/` et `/en/studio/[slug]/` |
| Sites externes | Lien direct `target="_blank"`, pas de page détail interne |
| Homepage | Section "Derniers projets" remplacée par 1 tile par cluster |
| Premier cluster "deuil" | **Autour du deuil** |
| Cluster "pédagogie" | **Éducation & pédagogie** |
| Cluster "expérimentations" | **Labs** |
| Redirects 301 | `/projets/` → `/studio/` et `/projects/` → `/studio/` (liste + pages détails) |

## Architecture des données

### Ajouts à `src/data/types.ts`

```ts
export type StudioEntryRef =
  | { kind: 'project'; projectSlug: string }
  | { kind: 'external'; siteSlug: string };

export interface StudioExternalSite {
  id: string;
  slug: string;                // ex: 'cahier-bleu'
  title: string;               // ex: 'Le Cahier Bleu'
  url: string;                 // lien externe (https://...)
  shortDescription: string;    // 1 ligne, affichée sur la tile
  technologies: string[];
  period?: string;             // ex: '2026'
  imageAlt: string;
  status?: ProjectStatus;      // réutilise le type existant
}

export interface StudioCluster {
  id: string;                  // ex: 'around-grief' (slug stable, URL anchor)
  title: string;               // ex: 'Autour du deuil'
  description: string;         // 1-2 lignes d'intro
  entries: StudioEntryRef[];
}
```

### Extension de `SiteData`

```ts
export interface SiteData {
  // ... champs existants ...
  studioSites: StudioExternalSite[];      // NOUVEAU — 3 entrées au lancement
  studioClusters: StudioCluster[];        // NOUVEAU — 3 clusters au lancement
}
```

`projects[]` **reste inchangé** (4 cas d'usage détaillés). Les clusters y font référence via `projectSlug`.

### Contenu initial FR (`src/data/fr.ts`)

**3 clusters** dans cet ordre d'affichage :

1. **`education-pedagogy`** — *Éducation & pédagogie*
   - Description : « Des plateformes et études de cas pour transformer l'expérience d'apprentissage. »
   - Entries : `project/distil-academy`, `project/gradly`, `project/innovation-pedagogique`

2. **`around-grief`** — *Autour du deuil*
   - Description : « Trois outils pensés pour les heures qui suivent une perte. Paiement unique, aucune donnée conservée. »
   - Entries : `external/cahier-bleu`, `external/memoire-gardee`, `external/maison-veillance`

3. **`labs`** — *Labs*
   - Description : « Expérimentations techniques et projets personnels. »
   - Entries : `project/portfolio`

**3 `studioSites`** :

| slug | title | url | shortDescription | technologies | period | status |
|---|---|---|---|---|---|---|
| `cahier-bleu` | Le Cahier Bleu | https://www.lecahierbleu.fr/ | « Écrire un hommage à la hauteur du souvenir, en quinze minutes. » | Astro, IA (Claude / GPT-4o), Stripe, AES-256 | 2026 | active |
| `memoire-gardee` | Mémoire gardée | https://www.memoiregardee.fr/ | « Restaurer un portrait d'hommage en trente secondes, prêt à imprimer. » | IA de restauration, Stripe, HD 300 DPI | 2026 | active |
| `maison-veillance` | Maison Veillance | https://www.maisonveillance.fr/ | « Quinze lettres de résiliation post-décès rédigées et vérifiées à la main. » | Astro, Vérification humaine, RGPD, Stripe | 2026 | active |

### Contenu initial EN (`src/data/en.ts`)

Clusters :
- `education-pedagogy` / *Education & pedagogy* / "Platforms and case studies to reshape the learning experience." / mêmes entries (projectSlug `pedagogical-innovation` côté EN).
- `around-grief` / *Around grief* / "Three tools built for the hours that follow a loss. One-time payment, no data kept." / mêmes entries externes.
- `labs` / *Labs* / "Technical experiments and personal projects." / `project/portfolio`.

`studioSites` EN : mêmes slugs et URL, traductions anglaises des `shortDescription` et `imageAlt`.

## Architecture des routes

### Nouveaux fichiers

```
src/pages/fr/studio/
  index.astro          → <StudioIndexTemplate lang="fr" />
  [slug].astro         → <ProjectDetailTemplate lang="fr" /> (réutilisé, routes resolved via projects[])

src/pages/en/studio/
  index.astro          → <StudioIndexTemplate lang="en" />
  [slug].astro         → <ProjectDetailTemplate lang="en" />
```

### Fichiers supprimés

```
src/pages/fr/projets/index.astro
src/pages/fr/projets/[slug].astro
src/pages/en/projects/index.astro
src/pages/en/projects/[slug].astro
```

(Le dossier `projets`/`projects` est supprimé une fois vidé.)

### Redirects 301 (via `vercel.json`)

```json
{
  "redirects": [
    { "source": "/fr/projets", "destination": "/fr/studio", "permanent": true },
    { "source": "/fr/projets/:slug", "destination": "/fr/studio/:slug", "permanent": true },
    { "source": "/en/projects", "destination": "/en/studio", "permanent": true },
    { "source": "/en/projects/:slug", "destination": "/en/studio/:slug", "permanent": true }
  ]
}
```

Garder les redirects existants dans `vercel.json` (headers de sécurité, etc.).

### Cas limite

Si quelqu'un tape `/fr/studio/cahier-bleu/` (slug de site externe, pas de page détail) → **404**. Les sites externes ne sont accessibles QUE via leur URL externe. `getStaticPaths()` dans `[slug].astro` ne retourne que les `projects`, pas les `studioSites`.

### Sitemap

`astro.config.mjs` — le `serialize` existant continue de filtrer `/admin/`. Les nouvelles URLs `/studio/` sont automatiquement incluses. Les anciennes `/projets/` et `/projects/` ne sont plus générées donc plus dans le sitemap.

## Composants & templates

### Nouveaux composants

#### `src/templates/StudioIndexTemplate.astro`
Template de la page hub `/studio/`. Structure :
- `<BaseLayout>` avec `title="Studio — Pierre Touzet"`, breadcrumb `Accueil > Studio`
- `<SectionHeader title="Studio" number="01" as="h1" />`
- Paragraphe d'intro (texte court, ex: « Un recueil de ce que je construis — cas d'usage détaillés et sites lancés, regroupés par univers. »)
- Pour chaque `studioClusters[]` : `<StudioClusterSection cluster={c} lang={lang} />`

#### `src/components/StudioClusterSection.astro`
Section d'un cluster. Props : `cluster: StudioCluster`, `lang: Lang`.
- Ancre HTML (`id={cluster.id}`) pour permettre le scroll depuis la homepage
- Header : label ID (mono, accent, uppercase), titre H2, description
- Grid : 3 colonnes max, `StudioEntryCard` par entry, résolution de la ref vers Project ou StudioExternalSite via les données du cluster

#### `src/components/StudioEntryCard.astro`
Carte polymorphe. Props : `entry: StudioEntryRef`, data résolue, `lang: Lang`, `index: number`.

Dérive visuellement de `ProjectCard.astro` (grille 4:3, hover, scale, accent color) mais :
- **Project** → `<a href="/studio/[slug]/">`, badge `CAS D'USAGE` (monochrome), flèche ↗ interne
- **External** → `<a href={url} target="_blank" rel="noopener noreferrer" data-track="studio-external-click" data-site={slug}>`, badge `SITE EN LIGNE` (accent color), icône ↗ externe distincte

Les deux variantes partagent : image, titre, period, shortDescription, 3 premiers techs.

### Templates modifiés

#### `src/templates/HomeTemplate.astro`
Section "Derniers projets" remplacée par section "Studio" :
- 1 tile par cluster (3 au lancement)
- Tile de cluster = `<StudioClusterPreviewCard cluster={c} />` (nouveau petit composant) : titre cluster + description courte + comptage ("3 projets" / "3 sites") + 3 mini-screenshots empilés + lien `/studio/#cluster-id`
- Bouton "Voir le studio complet →" vers `/studio/`

#### `src/templates/ProjectDetailTemplate.astro`
- Breadcrumb mis à jour : `Accueil > Studio > [projet]` (au lieu de `Accueil > Projets > [projet]`)
- Lien "retour" : `backToStudio` au lieu de `backToProjects`, pointe vers `/studio/`

#### `src/components/Navbar.astro`
- Remplacer la ligne projets dans `navLinks` par :
  ```ts
  { href: `${prefix}/studio/`, label: ui.nav.studio },
  ```

### Traductions UI (`types.ts` + `fr.ts` + `en.ts`)

Renommages dans `UITranslations` :
- `nav.projects` → `nav.studio` (labels "Studio" / "Studio")
- `sections.latestProjects` → `sections.studio` (labels "Studio" / "Studio")
- `sections.allProjects` → `sections.allStudio` (labels "Tout le studio" / "Full studio")
- `project.backToProjects` → `project.backToStudio` (labels "Retour au studio" / "Back to studio")

**Nouvelles clés :**
- `studio.intro` — le paragraphe d'intro de la page hub
- `studio.caseStudyBadge` — "Cas d'usage" / "Case study"
- `studio.liveSiteBadge` — "Site en ligne" / "Live site"
- `studio.clusterCountProjects` — "{n} projets" / "{n} projects"
- `studio.clusterCountSites` — "{n} sites" / "{n} sites"

## Flux de données

```
data.studioClusters[]
  └─ entries[]
        ├─ kind: 'project' → résolu depuis data.projects[] via projectSlug
        │     └─ rendu : ProjectCard variant (lien interne)
        └─ kind: 'external' → résolu depuis data.studioSites[] via siteSlug
              └─ rendu : ExternalSiteCard variant (lien externe)
```

Utility dans `src/utils/studio.ts` :
```ts
export function resolveStudioEntry(
  ref: StudioEntryRef,
  data: SiteData
): { type: 'project'; data: Project } | { type: 'external'; data: StudioExternalSite } | null {
  if (ref.kind === 'project') {
    const p = data.projects.find(x => x.slug === ref.projectSlug);
    return p ? { type: 'project', data: p } : null;
  }
  const s = data.studioSites.find(x => x.slug === ref.siteSlug);
  return s ? { type: 'external', data: s } : null;
}
```

Filtre silencieusement les refs cassées (robustesse en cas de typo dans les données). Les composants consommateurs (`StudioClusterSection`) filtrent les `null` avant rendu — une ref cassée = une tile manquante, pas une erreur.

## Images & assets

- **Déjà capturés** (commit à venir) :
  - `src/assets/images/project-cahier-bleu.png`
  - `src/assets/images/project-memoire-gardee.png`
  - `src/assets/images/project-maison-veillance.png`

- **Convention existante** : `project-{slug}.png` dans `src/assets/images/`, glob loader dans les templates. Les sites externes utilisent la même convention (préfixe `project-` conservé pour simplicité du glob, même si ce sont des sites — le préfixe est un détail technique).

- **Variants WebP** : `ProjectCard.astro` charge `/images/project-{slug}.webp` depuis `public/images/`. À générer pour les 3 sites externes lors de l'implémentation (même process manuel que pour les projets existants — conversion PNG→WebP via `sharp` en CLI ou équivalent).

## Analytics & tracking

- Clic sur tile externe → `data-track="studio-external-click"` + `data-site="{slug}"`. Handler existant dans `BaseLayout.astro` capture l'event.
- Clic sur tile cluster depuis la home → `data-track="home-cluster-click"` + `data-cluster="{id}"`.

## SEO

- **Hreflang** : les pages `/fr/studio/` et `/en/studio/` s'auto-lient via `getHreflangUrl()` (slug mapping à ajouter dans `src/i18n/utils.ts` : `studio` ↔ `studio`, identité).
- **Slug mapping** : dans `getLocalizedPath`, ajouter `studio ↔ studio`. Plus la paire `projets/projects` n'est plus nécessaire (routes supprimées).
- **Meta description** : FR « Studio de Pierre Touzet — cas d'usage pédagogiques et sites lancés. » / EN équivalent.
- **Schema.org** : garder `ProfilePage` sur la home, aucun schéma spécifique pour Studio (liste de liens, inutile).

## Scope — ce qui est hors périmètre

- Pas de filtres par cluster/tech sur la page Studio (YAGNI pour 7 entrées).
- Pas de page détail pour les sites externes.
- Pas de pagination (YAGNI avant d'avoir 20+ entrées).
- Pas de dashboard analytics interne (Vercel Analytics suffit).
- Pas de refonte des cards projets existantes — on étend le pattern, on ne le réécrit pas.

## Vérification post-implémentation

- [ ] `/fr/studio/` et `/en/studio/` rendent les 3 clusters dans l'ordre défini
- [ ] `/fr/studio/distil-academy/` et équivalents EN rendent les pages détails existantes
- [ ] `/fr/projets/` retourne 301 vers `/fr/studio/`
- [ ] `/fr/projets/gradly/` retourne 301 vers `/fr/studio/gradly/`
- [ ] Tiles externes ouvrent en nouvel onglet avec `rel="noopener noreferrer"`
- [ ] Nav affiche "Studio" au lieu de "Projets" en FR et EN
- [ ] Homepage affiche 3 tiles de clusters menant vers `/studio/#{cluster-id}`
- [ ] Breadcrumbs sur page détail mentionnent "Studio"
- [ ] Sitemap ne contient plus `/projets/` ni `/projects/`
- [ ] Hreflang FR↔EN corrects sur `/studio/`
- [ ] `ui.nav.studio`, `ui.sections.studio` etc. utilisés partout (recherche `nav.projects` = 0 résultat)
- [ ] Dark mode OK sur toutes les nouvelles surfaces
- [ ] Mobile : nav avec 6 items reste lisible, grid clusters passe en 1 colonne
