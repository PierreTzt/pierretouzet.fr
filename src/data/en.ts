import type { SiteData } from './types';

export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: 'I believe education can change the world.',
    description:
      "So I make the complex accessible. 15 years across IT, education and digital innovation — I manage 6 national campuses, built Gradly, and I break down anything I get my hands on. Available for consulting and freelance.",
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
      metrics: [
        { label: 'Admin time', value: '÷ 3' },
        { label: 'Data', value: '100% offline' },
        { label: 'Compatibility', value: 'Yparéo & ERP' },
      ],
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
      metrics: [
        { label: 'Campuses', value: '10+' },
        { label: 'Tools deployed', value: '5+' },
        { label: 'Teams impacted', value: 'Dozens' },
      ],
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
      description: '15 years designing, deploying and certifying training programs.',
      icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
      skills: [
        { name: 'Program Design', level: 95, highlighted: true },
        { name: 'RNCP & Qualiopi Standards', level: 95, highlighted: true, badge: 'Certified' },
        { name: 'Competency Assessment', level: 90 },
        { name: 'Syllabi & Competency Blocks', level: 90 },
        { name: 'Pedagogical Innovation', level: 85 },
        { name: 'Educational Technology (EdTech)', level: 85 },
      ],
    },
    {
      name: 'Management & Leadership',
      description: 'Operational oversight of programs across 6 national campuses.',
      icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
      skills: [
        { name: 'Multi-campus Coordination', level: 90, highlighted: true, badge: '6 campuses' },
        { name: 'Change Management', level: 85, highlighted: true },
        { name: 'Cross-functional Management', level: 85 },
        { name: 'Project Management', level: 85 },
        { name: 'Quality Management', level: 85 },
        { name: 'Budget Oversight', level: 80 },
        { name: 'Team Leadership', level: 85 },
        { name: 'Corporate Relations', level: 80 },
      ],
    },
    {
      name: 'Tech & Digital',
      description: 'Building custom tools and driving digital transformation.',
      icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
      skills: [
        { name: 'GDPR & Data Protection', level: 85, highlighted: true, badge: 'CNIL-certified DPO' },
        { name: 'Process Automation', level: 85, highlighted: true, badge: 'Admin time ÷ 3' },
        { name: 'No-code / Low-code', level: 80 },
        { name: 'Technology Watch', level: 80 },
        { name: 'Generative AI', level: 75 },
        { name: 'System Administration', level: 75 },
        { name: 'Tool Development', level: 70 },
      ],
    },
    {
      name: 'Tools & Methods',
      description: 'Mastery of the tools used in private higher education.',
      icon: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085',
      skills: [
        { name: 'Pedagogical ERP (Yparéo)', level: 80, highlighted: true },
        { name: 'LMS / Learning Platforms', level: 80 },
        { name: 'Office Suite & Google Workspace', level: 95 },
        { name: 'Reporting & Dashboards', level: 80 },
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
  testimonials: [
    {
      name: 'Cyril Blanchet',
      role: 'Campus Director',
      company: 'ICL IET — Lyon Campus',
      quote: "Pierre is a well-rounded professional — reliable and inspiring. He demonstrated exemplary rigor, well-placed creativity and sharp analytical skills. His stress management, project leadership and strategic vision were decisive in the success of our initiative.",
    },
    {
      name: 'Za Nguyen',
      role: 'Academic Coordinator',
      company: 'IHECF Montpellier',
      quote: "Pierre is someone you can truly count on: professional, committed, always willing to help. He has an excellent big-picture vision while paying attention to detail, which makes him particularly valuable within a team. I warmly recommend Pierre for any professional opportunity.",
    },
    {
      name: 'Fanny Murer',
      role: 'National Pedagogical Coordinator',
      company: 'ICL',
      quote: "I particularly appreciated his great availability and listening skills. Structured and rigorous, he knows how to organize and prioritize projects effectively. Pierre is very comfortable with digital tools and helps streamline and modernize pedagogical practices.",
    },
  ],
  keyMetrics: [
    { value: '15', label: 'years of experience' },
    { value: '6', label: 'campuses managed' },
    { value: '400+', label: 'learners' },
    { value: '6+', label: 'content formats explored' },
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
      downloadCv: 'Download my CV',
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
      metrics: 'Key figures',
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
      legal: 'Legal notice',
    },
    notFound: {
      title: 'Page Not Found',
      message: "Sorry, the page you're looking for doesn't exist.",
      backHome: 'Back to home',
    },
    testimonials: {
      title: 'What they say',
      subtitle: 'LinkedIn Recommendations',
    },
    education: 'Education',
    scrollToTop: 'Scroll to top',
    skipToContent: 'Skip to content',
    switchLang: 'Passer en français',
    toggleTheme: 'Toggle theme',
  },
};
