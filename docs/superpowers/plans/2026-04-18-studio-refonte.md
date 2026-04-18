# Studio — refonte de la section "Projets" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la section "Projets" du portfolio par un hub "Studio" organisé en clusters thématiques, capable d'héberger des cas d'usage détaillés (pages internes) et des sites externes (liens directs), avec 3 clusters au lancement et redirects 301 pour préserver le SEO.

**Architecture:** Nouveau modèle de données `StudioCluster` + `StudioExternalSite` + `StudioEntryRef` (union discriminée) à côté de `Project[]` existant. Nouvelle arborescence `/studio/` avec `StudioIndexTemplate` + composants polymorphes `StudioClusterSection` / `StudioEntryCard`. Routes `/projets/` et `/projects/` supprimées, remplacées par redirects 301 Vercel.

**Tech Stack:** Astro 5 + TypeScript + Tailwind CSS 3 + Vercel (adapter `@astrojs/vercel`) + Vitest (pour utilitaires pures).

**Spec de référence:** `docs/superpowers/specs/2026-04-18-studio-design.md`

---

## File Structure

### Fichiers créés

| Path | Responsabilité |
|---|---|
| `src/utils/studio.ts` | Utilitaire `resolveStudioEntry(ref, data)` qui résout une `StudioEntryRef` vers un `Project` ou `StudioExternalSite`. |
| `src/__tests__/studio.test.ts` | Tests vitest du resolver. |
| `src/components/StudioEntryCard.astro` | Carte polymorphe : variant `project` (lien interne) ou variant `external` (lien externe `target="_blank"`). |
| `src/components/StudioClusterSection.astro` | Section d'un cluster : titre H2 + description + grid d'entries. |
| `src/components/StudioClusterPreviewCard.astro` | Tile d'aperçu d'un cluster utilisée sur la homepage (titre + comptage + lien ancre). |
| `src/templates/StudioIndexTemplate.astro` | Template de la page hub `/studio/`. |
| `src/pages/fr/studio/index.astro` | Route FR du hub. |
| `src/pages/fr/studio/[slug].astro` | Route FR des pages détails (réutilise `ProjectDetailTemplate`). |
| `src/pages/en/studio/index.astro` | Route EN du hub. |
| `src/pages/en/studio/[slug].astro` | Route EN des pages détails. |
| `public/images/project-cahier-bleu.png` + `.webp` | Screenshot du site externe. |
| `public/images/project-memoire-gardee.png` + `.webp` | Screenshot du site externe. |
| `public/images/project-maison-veillance.png` + `.webp` | Screenshot du site externe. |
| `public/images/project-distil-academy.png` + `.webp` | Screenshot existant à déplacer/dupliquer depuis `src/assets/images/`. |

### Fichiers modifiés

| Path | Changement |
|---|---|
| `src/data/types.ts` | +3 types (`StudioExternalSite`, `StudioCluster`, `StudioEntryRef`) ; `SiteData` gagne `studioSites` + `studioClusters` ; `UITranslations` : rename `nav.projects`→`nav.studio`, `sections.latestProjects`→`sections.studio`, `sections.allProjects`→`sections.allStudio`, `project.backToProjects`→`project.backToStudio`, + 5 nouvelles clés sous `studio.*`. |
| `src/data/fr.ts` | + données `studioSites` (3) + `studioClusters` (3) ; rename clés UI. |
| `src/data/en.ts` | Idem EN. |
| `src/i18n/utils.ts` | Retirer `projets: 'projects'` de `pageSlugMap`. |
| `src/components/Navbar.astro` | Remplacer le lien `projets` par `studio`. |
| `src/templates/HomeTemplate.astro` | Remplacer la row "projets featured" par 3 tiles de cluster preview ; lien global `allStudio`. |
| `src/templates/ProjectDetailTemplate.astro` | Breadcrumb et lien retour pointent vers `/studio/`. |
| `src/components/ProjectCard.astro` | Retirer l'allowlist `hasImage` (toutes les entrées doivent avoir une image). |
| `vercel.json` | Ajouter les 4 redirects 301. |
| `README.md` | Éventuelle mise à jour cosmétique (mention Studio). Optionnel — skip si hors scope. |

### Fichiers supprimés

| Path | Raison |
|---|---|
| `src/pages/fr/projets/index.astro` | Remplacé par `/fr/studio/`. |
| `src/pages/fr/projets/[slug].astro` | Remplacé par `/fr/studio/[slug]/`. |
| `src/pages/en/projects/index.astro` | Remplacé par `/en/studio/`. |
| `src/pages/en/projects/[slug].astro` | Remplacé par `/en/studio/[slug]/`. |
| `src/templates/ProjectsIndexTemplate.astro` | Plus utilisé après suppression des routes `/projets/`. |

Les dossiers `src/pages/fr/projets/` et `src/pages/en/projects/` sont supprimés une fois vidés.

---

## Tasks

### Task 1 — Préparer les assets images

**Files:**
- Modify: `public/images/project-distil-academy.png` (création depuis `src/assets/images/`)
- Modify: `public/images/project-distil-academy.webp`
- Modify: `public/images/project-cahier-bleu.png` (copie depuis `src/assets/images/`)
- Modify: `public/images/project-cahier-bleu.webp`
- Modify: `public/images/project-memoire-gardee.png`
- Modify: `public/images/project-memoire-gardee.webp`
- Modify: `public/images/project-maison-veillance.png`
- Modify: `public/images/project-maison-veillance.webp`

- [ ] **Step 1.1 — Copier les PNG vers `public/images/`**

Le pattern existant (`ProjectCard.astro:40-42`) charge les images depuis `/images/project-{slug}.png` donc `public/images/`. Les screenshots sont actuellement dans `src/assets/images/`.

```bash
cp "D:/Projets/CV/src/assets/images/project-distil-academy.png"   "D:/Projets/CV/public/images/project-distil-academy.png"
cp "D:/Projets/CV/src/assets/images/project-cahier-bleu.png"      "D:/Projets/CV/public/images/project-cahier-bleu.png"
cp "D:/Projets/CV/src/assets/images/project-memoire-gardee.png"   "D:/Projets/CV/public/images/project-memoire-gardee.png"
cp "D:/Projets/CV/src/assets/images/project-maison-veillance.png" "D:/Projets/CV/public/images/project-maison-veillance.png"
```

- [ ] **Step 1.2 — Générer les variants WebP via sharp**

Le projet a `sharp` ^0.34.5 en dépendance. Script ad-hoc :

```bash
cd D:/Projets/CV && node -e "
const sharp = require('sharp');
const files = ['project-distil-academy','project-cahier-bleu','project-memoire-gardee','project-maison-veillance'];
Promise.all(files.map(f =>
  sharp('public/images/' + f + '.png')
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile('public/images/' + f + '.webp')
    .then(() => console.log('OK ' + f))
)).catch(e => { console.error(e); process.exit(1); });
"
```

