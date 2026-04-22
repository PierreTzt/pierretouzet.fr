<div align="center">

# pierretouzet.fr

**Portfolio bilingue de Pierre Touzet**
Ingénierie pédagogique & innovation digitale.

[Live · pierretouzet.fr](https://www.pierretouzet.fr) &nbsp;·&nbsp;
[Guide développeur](./DEVELOPER_GUIDE.md) &nbsp;·&nbsp;
[Blog](https://www.pierretouzet.fr/fr/blog/)

[![Astro](https://img.shields.io/badge/Astro-5.17-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-All_rights_reserved-lightgrey)](#license)

</div>

---

## Table of contents

1. [Présentation](#présentation)
2. [Stack](#stack)
3. [Démarrage rapide](#démarrage-rapide)
4. [Structure du projet](#structure-du-projet)
5. [Fonctionnalités clés](#fonctionnalités-clés)
6. [Espace d'administration](#espace-dadministration)
7. [Variables d'environnement](#variables-denvironnement)
8. [Scripts npm](#scripts-npm)
9. [Déploiement](#déploiement)
10. [Architecture & décisions](#architecture--décisions)
11. [Contribuer](#contribuer)
12. [Licence](#licence)

---

## Présentation

Portfolio professionnel bilingue français / anglais construit avec **Astro 5** en mode SSG/SSR hybride. Il présente le parcours, les projets, les expériences et le blog de Pierre Touzet — responsable national des programmes pédagogiques, créateur de [Gradly](https://www.gradly.fr) et de [Distil Academy](https://www.distil.academy).

Le projet sert aussi de terrain d'expérimentation pour les patterns Astro modernes : content collections, génération d'images OG à la volée, SSR sur Vercel Fluid Compute, intégration Claude pour la génération de contenu éditorial.

> [!NOTE]
> Si tu découvres le projet, commence par [**DEVELOPER_GUIDE.md**](./DEVELOPER_GUIDE.md) — un guide en 20 sections écrit pour quelqu'un qui débute en développement web.

---

## Stack

| Couche              | Choix                                                 | Pourquoi                                      |
| ------------------- | ----------------------------------------------------- | --------------------------------------------- |
| Framework           | [Astro 5](https://astro.build)                        | SSG + SSR hybride, zéro JS par défaut        |
| Runtime SSR         | [Vercel Fluid Compute](https://vercel.com/fluid)      | Node.js, cold starts réduits                  |
| Styles              | [Tailwind CSS 4](https://tailwindcss.com)             | CSS-first via `@tailwindcss/vite`             |
| Langage             | TypeScript 5.5                                        | Typage strict, tsconfig partagé               |
| Fonts               | Inter + Sora via `@fontsource` (subsets latin)        | Auto-hosting, pas de requête Google           |
| Content             | Content Collections (Markdown + Zod)                  | Validation stricte du frontmatter             |
| Image OG            | [Satori](https://github.com/vercel/satori) + Sharp    | Génération dynamique 1200×630 par article     |
| Analytics           | Vercel Analytics + Speed Insights (cookie-free)       | Conforme CNIL sans bandeau                    |
| CMS éditorial       | Admin maison + Anthropic Claude + GitHub API          | Génération assistée, publication par commit   |
| Tests               | Vitest                                                | Rapide, compatible TypeScript                 |
| Hébergement         | [Vercel](https://vercel.com)                          | Déploiement automatique sur push `main`       |

---

## Démarrage rapide

Prérequis : **Node.js 20+** et **npm**.

```bash
# Cloner
git clone https://github.com/PierreTzt/portfolio.git
cd portfolio

# Installer
npm install

# Serveur de développement — http://localhost:4321
npm run dev
```

Pour tester le build local :

```bash
npm run build        # produit ./dist
npm run preview      # sert dist/ en local
```

> [!TIP]
> Les pages publiques tournent sans variable d'environnement. Seul l'espace admin (`/admin/*`) et les routes `/api/*` protégées en ont besoin — voir [Variables d'environnement](#variables-denvironnement).

---

## Structure du projet

```
.
├── public/                         Fichiers servis tels quels (PDF, favicon, robots.txt)
├── src/
│   ├── assets/images/              Images optimisées par Astro Image
│   ├── components/                 Blocs UI réutilisables (Navbar, Footer, ThemeToggle…)
│   ├── content/blog/               Articles Markdown (schéma Zod)
│   ├── data/                       fr.ts + en.ts + types.ts (source unique des textes)
│   ├── i18n/utils.ts               Helpers getData / getLocalizedPath / hreflang
│   ├── layouts/BaseLayout.astro    Enveloppe HTML + SEO + Schema.org
│   ├── pages/
│   │   ├── admin/                  CMS protégé (blog, LinkedIn Studio)
│   │   ├── api/                    Endpoints SSR (login, publish, generate-*)
│   │   ├── en/ · fr/               Pages publiques bilingues
│   │   └── og/[...slug].png.ts     Génération dynamique d'images OG
│   ├── styles/global.css           Tailwind v4 CSS-first (@theme, @utility…)
│   ├── templates/                  Pages-modèles partagées FR/EN
│   ├── utils/                      auth · og-image · linkedin-visual · studio · persona
│   ├── middleware.ts               Rate limit + protection /admin
│   └── content.config.ts           Schéma Zod des articles
├── docs/audits/                    Archives d'analyses / audits
├── astro.config.mjs                Config Astro (adapter Vercel, sitemap, i18n)
├── vercel.json                     Headers HTTP (CSP, HSTS, permissions)
└── DEVELOPER_GUIDE.md              Guide complet pour novices
```

Pour une explication détaillée de chaque zone, voir [DEVELOPER_GUIDE.md §5](./DEVELOPER_GUIDE.md#5-arborescence-du-projet).

---

## Fonctionnalités clés

### Performance

- **Astro Image** avec WebP + srcset + lazy loading
- **Speculation Rules API** pour pré-rendre les pages au survol
- **Fonts self-hosted** en subsets latin/latin-ext uniquement
- **Service Worker** : cache-first sur les assets, network-first sur le HTML
- **View Transitions API** pour les animations inter-pages

### SEO

- **Schema.org** : `ProfilePage` + `Person` sur la home, `BlogPosting` par article, `BreadcrumbList` sur les sous-pages
- **Sitemap** généré automatiquement avec `lastmod`, `changefreq`, `priority`, hreflang
- **Meta complètes** : `og:*`, Twitter card, canonical, hreflang FR/EN, RSS auto-discovery
- **OG image dynamique** par article (Satori + Sharp, cache immutable 1 an)

### Accessibilité

- Skip link `#main-content` pour navigation clavier
- Hiérarchie de titres (`h1` unique par page via prop `as` sur `SectionHeader`)
- Respect de `prefers-reduced-motion` (animations désactivées globalement)
- `aria-label` + `aria-hidden` cohérents, focus visible custom
- Cible WCAG 2.2 AA

### Sécurité & conformité

- **HSTS preload**, CSP stricte, `X-Frame-Options: DENY`, `Permissions-Policy` restrictive (`vercel.json`)
- **Auth admin** : HMAC-SHA256, cookie `HttpOnly + Secure + SameSite=strict`, rate limit 5/min sur `/api/login`
- **SSRF hardening** sur `/api/fetch-rss` : résolution DNS préalable, blocage RFC1918 / CGNAT / IPv4-mapped IPv6, redirections manuelles, timeout 5 s, taille capée à 2 Mo
- **RGPD** : [politique de confidentialité](https://www.pierretouzet.fr/fr/politique-confidentialite/) dédiée, respect de `navigator.doNotTrack`, aucun cookie marketing, analytics exemptées de consentement (CNIL)
- **Injection prevention** : slugify strict, frontmatter échappé, ZOD sur le content, `JSON.stringify` pour tous les JSON-LD

### i18n

- Routes préfixées `/fr/…` et `/en/…`, FR par défaut
- Slugs traduits (`competences`↔`skills`, `projets`↔`projects`, `mentions-legales`↔`legal`…)
- Détection automatique côté client via `navigator.language` sur `/`
- Un fichier de données par langue, structure stricte via TypeScript

### Expérience éditoriale

Voir la section suivante.

---

## Espace d'administration

L'admin vit sous `/admin/*` et contient deux studios :

**Blog** (`/admin/blog`)
- Génération d'un brouillon à partir d'une idée (Claude + persona `Pierre Touzet`)
- Édition live du Markdown avec preview
- Publication en un clic → commit direct dans `src/content/blog/` via GitHub API → déploiement Vercel auto

**LinkedIn Studio** (`/admin/linkedin`)
- Génération de posts (5 formats : analyse, opinion, fait, veille, newsletter)
- Fetch de flux RSS pour la veille (SSRF-safe)
- Rendu d'images : carré, bannière 1584×396, carousels multi-slides
- Twemoji intégré via Satori

> [!IMPORTANT]
> L'admin est protégé par un mot de passe unique (`ADMIN_PASSWORD`). Pour l'activer en local, créer un `.env` (voir ci-dessous).

---

## Variables d'environnement

Copier `.env.example` vers `.env` et renseigner :

| Variable            | Rôle                                                       | Obligatoire         |
| ------------------- | ---------------------------------------------------------- | ------------------- |
| `ADMIN_PASSWORD`    | Mot de passe de l'espace admin (sert aussi de secret HMAC) | Pour `/admin/*`     |
| `ANTHROPIC_API_KEY` | Clé API Claude pour la génération de contenu              | Pour génération IA  |
| `GITHUB_TOKEN`      | PAT avec accès `repo` pour publier un article             | Pour `/api/publish` |
| `GITHUB_REPO`       | Repo cible au format `owner/name`                          | Pour `/api/publish` |
| `SENTRY_DSN`        | DSN Sentry (optionnel, décommenter dans `astro.config.mjs`) | Non                 |

En production, ces variables sont configurées dans le dashboard Vercel — jamais committées.

---

## Scripts npm

| Commande                 | Rôle                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| `npm run dev`            | Serveur de développement avec HMR                                 |
| `npm run build`          | Build production vers `./dist`                                    |
| `npm run preview`        | Sert le build local sans recalcul                                 |
| `npm run check`          | Validation TypeScript via `astro check`                           |
| `npm run lint`           | ESLint avec les règles TypeScript strict                          |
| `npm run lint:fix`       | Auto-fix ESLint                                                   |
| `npm run format`         | Prettier auto-format                                              |
| `npm run format:check`   | Vérifie le formatage sans modifier                                |
| `npm run test`           | Tests unitaires Vitest                                            |
| `npm run validate`       | Enchaîne `check` + `lint` + `format:check`                        |
| `npm run check:parity`   | Vérifie la parité des clés entre `fr.ts` et `en.ts`               |

> [!TIP]
> `npm run validate` est le filet de sécurité à lancer avant un commit ou un PR.

---

## Déploiement

Le site est déployé sur **Vercel** avec l'adapter `@astrojs/vercel` et utilise **Fluid Compute** pour les routes SSR (Node.js classique, cold start réduit).

- Push sur `main` → déploiement **production** sur `pierretouzet.fr`
- Push sur une autre branche ou PR → déploiement **preview** avec URL unique
- Les polices sont bundlées dans les fonctions via `includeFiles` (voir `astro.config.mjs`)

Pour un déploiement manuel :

```bash
npx vercel deploy           # preview
npx vercel deploy --prod    # production
```

---

## Architecture & décisions

Quelques choix non évidents documentés pour référence :

- **Tailwind v4 CSS-first** : toute la config (thème, plugins, utilities custom) vit dans `src/styles/global.css`, plus de `tailwind.config.mjs`. Référence : [Tailwind v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4).
- **Un template partagé par page bilingue** : au lieu de dupliquer la logique en FR et EN, `src/templates/*` contient la vraie structure et `src/pages/{fr,en}/*.astro` ne fait que l'importer avec `lang="fr|en"`.
- **JSON-LD via `set:html={JSON.stringify(...)}`** : plus sûr qu'un littéral HTML, échappement automatique des quotes et caractères spéciaux.
- **HMAC session token** : timestamp signé en temps constant, pas de stockage serveur — parfait pour un utilisateur unique.
- **Pas de CSRF token** : `SameSite=strict` + `Content-Type: application/json` sur les endpoints admin suffisent, pas besoin d'ajouter une couche.
- **Pas de Dependabot** : les PR de version-update bundled créent plus de bruit que de valeur à cette échelle. Les alertes de sécurité GitHub-native (gestion au niveau repo) restent actives.

Pour le raisonnement complet et les trade-offs, lire le [guide développeur](./DEVELOPER_GUIDE.md).

---

## Contribuer

C'est un projet personnel. Les issues et PRs externes ne sont pas acceptées activement, mais les remarques constructives sont bienvenues via [l'espace contact](https://www.pierretouzet.fr/fr/contact/).

Si tu t'inspires du code pour ton propre portfolio, un lien en retour fait toujours plaisir — mais ce n'est pas une obligation.

---

## Licence

Projet personnel — le **code** est disponible pour inspiration sous licence informelle (forker, lire, apprendre).

Les **contenus** (textes, photos, images de projets, articles de blog) appartiennent à Pierre Touzet et ne sont pas réutilisables sans autorisation.

Voir les [mentions légales](https://www.pierretouzet.fr/fr/mentions-legales/) et la [politique de confidentialité](https://www.pierretouzet.fr/fr/politique-confidentialite/) pour le détail juridique.

---

<div align="center">

Fait main avec [Astro](https://astro.build), [Tailwind](https://tailwindcss.com) et pas mal de café.

</div>
