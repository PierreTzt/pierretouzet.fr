# pierretouzet.fr

Portfolio bilingue (FR/EN) de Pierre Touzet -- Ingenierie pedagogique & Innovation digitale.

**Live** : [pierretouzet.fr](https://www.pierretouzet.fr)

## Stack

| Couche | Technologie |
|---|---|
| Framework | [Astro 5](https://astro.build) (SSG) |
| Styles | [Tailwind CSS 3](https://tailwindcss.com) (`darkMode: 'class'`) |
| Fonts | Inter (body) + Sora (display) via `@fontsource`, latin/latin-ext only |
| Analytics | [Vercel Analytics](https://vercel.com/docs/analytics) (cookie-free) |
| Deploiement | [Vercel](https://vercel.com) |

## Structure du projet

```
src/
  components/       # Composants Astro reutilisables
    Hero.astro          # Section hero avec photo + CTA
    Navbar.astro        # Navigation responsive + menu mobile
    Footer.astro        # Pied de page avec liens sociaux
    ExperienceCard.astro # Carte experience avec timeline
    ProjectCard.astro    # Carte projet (grille)
    SectionHeader.astro  # Titre de section anime (h1/h2)
    SkillBar.astro       # Badge competence avec niveau
    Testimonials.astro   # Grille de temoignages LinkedIn
    ContactSection.astro # Liste de liens de contact
    ThemeToggle.astro    # Bouton dark/light mode
    LanguageSwitcher.astro # Switch FR/EN
    ScrollToTop.astro    # Bouton retour en haut
  data/
    types.ts            # Types TypeScript (Experience, Project, Skill...)
    fr.ts               # Donnees et traductions FR
    en.ts               # Donnees et traductions EN
  i18n/
    utils.ts            # Helpers i18n (getData, getLocalizedPath, hreflang)
  layouts/
    BaseLayout.astro    # Layout principal (head, meta, scripts, Schema.org)
  pages/
    index.astro         # Redirect auto selon navigator.language
    404.astro           # Page 404 avec effet glitch
    fr/                 # Pages FR (index, experiences, projets, competences, contact, mentions-legales)
    en/                 # Pages EN (index, experiences, projects, skills, contact, legal)
  styles/
    global.css          # Styles globaux, animations, print, reduced-motion
  assets/
    images/             # Images projets pour Astro Image
public/
  images/              # Photos hero, OG image
  sw.js                # Service Worker (cache-first assets, network-first HTML)
  manifest.json        # PWA manifest
  robots.txt           # Directives crawl
  favicon.svg          # Favicon
```

## Commandes

```bash
npm install          # Installer les dependances
npm run dev          # Serveur local (localhost:4321)
npm run build        # Build production dans ./dist/
npm run preview      # Preview du build localement
```

## Fonctionnalites

### Performance
- **Astro Image** : Images de projet optimisees (WebP, srcset, lazy loading)
- **Fonts subset** : Imports latin/latin-ext uniquement (pas de cyrillic/greek)
- **Speculation Rules API** : Pre-rendu des pages au survol pour navigation instantanee
- **Service Worker** : Cache-first pour assets statiques, network-first pour HTML
- **View Transitions** : Animations de transition entre pages (fade + slide)

### SEO
- **Schema.org** : `ProfilePage` + `Person` sur toutes les pages, `BreadcrumbList` sur les sous-pages
- **Sitemap** : Genere automatiquement avec `lastmod`, `changefreq`, `priority` et hreflang
- **Meta tags** : `og:site_name`, `og:locale:alternate`, `author`, `canonical`, `hreflang`
- **robots.txt** : Allow / avec Disallow pour `/api/` et `/_astro/`

### Accessibilite
- **Heading hierarchy** : h1 sur toutes les pages via prop `as` sur SectionHeader
- **prefers-reduced-motion** : Desactivation globale de toutes les animations et transitions
- **ARIA** : `aria-label` sur tous les liens/boutons interactifs, `aria-hidden` sur les SVG decoratifs
- **Focus** : `focus-visible` avec outline accent sur tous les elements interactifs
- **Skip link** : Lien "Aller au contenu" pour navigation clavier
- **Contraste** : Verifie WCAG AA sur tous les textes

### UX / Design
- **Dark mode** : Toggle avec cross-fade anime (sun/moon SVGs)
- **Scroll reveal** : Animations d'apparition au scroll avec IntersectionObserver
- **Timeline** : Page experiences avec timeline verticale (points + ligne)
- **Bento grid** : Dashboard en grille modulaire sur la page d'accueil
- **Glow hover** : Effet lumineux qui suit la souris sur les cartes projet
- **Page 404** : Effet glitch sur "404" + particules flottantes
- **Grain texture** : Texture subtile en dark mode
- **Print stylesheet** : Mise en page optimisee pour l'impression

### Analytics
- **Vercel Analytics** : Cookie-free, pas de banniere RGPD necessaire
- **Custom events** : Tracking des clics CTA, telechargement CV, projets, social, contact, switch langue
- **Implementation** : Listener delegue sur `[data-track]` dans BaseLayout

### i18n
- **Bilingue** : FR (defaut) + EN avec routes prefixees (`/fr/`, `/en/`)
- **Detection auto** : Page racine redirige selon `navigator.language`
- **Slug mapping** : Traduction des slugs (projets/projects, competences/skills)
- **Donnees centralisees** : Un fichier par langue (`fr.ts`, `en.ts`) avec types partages

## Deploiement

Le site est deploye automatiquement sur Vercel a chaque push sur `main`.

Les headers de securite sont configures dans `vercel.json`.

## Licence

Projet personnel -- Tous droits reserves.