- [ ] **Step 1.3 — Vérifier que les 8 fichiers sont présents**

```bash
ls -la D:/Projets/CV/public/images/project-distil-academy.* D:/Projets/CV/public/images/project-cahier-bleu.* D:/Projets/CV/public/images/project-memoire-gardee.* D:/Projets/CV/public/images/project-maison-veillance.*
```

Expected : 8 lignes (4 PNG + 4 WebP).

- [ ] **Step 1.4 — Commit**

```bash
git -C D:/Projets/CV add public/images/project-distil-academy.* public/images/project-cahier-bleu.* public/images/project-memoire-gardee.* public/images/project-maison-veillance.*
git -C D:/Projets/CV commit -m "Ajouter les screenshots des sites Studio en public/images/

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2 — Ajouter les types Studio

**Files:**
- Modify: `src/data/types.ts`

- [ ] **Step 2.1 — Ajouter les nouveaux types après `Project`**

Insérer après la définition de `Project` (ligne ~52), avant `SkillCategory` :

```ts
export interface StudioExternalSite {
  id: string;
  slug: string;
  title: string;
  url: string;
  shortDescription: string;
  technologies: string[];
  period?: string;
  imageAlt: string;
  status?: ProjectStatus;
}

export type StudioEntryRef =
  | { kind: 'project'; projectSlug: string }
  | { kind: 'external'; siteSlug: string };

export interface StudioCluster {
  id: string;
  title: string;
  description: string;
  entries: StudioEntryRef[];
}
```

- [ ] **Step 2.2 — Étendre `SiteData`**

Dans l'interface `SiteData` (ligne ~242), ajouter deux champs après `projects` :

```ts
export interface SiteData {
  personal: PersonalInfo;
  social: SocialLink[];
  experiences: Experience[];
  projects: Project[];
  studioSites: StudioExternalSite[];
  studioClusters: StudioCluster[];
  skillCategories: SkillCategory[];
  // ... reste inchangé
}
```

- [ ] **Step 2.3 — Renommer et étendre `UITranslations`**

Dans `UITranslations.nav`, renommer `projects` en `studio` :

```ts
nav: {
  home: string;
  experiences: string;
  studio: string;   // renommé depuis projects
  skills: string;
  contact: string;
  menuLabel: string;
};
```

Dans `UITranslations.sections`, renommer `latestProjects` en `studio` et `allProjects` en `allStudio` :

```ts
sections: {
  studio: string;          // renommé depuis latestProjects
  latestExperiences: string;
  topSkills: string;
  viewAll: string;
  allStudio: string;       // renommé depuis allProjects
  allExperiences: string;
  allSkills: string;
  latestArticles: string;
};
```

Dans `UITranslations.project`, renommer `backToProjects` en `backToStudio` :

```ts
project: {
  label: string;
  demo: string;
  source: string;
  backToStudio: string;    // renommé depuis backToProjects
  technologies: string;
  visual: string;
  metrics: string;
  story: string;
  features: string;
};
```

Ajouter un nouveau bloc `studio` dans `UITranslations` après `blog` :

```ts
studio: {
  intro: string;
  caseStudyBadge: string;
  liveSiteBadge: string;
  clusterCountProjects: string;   // ex: "{n} projets" / "{n} projects"
  clusterCountSites: string;      // ex: "{n} sites" / "{n} sites"
};
```

- [ ] **Step 2.4 — Vérifier la compilation TypeScript**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : erreurs attendues sur `fr.ts`, `en.ts` et les composants qui utilisent les anciennes clés (`nav.projects`, `sections.latestProjects`, `sections.allProjects`, `project.backToProjects`). On les corrige dans les tasks suivantes. Pas d'erreur sur `types.ts` lui-même.

- [ ] **Step 2.5 — Commit**

```bash
git -C D:/Projets/CV add src/data/types.ts
git -C D:/Projets/CV commit -m "Ajouter les types Studio (clusters, external sites, refs)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3 — Remplir les données FR

**Files:**
- Modify: `src/data/fr.ts`

- [ ] **Step 3.1 — Lire la structure actuelle pour localiser les ancres**

```bash
grep -n "ui:" D:/Projets/CV/src/data/fr.ts | head -5
grep -n "projects:" D:/Projets/CV/src/data/fr.ts | head -5
```

Repérer la ligne où `projects: [...]` se termine et où `ui: {...}` commence.

- [ ] **Step 3.2 — Ajouter `studioSites` et `studioClusters` après `projects`**

