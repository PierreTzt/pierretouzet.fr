import type { SiteData } from './types';

export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: 'Pedagogical Engineering & Digital Innovation',
    description:
      '15 years bridging tech and education. I lead training programs across 6 national campuses and build tools that simplify everyday work for educational teams. Founder of Gradly. Available for consulting and freelance.',
    email: 'pierre.touzet@mecontacter.eu',
    location: 'Valenciennes, France',
    avatarAlt: 'Photo of Pierre Touzet',
  },
  social: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pierre-touzet/',
      icon: 'linkedin',
      label: "Pierre's LinkedIn profile",
    },
  ],
  experiences: [
    {
      id: 'ieft-director',
      company: 'IEFT - Tourism Management School',
      position: 'National Program Director',
      startDate: '2024-01',
      endDate: 'Present',
      description:
        'Leading programs, quality assurance and faculty across 6 national campuses (Paris, Lyon, Bordeaux, Nantes, Montpellier, Le Mans) for approximately 500 learners.',
      achievements: [
        'Harmonized academic frameworks across 6 campuses: unified curricula, assessments and methods',
        'Deployed new programs from design to launch',
        'Designed syllabi, competency blocks and RNCP-compliant evaluation grids',
        'Prepared and obtained certification and jury files (RNCP, Qualiopi)',
        'Cross-functional management of coordinators and pedagogical directors',
        'Budget oversight and program profitability optimization',
      ],
      technologies: ['RNCP', 'Qualiopi', 'Instructional Design', 'Management', 'Certification'],
    },
    {
      id: 'ifag-coordinator',
      company: 'IFAG / Compétences & Développement',
      position: 'National Pedagogical Coordinator',
      startDate: '2022-04',
      endDate: '2024-01',
      description:
        'Digital transformation of pedagogical tools across a national school network. Identification, testing and deployment of innovative solutions for field teams.',
      achievements: [
        'Deployed digital tools adopted across all campuses in the network',
        'Custom-built tools to automate recurring tasks',
        'EdTech watch and POC management on innovative solutions',
        'Led cross-campus working groups',
        'Implemented data-driven quality tracking indicators for training programs',
      ],
      technologies: ['Digital Tools', 'LMS', 'Data', 'Innovation', 'Quality'],
    },
    {
      id: 'icm-office-manager',
      company: 'ICM Aulnoye Aymeries',
      position: 'Executive Office Manager & IT Technician',
      startDate: '2010-10',
      endDate: '2021-11',
      description:
        '11 years wearing two hats: administrative and operational management + full IT infrastructure ownership (N1-N3 support, migration, security).',
      achievements: [
        'Created procurement processes: rationalized supplier panel and achieved OTD > 90%',
        'Full IT park migration to Windows 10',
        'N1, N2 and N3 IT support for all users',
        'Billing management, client follow-up and reporting',
        'Graphic design (brochures, flyers) and social media management',
      ],
      technologies: ['IT Support', 'Management', 'Process', 'Windows', 'Design'],
    },
  ],
  projects: [
    {
      slug: 'gradly',
      title: 'Gradly',
      shortDescription:
        'Admin time ÷ 3: the tool that automates RNCP competency bulletins for training centers.',
      longDescription:
        "I built Gradly to solve a problem I lived every day: program directors spending hours manually producing RNCP competency bulletins. A 100% offline solution ensuring data sovereignty, Excel/CSV import/export, and compliant PDF bulletin generation. Compatible with market ERPs (Yparéo). Result: administrative time divided by 3.",
      technologies: ['No-code', 'Excel/CSV', 'PDF', 'Offline-first', 'ERP'],
      imageAlt: 'Gradly interface - RNCP bulletin management',
      demoUrl: 'https://www.gradly.fr/',
      featured: true,
    },
    {
      slug: 'pedagogical-innovation',
      title: 'Pedagogical Digital Transformation',
      shortDescription:
        'Identification, design and deployment of digital tools that transformed how dozens of educational teams operate.',
      longDescription:
        "As national coordinator within the Compétences & Développement network (IFAG, IEFT), I led the digital transformation of pedagogical tools. POC management, satisfaction data analysis, permanent EdTech watch. Goal: give educational teams the means to focus on what matters most — supporting learners.",
      technologies: ['LMS', 'Analytics', 'Automation', 'POC', 'EdTech Watch'],
      imageAlt: 'Pedagogical digital transformation',
      featured: true,
    },
    {
      slug: 'portfolio',
      title: 'Personal Portfolio',
      shortDescription:
        'This website, designed as a showcase for my career and projects.',
      longDescription:
        'Personal portfolio built with Astro and Tailwind CSS. Modern and minimalist design, bilingual French/English, responsive and accessible. Hosted on Vercel with continuous deployment.',
      technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      imageAlt: "Pierre Touzet's portfolio",
      featured: false,
    },
  ],
  skillCategories: [
    {
      name: 'Instructional Design',
      skills: [
        { name: 'Program Design', level: 95 },
        { name: 'RNCP & Qualiopi Standards', level: 95 },
        { name: 'Competency Assessment', level: 90 },
        { name: 'Syllabi & Competency Blocks', level: 90 },
        { name: 'Pedagogical Innovation', level: 85 },
      ],
    },
    {
      name: 'Management & Leadership',
      skills: [
        { name: 'Multi-campus Coordination', level: 90 },
        { name: 'Cross-functional Management', level: 85 },
        { name: 'Budget Oversight', level: 80 },
        { name: 'Team Leadership', level: 85 },
        { name: 'Corporate Relations', level: 80 },
      ],
    },
    {
      name: 'Tech & Digital',
      skills: [
        { name: 'No-code / Low-code', level: 80 },
        { name: 'Generative AI', level: 75 },
        { name: 'System Administration', level: 75 },
        { name: 'GDPR & Data Protection', level: 85 },
        { name: 'Tool Development', level: 70 },
      ],
    },
    {
      name: 'Tools & Methods',
      skills: [
        { name: 'Office Suite & Google Workspace', level: 95 },
        { name: 'Pedagogical ERP (Yparéo)', level: 80 },
        { name: 'Data Analysis', level: 75 },
        { name: 'Graphic Design', level: 70 },
      ],
    },
  ],
  education: [
    {
      institution: 'OpenClassrooms',
      degree: 'Certification',
      field: 'Instructional Design Manager',
      startDate: '2025',
      endDate: '2025',
      description:
        'Educational technology and instructional design.',
    },
    {
      institution: 'Anaxil',
      degree: 'Certification',
      field: 'GDPR - DPO Training & CNIL-certified CIL',
      startDate: '2018',
      endDate: '2018',
      description:
        'European General Data Protection Regulation. Data Protection Officer.',
    },
    {
      institution: 'Lycée du Hainaut',
      degree: 'Professional Baccalaureate',
      field: 'Electrical Engineering',
      startDate: '2006',
      endDate: '2007',
    },
  ],
  ui: {
    nav: {
      home: 'Home',
      experiences: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      menuLabel: 'Open menu',
    },
    hero: {
      cta: 'Discover my projects',
      ctaSecondary: 'Contact me',
    },
    sections: {
      latestProjects: 'Recent Projects',
      latestExperiences: 'Background',
      topSkills: 'Key Skills',
      viewAll: 'View all',
      allProjects: 'All Projects',
      allExperiences: 'All Experience',
      allSkills: 'All Skills',
    },
    status: {
      label: 'Availability',
      available: 'Consulting & Freelance',
    },
    project: {
      label: 'Project',
      demo: 'Visit website',
      source: 'Learn more',
      backToProjects: '← Back to projects',
      technologies: 'Tools & Technologies',
      visual: 'Visual',
    },
    contact: {
      title: "Let's work together",
      subtitle:
        "Need expert insight on your training programs, digital strategy or certification processes? Let's talk.",
      emailMe: 'Send me an email',
      letsTalk: "Let's talk",
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with Astro & Tailwind CSS',
    },
    notFound: {
      title: 'Page Not Found',
      message: "Sorry, the page you're looking for doesn't exist.",
      backHome: 'Back to home',
    },
    education: 'Education',
    scrollToTop: 'Scroll to top',
    skipToContent: 'Skip to content',
    switchLang: 'Passer en français',
    toggleTheme: 'Toggle theme',
  },
};
