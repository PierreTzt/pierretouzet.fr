# Guide développeur — Portfolio pierretouzet.fr

Ce guide explique le code de bout en bout à quelqu'un qui **découvre le développement web**. Pas de prérequis. Lis-le une fois du début à la fin : après, tu sauras ouvrir n'importe quel fichier du projet et comprendre ce qu'il fait.

> **Convention** : les blocs commençant par `>` sont des rappels pour novices. Si tu maîtrises déjà le concept, saute-les.

---

## Table des matières

1. [Les bases du web (5 min)](#1-les-bases-du-web-5-min)
2. [JavaScript, TypeScript, Node, npm (10 min)](#2-javascript-typescript-node-npm-10-min)
3. [Astro : qu'est-ce que c'est ?](#3-astro-quest-ce-que-cest)
4. [Lancer le projet en local](#4-lancer-le-projet-en-local)
5. [Arborescence du projet](#5-arborescence-du-projet)
6. [Le cycle de vie d'une requête](#6-le-cycle-de-vie-dune-requête)
7. [Les données (`src/data/`)](#7-les-données-srcdata)
8. [L'internationalisation FR/EN (`src/i18n/`)](#8-linternationalisation-fren-srci18n)
9. [Routing : pages et URLs (`src/pages/`)](#9-routing--pages-et-urls-srcpages)
10. [Layouts, templates, components](#10-layouts-templates-components)
11. [Le blog (content collections)](#11-le-blog-content-collections)
12. [Les routes API (`src/pages/api/`)](#12-les-routes-api-srcpagesapi)
13. [Le middleware (`src/middleware.ts`)](#13-le-middleware-srcmiddlewarets)
14. [L'authentification admin](#14-lauthentification-admin)
15. [Génération d'images (OG + LinkedIn)](#15-génération-dimages-og--linkedin)
16. [Tailwind CSS v4 et le style](#16-tailwind-css-v4-et-le-style)
17. [Déploiement sur Vercel](#17-déploiement-sur-vercel)
18. [Fichiers de configuration](#18-fichiers-de-configuration)
19. [« Je veux faire X, où je touche ? »](#19--je-veux-faire-x-où-je-touche-)
20. [Glossaire](#20-glossaire)

---

## 1. Les bases du web (5 min)

Un site web, c'est trois choses qu'un navigateur (Chrome, Firefox...) sait lire :

- **HTML** — la structure. C'est le texte qui décrit ce qu'il y a sur la page : titres, paragraphes, images, liens. Ressemble à `<h1>Bonjour</h1>`.
- **CSS** — le style. Ce qui dit comment ça s'affiche : couleurs, tailles, espacements. `h1 { color: red; }`.
- **JavaScript (JS)** — le comportement. Ce qui rend la page vivante : un clic, une animation, un formulaire.

Quand tu visites `pierretouzet.fr`, ton navigateur télécharge ces trois choses et les affiche.

### SSG vs SSR vs SPA (les 3 manières de construire un site)

- **SPA (Single Page Application)** : tout est en JavaScript. Le serveur envoie une page quasi vide, et JS construit tout dans le navigateur. C'est ce que fait React basique. **Inconvénient** : lent à afficher la première fois, mauvais pour le référencement Google.
- **SSR (Server-Side Rendering)** : à chaque visite, un serveur calcule la page HTML complète et l'envoie au navigateur. Rapide à afficher, bon pour Google. Utilisé pour les pages qui changent à chaque fois (exemple : page admin qui dépend de qui est connecté).
- **SSG (Static Site Generation)** : on calcule toutes les pages UNE fois, au moment du build (la construction du projet), et on les sert comme des fichiers statiques. Ultra rapide, quasi gratuit à héberger.

**Ce projet utilise les trois** : la plupart des pages sont en SSG (pré-calculées au build), les routes `/api/` et `/admin/` sont en SSR (calculées à chaque requête), et il y a un peu de JavaScript côté client pour les interactions (toggle dark mode, animations).

---

## 2. JavaScript, TypeScript, Node, npm (10 min)

### JavaScript vs TypeScript

**JavaScript (JS)** — le langage historique du web, inventé en 1995. Exemple :

```js
const nom = 'Pierre';
console.log('Bonjour ' + nom);
```

**TypeScript (TS)** — JavaScript avec des **types**. C'est Microsoft qui l'a inventé pour détecter des erreurs avant que le code ne tourne. Au lieu d'écrire `const nom = 'Pierre'` et espérer que c'est bien un texte, tu écris :

```ts
const nom: string = 'Pierre';
```

> **Pour un novice** : pense aux types comme à des étiquettes qui disent « cette variable contient du texte », « celle-là contient un nombre », « celle-là contient une liste d'utilisateurs ». Quand tu essaies de mélanger deux étiquettes incompatibles, TypeScript râle avant même que tu lances ton code.

Dans ce projet, tout est en **TypeScript** (extension `.ts` ou `.tsx`), sauf quelques fichiers de config en JavaScript (`.mjs`).

### Node.js et npm

**Node.js** — un moteur qui permet de lancer du JavaScript en dehors d'un navigateur, typiquement sur un serveur. Astro, comme beaucoup d'outils modernes, tourne sur Node.
**npm** — le gestionnaire de paquets de Node. C'est ce qui te permet d'installer des bibliothèques externes. Quand tu lances `npm install`, npm lit `package.json`, va chercher sur internet toutes les dépendances listées, et les met dans un dossier `node_modules/`.

### `package.json` — le manifeste du projet

Ouvre `package.json` à la racine. Les parties importantes :

- `scripts` : commandes raccourcies que tu peux lancer avec `npm run <nom>`. Exemple : `npm run dev` lance `astro dev`.
- `dependencies` : les bibliothèques utilisées par le site en production (Astro, Tailwind, etc.).
- `devDependencies` : les bibliothèques utilisées uniquement pour développer (ESLint, Prettier, etc.).

### Imports et exports

Un fichier TypeScript peut **exporter** des choses pour qu'un autre fichier les utilise :

```ts
// dans fichier-a.ts
export const salutation = 'Bonjour';
export function direBonjour(nom: string) {
  return `Bonjour ${nom}`;
}
```

```ts
// dans fichier-b.ts
import { salutation, direBonjour } from './fichier-a';
console.log(direBonjour('Pierre'));
```

Le `./` signifie « dans le même dossier ». `../` signifie « dossier parent ». `'astro:content'` ou `'@vercel/analytics'` (sans `./`) signifie « une bibliothèque externe installée par npm ».

### async / await

Certaines opérations prennent du temps (lire un fichier, appeler une API, attendre une réponse réseau). En JavaScript, on les appelle des **opérations asynchrones**. Elles renvoient une **Promise** (une promesse de résultat futur).

```ts
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

> **Pour un novice** :
> - `async` devant une fonction = « cette fonction peut contenir des `await` ».
> - `await` devant une opération = « attends que ça finisse avant de continuer ».
> - Si tu oublies `await`, tu récupères la Promise elle-même au lieu du résultat → bug classique.

---

## 3. Astro : qu'est-ce que c'est ?

Astro est un **framework web moderne**, créé en 2021. Son principe : « par défaut, zéro JavaScript envoyé au navigateur ».

### Comparaison rapide

- **WordPress** : un serveur PHP qui génère du HTML à chaque requête, avec une base de données. Lourd.
- **React (seul)** : une SPA. Tout est calculé dans le navigateur.
- **Next.js** : un framework React qui fait du SSR/SSG.
- **Astro** : framework qui fait du SSG/SSR, peut mélanger plusieurs frameworks (React, Vue, Svelte), et par défaut n'envoie pas de JS au navigateur sauf si tu le demandes explicitement.

### Anatomie d'un fichier `.astro`

```astro
---
// Cette partie est du JavaScript/TypeScript. Elle s'exécute au BUILD (SSG) ou à la REQUÊTE (SSR).
// Elle ne tourne JAMAIS dans le navigateur du visiteur.
const titre = 'Ma page';
const aujourdhui = new Date();
---

<!-- Ceci est du HTML. Tu peux y insérer les variables du haut avec { } -->
<h1>{titre}</h1>
<p>Nous sommes le {aujourdhui.toLocaleDateString()}</p>

<style>
  /* Ceci est du CSS qui ne s'applique qu'à CE composant */
  h1 { color: blue; }
</style>

<script>
  // Ceci est du JavaScript qui s'exécute dans le navigateur du visiteur
  console.log('Page chargée');
</script>
```

Trois zones :
1. **Frontmatter** (entre les `---`) : logique serveur, s'exécute AVANT l'envoi au navigateur.
2. **Template** (le HTML) : ce qui est envoyé au navigateur.
3. **Scripts** optionnels en bas : ce qui doit tourner dans le navigateur du visiteur (animations, interactivité).

### Comment Astro génère les pages

Par défaut (SSG), au moment du `npm run build`, Astro :
1. Lit tous les fichiers dans `src/pages/`.
2. Pour chaque fichier, exécute son frontmatter.
3. Génère un fichier HTML statique par page.
4. Pose ces fichiers dans `dist/` prêts à être envoyés.

Quand un visiteur arrive, Vercel sert directement le HTML. Aucun calcul serveur.

### Mode SSR

Si tu écris `export const prerender = false;` dans le frontmatter d'une page, Astro ne la pré-calcule pas : elle sera calculée À CHAQUE visite. C'est indispensable pour les pages qui dépendent du visiteur (auth, formulaires) ou du temps (dashboard temps réel).

Dans ce projet, les pages `/admin/**` et les routes `/api/**` sont toutes en `prerender = false`.

---

## 4. Lancer le projet en local

Prérequis : Node.js 20+ installé.

```bash
# 1. Installer les dépendances (UNE fois, après chaque pull qui change package.json)
npm install

# 2. Lancer le serveur de développement
npm run dev
# → ouvre http://localhost:4321

# 3. Construire le site pour la production
npm run build
# → produit le dossier dist/ avec tous les fichiers

# 4. Prévisualiser le build comme en prod
npm run preview

# 5. Vérifications
npm run check        # types TypeScript
npm run lint         # style de code
npm run format       # reformate tout le code
npm run test         # tests unitaires
```

En mode `dev`, le site se recharge automatiquement dès que tu modifies un fichier.

### Variables d'environnement

Certaines fonctionnalités (admin, génération de contenu) ont besoin de clés secrètes. Crée un fichier `.env` à la racine (il est automatiquement ignoré par Git) :

```
ADMIN_PASSWORD=unMotDePasseCompliqué
ANTHROPIC_API_KEY=sk-ant-...
GITHUB_TOKEN=ghp_...
GITHUB_REPO=owner/repo-name
```

En production, ces mêmes variables sont configurées dans le dashboard Vercel, pas dans le code.

---

## 5. Arborescence du projet

```
portfolio/
├── public/              ← fichiers servis tels quels (favicon, PDF, robots.txt, sw.js)
├── src/                 ← tout le code du site
│   ├── assets/          ← images optimisées par Astro (Image component)
│   ├── components/      ← petits blocs UI réutilisables (Footer, Navbar, etc.)
│   ├── content/         ← articles de blog en Markdown
│   ├── data/            ← données FR et EN du site (projets, expériences, etc.)
│   ├── i18n/            ← helpers pour gérer les deux langues
│   ├── layouts/         ← grands gabarits de page (BaseLayout contient <html> complet)
│   ├── pages/           ← chaque fichier ici = une URL sur le site
│   │   ├── admin/       ← espace d'administration protégé
│   │   ├── api/         ← routes serveur (appelées via fetch)
│   │   ├── en/          ← pages en anglais
│   │   ├── fr/          ← pages en français
│   │   └── og/          ← génération dynamique d'images Open Graph
│   ├── styles/          ← CSS global (global.css pilote Tailwind)
│   ├── templates/       ← pages-modèles partagées entre FR et EN
│   ├── utils/           ← fonctions helper (auth, génération d'images, etc.)
│   ├── __tests__/       ← tests Vitest
│   ├── middleware.ts    ← code qui tourne AVANT chaque requête
│   ├── env.d.ts         ← typage des variables d'environnement
│   └── content.config.ts ← schéma des articles de blog
├── astro.config.mjs     ← configuration principale Astro
├── vercel.json          ← headers de sécurité, redirections
├── package.json         ← dépendances et scripts npm
└── tsconfig.json        ← configuration TypeScript
```

**Règle mentale** : si tu cherches à ajouter une URL, va dans `src/pages/`. Si tu cherches à modifier un texte affiché, va dans `src/data/`. Si tu cherches à modifier du design, va dans `src/components/` ou `src/templates/`.

---

## 6. Le cycle de vie d'une requête

Scénario : un visiteur tape `https://www.pierretouzet.fr/fr/contact/` dans son navigateur.

```
Visiteur → DNS → Vercel (serveur) → Réponse HTML → Affichage
```

En détail :

1. **DNS** : le navigateur demande « c'est quelle IP, pierretouzet.fr ? ». Réponse : l'IP d'un serveur Vercel.
2. **Requête HTTP** : le navigateur envoie `GET /fr/contact/` à Vercel.
3. **Vercel** regarde s'il a une version pré-calculée (SSG) ou s'il faut générer (SSR).
   - La page `/fr/contact/` est en SSG → Vercel sert directement le HTML pré-généré au build.
   - L'URL `/admin/blog` est en SSR → Vercel déclenche le middleware puis la page.
4. **Middleware** (seulement pour SSR) : `src/middleware.ts` s'exécute en premier. Il vérifie auth, rate-limit, etc.
5. **Page** : le frontmatter de la page s'exécute côté serveur, construit le HTML, le renvoie.
6. **Navigateur** : reçoit le HTML, télécharge CSS et JS référencés, affiche la page.
7. **Scripts côté client** : les `<script>` de la page s'exécutent (theme toggle, animations, etc.).

---

## 7. Les données (`src/data/`)

Le site est bilingue. Pour éviter d'avoir deux copies du code, on sépare :

- `src/data/fr.ts` — toutes les données en français (projets, expériences, textes UI, services, FAQ, etc.)
- `src/data/en.ts` — les mêmes données en anglais
- `src/data/types.ts` — la **forme** de ces données : quels champs existent, de quel type

Les deux fichiers FR et EN doivent avoir **exactement la même structure** (imposée par le type `SiteData`). Si tu ajoutes un champ en FR, TypeScript t'oblige à l'ajouter en EN.

### Exemple simplifié

```ts
// types.ts
export interface Personal {
  name: string;
  title: string;
  email: string;
}

// fr.ts
export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: 'Ingénieur pédagogique',
    email: 'touzet.pierre@gmail.com',
  },
  // ...
};
```

Dans un template, tu récupères les données via le helper i18n :

```astro
---
import { getData } from '../i18n/utils';
const data = getData('fr');
---
<h1>{data.personal.name}</h1>
```

---

## 8. L'internationalisation FR/EN (`src/i18n/`)

Un seul fichier important : `src/i18n/utils.ts`. Il exporte trois fonctions clés :

### `getLangFromUrl(url)`
Regarde une URL et renvoie `'fr'` ou `'en'`.
Exemple : `/fr/contact/` → `'fr'`, `/en/blog/xxx/` → `'en'`.

### `getData(lang)`
Renvoie l'objet `data` correspondant à la langue.

### `getLocalizedPath(currentPath, targetLang)`
Transforme l'URL actuelle vers l'équivalent dans l'autre langue.
Exemple : `/fr/competences/` → `/en/skills/`.

Pourquoi c'est nécessaire ? Parce que les slugs d'URL sont traduits :
- `competences` ↔ `skills`
- `projets` ↔ `projects`
- `mentions-legales` ↔ `legal`

Il y a une table de correspondance `pageSlugMap` au début du fichier. Si tu ajoutes une page bilingue avec des URLs différentes, ajoute une entrée ici.

### Le switcher de langue

Le composant `LanguageSwitcher.astro` utilise `getLocalizedPath` pour construire le lien vers la même page dans l'autre langue.

---

## 9. Routing : pages et URLs (`src/pages/`)

Règle d'or d'Astro : **chaque fichier `.astro` dans `src/pages/` devient une URL**.

```
src/pages/fr/index.astro          → /fr/
src/pages/fr/contact.astro        → /fr/contact/
src/pages/fr/blog/index.astro     → /fr/blog/
src/pages/fr/blog/[...slug].astro → /fr/blog/mon-article/ (dynamique)
src/pages/api/login.ts            → /api/login (SSR car endpoint)
```

### Routes dynamiques

Le nom entre crochets est une **variable**. `[slug]` correspond à un segment, `[...slug]` à plusieurs segments.

Exemple : `src/pages/fr/blog/[...slug].astro` reçoit `Astro.params.slug = "conduite-changement-ecoles"` quand l'URL est `/fr/blog/conduite-changement-ecoles/`.

### Routes statiques générées dynamiquement

Pour savoir quelles pages créer au build, on exporte une fonction `getStaticPaths` :

```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('blog');
  return articles.map(article => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

const { article } = Astro.props;
---

<h1>{article.data.title}</h1>
```

Astro appelle `getStaticPaths` au build, récupère la liste des slugs possibles, et génère une page HTML par slug.

### Pages FR vs EN dans le projet

Pour chaque page du site, il y a deux fichiers : un dans `src/pages/fr/`, un dans `src/pages/en/`. Les deux importent le même **template** qui contient la vraie logique, et lui passent juste la langue :

```astro
---
// src/pages/fr/contact.astro
import ContactTemplate from '../../templates/ContactTemplate.astro';
---
<ContactTemplate lang="fr" />
```

```astro
---
// src/pages/en/contact.astro
import ContactTemplate from '../../templates/ContactTemplate.astro';
---
<ContactTemplate lang="en" />
```

Si tu veux ajouter une page bilingue, tu crées deux fichiers et un template partagé.

---

## 10. Layouts, templates, components

Trois niveaux d'abstraction :

### Layouts (`src/layouts/`)
Les « grosses enveloppes ». Un layout contient le `<html>` complet (head, body, balises meta, scripts globaux, Navbar, Footer).
**Seul layout utilisé dans ce projet : `BaseLayout.astro`**. Tous les templates l'utilisent.

### Templates (`src/templates/`)
Un template = une page complète, mais partagée entre FR et EN. Il reçoit `lang` en prop, récupère les données correspondantes, et affiche.

Exemple : `HomeTemplate.astro`, `ContactTemplate.astro`, `BlogArticleTemplate.astro`.

### Components (`src/components/`)
Des petits blocs réutilisables : `Navbar`, `Footer`, `ThemeToggle`, `SectionHeader`, `SkillBar`, etc. Ils peuvent apparaître plusieurs fois par page.

### La hiérarchie typique

```
BaseLayout (html, head, body, Navbar, Footer)
  └─ HomeTemplate (structure de la page home)
       ├─ Hero component
       ├─ Metrics component
       ├─ Testimonials component
       └─ Process component
```

---

## 11. Le blog (content collections)

Les articles de blog sont des fichiers Markdown dans `src/content/blog/`. Chaque article a un **frontmatter** (métadonnées entre `---`) et un corps Markdown.

```markdown
---
title: Mon super article
description: Une description courte
date: 2026-03-15
lang: fr
tags: [pédagogie, ia]
---

Voici le contenu de l'article en **Markdown**.

## Sous-titre

Un paragraphe.
```

### Le schéma (`src/content/config.ts` + `src/content.config.ts`)

Astro valide chaque article contre un schéma Zod :

```ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['fr', 'en']),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
  }),
});
```

Si un article oublie `title` ou met `lang: "es"`, Astro refusera de builder et te dira quoi corriger.

> **Pourquoi deux fichiers `content.config.ts` et `content/config.ts` ?** Astro 5 a migré l'emplacement du fichier. On garde les deux pour la compatibilité, ils ont le même contenu.

### Lire les articles dans une page

```astro
---
import { getCollection } from 'astro:content';
const articles = await getCollection('blog', ({ data }) => data.lang === 'fr' && !data.draft);
---

{articles.map(a => <a href={`/fr/blog/${a.slug}/`}>{a.data.title}</a>)}
```

### Publication

Les articles peuvent être écrits manuellement (copier un fichier `.md` dans `src/content/blog/`) ou via l'admin CMS (`/admin/blog`) qui appelle Claude pour générer, puis l'API GitHub pour committer le fichier dans le repo. Voir la partie 14.

---

## 12. Les routes API (`src/pages/api/`)

Une route API = un fichier TypeScript qui exporte une ou plusieurs fonctions (`GET`, `POST`, etc.). Elle est appelée via `fetch('/api/xxx')` depuis le navigateur, répond avec du JSON, ne renvoie PAS de HTML.

Exemple minimaliste :

```ts
// src/pages/api/hello.ts
import type { APIRoute } from 'astro';

export const prerender = false; // obligatoire pour du SSR

export const GET: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({ message: 'Hello' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### Les routes de ce projet

| Route | Méthode | Rôle | Auth ? |
|---|---|---|---|
| `/api/health` | GET | Ping simple pour vérifier que le site tourne | non |
| `/api/login` | POST | Se connecter à l'admin | non (mais rate-limité) |
| `/api/logout` | POST | Se déconnecter | oui |
| `/api/generate` | POST | Générer un brouillon d'article via Claude | oui |
| `/api/generate-linkedin` | POST | Générer un post LinkedIn | oui |
| `/api/generate-linkedin-visual` | POST | Générer l'image d'un post | oui |
| `/api/generate-linkedin-banner` | POST | Générer une bannière LinkedIn | oui |
| `/api/generate-linkedin-carousel` | POST | Générer un carousel | oui |
| `/api/publish` | POST | Publier un article → commit GitHub | oui |
| `/api/fetch-rss` | POST | Lire un flux RSS externe (veille) | oui |

Pourquoi `prerender = false` partout ? Parce qu'une route API doit être recalculée à chaque appel, pas pré-calculée au build.

---

## 13. Le middleware (`src/middleware.ts`)

Un **middleware** est du code qui s'exécute AVANT chaque requête SSR, comme un filtre à l'entrée. Il peut :
- Laisser passer la requête (`next()`)
- La bloquer (renvoyer une `Response` custom, par ex. 401)
- La rediriger (`context.redirect(...)`)

Dans ce projet, le middleware fait deux choses :

1. **Rate-limit sur `/api/login`** : si une IP fait plus de 5 tentatives en 1 minute, on renvoie 429.
2. **Protection de `/admin/**`** : si l'URL commence par `/admin/` (sauf `/admin/login`), on vérifie le cookie `admin-auth`. S'il est valide, on laisse passer ; sinon redirection vers `/admin/login`.

> **Attention** : le middleware ne s'exécute QUE pour les pages en SSR (`prerender = false`). Les pages statiques ne passent pas par là.

---

## 14. L'authentification admin

Flux complet :

1. **Connexion** : l'utilisateur va sur `/admin/login`, entre le mot de passe. Le formulaire fait un `fetch('/api/login', { method: 'POST', body: { password } })`.
2. **Vérification** : `api/login.ts` compare le mot de passe à la variable d'env `ADMIN_PASSWORD` en **temps constant** (`timingSafeEqual`) pour éviter les attaques par mesure du temps.
3. **Session** : si OK, le serveur crée un **token HMAC** (`createSessionToken` dans `utils/auth.ts`) : un timestamp signé avec le secret. Il le met dans un cookie `admin-auth` avec les flags `HttpOnly`, `Secure`, `SameSite=strict`, durée 24h.
4. **Navigation** : à chaque requête sur `/admin/**`, le middleware lit le cookie, vérifie la signature HMAC, vérifie que le timestamp n'est pas expiré, et laisse passer.
5. **Appels API** : chaque endpoint `/api/` sensible appelle aussi `isAuthenticated(request, cookies)` en garde-fou.

### Pourquoi un HMAC ?

Un simple cookie `admin-auth=true` serait trivial à forger. Avec HMAC, le serveur signe `"timestamp"` avec le secret, et on obtient `"timestamp.signature"`. Pour forger, il faudrait connaître le secret.

---

## 15. Génération d'images (OG + LinkedIn)

### Images Open Graph (partage sur réseaux sociaux)

Quand tu partages un article sur Twitter/LinkedIn, la plateforme affiche une grosse image. Cette image est récupérée via une balise `<meta property="og:image" content="..." />` dans le `<head>`.

Dans ce projet, chaque article de blog a sa propre image OG générée à la volée :
- Route : `src/pages/og/[...slug].png.ts`
- Util : `src/utils/og-image.ts`
- Outils : **Satori** (convertit du JSX-like en SVG) + **Sharp** (convertit SVG en PNG)

Au build, Astro génère un `.png` par article, par exemple `/og/conduite-changement-ecoles.png`.

### Images LinkedIn (admin studio)

L'admin `/admin/linkedin` permet de générer :
- des posts (texte)
- des visuels carrés qui accompagnent les posts
- des bannières (1584×396)
- des carousels (PDF LinkedIn)

Tout passe par les routes `/api/generate-linkedin-*`, qui utilisent `src/utils/linkedin-visual.ts` (Satori + Sharp + Twemoji pour les emojis). Les images sont renvoyées en base64 au navigateur, jamais stockées côté serveur.

---

## 16. Tailwind CSS v4 et le style

Tailwind est un framework CSS qui te donne des classes utilitaires : `bg-blue-500`, `p-4`, `text-xl`. Tu composes ton design directement dans le HTML.

```astro
<button class="px-4 py-2 bg-accent-500 text-white hover:bg-accent-600">
  Cliquer
</button>
```

### Tailwind v4 : CSS-first

Dans Tailwind v3, la configuration se faisait dans un fichier `tailwind.config.js`. En v4 (ce projet), **tout est dans `src/styles/global.css`** via de nouvelles directives :

- `@theme` : définit les variables (couleurs, polices, tailles)
- `@plugin` : charge un plugin (typography ici)
- `@custom-variant dark` : active le dark mode via la classe `.dark` sur `<html>`
- `@utility` : crée des utilitaires custom (`tile`, `glow-hover`, `scroll-reveal`)

### Dark mode

La classe `dark:` devant une classe Tailwind la rend conditionnelle :

```
<p class="text-zinc-900 dark:text-zinc-100">Texte</p>
```

Le toggle (`ThemeToggle.astro`) ajoute/retire la classe `.dark` sur `<html>` et stocke la préférence dans `localStorage`.

### Animations

Définies en `@theme` dans `global.css` via `--animate-*`. Utilisées via `class="animate-reveal"` ou via la classe utilitaire `scroll-reveal` (observée par `IntersectionObserver` dans `BaseLayout`).

---

## 17. Déploiement sur Vercel

Vercel est une plateforme qui :
1. Pull le dépôt GitHub.
2. Lance `npm run build`.
3. Sert le résultat : `dist/client/*` en statique CDN, les fonctions SSR (pages admin, routes API) en **Fluid Compute** (AWS Lambda géré par Vercel).

Chaque push sur `main` déclenche un déploiement en production. Chaque push sur une autre branche ou PR crée un déploiement **preview** avec une URL unique.

Configurations importantes :
- **Variables d'env** dashboard Vercel → Settings → Environment Variables.
- **Domaine** : `pierretouzet.fr` pointé vers Vercel via DNS.
- **Analytics** : Vercel Analytics + Speed Insights sont intégrés via `inject()` dans `BaseLayout.astro`.

---

## 18. Fichiers de configuration

### `astro.config.mjs`
Config principale. Déclare l'adapter Vercel, le plugin Tailwind, l'intégration sitemap, et les locales i18n.

### `vercel.json`
Headers HTTP envoyés à chaque requête : HSTS, CSP, X-Frame-Options, etc. C'est la sécurité au niveau réseau.

### `tsconfig.json`
Config TypeScript : quelle version de JS cibler, quelles options strict activer, quels fichiers inclure.

### `.eslintrc` / `eslint.config.js`
Règles de style de code (ex : pas de `any` implicite). Lancé via `npm run lint`.

### `.prettierrc` / `.prettierignore`
Formatage automatique (ex : virgule finale, guillemets simples). Lancé via `npm run format`.

### `.gitignore`
Ce que Git doit ignorer : `node_modules/`, `dist/`, `.env`, `.vercel/`, etc.

### `.github/` (si présent)
Actions GitHub (tests automatiques, déploiement). Le fichier `dependabot.yml` a été retiré du projet.

---

## 19. « Je veux faire X, où je touche ? »

| Tâche | Fichier(s) |
|---|---|
| Changer un texte français de la homepage | `src/data/fr.ts` |
| Changer l'équivalent anglais | `src/data/en.ts` |
| Ajouter un projet au portfolio | `src/data/fr.ts` + `src/data/en.ts` (clé `projects`) |
| Ajouter une nouvelle page bilingue | `src/templates/NewTemplate.astro` + `src/pages/fr/xxx.astro` + `src/pages/en/xxx.astro` |
| Ajouter une correspondance de slug FR↔EN | `src/i18n/utils.ts` (table `pageSlugMap`) |
| Ajouter un article de blog à la main | nouveau fichier `.md` dans `src/content/blog/` |
| Modifier le design global | `src/styles/global.css` (variables `@theme`) |
| Modifier la Navbar | `src/components/Navbar.astro` |
| Modifier le Footer | `src/components/Footer.astro` |
| Modifier le BaseLayout (meta, scripts globaux) | `src/layouts/BaseLayout.astro` |
| Ajouter un header de sécurité HTTP | `vercel.json` |
| Ajouter une route API | nouveau fichier `src/pages/api/xxx.ts` + `prerender = false` |
| Protéger une nouvelle page admin | simplement la mettre dans `src/pages/admin/` avec `prerender = false` |
| Ajouter une variable d'environnement | dashboard Vercel + `src/env.d.ts` pour le typage |
| Ajouter une redirection | `vercel.json` dans `redirects` (ou `astro.config.mjs`) |
| Modifier le flux RSS | `src/pages/rss.xml.ts` |
| Modifier la génération OG | `src/utils/og-image.ts` |

---

## 20. Glossaire

- **API** — Application Programming Interface. Interface pour que des programmes se parlent. Une « route API » dans ce projet = un endpoint HTTP qui renvoie du JSON.
- **Build** — phase où on transforme le code source en fichiers prêts à déployer (HTML, CSS, JS minifiés).
- **Cookie** — petit bout de texte que le serveur demande au navigateur de mémoriser, renvoyé à chaque requête suivante. Sert à l'auth.
- **CSP (Content-Security-Policy)** — header HTTP qui dit au navigateur quels scripts/images/styles il peut charger. Protection anti-XSS.
- **CSR** — Client-Side Rendering. Le navigateur construit la page en JS. C'est le mode d'une SPA pure.
- **DNS** — annuaire qui traduit les noms de domaine en adresses IP.
- **DOM** — Document Object Model. L'arbre HTML construit en mémoire par le navigateur, manipulable via JavaScript.
- **Endpoint** — une URL précise qui répond à une requête, souvent API (`/api/login` est un endpoint).
- **Frontmatter** — le bloc de métadonnées en tête d'un fichier (Markdown ou Astro) entre deux `---`.
- **HMAC** — Hash-based Message Authentication Code. Signature cryptographique qu'on peut vérifier mais pas forger sans la clé.
- **HSTS** — HTTP Strict Transport Security. Header qui force le navigateur à utiliser HTTPS pour ce domaine.
- **HTTP 2xx/3xx/4xx/5xx** — codes de statut : 200 OK, 301 redirection permanente, 404 pas trouvé, 500 erreur serveur.
- **i18n** — internationalization (18 lettres entre le i et le n). Gestion multi-langues.
- **IP** — adresse numérique d'un serveur sur internet (ex. `76.76.21.21`).
- **JSON** — JavaScript Object Notation. Format texte pour échanger des données structurées.
- **Lambda** — petite fonction serveur qui s'exécute à la demande. Vercel utilise AWS Lambda pour le SSR.
- **Middleware** — code qui s'exécute entre la requête et la page, pour filtrer/modifier.
- **Node.js** — moteur qui permet de lancer du JS côté serveur.
- **npm** — gestionnaire de paquets Node.
- **OG (Open Graph)** — protocole de métadonnées (`og:title`, `og:image`) lu par les réseaux sociaux pour afficher une preview.
- **PII** — Personally Identifiable Information. Données qui identifient une personne (email, nom, IP).
- **Promise** — objet qui représente un résultat asynchrone futur en JavaScript.
- **Props** — propriétés passées à un composant (ex : `<Component lang="fr" />` passe `lang` en prop).
- **RGPD** — Règlement Général sur la Protection des Données (EU).
- **Schema** — structure attendue d'une donnée, validée à l'exécution (Zod).
- **Slug** — partie finale d'une URL, souvent dérivée du titre (`mon-super-article`).
- **SPA** — Single Page Application. App web où la navigation se fait en JS sans recharger la page.
- **SSG** — Static Site Generation. Pages HTML générées au build, servies statiquement.
- **SSR** — Server-Side Rendering. Pages générées à chaque requête.
- **Token** — chaîne de caractères utilisée pour authentifier ou autoriser (session, API).
- **Vercel** — plateforme d'hébergement créée par les auteurs de Next.js, spécialisée dans les sites JavaScript modernes.
- **XSS** — Cross-Site Scripting. Attaque qui injecte du JavaScript malveillant dans une page.
- **Zod** — bibliothèque TypeScript pour valider des données à l'exécution.

---

## Pour aller plus loin

- Documentation Astro : https://docs.astro.build
- Documentation Tailwind v4 : https://tailwindcss.com/docs
- Documentation Vercel : https://vercel.com/docs
- Documentation MDN (référence JS/HTML/CSS) : https://developer.mozilla.org

---

**Fin du guide.** Si un concept te bloque, ouvre le fichier concerné — chaque fichier non-trivial a un en-tête explicatif en plus.
