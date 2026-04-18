import type { SiteData } from './types';

export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: "Je rends le complexe accessible.",
    description:
      "15 ans entre IT, pédagogie et innovation digitale — je pilote 6 campus nationaux, j'ai créé Gradly pour automatiser la gestion RNCP, et j'accompagne les organisations éducatives dans leur transformation. Disponible en consulting et freelance.",
    email: 'pierre.touzet@mecontacter.eu',
    location: 'Valenciennes, France',
    avatarAlt: 'Photo de Pierre Touzet',
  },
  social: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pierre-touzet/',
      icon: 'linkedin',
      label: 'Profil LinkedIn de Pierre (nouvelle fenêtre)',
    },
  ],
  experiences: [
    {
      id: 'ieft-responsable',
      company: 'IEFT - Tourism Management School',
      position: 'Responsable national des programmes',
      startDate: '2024-01',
      endDate: "Aujourd'hui",
      description:
        "Arrivé pour structurer les programmes d'une école de tourisme en pleine croissance, je pilote aujourd'hui seul la stratégie pédagogique de 6 campus nationaux, avec une équipe de 11 personnes sur le terrain et environ 400 apprenants.",
      achievements: [
        'Harmonisation pédagogique complète sur 6 campus : maquettes, évaluations et modalités unifiées là où chaque campus faisait différemment',
        "Déploiement de nouveaux programmes de la conception à l'ouverture, avec une croissance significative des effectifs",
        "Conception des syllabi, blocs de compétences et grilles d'évaluation conformes RNCP",
        'Obtention des dossiers de certification et jurys (RNCP, Qualiopi)',
        'Management transversal d\'une équipe de 11 coordinateurs et responsables pédagogiques',
        'Pilotage budgétaire et optimisation de la rentabilité des programmes',
      ],
      technologies: ['RNCP', 'Qualiopi', 'Ingénierie pédagogique', 'Management', 'Certification'],
    },
    {
      id: 'ifag-coordinateur',
      company: 'IFAG / Compétences & Développement',
      position: 'Coordinateur pédagogique national',
      startDate: '2022-04',
      endDate: '2024-01',
      description:
        "Recruté sur un poste administratif, mon N+1 a vu en moi un expert tech et m'a fait évoluer. En moins de 2 ans, j'ai mené la transformation digitale des outils pédagogiques d'un réseau de 28 campus — avec un taux d'adoption de 100%.",
      achievements: [
        "Déploiement d'outils numériques sur l'intégralité des 28 campus du réseau — 100% d'adoption",
        "Développement sur mesure d'outils pour automatiser les tâches récurrentes (dont les prémices de Gradly)",
        'Veille EdTech permanente et pilotage de POC sur des solutions innovantes',
        'Animation de groupes de travail transversaux entre campus',
        'Mise en place d\'indicateurs data pour le suivi qualité des formations',
      ],
      technologies: ['Outils numériques', 'LMS', 'Data', 'Innovation', 'Qualité'],
    },
    {
      id: 'icm-office-manager',
      company: 'ICM Aulnoye Aymeries',
      position: 'Executive Office Manager & Technicien informatique',
      startDate: '2010-10',
      endDate: '2021-11',
      description:
        "11 ans de double casquette dans une structure de 2 personnes : pilotage opérationnel complet + gestion de l'infrastructure IT. Mon plus gros projet : la refonte complète du système d'achat fournisseurs. Après avoir tout transformé, j'avais soif d'autre chose.",
      achievements: [
        "Refonte complète du système d'approvisionnement : rationalisation du panel fournisseurs et livraisons OTD > 90%",
        'Migration complète du parc informatique vers Windows 10',
        'Support IT N1, N2 et N3 pour l\'ensemble des utilisateurs',
        'Gestion de la facturation, du suivi clients et du reporting',
        'Création graphique (plaquettes, flyers) et gestion des réseaux sociaux',
      ],
      technologies: ['Support IT', 'Gestion', 'Process', 'Windows', 'Graphisme'],
    },
  ],
  projects: [
    {
      id: 'distil-academy',
      slug: 'distil-academy',
      title: 'Distil Academy',
      shortDescription:
        "Plateforme de formation en ligne sur l'IA générative : des cours courts, denses et à jour pour monter en compétences vite et bien.",
      longDescription:
        "J'ai créé Distil pour répondre à une frustration : les formations IA sont soit trop longues, soit déjà obsolètes. Distil filtre le bruit et ne garde que ce qui marche. 25 modules, 42 leçons de 10-15 min, accès à vie et mises à jour régulières. Une pédagogie condensée, pensée pour les professionnels qui veulent des résultats concrets sans y passer des mois.",
      technologies: ['Astro', 'Tailwind CSS', 'Vercel', 'PostHog'],
      imageAlt: 'Interface de Distil Academy - plateforme de formation IA',
      demoUrl: 'https://www.distil.academy/',
      featured: true,
      status: 'active',
      period: '2026 — Aujourd\'hui',
      metrics: [
        { label: 'Format', value: 'Leçons de 10-15 min' },
        { label: 'Accès', value: 'À vie' },
        { label: 'Mises à jour', value: 'Continues' },
      ],
      story: "Les formations IA disponibles m'ont toujours frustré : soit des vidéos YouTube déjà périmées, soit des cursus à 2000€ qui recyclent les mêmes contenus. Je me suis dit : et si je créais la formation que j'aurais aimé suivre ? Des modules de moins d'une heure, des leçons de 10-15 min, uniquement ce qui fonctionne sur le terrain. Pas de hype, pas de théorie creuse — du concret, testé et mis à jour en continu. Distil est né de cette conviction : l'IA évolue trop vite pour des formations figées.",
      features: [
        {
          title: 'Cours courts et denses',
          description: "Chaque module fait moins d'une heure, chaque leçon 10-15 min. Pas de remplissage, que de l'essentiel.",
        },
        {
          title: 'Accès à vie + mises à jour',
          description: "Un seul achat, un accès permanent. Les cours sont mis à jour régulièrement pour suivre l'évolution de l'IA.",
        },
        {
          title: 'Contenu filtré et testé',
          description: "Veille permanente et tests en conditions réelles. Seul ce qui marche vraiment est enseigné.",
        },
        {
          title: 'Pensé pour les professionnels',
          description: "Pas besoin de background technique. Des résultats concrets applicables immédiatement dans son métier.",
        },
      ],
    },
    {
      id: 'gradly',
      slug: 'gradly',
      title: 'Gradly',
      shortDescription:
        "Temps administratif ÷ 3 : l'outil qui automatise les bulletins de compétences RNCP pour les centres de formation.",
      longDescription:
        "J'ai conçu Gradly pour résoudre un problème que je vivais au quotidien : les responsables pédagogiques passent des heures à produire manuellement des bulletins de compétences RNCP. Solution 100% offline pour garantir la souveraineté des données, import/export Excel/CSV, génération de bulletins PDF conformes aux référentiels. Compatible avec les ERP du marché (Yparéo). Résultat : le temps administratif divisé par 3.",
      technologies: ['No-code', 'Excel/CSV', 'PDF', 'Offline-first', 'ERP'],
      imageAlt: 'Interface de Gradly - gestion des bulletins RNCP',
      demoUrl: 'https://www.gradly.fr/',
      featured: true,
      status: 'active',
      period: '2023 — Aujourd\'hui',
      metrics: [
        { label: 'Temps admin', value: '÷ 3' },
        { label: 'Données', value: '100% offline' },
        { label: 'Compatibilité', value: 'Yparéo & ERP' },
      ],
      story: "Chaque semestre, je voyais la même scène se répéter : des coordinateurs pédagogiques enfermés dans leur bureau pendant des jours, copiant-collant des notes dans des tableaux Excel pour produire des bulletins de compétences conformes au RNCP. Des heures de travail répétitif, source d'erreurs et de frustration. Je me suis dit : \"Si je vis ce problème, des centaines d'autres le vivent aussi.\" J'ai commencé par un prototype pour mon propre usage. Puis les collègues l'ont voulu. Puis d'autres campus. Gradly est né de ce constat terrain — pas d'une étude de marché, mais d'une douleur réelle.",
      features: [
        {
          title: '100% offline — souveraineté des données',
          description: "Aucune donnée ne quitte la machine de l'utilisateur. Pas de cloud, pas de serveur, pas de risque RGPD. Les données des apprenants restent où elles doivent être.",
        },
        {
          title: 'Import intelligent',
          description: "Import direct depuis Excel, CSV ou les exports ERP (Yparéo). Gradly s'adapte aux formats existants — pas l'inverse.",
        },
        {
          title: 'Bulletins PDF conformes RNCP',
          description: "Génération automatique de bulletins de compétences conformes aux référentiels RNCP. Blocs, compétences, niveaux d'acquisition — tout est calculé et mis en forme.",
        },
        {
          title: 'Temps administratif divisé par 3',
          description: "Ce qui prenait des jours se fait maintenant en quelques heures. Les coordinateurs peuvent se concentrer sur l'accompagnement, pas sur la paperasse.",
        },
      ],
    },
    {
      id: 'innovation-pedagogique',
      slug: 'innovation-pedagogique',
      title: "Transformation digitale pédagogique",
      shortDescription:
        "Identification, conception et déploiement d'outils numériques qui ont transformé le fonctionnement de dizaines d'équipes pédagogiques.",
      longDescription:
        "En tant que coordinateur national au sein du réseau Compétences & Développement (IFAG, IEFT), j'ai mené la transformation digitale des outils pédagogiques. Pilotage de POC, analyse de données de satisfaction, veille EdTech permanente. Objectif : donner aux équipes pédagogiques les moyens de se concentrer sur l'essentiel — l'accompagnement des apprenants.",
      technologies: ['LMS', 'Analytics', 'Automatisation', 'POC', 'Veille EdTech'],
      imageAlt: 'Transformation digitale pédagogique',
      featured: true,
      status: 'active',
      period: '2022 — Aujourd\'hui',
      metrics: [
        { label: 'Campus', value: '10+' },
        { label: 'Outils déployés', value: '5+' },
        { label: 'Équipes impactées', value: 'Dizaines' },
      ],
    },
    {
      id: 'portfolio',
      slug: 'portfolio',
      title: 'Portfolio personnel',
      shortDescription:
        'Ce site web, conçu comme vitrine de mon parcours et de mes projets.',
      longDescription:
        'Portfolio personnel développé avec Astro et Tailwind CSS. Design moderne et minimaliste, bilingue français/anglais, responsive et accessible. Hébergé sur Vercel avec déploiement continu.',
      technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      imageAlt: 'Portfolio de Pierre Touzet',
      featured: false,
      status: 'active',
      period: '2025',
      metrics: [
        { label: 'Pages', value: '40+' },
        { label: 'Langues', value: '2' },
        { label: 'Lighthouse', value: '95+' },
      ],
    },
    {
      id: 'twitch-tech',
      slug: 'twitch-tech',
      title: 'Émission Twitch — Actu Tech',
      shortDescription:
        "Près d'un an d'émission hebdomadaire en live : prise de parole, technique de streaming et vulgarisation tech pour un public curieux.",
      longDescription:
        "Pendant près d'un an, j'ai animé une émission hebdomadaire en live sur Twitch dédiée à l'actualité tech au sens large. Recherche, préparation éditoriale, animation en direct et interaction avec la communauté. Ce que j'en ai tiré : la maîtrise des lives, la technique derrière le streaming, et surtout la prise de parole en public.",
      technologies: ['Twitch', 'Live', 'Vulgarisation', 'Veille tech'],
      imageAlt: 'Émission Twitch actu tech',
      featured: false,
      status: 'paused',
      period: '~1 an · Hebdomadaire',
      metrics: [
        { label: 'Durée', value: '~1 an' },
        { label: 'Rythme', value: 'Hebdo' },
        { label: 'Compétence', value: 'Prise de parole' },
      ],
    },
    {
      id: 'youtube-impots',
      slug: 'youtube-impots',
      title: 'YouTube — Vulgarisation fiscale',
      shortDescription:
        "~20 vidéos et Shorts pour expliquer simplement les impôts. La preuve que je peux vulgariser n'importe quel sujet — même la fiscalité.",
      longDescription:
        "Création d'une chaîne YouTube avec une vingtaine de vidéos et Shorts pour rendre la fiscalité accessible à tous. Une vidéo tous les 3 jours, du montage rapide aux algorithmes de la plateforme. Ce que j'en ai tiré : la compréhension des algorithmes de recommandation et la maîtrise du montage vidéo rapide.",
      technologies: ['YouTube', 'Shorts', 'Montage vidéo', 'Fiscalité'],
      imageAlt: 'Chaîne YouTube vulgarisation fiscale',
      featured: false,
      status: 'paused',
      period: '~20 vidéos · 1 tous les 3 jours',
      metrics: [
        { label: 'Vidéos', value: '~20' },
        { label: 'Rythme', value: '1 / 3 jours' },
        { label: 'Format', value: 'Shorts + long' },
      ],
    },
    {
      id: 'podcast',
      slug: 'podcast',
      title: 'Podcast — Actu Tech',
      shortDescription:
        "Podcast quotidien sur l'actualité tech pendant plusieurs mois. Un défi éditorial et technique avec un objectif : un rendu professionnel.",
      longDescription:
        "Conception, enregistrement et diffusion d'un podcast quotidien explorant l'actualité tech au sens large. Un rythme intense pendant plusieurs mois. Ce que j'en ai tiré : le plaisir de partager et la recherche constante d'un rendu professionnel.",
      technologies: ['Podcast', 'Audio', 'Production', 'Veille tech'],
      imageAlt: 'Podcast tech et innovation',
      featured: false,
      status: 'paused',
      period: 'Quelques mois · Quotidien',
      metrics: [
        { label: 'Rythme', value: 'Quotidien' },
        { label: 'Durée', value: 'Plusieurs mois' },
        { label: 'Qualité', value: 'Pro' },
      ],
    },
    {
      id: 'newsletter-tech',
      slug: 'newsletter-tech',
      title: 'Newsletter LinkedIn — Actu Tech',
      shortDescription:
        "~20 éditions hebdomadaires décryptant l'actu tech. Résultat : des lecteurs pas du tout technophiles accrochés au rendez-vous.",
      longDescription:
        "Rédaction et diffusion d'une newsletter hebdomadaire sur LinkedIn, couvrant l'actualité tech au sens large. Une vingtaine d'éditions publiées. Ce que j'en ai tiré : la capacité à accrocher des personnes pas du tout technophiles sur des sujets complexes.",
      technologies: ['LinkedIn', 'Newsletter', 'Rédaction', 'Veille tech'],
      imageAlt: 'Newsletter LinkedIn actu tech',
      featured: false,
      status: 'paused',
      period: '~20 éditions · Hebdomadaire',
      metrics: [
        { label: 'Éditions', value: '~20' },
        { label: 'Rythme', value: 'Hebdo' },
        { label: 'Audience', value: 'Non-tech' },
      ],
    },
    {
      id: 'ebook-ia-education',
      slug: 'ebook-ia-education',
      title: "Ebook — L'IA dans l'éducation",
      shortDescription:
        "Un ebook d'une dizaine de pages posant un regard de praticien sur l'IA générative en éducation. Finalisé, prêt à partager.",
      longDescription:
        "Rédaction d'un ebook sur l'IA dans l'éducation, croisant mon expérience terrain avec les enjeux de l'IA générative. Une dizaine de pages qui posent un avis de praticien, pas de théoricien. Ce que j'en ai tiré : le plaisir de poser mes idées sur papier et de structurer une pensée longue.",
      technologies: ['Rédaction', 'IA générative', 'Éducation'],
      imageAlt: "Ebook sur l'IA dans l'éducation",
      featured: true,
      status: 'active',
      period: 'Finalisé',
      metrics: [
        { label: 'Pages', value: '10' },
        { label: 'Angle', value: 'Praticien' },
        { label: 'Statut', value: 'Prêt' },
      ],
    },
    {
      id: 'accompagnement-entrepreneurial',
      slug: 'accompagnement-entrepreneurial',
      title: 'Accompagnement entrepreneurial & IA',
      shortDescription:
        "Accompagnement d'un entrepreneur de A à Z : création de micro-entreprise et montée en compétences sur l'IA générative.",
      longDescription:
        "Accompagnement complet d'un entrepreneur dans la création de sa micro-entreprise : structuration de l'offre, stratégie digitale et montée en compétences sur l'IA générative. Mission terminée. Ce que j'en ai tiré : le plaisir d'accompagner et de voir quelqu'un se lancer.",
      technologies: ['Consulting', 'IA générative', 'Stratégie', 'Mentorat'],
      imageAlt: 'Accompagnement entrepreneurial et IA',
      featured: false,
      status: 'archived',
      period: 'Mission terminée',
      metrics: [
        { label: 'Accompagné', value: '1 entrepreneur' },
        { label: 'Périmètre', value: 'De A à Z' },
        { label: 'Statut', value: 'Terminé' },
      ],
    },
  ],
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
  skillCategories: [
    {
      name: 'Ingénierie pédagogique',
      description: '15 ans à concevoir, déployer et certifier des programmes de formation.',
      icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
      skills: [
        { name: 'Conception de programmes', level: 95, highlighted: true },
        { name: 'Référentiels RNCP & Qualiopi', level: 95, highlighted: true, badge: 'Certifié' },
        { name: 'Évaluation des compétences', level: 90 },
        { name: 'Syllabi & blocs de compétences', level: 90 },
        { name: 'Innovation pédagogique', level: 85 },
        { name: 'Technologie éducative (EdTech)', level: 85 },
      ],
    },
    {
      name: 'Management & Pilotage',
      description: 'Pilotage opérationnel de programmes sur 6 campus nationaux.',
      icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
      skills: [
        { name: 'Coordination multi-campus', level: 90, highlighted: true, badge: '6 campus' },
        { name: 'Conduite du changement', level: 85, highlighted: true },
        { name: 'Management transversal', level: 85 },
        { name: 'Gestion de projet', level: 85 },
        { name: 'Pilotage de la qualité', level: 85 },
        { name: 'Pilotage budgétaire', level: 80 },
        { name: "Animation d'équipes", level: 85 },
        { name: 'Relations entreprises', level: 80 },
      ],
    },
    {
      name: 'Tech & Digital',
      description: "Création d'outils sur mesure et transformation digitale des process.",
      icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
      skills: [
        { name: 'RGPD & Protection des données', level: 85, highlighted: true, badge: 'DPO certifié CNIL' },
        { name: 'Automatisation de processus', level: 85, highlighted: true, badge: 'Temps admin ÷ 3' },
        { name: 'No-code / Low-code', level: 80 },
        { name: 'Veille technologique', level: 80 },
        { name: 'IA générative', level: 75 },
        { name: 'Administration systèmes', level: 75 },
        { name: "Développement d'outils", level: 70 },
      ],
    },
    {
      name: 'Outils & Méthodes',
      description: "Maîtrise des outils métier de l'enseignement supérieur privé.",
      icon: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085',
      skills: [
        { name: 'ERP pédagogiques (Yparéo)', level: 80, highlighted: true },
        { name: 'LMS / Plateformes pédagogiques', level: 80 },
        { name: 'Suite Office & Google Workspace', level: 95 },
        { name: 'Reporting & Tableaux de bord', level: 80 },
        { name: 'Analyse de données', level: 75 },
        { name: 'Graphisme & PAO', level: 70 },
      ],
    },
  ],
  education: [
    {
      institution: 'OpenClassrooms',
      degree: 'Certification',
      field: "Responsable d'Ingénierie pédagogique",
      startDate: '2025',
      endDate: '2025',
      description:
        'Technologie éducative et ingénierie pédagogique.',
    },
    {
      institution: 'Anaxil',
      degree: 'Certification',
      field: 'RGPD - Formation DPO & CIL labellisé CNIL',
      startDate: '2018',
      endDate: '2018',
      description:
        'Règlement Européen sur la Protection des Données. Correspondant Informatique et Libertés.',
    },
    {
      institution: 'Lycée du Hainaut',
      degree: 'Baccalauréat professionnel',
      field: 'Électrotechnique',
      startDate: '2006',
      endDate: '2007',
    },
  ],
  testimonials: [
    {
      name: 'Cyril Blanchet',
      role: "Directeur d'établissement",
      company: 'ICL IET — Campus de Lyon',
      quote: "Pierre est un professionnel complet, fiable et inspirant. Il a su faire preuve d'une rigueur exemplaire, d'une créativité juste et d'une capacité d'analyse pertinente. Sa gestion du stress, sa maîtrise de la conduite de projet et sa vision stratégique ont été déterminantes dans la réussite de notre démarche.",
    },
    {
      name: 'Za Nguyen',
      role: 'Responsable pédagogique',
      company: 'IHECF Montpellier',
      quote: "Pierre, c'est quelqu'un sur qui on peut vraiment compter : pro, impliqué, toujours prêt à aider. Il possède une excellente vision d'ensemble tout en prêtant attention aux détails, ce qui le rend particulièrement précieux au sein d'une équipe. Je recommande chaleureusement Pierre pour toute opportunité professionnelle.",
    },
    {
      name: 'Fanny Murer',
      role: 'Coordinatrice pédagogique nationale',
      company: 'ICL',
      quote: "J'ai particulièrement apprécié sa grande disponibilité et son sens de l'écoute. Structuré et rigoureux, il sait organiser et prioriser efficacement les projets. Pierre est très à l'aise avec les outils informatiques et contribue à fluidifier et moderniser les pratiques pédagogiques.",
    },
  ],
  keyMetrics: [
    { value: '15', label: "ans d'expérience" },
    { value: '6', label: 'campus pilotés' },
    { value: '400+', label: 'apprenants' },
    { value: '6+', label: 'formats de contenu explorés' },
  ],
  processSteps: [
    {
      number: '01',
      title: 'Observer',
      description: "J'écoute, j'audite, je comprends le vrai problème — pas celui qu'on me présente, celui qui se cache derrière.",
    },
    {
      number: '02',
      title: 'Concevoir',
      description: 'Je dessine une solution sur mesure, je prototype vite, je teste avec les utilisateurs avant de tout construire.',
    },
    {
      number: '03',
      title: 'Déployer',
      description: "Je forme les équipes, j'accompagne le changement et je ne lâche rien tant que l'adoption n'est pas réelle.",
    },
    {
      number: '04',
      title: 'Itérer',
      description: 'Je mesure les résultats, je collecte les retours et je recommence — parce qu\'un bon process vit et évolue.',
    },
  ],
  speakerTopics: [
    {
      title: "De technicien informatique à responsable de programmes : 15 ans de curiosité",
      abstract: "Un parcours non-linéaire, un bac pro en poche, et une conviction : la curiosité est le meilleur moteur de carrière. Retour d'expérience sur 15 ans de pivots, de prises de risque et de transformation — dans l'IT, la pédagogie et l'entrepreneuriat.",
      format: 'Conférence · 30-45 min',
      tags: ['Parcours', 'Multipotentialiste', 'Reconversion'],
    },
    {
      title: "Comment j'ai automatisé la gestion RNCP d'un réseau d'écoles",
      abstract: "Les coordinateurs pédagogiques passent des jours à produire des bulletins RNCP à la main. J'ai créé un outil pour diviser ce temps par 3. Retour concret sur l'identification du problème, le prototypage, le déploiement et les résultats.",
      format: 'Retour d\'expérience · 20-30 min',
      tags: ['EdTech', 'RNCP', 'Automatisation', 'Gradly'],
    },
    {
      title: "L'IA en éducation : un regard de praticien, pas de théoricien",
      abstract: "Tout le monde parle d'IA en éducation. Peu de gens l'utilisent vraiment au quotidien avec des apprenants. Ce que j'ai testé, ce qui marche, ce qui ne marche pas, et pourquoi il faut arrêter d'avoir peur.",
      format: 'Conférence · 30-45 min',
      tags: ['IA générative', 'Éducation', 'Pratique'],
    },
  ],
  funFacts: [
    { emoji: '🚀', text: 'Passionné de spatial — capable de parler de SpaceX pendant des heures' },
    { emoji: '💎', text: 'Créateur de bijoux à ses heures perdues' },
    { emoji: '🏃', text: 'Coureur régulier — le running comme soupape' },
    { emoji: '🧠', text: 'Multipotentialiste assumé — toujours 5 projets en parallèle' },
  ],
  services: [
    {
      title: 'Ingénierie pédagogique & certification',
      description: "Conception de programmes conformes aux exigences RNCP et Qualiopi, de la maquette à l'obtention de la certification.",
      examples: ['Maquettes & syllabi', 'Dossiers RNCP', 'Audits Qualiopi', 'Blocs de compétences'],
    },
    {
      title: 'Transformation digitale',
      description: "Identification, déploiement et adoption d'outils numériques pour les équipes pédagogiques et administratives.",
      examples: ['Déploiement LMS', 'Automatisation', 'Conduite du changement', 'Formation des équipes'],
    },
    {
      title: 'Création de contenu & vulgarisation',
      description: "Conception de contenus qui rendent le complexe accessible — vidéo, podcast, newsletter, ebook ou live.",
      examples: ['Vidéo & Shorts', 'Podcast', 'Newsletter', 'Ebook & guides'],
    },
    {
      title: 'Consulting IA & accompagnement',
      description: "Accompagnement sur l'intégration de l'IA générative dans vos process pédagogiques ou votre activité.",
      examples: ['Audit IA', 'Montée en compétences', 'Stratégie digitale', 'Mentorat'],
    },
  ],
  ui: {
    nav: {
      home: 'Accueil',
      experiences: 'Expériences',
      studio: 'Studio',
      skills: 'Compétences',
      contact: 'Contact',
      menuLabel: 'Ouvrir le menu',
    },
    hero: {
      cta: 'Découvrir mes projets',
      ctaSecondary: 'Me contacter',
      downloadCv: 'Télécharger mon CV',
    },
    sections: {
      studio: 'Studio',
      latestExperiences: 'Parcours',
      topSkills: 'Compétences clés',
      viewAll: 'Voir tout',
      allStudio: 'Tout le studio',
      allExperiences: 'Toutes les expériences',
      allSkills: 'Toutes les compétences',
      latestArticles: 'Derniers articles',
    },
    status: {
      label: 'Disponibilité',
      available: 'Consulting & Freelance',
    },
    project: {
      label: 'Projet',
      demo: 'Visiter le site',
      source: 'En savoir plus',
      backToStudio: 'Retour au studio',
      technologies: 'Outils & Technologies',
      visual: 'Visuel',
      metrics: 'Chiffres clés',
      story: "L'histoire",
      features: 'Fonctionnalités clés',
    },
    contact: {
      title: 'Travaillons ensemble',
      subtitle:
        "Besoin d'un regard expert sur vos programmes de formation, votre stratégie digitale ou vos process de certification ? Parlons-en.",
      emailMe: "M'envoyer un email",
      letsTalk: 'Parlons-en',
    },
    footer: {
      rights: 'Tous droits réservés.',
      builtWith: 'Fait main avec Astro, Tailwind & pas mal de café',
      legal: 'Mentions légales',
    },
    notFound: {
      title: 'Page introuvable',
      message: "Désolé, la page que vous cherchez n'existe pas.",
      backHome: "Retour à l'accueil",
    },
    testimonials: {
      title: 'Ils parlent de moi',
      subtitle: 'Recommandations LinkedIn',
    },
    process: {
      title: 'Comment je travaille',
      subtitle: 'Chaque projet suit la même logique — adaptée au contexte.',
    },
    services: {
      title: 'Ce que je peux faire pour vous',
      subtitle: 'Des compétences concrètes, mobilisables en mission ou en poste.',
    },
    speaker: {
      title: 'Interventions & conférences',
      subtitle: "Je parle de ce que je vis sur le terrain — pédagogie, IA, transformation digitale, parcours atypiques.",
      cta: "M'inviter à intervenir",
      format: 'Format',
    },
    ebook: {
      title: "L'IA dans l'éducation — Ebook gratuit",
      subtitle: "Un regard de praticien sur l'IA générative en éducation. 10 pages pour comprendre les vrais enjeux, sans jargon.",
      cta: 'Télécharger gratuitement',
      landing: {
        metaDescription: "Téléchargez gratuitement l'ebook de Pierre Touzet sur l'IA générative en éducation. 10 pages de retour d'expérience terrain, sans jargon.",
        heroSubtitle: "10 pages pour comprendre comment l'IA générative transforme l'éducation — avec un regard de praticien, pas de théoricien. Basé sur 15 ans d'expérience terrain.",
        formTitle: 'Télécharger gratuitement',
        formName: 'Votre prénom',
        formEmail: 'Votre email',
        formCta: "Recevoir l'ebook (PDF)",
        formSuccess: 'Votre téléchargement va commencer.',
        formSuccessDetail: "Si le téléchargement ne se lance pas automatiquement, cliquez sur le lien ci-dessous.",
        tocTitle: 'Ce que vous allez découvrir',
        tocItems: [
          "Pourquoi l'IA générative change la donne en éducation — au-delà du buzz",
          "Ce qui marche vraiment sur le terrain (et ce qui ne marche pas)",
          "Comment intégrer l'IA dans ses pratiques pédagogiques sans tout réinventer",
          "Les erreurs à éviter quand on débute avec l'IA en formation",
        ],
        credibilityTitle: "Pourquoi lire cet ebook",
        credibilityItems: [
          "Écrit par un praticien qui utilise l'IA au quotidien avec des apprenants",
          "Basé sur des expérimentations concrètes, pas des projections théoriques",
          "Applicable immédiatement — chaque chapitre propose des actions concrètes",
          "Gratuit, sans engagement, sans spam",
        ],
        testimonialQuote: "Pierre est quelqu'un sur qui on peut vraiment compter : pro, impliqué, toujours prêt à aider. Il possède une excellente vision d'ensemble tout en prêtant attention aux détails.",
        testimonialAuthor: "Za Nguyen",
        testimonialRole: "Responsable pédagogique — IHECF Montpellier",
        freeLabel: 'Gratuit',
        pagesLabel: '10 pages',
        formatLabel: 'PDF',
      },
    },
    hiring: {
      title: 'Vous recrutez ?',
      subtitle: "Découvrez pourquoi Pierre est le profil qu'il vous faut.",
      whyMe: 'Pourquoi moi',
    },
    consulting: {
      title: 'Vous cherchez un consultant ?',
      subtitle: 'Des missions concrètes, un process clair, des résultats mesurables.',
    },
    hello: {
      title: 'Enchanté !',
      subtitle: 'Pierre Touzet en 30 secondes.',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Réflexions sur l\'ingénierie pédagogique, l\'IA en éducation et l\'innovation digitale.',
      backToBlog: 'Retour au blog',
      empty: 'Aucun article pour le moment. Revenez bientôt !',
    },
    studio: {
      intro: "Un recueil de ce que je construis — cas d'usage détaillés et sites lancés, regroupés par univers.",
      caseStudyBadge: "Cas d'usage",
      liveSiteBadge: 'Site en ligne',
      clusterCountProjects: '{n} projets',
      clusterCountSites: '{n} sites',
    },
    education: 'Formation',
    scrollToTop: 'Remonter en haut',
    skipToContent: 'Aller au contenu',
    switchLang: 'Switch to English',
    toggleTheme: 'Changer de thème',
  },
};
