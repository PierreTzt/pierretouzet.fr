import type { SiteData } from './types';

export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: 'Ingénierie pédagogique & Innovation digitale',
    description:
      "15 ans à la croisée de la tech et de la pédagogie. Je pilote les programmes de formation de 6 campus nationaux et je crée des outils qui simplifient le quotidien des équipes pédagogiques. Fondateur de Gradly. Disponible en consulting et freelance.",
    email: 'pierre.touzet@mecontacter.eu',
    location: 'Valenciennes, France',
    avatarAlt: 'Photo de Pierre Touzet',
  },
  social: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pierre-touzet/',
      icon: 'linkedin',
      label: 'Profil LinkedIn de Pierre',
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
        "Pilotage des programmes, de la qualité et du corps professoral sur 6 campus nationaux (Paris, Lyon, Bordeaux, Nantes, Montpellier, Le Mans) pour environ 500 apprenants.",
      achievements: [
        'Harmonisation pédagogique sur 6 campus : maquettes, évaluations et modalités unifiées',
        "Déploiement de nouveaux programmes de la conception à l'ouverture",
        "Conception des syllabi, blocs de compétences et grilles d'évaluation conformes RNCP",
        'Préparation et obtention des dossiers de certification et jurys (RNCP, Qualiopi)',
        'Management transversal des coordinateurs et responsables pédagogiques',
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
        "Transformation digitale des outils pédagogiques au sein d'un réseau national d'écoles. Identification, test et déploiement de solutions innovantes pour les équipes terrain.",
      achievements: [
        "Déploiement d'outils numériques adoptés par l'ensemble des campus du réseau",
        "Développement sur mesure d'outils pour automatiser les tâches récurrentes",
        'Veille EdTech et pilotage de POC sur des solutions innovantes',
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
        "11 ans en double casquette : pilotage administratif et opérationnel de l'entreprise + gestion complète de l'infrastructure IT (support N1 à N3, migration, sécurisation).",
      achievements: [
        "Création et mise en place de process d'approvisionnement : rationalisation du panel fournisseurs et livraisons OTD > 90%",
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
    },
    {
      slug: 'innovation-pedagogique',
      title: "Transformation digitale pédagogique",
      shortDescription:
        "Identification, conception et déploiement d'outils numériques qui ont transformé le fonctionnement de dizaines d'équipes pédagogiques.",
      longDescription:
        "En tant que coordinateur national au sein du réseau Compétences & Développement (IFAG, IEFT), j'ai mené la transformation digitale des outils pédagogiques. Pilotage de POC, analyse de données de satisfaction, veille EdTech permanente. Objectif : donner aux équipes pédagogiques les moyens de se concentrer sur l'essentiel — l'accompagnement des apprenants.",
      technologies: ['LMS', 'Analytics', 'Automatisation', 'POC', 'Veille EdTech'],
      imageAlt: 'Transformation digitale pédagogique',
      featured: true,
    },
    {
      slug: 'portfolio',
      title: 'Portfolio personnel',
      shortDescription:
        'Ce site web, conçu comme vitrine de mon parcours et de mes projets.',
      longDescription:
        'Portfolio personnel développé avec Astro et Tailwind CSS. Design moderne et minimaliste, bilingue français/anglais, responsive et accessible. Hébergé sur Vercel avec déploiement continu.',
      technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      imageAlt: 'Portfolio de Pierre Touzet',
      featured: false,
    },
  ],
  skillCategories: [
    {
      name: 'Ingénierie pédagogique',
      skills: [
        { name: 'Conception de programmes', level: 95 },
        { name: 'Référentiels RNCP & Qualiopi', level: 95 },
        { name: 'Évaluation des compétences', level: 90 },
        { name: 'Syllabi & blocs de compétences', level: 90 },
        { name: 'Innovation pédagogique', level: 85 },
      ],
    },
    {
      name: 'Management & Pilotage',
      skills: [
        { name: 'Coordination multi-campus', level: 90 },
        { name: 'Management transversal', level: 85 },
        { name: 'Pilotage budgétaire', level: 80 },
        { name: "Animation d'équipes", level: 85 },
        { name: 'Relations entreprises', level: 80 },
      ],
    },
    {
      name: 'Tech & Digital',
      skills: [
        { name: 'No-code / Low-code', level: 80 },
        { name: 'IA générative', level: 75 },
        { name: 'Administration systèmes', level: 75 },
        { name: 'RGPD & Protection des données', level: 85 },
        { name: "Développement d'outils", level: 70 },
      ],
    },
    {
      name: 'Outils & Méthodes',
      skills: [
        { name: 'Suite Office & Google Workspace', level: 95 },
        { name: 'ERP pédagogiques (Yparéo)', level: 80 },
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
  ui: {
    nav: {
      home: 'Accueil',
      experiences: 'Expériences',
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact',
      menuLabel: 'Ouvrir le menu',
    },
    hero: {
      cta: 'Découvrir mes projets',
      ctaSecondary: 'Me contacter',
    },
    sections: {
      latestProjects: 'Projets récents',
      latestExperiences: 'Parcours',
      topSkills: 'Compétences clés',
      viewAll: 'Voir tout',
      allProjects: 'Tous les projets',
      allExperiences: 'Toutes les expériences',
      allSkills: 'Toutes les compétences',
    },
    status: {
      label: 'Disponibilité',
      available: 'Consulting & Freelance',
    },
    project: {
      label: 'Projet',
      demo: 'Visiter le site',
      source: 'En savoir plus',
      backToProjects: '← Retour aux projets',
      technologies: 'Outils & Technologies',
      visual: 'Visuel',
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
      builtWith: 'Construit avec Astro & Tailwind CSS',
    },
    notFound: {
      title: 'Page introuvable',
      message: "Désolé, la page que vous cherchez n'existe pas.",
      backHome: "Retour à l'accueil",
    },
    education: 'Formation',
    scrollToTop: 'Remonter en haut',
    skipToContent: 'Aller au contenu',
    switchLang: 'Switch to English',
    toggleTheme: 'Changer de thème',
  },
};