Insérer juste après la fermeture du tableau `projects: [...]` (l'ordre dans `SiteData` est : `projects`, `studioSites`, `studioClusters`, `skillCategories`, …). Note: on utilise les IDs/slugs projets existants ; si l'id `portfolio` n'existe pas côté FR, adapter en lisant d'abord `projects` dans `fr.ts`.

```ts
studioSites: [
  {
    id: 'cahier-bleu',
    slug: 'cahier-bleu',
    title: 'Le Cahier Bleu',
    url: 'https://www.lecahierbleu.fr/',
    shortDescription: "Écrire un hommage à la hauteur du souvenir, en quinze minutes.",
    technologies: ['Astro', 'IA (Claude / GPT-4o)', 'Stripe', 'AES-256'],
    period: '2026',
    imageAlt: "Capture de la page d'accueil du Cahier Bleu",
    status: 'active',
  },
  {
    id: 'memoire-gardee',
    slug: 'memoire-gardee',
    title: 'Mémoire gardée',
    url: 'https://www.memoiregardee.fr/',
    shortDescription: "Restaurer un portrait d'hommage en trente secondes, prêt à imprimer.",
    technologies: ['IA de restauration', 'Stripe', 'HD 300 DPI'],
    period: '2026',
    imageAlt: "Capture de la page d'accueil de Mémoire gardée",
    status: 'active',
  },
  {
    id: 'maison-veillance',
    slug: 'maison-veillance',
    title: 'Maison Veillance',
    url: 'https://www.maisonveillance.fr/',
    shortDescription: 'Quinze lettres de résiliation post-décès rédigées et vérifiées à la main.',
    technologies: ['Astro', 'Vérification humaine', 'RGPD', 'Stripe'],
    period: '2026',
    imageAlt: "Capture de la page d'accueil de Maison Veillance",
    status: 'active',
  },
],
studioClusters: [
  {
    id: 'education-pedagogy',
    title: 'Éducation & pédagogie',
    description: "Des plateformes et études de cas pour transformer l'expérience d'apprentissage.",
    entries: [
      { kind: 'project', projectSlug: 'distil-academy' },
      { kind: 'project', projectSlug: 'gradly' },
      { kind: 'project', projectSlug: 'innovation-pedagogique' },
    ],
  },
  {
    id: 'around-grief',
    title: 'Autour du deuil',
    description: 'Trois outils pensés pour les heures qui suivent une perte. Paiement unique, aucune donnée conservée.',
    entries: [
      { kind: 'external', siteSlug: 'cahier-bleu' },
      { kind: 'external', siteSlug: 'memoire-gardee' },
      { kind: 'external', siteSlug: 'maison-veillance' },
    ],
  },
  {
    id: 'labs',
    title: 'Labs',
    description: 'Expérimentations techniques et projets personnels.',
    entries: [
      { kind: 'project', projectSlug: 'portfolio' },
    ],
  },
],
```

**Avant de committer**, vérifier que les 4 slugs projets référencés existent côté FR :
```bash
grep -E "slug: '(distil-academy|gradly|innovation-pedagogique|portfolio)'" D:/Projets/CV/src/data/fr.ts
```
Expected : 4 lignes. Si un slug diffère (ex: `portfolio` s'appelle autrement), ajuster.

- [ ] **Step 3.3 — Renommer les clés UI**

Dans le bloc `ui: { ... }` de `fr.ts`, appliquer :

- `nav.projects: 'Projets'` → `nav.studio: 'Studio'`
- `sections.latestProjects: ...` → `sections.studio: 'Studio'`
- `sections.allProjects: 'Tous les projets'` (ou similaire) → `sections.allStudio: 'Tout le studio'`
- `project.backToProjects: 'Retour aux projets'` (ou similaire) → `project.backToStudio: 'Retour au studio'`

Ajouter un nouveau bloc `studio` après `blog` :

```ts
studio: {
  intro: "Un recueil de ce que je construis — cas d'usage détaillés et sites lancés, regroupés par univers.",
  caseStudyBadge: "Cas d'usage",
  liveSiteBadge: 'Site en ligne',
  clusterCountProjects: '{n} projets',
  clusterCountSites: '{n} sites',
},
```

- [ ] **Step 3.4 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : seules les erreurs du côté `en.ts` + composants encore non adaptés. `fr.ts` ne doit pas avoir d'erreurs.

- [ ] **Step 3.5 — Commit**

```bash
git -C D:/Projets/CV add src/data/fr.ts
git -C D:/Projets/CV commit -m "Ajouter les données Studio FR (clusters + sites externes)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4 — Remplir les données EN

**Files:**
- Modify: `src/data/en.ts`

- [ ] **Step 4.1 — Vérifier les slugs projets EN**

```bash
grep -E "slug: '(distil-academy|gradly|pedagogical-innovation|portfolio)'" D:/Projets/CV/src/data/en.ts
```

Note : côté EN, `innovation-pedagogique` devient `pedagogical-innovation` (cf. ProjectCard.astro:12). Les autres slugs sont identiques. Ajuster `studioClusters[0].entries[2].projectSlug` à `'pedagogical-innovation'`.

- [ ] **Step 4.2 — Ajouter `studioSites` et `studioClusters` dans `en.ts`**

Mêmes slugs externes, traductions EN :

```ts
studioSites: [
  {
    id: 'cahier-bleu',
    slug: 'cahier-bleu',
    title: 'Le Cahier Bleu',
    url: 'https://www.lecahierbleu.fr/',
    shortDescription: 'Write a eulogy worthy of the memory, in fifteen minutes.',
    technologies: ['Astro', 'AI (Claude / GPT-4o)', 'Stripe', 'AES-256'],
    period: '2026',
    imageAlt: 'Screenshot of Le Cahier Bleu homepage',
    status: 'active',
  },
  {
    id: 'memoire-gardee',
    slug: 'memoire-gardee',
    title: 'Mémoire gardée',
    url: 'https://www.memoiregardee.fr/',
    shortDescription: 'Restore a tribute portrait in thirty seconds, print-ready.',
    technologies: ['Restoration AI', 'Stripe', '300 DPI HD'],
    period: '2026',
    imageAlt: 'Screenshot of Mémoire gardée homepage',
    status: 'active',
  },
  {
    id: 'maison-veillance',
    slug: 'maison-veillance',
    title: 'Maison Veillance',
    url: 'https://www.maisonveillance.fr/',
    shortDescription: 'Fifteen post-mortem cancellation letters, hand-written and hand-checked.',
    technologies: ['Astro', 'Human verification', 'GDPR', 'Stripe'],
    period: '2026',
    imageAlt: 'Screenshot of Maison Veillance homepage',
    status: 'active',
  },
],
studioClusters: [
  {
    id: 'education-pedagogy',
    title: 'Education & pedagogy',
    description: 'Platforms and case studies to reshape the learning experience.',
    entries: [
      { kind: 'project', projectSlug: 'distil-academy' },
      { kind: 'project', projectSlug: 'gradly' },
      { kind: 'project', projectSlug: 'pedagogical-innovation' },
    ],
  },
  {
    id: 'around-grief',
    title: 'Around grief',
    description: 'Three tools built for the hours that follow a loss. One-time payment, no data kept.',
    entries: [
      { kind: 'external', siteSlug: 'cahier-bleu' },
      { kind: 'external', siteSlug: 'memoire-gardee' },
      { kind: 'external', siteSlug: 'maison-veillance' },
    ],
  },
  {
    id: 'labs',
    title: 'Labs',
    description: 'Technical experiments and personal projects.',
    entries: [
      { kind: 'project', projectSlug: 'portfolio' },
    ],
  },
],
```

- [ ] **Step 4.3 — Renommer les clés UI EN**

- `nav.projects: 'Projects'` → `nav.studio: 'Studio'`
- `sections.latestProjects: ...` → `sections.studio: 'Studio'`
- `sections.allProjects: 'All projects'` → `sections.allStudio: 'Full studio'`
- `project.backToProjects: 'Back to projects'` → `project.backToStudio: 'Back to studio'`

Nouveau bloc :

```ts
studio: {
  intro: "A collection of what I'm building — in-depth case studies and live sites, grouped by theme.",
  caseStudyBadge: 'Case study',
  liveSiteBadge: 'Live site',
  clusterCountProjects: '{n} projects',
  clusterCountSites: '{n} sites',
},
```

- [ ] **Step 4.4 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : plus d'erreurs sur `en.ts`. Restent les erreurs des composants (réglées dans les tasks suivantes).

- [ ] **Step 4.5 — Commit**

```bash
git -C D:/Projets/CV add src/data/en.ts
git -C D:/Projets/CV commit -m "Ajouter les données Studio EN (clusters + sites externes)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5 — Utilitaire `resolveStudioEntry` (TDD)

**Files:**
- Create: `src/utils/studio.ts`
- Create: `src/__tests__/studio.test.ts`

- [ ] **Step 5.1 — Écrire les tests d'abord**

Créer `src/__tests__/studio.test.ts` :

```ts
import { describe, it, expect } from 'vitest';
import { resolveStudioEntry } from '../utils/studio';
import type { SiteData, Project, StudioExternalSite } from '../data/types';

function makeData(partial: Partial<SiteData> = {}): SiteData {
  const baseProject: Project = {
    id: 'p1',
    slug: 'p1',
    title: 'Project 1',
    shortDescription: '',
    longDescription: '',
    technologies: [],
    imageAlt: '',
    featured: false,
  };
  const baseExternal: StudioExternalSite = {
    id: 's1',
    slug: 's1',
    title: 'Site 1',
    url: 'https://example.com',
    shortDescription: '',
    technologies: [],
    imageAlt: '',
  };
  return {
    personal: {} as never,
    social: [],
    experiences: [],
    projects: [baseProject],
    studioSites: [baseExternal],
    studioClusters: [],
    skillCategories: [],
    education: [],
    testimonials: [],
    keyMetrics: [],
    processSteps: [],
    services: [],
    speakerTopics: [],
    funFacts: [],
    ui: {} as never,
    ...partial,
  };
}

describe('resolveStudioEntry', () => {
  it('resolves a project ref to the matching project', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'project', projectSlug: 'p1' }, data);
    expect(result).toEqual({ type: 'project', data: data.projects[0] });
  });

  it('resolves an external ref to the matching studio site', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'external', siteSlug: 's1' }, data);
    expect(result).toEqual({ type: 'external', data: data.studioSites[0] });
  });

  it('returns null when the project slug is missing', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'project', projectSlug: 'does-not-exist' }, data);
    expect(result).toBeNull();
  });

  it('returns null when the external slug is missing', () => {
    const data = makeData();
    const result = resolveStudioEntry({ kind: 'external', siteSlug: 'does-not-exist' }, data);
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 5.2 — Lancer les tests (ils échouent car le module n'existe pas)**

```bash
npm --prefix D:/Projets/CV run test -- studio
```

Expected : FAIL avec erreur d'import / module introuvable.

- [ ] **Step 5.3 — Créer l'implémentation minimale**

Créer `src/utils/studio.ts` :

```ts
import type {
  SiteData,
  StudioEntryRef,
  Project,
  StudioExternalSite,
} from '../data/types';

export type ResolvedStudioEntry =
  | { type: 'project'; data: Project }
  | { type: 'external'; data: StudioExternalSite };

export function resolveStudioEntry(
  ref: StudioEntryRef,
  data: SiteData
): ResolvedStudioEntry | null {
  if (ref.kind === 'project') {
    const project = data.projects.find((p) => p.slug === ref.projectSlug);
    return project ? { type: 'project', data: project } : null;
  }
  const site = data.studioSites.find((s) => s.slug === ref.siteSlug);
  return site ? { type: 'external', data: site } : null;
}
```

- [ ] **Step 5.4 — Relancer les tests**

```bash
npm --prefix D:/Projets/CV run test -- studio
```

Expected : 4 tests PASS.

- [ ] **Step 5.5 — Commit**

```bash
git -C D:/Projets/CV add src/utils/studio.ts src/__tests__/studio.test.ts
git -C D:/Projets/CV commit -m "Ajouter l'utilitaire resolveStudioEntry avec tests

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6 — Composant `StudioEntryCard`

**Files:**
- Create: `src/components/StudioEntryCard.astro`

- [ ] **Step 6.1 — Créer le composant**

```astro
---
import type { Lang } from '../i18n/utils';
import type { Project, StudioExternalSite } from '../data/types';
import { getData } from '../i18n/utils';

type Entry =
  | { type: 'project'; data: Project }
  | { type: 'external'; data: StudioExternalSite };

interface Props {
  entry: Entry;
  lang: Lang;
  index: number;
}

const { entry, lang, index } = Astro.props;
const ui = getData(lang).ui;

const isProject = entry.type === 'project';
const slug = entry.data.slug;
const title = entry.data.title;
const shortDescription = entry.data.shortDescription;
const technologies = entry.data.technologies;
const imageAlt = entry.data.imageAlt;
const period = entry.data.period;
const status = entry.data.status;

const imageSlug = isProject && (slug === 'innovation-pedagogique' || slug === 'pedagogical-innovation')
  ? 'innovation'
  : slug;

const href = isProject
  ? (lang === 'fr' ? `/fr/studio/${slug}/` : `/en/studio/${slug}/`)
  : (entry.data as StudioExternalSite).url;

const external = !isProject;
const badgeLabel = isProject ? ui.studio.caseStudyBadge : ui.studio.liveSiteBadge;
const badgeClass = isProject
  ? 'bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300'
  : 'bg-accent-500/10 text-accent-600 dark:text-accent-400';

const statusConfig = {
  active: { label: lang === 'fr' ? 'Actif' : 'Active', class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  paused: { label: lang === 'fr' ? 'En pause' : 'Paused', class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  archived: { label: lang === 'fr' ? 'Archivé' : 'Archived', class: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400' },
};
const statusDisplay = status ? statusConfig[status] : null;
---

<a
  href={href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  data-track={external ? 'studio-external-click' : 'studio-project-click'}
  data-site={slug}
  class="tile tile-interactive glow-hover group block overflow-hidden focus:outline-2 focus:outline-offset-2 focus:outline-accent-500"
  style={`transition-delay: ${index * 80}ms`}
>
  <div class="aspect-[4/3] relative overflow-hidden bg-zinc-100 dark:bg-zinc-800/50">
    <picture>
      <source srcset={`/images/project-${imageSlug}.webp`} type="image/webp" />
      <img
        src={`/images/project-${imageSlug}.png`}
        alt={imageAlt}
        width="800"
        height="600"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </picture>
  </div>

  <div class="p-5">
    <div class="flex items-center gap-3 mb-3 flex-wrap">
      <span class="font-mono text-caption text-accent-500">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span class:list={['font-mono text-caption uppercase tracking-wider px-2 py-0.5 rounded-sm', badgeClass]}>
        {badgeLabel}
      </span>
      {statusDisplay && (
        <span class:list={['font-mono text-caption uppercase tracking-wider px-2 py-0.5 rounded-sm', statusDisplay.class]}>
          {statusDisplay.label}
        </span>
      )}
    </div>
    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent-500 transition-colors duration-200 mb-1">
      {title}
    </h3>
    {period && (
      <p class="font-mono text-caption text-zinc-500 dark:text-zinc-400 mb-3">{period}</p>
    )}
    <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed line-clamp-2">
      {shortDescription}
    </p>

    <div class="flex items-center justify-between">
      <div class="flex flex-wrap gap-2">
        {technologies.slice(0, 3).map((tech) => (
          <span class="font-mono text-caption uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {tech}
          </span>
        ))}
      </div>
      <svg class="w-3.5 h-3.5 text-zinc-300 group-hover:text-accent-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        {external ? (
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7m0-7L10 14M5 5v14h14" />
        ) : (
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        )}
      </svg>
    </div>
  </div>
</a>
```

- [ ] **Step 6.2 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : pas de nouvelle erreur sur ce fichier. Des erreurs peuvent subsister sur les pages liste (elles seront réglées plus bas).

- [ ] **Step 6.3 — Commit**

```bash
git -C D:/Projets/CV add src/components/StudioEntryCard.astro
git -C D:/Projets/CV commit -m "Ajouter le composant StudioEntryCard polymorphe

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7 — Composant `StudioClusterSection`

**Files:**
- Create: `src/components/StudioClusterSection.astro`

- [ ] **Step 7.1 — Créer le composant**

```astro
---
import type { Lang } from '../i18n/utils';
import type { StudioCluster, SiteData } from '../data/types';
import { resolveStudioEntry } from '../utils/studio';
import StudioEntryCard from './StudioEntryCard.astro';

interface Props {
  cluster: StudioCluster;
  data: SiteData;
  lang: Lang;
  indexOffset?: number;
}

const { cluster, data, lang, indexOffset = 0 } = Astro.props;

const resolved = cluster.entries
  .map((ref) => resolveStudioEntry(ref, data))
  .filter((r): r is NonNullable<typeof r> => r !== null);
---

<section id={cluster.id} class="scroll-mt-20 mb-16">
  <header class="mb-6 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-6">
    <span class="font-mono text-caption uppercase tracking-wider text-accent-500">
      {cluster.id.replace(/-/g, ' ')}
    </span>
    <h2 class="font-display text-heading text-zinc-900 dark:text-zinc-50 font-bold">
      {cluster.title}
    </h2>
    <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
      {cluster.description}
    </p>
  </header>

  <div class="scroll-reveal grid gap-[1px] bg-zinc-200 dark:bg-zinc-800 md:grid-cols-2 lg:grid-cols-3">
    {resolved.map((entry, i) => (
      <div class="bg-zinc-50 dark:bg-zinc-950">
        <StudioEntryCard entry={entry} lang={lang} index={indexOffset + i} />
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 7.2 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : pas de nouvelle erreur.

- [ ] **Step 7.3 — Commit**

```bash
git -C D:/Projets/CV add src/components/StudioClusterSection.astro
git -C D:/Projets/CV commit -m "Ajouter le composant StudioClusterSection

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8 — Template `StudioIndexTemplate`

**Files:**
- Create: `src/templates/StudioIndexTemplate.astro`

- [ ] **Step 8.1 — Créer le template**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
import StudioClusterSection from '../components/StudioClusterSection.astro';
import { getData } from '../i18n/utils';

interface Props {
  lang: 'fr' | 'en';
}

const { lang } = Astro.props;
const data = getData(lang);

const studioPath = `/${lang}/studio/`;
const homePath = `/${lang}/`;

// Offset cumulative pour la numérotation continue entre clusters
let offset = 0;
const clustersWithOffset = data.studioClusters.map((c) => {
  const current = offset;
  offset += c.entries.length;
  return { cluster: c, indexOffset: current };
});
---

<BaseLayout
  title={`${data.ui.nav.studio} — ${data.personal.name}`}
  description={data.ui.studio.intro}
  lang={lang}
  breadcrumbs={[
    { name: data.ui.nav.home, url: homePath },
    { name: data.ui.nav.studio, url: studioPath },
  ]}
>
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <SectionHeader title={data.ui.nav.studio} number="01" as="h1" />
      <p class="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12">
        {data.ui.studio.intro}
      </p>

      {clustersWithOffset.map(({ cluster, indexOffset }) => (
        <StudioClusterSection
          cluster={cluster}
          data={data}
          lang={lang}
          indexOffset={indexOffset}
        />
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 8.2 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

- [ ] **Step 8.3 — Commit**

```bash
git -C D:/Projets/CV add src/templates/StudioIndexTemplate.astro
git -C D:/Projets/CV commit -m "Ajouter le template StudioIndexTemplate

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9 — Routes `/studio/`

**Files:**
- Create: `src/pages/fr/studio/index.astro`
- Create: `src/pages/fr/studio/[slug].astro`
- Create: `src/pages/en/studio/index.astro`
- Create: `src/pages/en/studio/[slug].astro`

- [ ] **Step 9.1 — Créer les dossiers**

```bash
mkdir -p D:/Projets/CV/src/pages/fr/studio D:/Projets/CV/src/pages/en/studio
```

- [ ] **Step 9.2 — Page index FR**

Créer `src/pages/fr/studio/index.astro` :

```astro
---
import StudioIndexTemplate from '../../../templates/StudioIndexTemplate.astro';
---

<StudioIndexTemplate lang="fr" />
```

- [ ] **Step 9.3 — Page index EN**

Créer `src/pages/en/studio/index.astro` :

```astro
---
import StudioIndexTemplate from '../../../templates/StudioIndexTemplate.astro';
---

<StudioIndexTemplate lang="en" />
```

- [ ] **Step 9.4 — Inspecter le `[slug].astro` existant côté projets pour copier la structure**

```bash
cat D:/Projets/CV/src/pages/fr/projets/[slug].astro
```

Noter le contenu : `getStaticPaths`, import, props. On va le reproduire en remplaçant le chemin.

- [ ] **Step 9.5 — Créer `src/pages/fr/studio/[slug].astro`**

Même contenu que l'ancien `src/pages/fr/projets/[slug].astro` (getStaticPaths itère sur `data.projects`, passe le projet à `ProjectDetailTemplate`). Copier le fichier :

```bash
cp "D:/Projets/CV/src/pages/fr/projets/[slug].astro" "D:/Projets/CV/src/pages/fr/studio/[slug].astro"
```

Puis ouvrir et vérifier qu'aucun chemin relatif n'est cassé (la profondeur est identique : `src/pages/fr/studio/[slug].astro` → `../../../templates/...` reste valide).

- [ ] **Step 9.6 — Créer `src/pages/en/studio/[slug].astro`**

```bash
cp "D:/Projets/CV/src/pages/en/projects/[slug].astro" "D:/Projets/CV/src/pages/en/studio/[slug].astro"
```

- [ ] **Step 9.7 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

- [ ] **Step 9.8 — Vérifier en dev server**

```bash
npm --prefix D:/Projets/CV run dev
```

Puis visiter dans un navigateur :
- http://localhost:4321/fr/studio/
- http://localhost:4321/en/studio/
- http://localhost:4321/fr/studio/gradly/
- http://localhost:4321/en/studio/gradly/

Expected : les pages hub affichent 3 clusters avec les bonnes entries. Les pages détails affichent le projet comme avant (le breadcrumb sera corrigé plus tard — OK si pour l'instant il dit "Projets"). Arrêter le dev server (Ctrl+C).

- [ ] **Step 9.9 — Commit**

```bash
git -C D:/Projets/CV add src/pages/fr/studio src/pages/en/studio
git -C D:/Projets/CV commit -m "Ajouter les routes /fr/studio/ et /en/studio/ (index + [slug])

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10 — Mettre à jour Navbar

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 10.1 — Remplacer le lien projets dans `navLinks`**

Dans `src/components/Navbar.astro` ligne ~20, remplacer :

```ts
{ href: lang === 'fr' ? `${prefix}/projets/` : `${prefix}/projects/`, label: ui.nav.projects },
```

par :

```ts
{ href: `${prefix}/studio/`, label: ui.nav.studio },
```

- [ ] **Step 10.2 — Vérifier**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : plus d'erreur `ui.nav.projects` dans Navbar.

- [ ] **Step 10.3 — Commit**

```bash
git -C D:/Projets/CV add src/components/Navbar.astro
git -C D:/Projets/CV commit -m "Remplacer le lien Projets par Studio dans la nav

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11 — Mettre à jour `ProjectDetailTemplate`

**Files:**
- Modify: `src/templates/ProjectDetailTemplate.astro`

- [ ] **Step 11.1 — Rediriger breadcrumb et lien retour vers Studio**

Rechercher dans le fichier :

```bash
grep -n "projets\|projects\|backToProjects\|nav.projects" D:/Projets/CV/src/templates/ProjectDetailTemplate.astro
```

Remplacer systématiquement :
- `ui.nav.projects` → `ui.nav.studio`
- `ui.project.backToProjects` → `ui.project.backToStudio`
- Liens `/${lang}/projets/` ou `/${lang}/projects/` → `/${lang}/studio/`
- Breadcrumb label : l'élément qui affichait "Projets / Projects" doit afficher `ui.nav.studio` (= "Studio")

- [ ] **Step 11.2 — Vérifier**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : plus d'erreur sur ce fichier.

- [ ] **Step 11.3 — Vérifier en dev**

```bash
npm --prefix D:/Projets/CV run dev
```

Visiter http://localhost:4321/fr/studio/gradly/ puis http://localhost:4321/en/studio/gradly/. Breadcrumb = `Accueil > Studio > Gradly` (FR) / `Home > Studio > Gradly` (EN). Lien retour en bas = "Retour au studio" / "Back to studio". Ctrl+C pour stopper.

- [ ] **Step 11.4 — Commit**

```bash
git -C D:/Projets/CV add src/templates/ProjectDetailTemplate.astro
git -C D:/Projets/CV commit -m "Rediriger breadcrumb et lien retour de ProjectDetail vers Studio

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 12 — Composant `StudioClusterPreviewCard` pour la homepage

**Files:**
- Create: `src/components/StudioClusterPreviewCard.astro`

- [ ] **Step 12.1 — Créer le composant**

```astro
---
import type { Lang } from '../i18n/utils';
import type { StudioCluster, SiteData } from '../data/types';
import { resolveStudioEntry } from '../utils/studio';
import { getData } from '../i18n/utils';

interface Props {
  cluster: StudioCluster;
  data: SiteData;
  lang: Lang;
  size?: 'lg' | 'sm';
}

const { cluster, data, lang, size = 'sm' } = Astro.props;
const ui = getData(lang).ui;

const resolved = cluster.entries
  .map((r) => resolveStudioEntry(r, data))
  .filter((r): r is NonNullable<typeof r> => r !== null);

const projectCount = resolved.filter((r) => r.type === 'project').length;
const siteCount = resolved.filter((r) => r.type === 'external').length;

const countParts: string[] = [];
if (projectCount > 0) {
  countParts.push(ui.studio.clusterCountProjects.replace('{n}', String(projectCount)));
}
if (siteCount > 0) {
  countParts.push(ui.studio.clusterCountSites.replace('{n}', String(siteCount)));
}
const countLabel = countParts.join(' · ');

const href = `/${lang}/studio/#${cluster.id}`;

// Mini thumbnails : jusqu'à 3 screenshots empilés
const thumbs = resolved.slice(0, 3).map((r) => {
  const slug = r.data.slug;
  const imageSlug = (slug === 'innovation-pedagogique' || slug === 'pedagogical-innovation')
    ? 'innovation'
    : slug;
  return { alt: r.data.imageAlt, imageSlug };
});

const tileClass = size === 'lg'
  ? 'p-8 md:p-10 min-h-[320px]'
  : 'p-6 min-h-[260px]';
---

<a href={href} class:list={['tile tile-interactive glow-hover group flex flex-col justify-between', tileClass]}>
  <div>
    <div class="flex items-center justify-between mb-6">
      <span class="mono-label">{ui.nav.studio}</span>
      <span class="font-mono text-caption text-accent-500">{cluster.id.toUpperCase().replace(/-/g, ' ')}</span>
    </div>
    <h2 class="font-display font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-accent-500 transition-colors duration-200 mb-3" class:list={[size === 'lg' ? 'text-heading' : 'text-xl']}>
      {cluster.title}
    </h2>
    <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mb-4">
      {cluster.description}
    </p>
  </div>

  <div class="flex items-center justify-between mt-6">
    <div class="flex -space-x-3">
      {thumbs.map((t) => (
        <picture class="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-50 dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800">
          <source srcset={`/images/project-${t.imageSlug}.webp`} type="image/webp" />
          <img src={`/images/project-${t.imageSlug}.png`} alt={t.alt} class="w-full h-full object-cover" loading="lazy" />
        </picture>
      ))}
    </div>
    <div class="flex items-center gap-2">
      <span class="font-mono text-caption uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{countLabel}</span>
      <svg class="w-4 h-4 text-zinc-500 group-hover:text-accent-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </div>
  </div>
</a>
```

- [ ] **Step 12.2 — Vérifier**

```bash
npm --prefix D:/Projets/CV run check
```

- [ ] **Step 12.3 — Commit**

```bash
git -C D:/Projets/CV add src/components/StudioClusterPreviewCard.astro
git -C D:/Projets/CV commit -m "Ajouter StudioClusterPreviewCard pour la homepage

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 13 — Refonte `HomeTemplate` (sections projets → clusters)

**Files:**
- Modify: `src/templates/HomeTemplate.astro`

- [ ] **Step 13.1 — Lire HomeTemplate pour repérer les ancres**

```bash
grep -n "featured\|projectPath\|allProjects\|latestProjects\|nav.projects" D:/Projets/CV/src/templates/HomeTemplate.astro
```

- [ ] **Step 13.2 — Remplacer les imports et calculs**

Remplacer le bloc frontmatter. Retirer :
- `const featured = data.projects.filter((p) => p.featured);`
- `const projectsPath = getLocalizedPath('/fr/projets/', lang);`
- la fonction `projectPath`

Ajouter :
- `import StudioClusterPreviewCard from '../components/StudioClusterPreviewCard.astro';`
- `const clusters = data.studioClusters;`
- `const studioPath = \`/${lang}/studio/\`;`

- [ ] **Step 13.3 — Remplacer la Row 1 (grand tile featured project + status)**

Dans le template HTML, localiser la Row 1 :

```astro
<!-- Row 1: Featured project (large) + Status tile (small) -->
<div class="grid md:grid-cols-[2fr_1fr] gap-[1px] bg-zinc-200 dark:bg-zinc-800 mb-[1px]">
  <a href={projectPath(featured[0].slug)} class="tile ...">...</a>
  <!-- Status tile reste tel quel -->
</div>
```

Remplacer le `<a href={projectPath(featured[0].slug)} ...>...</a>` par :

```astro
<StudioClusterPreviewCard cluster={clusters[0]} data={data} lang={lang} size="lg" />
```

Le status tile reste tel quel (bloc avec `data.ui.status.label`, ses social links, etc.).

- [ ] **Step 13.4 — Remplacer la Row 2 (2 project tiles + experience tile)**

Localiser :

```astro
<!-- Row 2: Two project tiles + experience tile (tall) -->
<div class="grid md:grid-cols-3 gap-[1px] bg-zinc-200 dark:bg-zinc-800 mb-[1px]">
  {featured.slice(1, 3).map((project, i) => (
    <a href={projectPath(project.slug)} ...>...</a>
  ))}
  <!-- Experience tile reste -->
</div>
```

Remplacer la map `featured.slice(1, 3)` par :

```astro
{clusters.slice(1, 3).map((cluster) => (
  <StudioClusterPreviewCard cluster={cluster} data={data} lang={lang} size="sm" />
))}
```

Note : si `clusters.length === 1` au lancement, `clusters.slice(1, 3)` sera vide et la grid aura juste l'experience tile. Pour que la Row 2 reste équilibrée même avec seulement 3 clusters définis, vérifier que clusters couvre bien les 3 au lancement (c'est le cas).

- [ ] **Step 13.5 — Mettre à jour le lien "Voir tout"**

Localiser :

```astro
<!-- View all projects link -->
<a href={projectsPath} ...>{data.ui.sections.allProjects}...</a>
```

Remplacer par :

```astro
<a href={studioPath} class="group mono-label hover:text-accent-500 transition-colors duration-200 flex items-center gap-2">
  {data.ui.sections.allStudio}
  <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</a>
```

- [ ] **Step 13.6 — Remplacer `data.ui.sections.latestProjects`**

Rechercher toute occurrence restante :

```bash
grep -n "sections.latestProjects" D:/Projets/CV/src/templates/HomeTemplate.astro
```

Remplacer chaque occurrence par `data.ui.sections.studio`. Si une occurrence sert le label "01" de la row 1 et qu'elle est déjà portée par le `StudioClusterPreviewCard` interne, la retirer du parent.

- [ ] **Step 13.7 — Vérifier la compilation**

```bash
npm --prefix D:/Projets/CV run check
```

Expected : plus d'erreur sur HomeTemplate.

- [ ] **Step 13.8 — Vérifier en dev**

```bash
npm --prefix D:/Projets/CV run dev
```

Visiter :
- http://localhost:4321/fr/
- http://localhost:4321/en/

Sur la home, le dashboard grid doit afficher les 3 cluster tiles (1 grand "Éducation & pédagogie", 2 petits "Autour du deuil" + "Labs") à la place des projets featured. Lien "Full studio / Tout le studio" en bas. Cliquer sur un cluster tile → arrive sur `/studio/#cluster-id` avec le bon scroll. Ctrl+C.

- [ ] **Step 13.9 — Commit**

```bash
git -C D:/Projets/CV add src/templates/HomeTemplate.astro
git -C D:/Projets/CV commit -m "Remplacer les featured projects par des cluster previews sur la home

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 14 — Mettre à jour `i18n/utils.ts`

**Files:**
- Modify: `src/i18n/utils.ts`

- [ ] **Step 14.1 — Retirer `projets: 'projects'` de `pageSlugMap`**

Ligne ~19, retirer cette paire. `studio` n'a pas besoin d'être ajouté (identité).

```ts
const pageSlugMap: Record<string, string> = {
  competences: 'skills',
  experiences: 'experiences',
  contact: 'contact',
  'mentions-legales': 'legal',
  speaker: 'speaker',
  consulting: 'consulting',
  recrutement: 'hiring',
  bonjour: 'hello',
  blog: 'blog',
  faq: 'faq',
  ebook: 'ebook',
};
```

- [ ] **Step 14.2 — Mettre à jour les tests i18n**

Vérifier `src/__tests__/i18n.test.ts` : si des tests utilisent `/fr/projets/` pour valider `getLocalizedPath`, les remplacer par `/fr/studio/` ou les retirer.

```bash
grep -n "projets\|projects" D:/Projets/CV/src/__tests__/i18n.test.ts
```

Pour chaque occurrence, adapter le test :
- `getLangFromUrl(new URL('https://pierretouzet.fr/fr/projets/'))` → remplacer `/fr/projets/` par `/fr/studio/`
- Tests de `getLocalizedPath('/fr/projets/', 'en')` → remplacer par `getLocalizedPath('/fr/studio/', 'en')` avec `expect` à `/en/studio/`

- [ ] **Step 14.3 — Lancer tous les tests**

```bash
npm --prefix D:/Projets/CV run test
```

Expected : tous les tests passent.

- [ ] **Step 14.4 — Commit**

```bash
git -C D:/Projets/CV add src/i18n/utils.ts src/__tests__/i18n.test.ts
git -C D:/Projets/CV commit -m "Retirer projets/projects du slug map i18n et adapter les tests

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 15 — Supprimer les anciennes routes `/projets/` et `/projects/`

**Files:**
- Delete: `src/pages/fr/projets/index.astro`
- Delete: `src/pages/fr/projets/[slug].astro`
- Delete: `src/pages/en/projects/index.astro`
- Delete: `src/pages/en/projects/[slug].astro`
- Delete: `src/templates/ProjectsIndexTemplate.astro`
- Delete: `src/components/ProjectCard.astro` (plus utilisé)

- [ ] **Step 15.1 — Confirmer que rien ne référence `ProjectCard` ou `ProjectsIndexTemplate`**

```bash
grep -rn "ProjectCard\|ProjectsIndexTemplate" D:/Projets/CV/src
```

Expected : aucune référence dans `src/` (sauf le fichier lui-même et éventuellement des imports internes qu'on supprime). Si références trouvées, ne PAS supprimer et investiguer.

- [ ] **Step 15.2 — Supprimer les fichiers**

```bash
rm D:/Projets/CV/src/pages/fr/projets/index.astro
rm "D:/Projets/CV/src/pages/fr/projets/[slug].astro"
rmdir D:/Projets/CV/src/pages/fr/projets
rm D:/Projets/CV/src/pages/en/projects/index.astro
rm "D:/Projets/CV/src/pages/en/projects/[slug].astro"
rmdir D:/Projets/CV/src/pages/en/projects
rm D:/Projets/CV/src/templates/ProjectsIndexTemplate.astro
rm D:/Projets/CV/src/components/ProjectCard.astro
```

- [ ] **Step 15.3 — Vérifier compilation et build**

```bash
npm --prefix D:/Projets/CV run check && npm --prefix D:/Projets/CV run build
```

Expected : build OK. Les URLs `/fr/projets/` et `/en/projects/` ne sont plus générées.

- [ ] **Step 15.4 — Commit**

```bash
git -C D:/Projets/CV add -A src/pages/fr/projets src/pages/en/projects src/templates/ProjectsIndexTemplate.astro src/components/ProjectCard.astro
git -C D:/Projets/CV commit -m "Supprimer les anciennes routes /projets/ /projects/ et templates associés

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 16 — Ajouter les redirects 301 dans `vercel.json`

**Files:**
- Modify: `vercel.json`

- [ ] **Step 16.1 — Lire le vercel.json actuel**

```bash
cat D:/Projets/CV/vercel.json
```

Repérer si une clé `redirects` existe déjà.

- [ ] **Step 16.2 — Ajouter les 4 redirects au tableau `redirects` existant**

Le fichier `vercel.json` contient déjà une entrée `redirects` avec la redirection `/` → `/fr/`. Ajouter les 4 nouvelles entrées après celle-ci (toutes en `permanent: true` pour un vrai 308/301) :

```json
"redirects": [
  {
    "source": "/",
    "destination": "/fr/",
    "permanent": false
  },
  { "source": "/fr/projets", "destination": "/fr/studio", "permanent": true },
  { "source": "/fr/projets/:slug", "destination": "/fr/studio/:slug", "permanent": true },
  { "source": "/en/projects", "destination": "/en/studio", "permanent": true },
  { "source": "/en/projects/:slug", "destination": "/en/studio/:slug", "permanent": true }
],
```

Laisser le bloc `headers` intact.

- [ ] **Step 16.3 — Valider le JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('D:/Projets/CV/vercel.json', 'utf-8'))"
```

Expected : aucun output (= JSON valide). Si erreur : corriger.

- [ ] **Step 16.4 — Commit**

```bash
git -C D:/Projets/CV add vercel.json
git -C D:/Projets/CV commit -m "Ajouter les redirects 301 /projets/ -> /studio/

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 17 — Vérification finale (build + smoke test navigateur)

**Files:** aucun

- [ ] **Step 17.1 — Validation complète**

```bash
npm --prefix D:/Projets/CV run validate
```

Expected : `check` + `lint` + `format:check` passent tous. Si `lint` échoue, lancer `npm run lint:fix` puis recommit si des fichiers ont changé.

- [ ] **Step 17.2 — Tests unitaires complets**

```bash
npm --prefix D:/Projets/CV run test
```

Expected : tous les tests passent (i18n + studio).

- [ ] **Step 17.3 — Build production**

```bash
npm --prefix D:/Projets/CV run build
```

Expected : build OK, pas d'erreur. Inspecter la sortie : `/fr/studio/` et `/en/studio/` sont listés, `/fr/studio/distil-academy/`, `/fr/studio/gradly/`, `/fr/studio/innovation-pedagogique/`, `/fr/studio/portfolio/` aussi (et équivalents EN avec `pedagogical-innovation`). `/fr/projets/` et `/en/projects/` NE sont PAS listés.

- [ ] **Step 17.4 — Preview local**

```bash
npm --prefix D:/Projets/CV run preview
```

Visiter et vérifier visuellement :

1. **http://localhost:4321/fr/** — Home affiche 3 cluster tiles (Éducation & pédagogie grand / Autour du deuil petit / Labs petit), lien "Tout le studio" en bas
2. **http://localhost:4321/en/** — idem en EN
3. **http://localhost:4321/fr/studio/** — Hub avec 3 clusters, 7 tiles total (3+3+1)
4. **http://localhost:4321/en/studio/** — idem EN
5. Cliquer sur la tile "Le Cahier Bleu" → ouvre `https://www.lecahierbleu.fr/` en nouvel onglet
6. Cliquer sur la tile "Gradly" → navigue vers `/fr/studio/gradly/` avec breadcrumb `Accueil > Studio > Gradly`
7. Sur `/fr/studio/gradly/`, cliquer "Retour au studio" → retour sur `/fr/studio/`
8. Nav : cliquer "Studio" → `/fr/studio/` (active state OK)
9. Dark mode ON/OFF : pas de régression sur les tiles Studio
10. Mobile (resize à 375px) : clusters passent en 1 colonne, nav mobile montre "Studio"

- [ ] **Step 17.5 — Smoke test des anciennes URLs (post-déploiement seulement)**

Note : les redirects `vercel.json` ne fonctionnent qu'en environnement Vercel (pas en `astro preview`). Après déploiement Vercel preview, tester :
- `https://[preview-url]/fr/projets/` → redirect 301 vers `/fr/studio/`
- `https://[preview-url]/fr/projets/gradly/` → redirect 301 vers `/fr/studio/gradly/`
- `https://[preview-url]/en/projects/` → `/en/studio/`
- `https://[preview-url]/en/projects/gradly/` → `/en/studio/gradly/`

Via navigateur devtools Network tab : vérifier code HTTP 308 (équivalent permanent) ou 301.

- [ ] **Step 17.6 — Vérifier sitemap**

Après build, inspecter `dist/sitemap-0.xml` ou l'URL `/sitemap.xml` post-build :

```bash
grep -E "(projets|projects|studio)" D:/Projets/CV/dist/sitemap-index.xml D:/Projets/CV/dist/sitemap-*.xml 2>/dev/null
```

Expected : uniquement des URLs contenant `/studio/`. Zéro URL `/projets/` ou `/projects/`.

- [ ] **Step 17.7 — Ménage & commit final (si applicable)**

Si des fixes lint/format mineurs sont apparus au step 17.1 :

```bash
git -C D:/Projets/CV status
# si changements :
git -C D:/Projets/CV add -A
git -C D:/Projets/CV commit -m "Fixes lint/format post-refonte Studio

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 17.8 — Push vers main (après validation utilisateur)**

**NE PAS PUSHER sans demander à l'utilisateur.** Montrer le résumé des commits et demander :

```bash
git -C D:/Projets/CV log --oneline main -20
```

Puis attendre validation avant :

```bash
git -C D:/Projets/CV push origin main
```

---

## Notes d'exécution

- **Ordre des tasks** : strict. Chaque task assume les précédentes.
- **Après chaque commit** : vérifier que l'état reste fonctionnel (même si le build peut échouer temporairement entre tasks 2-4 tant que les données ne sont pas synchronisées avec les types).
- **Rollback** : si une task échoue de manière bloquante, `git reset --hard HEAD~1` ramène au commit précédent. Ne PAS le faire sans l'accord utilisateur.
- **Astro cache** : si `astro check` râle alors que le code semble correct, tenter `rm -rf D:/Projets/CV/.astro && rm -rf D:/Projets/CV/dist` puis relancer.
- **Images manquantes** : si un tile affiche un placeholder cassé en dev, c'est qu'il manque le PNG/WebP dans `public/images/`. Re-exécuter Task 1.
- **Hreflang** : les URLs Studio étant identiques FR/EN, la paire hreflang se construit automatiquement via `getLocalizedPath` (pas de mapping à ajouter puisque `studio` → `studio` est l'identité par défaut).
