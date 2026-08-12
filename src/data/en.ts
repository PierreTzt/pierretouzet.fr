import type { SiteData } from './types';

export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: 'Instructional design and code.',
    description:
      'Head of national programs across 6 campuses. Alongside that, a workshop: bets built with AI, one of them earning revenue. The ledger is public, failures included.',
    signature: 'Intent before the tool.',
    email: 'pierre.touzet@mecontacter.eu',
    location: 'Valenciennes, France',
    avatarAlt: 'Photo of Pierre Touzet',
  },
  social: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pierre-touzet/',
      icon: 'linkedin',
      label: "Pierre's LinkedIn profile (opens in new tab)",
    },
  ],
  experiences: [
    {
      id: 'ieft-director',
      company: 'IEFT - Tourism Management School',
      position: 'Head of National Programs',
      startDate: '2026-01',
      endDate: 'Present',
      description:
        'Promoted after two years as national coordinator. I lead the academic strategy across 6 campuses, with a team of 11 on the ground and around 400 learners.',
      achievements: [
        'Cross-functional management of a team of 11 coordinators and academic directors',
        'Deployed new programs from design to launch, driving significant enrollment growth',
        'Budget oversight and program profitability optimization',
      ],
      technologies: ['Academic Strategy', 'Management', 'Budget Oversight', 'RNCP'],
    },
    {
      id: 'ieft-coordinator',
      company: 'IEFT - Tourism Management School',
      position: 'National Pedagogical Coordinator',
      startDate: '2024-01',
      endDate: '2026-01',
      description:
        'Brought in to structure programs for a fast-growing tourism school: harmonizing curricula across 6 campuses, RNCP compliance and securing certifications.',
      achievements: [
        'Full academic harmonization across 6 campuses: unified curricula, assessments and methods where each campus used to do things differently',
        'Designed syllabi, competency blocks and RNCP-compliant evaluation grids',
        "Secured certification and jury approvals (RNCP, Qualiopi — France's mandatory quality label for training providers)",
      ],
      technologies: ['RNCP', 'Qualiopi', 'Instructional Design', 'Certification'],
    },
    {
      id: 'ifag-coordinator',
      company: 'IFAG / Compétences & Développement',
      position: 'National Pedagogical Coordinator',
      startDate: '2022-04',
      endDate: '2024-01',
      description:
        'Hired for an admin role, my manager saw a tech expert in me and helped me evolve. In under 2 years, I led the digital transformation of pedagogical tools across a 28-campus network — with 100% adoption.',
      achievements: [
        'Deployed digital tools across all 28 campuses in the network — 100% adoption rate',
        'Custom-built automation tools for recurring tasks (including early Gradly prototypes)',
        'Permanent EdTech watch and POC management on innovative solutions',
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
        '11 years wearing two hats in a 2-person company: full operational management + IT infrastructure ownership. My biggest project: a complete overhaul of the supplier procurement system. After transforming everything, I was ready for a new challenge.',
      achievements: [
        'Complete overhaul of the procurement system: rationalized supplier panel and achieved OTD > 90%',
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
      id: 'distil-academy',
      slug: 'distil-academy',
      title: 'Distil Academy',
      shortDescription:
        'Online training platform for generative AI: short, dense, up-to-date courses to skill up fast.',
      longDescription:
        'I built Distil out of frustration: AI courses are either too long or already outdated. Distil cuts through the noise and keeps only what works. 25 modules, 42 lessons of 10-15 min each, lifetime access. Condensed pedagogy designed for professionals who want real results without spending months.',
      technologies: ['Astro', 'Tailwind CSS', 'Vercel', 'PostHog'],
      imageAlt: 'Distil Academy interface - AI training platform',
      demoUrl: 'https://www.distil.academy/',
      featured: true,
      status: 'relaunching',
      period: '2026 — Present',
      metrics: [
        { label: 'Format', value: '10-15 min lessons' },
        { label: 'Access', value: 'Lifetime' },
      ],
      story:
        "Available AI courses always frustrated me: either outdated YouTube videos or €2,000 programs recycling the same content. I thought: what if I built the course I wish I'd taken? Modules under one hour, 10-15 min lessons, only what works in the field. No hype, no hollow theory — just concrete, field-tested content. Distil was born from this conviction: AI moves too fast for static courses.",
      features: [
        {
          title: 'Short, dense courses',
          description:
            'Each module is under one hour, each lesson 10-15 min. No filler, just the essentials.',
        },
        {
          title: 'Lifetime access + updates',
          description:
            'One purchase, permanent access. Courses will be refreshed at relaunch, to keep pace with AI evolution.',
        },
        {
          title: 'Filtered, tested content',
          description:
            'Continuous monitoring and real-world testing. Only what actually works gets taught.',
        },
        {
          title: 'Built for professionals',
          description:
            'No technical background needed. Concrete results you can apply immediately in your work.',
        },
      ],
    },
    {
      id: 'gradly',
      slug: 'gradly',
      title: 'Gradly',
      shortDescription: 'The tool that automates RNCP competency bulletins for training centers.',
      longDescription:
        'I built Gradly to solve a problem I lived every day: program directors spending hours manually producing RNCP competency bulletins. A 100% offline solution ensuring data sovereignty, Excel/CSV import/export, and compliant PDF bulletin generation. Compatible with market ERPs (Yparéo).',
      technologies: ['No-code', 'Excel/CSV', 'PDF', 'Offline-first', 'ERP'],
      imageAlt: 'Gradly interface - RNCP bulletin management',
      demoUrl: 'https://www.gradly.fr/',
      featured: true,
      status: 'unsold',
      period: '2023 — Present',
      metrics: [
        { label: 'Data', value: '100% offline' },
        { label: 'Compatibility', value: 'Yparéo & ERP' },
      ],
      story:
        'Every semester, I watched the same scene unfold: academic coordinators locked in their offices for days, copy-pasting grades into Excel spreadsheets to produce RNCP-compliant competency bulletins. Hours of repetitive work, prone to errors and frustration. I thought: "If I\'m living this problem, hundreds of others are too." I started with a prototype for my own use, with the idea of extending it to other coordinators, then other campuses. Gradly was born from this field observation — not from a market study, but from real pain.',
      features: [
        {
          title: '100% offline — data sovereignty',
          description:
            "No data ever leaves the user's machine. No cloud, no server, no GDPR risk. Learner data stays where it belongs.",
        },
        {
          title: 'Smart import',
          description:
            'Direct import from Excel, CSV or ERP exports (Yparéo). Gradly adapts to existing formats — not the other way around.',
        },
        {
          title: 'RNCP-compliant PDF bulletins',
          description:
            'Automatic generation of competency bulletins that comply with RNCP standards. Blocks, competencies, acquisition levels — everything is calculated and formatted.',
        },
        {
          title: 'Administrative time, automated',
          description:
            'Replaces hours of copy-pasting in Excel with automatic generation. The goal: free coordinators for supporting learners, not paperwork.',
        },
      ],
    },
    {
      id: 'innovation-pedagogique',
      slug: 'pedagogical-innovation',
      title: 'Pedagogical Digital Transformation',
      shortDescription:
        'Identification, design and deployment of digital tools that transformed how dozens of educational teams operate.',
      longDescription:
        'As national coordinator within the Compétences & Développement network (IFAG, IEFT), I led the digital transformation of pedagogical tools. POC management, satisfaction data analysis, permanent EdTech watch. Goal: give educational teams the means to focus on what matters most — supporting learners.',
      technologies: ['LMS', 'Analytics', 'Automation', 'POC', 'EdTech Watch'],
      imageAlt: 'Pedagogical digital transformation',
      featured: true,
      status: 'active',
      period: '2022 — Present',
      metrics: [
        { label: 'Campuses', value: '10+' },
        { label: 'Tools deployed', value: '5+' },
        { label: 'Teams impacted', value: 'Dozens' },
      ],
    },
    {
      id: 'portfolio',
      slug: 'portfolio',
      title: 'Personal Portfolio',
      shortDescription: 'This website, designed as a showcase for my career and projects.',
      longDescription:
        'Personal portfolio built with Astro and Tailwind CSS. Modern and minimalist design, bilingual French/English, responsive and accessible. Hosted on Vercel with continuous deployment.',
      technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      imageAlt: "Pierre Touzet's portfolio",
      featured: false,
      status: 'active',
      period: '2025',
      metrics: [
        { label: 'Pages', value: '40+' },
        { label: 'Languages', value: '2' },
        { label: 'Lighthouse', value: '95+' },
      ],
    },
    {
      id: 'esport-tycoon',
      slug: 'esport-tycoon',
      title: 'Esport Tycoon',
      shortDescription:
        'Idle management game, "from bedroom to worldwide": recruit, train and grow an esports organization. Shipped and maintained on the App Store.',
      longDescription:
        'A mobile management game where you build an esports organization from scratch: recruiting and training players, tournaments, seasonal leagues with promotion and relegation, global leaderboards and idle progression. Designed, built and published solo on the App Store, then maintained continuously. For me, a real-world testbed for the progression and motivation mechanics I use in instructional design.',
      technologies: [
        'iOS',
        'Game design',
        'Progression systems',
        'Live ops',
        'Cloud saves',
        'In-app purchases',
      ],
      imageAlt: 'Screenshot of the Esport Tycoon game',
      demoUrl: 'https://apps.apple.com/app/esport-tycoon/id6772518711',
      featured: false,
      status: 'revenue',
      period: '2026 — Present',
      metrics: [
        { label: 'Platform', value: 'App Store' },
        { label: 'Updates', value: 'Ongoing' },
        { label: 'Genre', value: 'Idle management' },
      ],
      story:
        "I wanted to find out whether I could design and ship a real game on my own — not a prototype. Esport Tycoon started from a fascination with progression loops: what makes you want to come back, improve, reach the next tier? Those are exactly the questions I ask in instructional design. So I treated the game as a lab: design a motivation system, put it in real players' hands, observe, adjust. The result is live on the App Store and I keep evolving it.",
      features: [
        {
          title: 'Progression & mastery',
          description:
            'Recruit, train and fuse players, and grow your organization from a single room to the world stage. The core of the game is a long-term progression system.',
        },
        {
          title: 'Leagues & competition',
          description:
            'Single-elimination tournaments, seasonal leagues with promotion and relegation, and global leaderboards. Fresh goals to keep motivation alive.',
        },
        {
          title: 'Idle progression',
          description:
            'Earnings continue offline. A retention loop designed for daily return, without frustration.',
        },
        {
          title: 'Shipped and maintained',
          description:
            'Designed, built and released solo on the App Store, then kept alive with regular updates. A living product, not a demo.',
        },
      ],
    },
    {
      id: 'glyfo',
      slug: 'glyfo',
      title: 'Glyfo',
      shortDescription:
        'The daily word game: one shared grid for everyone, streaks and a leaderboard. Available on iOS and Android.',
      longDescription:
        "A daily word game: everyone plays the same grid each day, linking neighboring letters to form words and climb the leaderboard. Streaks, statistics and personal records keep you coming back. On the learning side, it's the very grammar of microlearning: short, daily, measured practice — consistency over intensity.",
      technologies: ['iOS', 'Android', 'Web', 'Daily content', 'Leaderboards', 'Habit design'],
      imageAlt: 'Grid of the Glyfo word game',
      demoUrl: 'https://pierretzt.github.io/glyfo/',
      featured: false,
      status: 'published',
      period: '2026 — Present',
      metrics: [
        { label: 'Platforms', value: 'iOS · Android' },
        { label: 'Cadence', value: 'One grid / day' },
        { label: 'Languages', value: 'FR · EN' },
      ],
      story:
        "Glyfo grew out of a belief I defend in training: consistency beats intensity. One grid a day, the same for everyone, playable in a few minutes — and a streak that rewards coming back. That's exactly the engine behind the best learning apps (daily practice, habit, instant feedback), applied to a word game. I designed it to be fair: everyone faces the same grid, so scores are comparable.",
      features: [
        {
          title: 'One grid for everyone, every day',
          description:
            'The same daily grid for all players: comparable scores and a shared ritual. The heart of habit design.',
        },
        {
          title: 'Streaks & consistency',
          description:
            'Streak tracking rewards daily practice — the same lever learning apps use to build a habit.',
        },
        {
          title: 'Stats & records',
          description:
            'Statistics and personal records to visualize your progress over time and sustain motivation.',
        },
        {
          title: 'Frictionless',
          description:
            'No account, no email. Open it and play. Accessibility in service of consistency.',
        },
      ],
    },
  ],
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
      status: 'poc',
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
      status: 'poc',
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
      status: 'poc',
    },
  ],
  studioClusters: [
    {
      id: 'games-engagement',
      title: 'Games & engagement design',
      description:
        'Two published mobile games, built as a lab for engagement, progression and habit mechanics — the same levers I apply to learning.',
      verdict: 'The only sector that paid.',
      entries: [
        { kind: 'project', projectSlug: 'esport-tycoon' },
        { kind: 'project', projectSlug: 'glyfo' },
      ],
    },
    {
      id: 'education-pedagogy',
      title: 'Education & pedagogy',
      description: 'Platforms and case studies to reshape the learning experience.',
      verdict: 'One product unsold, another converting a little. Relaunch under way.',
      entries: [
        { kind: 'project', projectSlug: 'distil-academy' },
        { kind: 'project', projectSlug: 'gradly' },
        { kind: 'project', projectSlug: 'pedagogical-innovation' },
      ],
    },
    {
      id: 'around-grief',
      title: 'Around grief',
      description:
        'Three bets in a single sector: built, shipped, never commercially launched. Sector tested, then set aside.',
      verdict: 'Three bets, sector set aside before launch.',
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
      entries: [{ kind: 'project', projectSlug: 'portfolio' }],
    },
  ],
  skillCategories: [
    {
      name: 'Instructional Design',
      description: '15 years designing, deploying and certifying training programs.',
      icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
      skills: [
        { name: 'Program Design', highlighted: true },
        { name: 'RNCP & Qualiopi Standards', highlighted: true, badge: 'Certified' },
        { name: 'Competency Assessment' },
        { name: 'Syllabi & Competency Blocks' },
        { name: 'Pedagogical Innovation' },
        { name: 'Educational Technology (EdTech)' },
      ],
    },
    {
      name: 'Management & Leadership',
      description: 'Operational oversight of programs across 6 national campuses.',
      icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
      skills: [
        { name: 'Multi-campus Coordination', highlighted: true, badge: '6 campuses' },
        { name: 'Change Management', highlighted: true },
        { name: 'Cross-functional Management' },
        { name: 'Project Management' },
        { name: 'Quality Management' },
        { name: 'Budget Oversight' },
        { name: 'Team Leadership' },
        { name: 'Corporate Relations' },
      ],
    },
    {
      name: 'Tech & Digital',
      description: 'Building custom tools and driving digital transformation.',
      icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
      skills: [
        {
          name: 'GDPR & Data Protection',
          highlighted: true,
          badge: 'Certified DPO (CNIL, France)',
        },
        { name: 'Process Automation', highlighted: true },
        { name: 'No-code / Low-code' },
        { name: 'Technology Watch' },
        { name: 'Generative AI' },
        { name: 'System Administration' },
        { name: 'Tool Development' },
      ],
    },
    {
      name: 'Tools & Methods',
      description: 'Mastery of the tools used in private higher education.',
      icon: 'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085',
      skills: [
        { name: 'Pedagogical ERP (Yparéo)', highlighted: true },
        { name: 'LMS / Learning Platforms' },
        { name: 'Office Suite & Google Workspace' },
        { name: 'Reporting & Dashboards' },
        { name: 'Data Analysis' },
        { name: 'Graphic Design' },
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
      description: 'Educational technology and instructional design.',
    },
    {
      institution: 'Anaxil',
      degree: 'Certification',
      field: 'GDPR - DPO Training & CNIL-certified CIL',
      startDate: '2018',
      endDate: '2018',
      description: 'European General Data Protection Regulation. Data Protection Officer.',
    },
    {
      institution: 'Lycée du Hainaut',
      degree: 'Vocational Diploma',
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
      quote:
        'Pierre is a well-rounded professional — reliable and inspiring. He demonstrated exemplary rigor, well-placed creativity and sharp analytical skills. His stress management, project leadership and strategic vision were decisive in the success of our initiative.',
    },
    {
      name: 'Za Nguyen',
      role: 'Academic Coordinator',
      company: 'IHECF Montpellier',
      quote:
        'Pierre is someone you can truly count on: professional, committed, always willing to help. He has an excellent big-picture vision while paying attention to detail, which makes him particularly valuable within a team. I warmly recommend Pierre for any professional opportunity.',
    },
    {
      name: 'Fanny Murer',
      role: 'National Pedagogical Coordinator',
      company: 'ICL',
      quote:
        'I particularly appreciated his great availability and listening skills. Structured and rigorous, he knows how to organize and prioritize projects effectively. Pierre is very comfortable with digital tools and helps streamline and modernize pedagogical practices.',
    },
  ],
  keyMetrics: [
    { value: '15', label: 'years of experience' },
    { value: '6', label: 'campuses managed' },
    { value: '400+', label: 'learners' },
  ],
  funFacts: [
    { emoji: '🚀', text: 'Space enthusiast — can talk about SpaceX for hours' },
    { emoji: '💎', text: 'Jewelry maker in his spare time' },
    { emoji: '🏃', text: 'Regular runner — running as a pressure valve' },
  ],
  services: [
    {
      title: 'Instructional Design & Certification',
      description:
        'Designing programs that meet RNCP and Qualiopi standards, from curriculum to certification.',
      examples: [
        'Curricula & syllabi',
        'RNCP applications',
        'Qualiopi audits',
        'Competency blocks',
      ],
    },
    {
      title: 'Digital Transformation',
      description:
        'Identifying, deploying and driving adoption of digital tools for educational and administrative teams.',
      examples: ['LMS deployment', 'Automation', 'Change management', 'Team training'],
    },
    {
      title: 'Content Creation & Education',
      description:
        'Creating content that makes the complex accessible — video, podcast, newsletter, ebook or live.',
      examples: ['Video & Shorts', 'Podcast', 'Newsletter', 'Ebook & guides'],
    },
    {
      title: 'AI Consulting & Mentoring',
      description:
        'Supporting the integration of generative AI into your educational processes or business.',
      examples: ['AI audit', 'Upskilling', 'Digital strategy', 'Mentoring'],
    },
  ],
  ui: {
    nav: {
      home: 'Home',
      experiences: 'Experience',
      studio: 'Studio',
      contact: 'Contact',
      menuLabel: 'Open menu',
    },
    hero: {
      cta: 'Discover my projects',
      ctaSecondary: 'Contact me',
      downloadCv: 'Download my CV',
    },
    sections: {
      studio: 'Studio',
      latestExperiences: 'Background',
      topSkills: 'Key Skills',
      viewAll: 'View all',
      allStudio: 'Full studio',
      allExperiences: 'All Experience',
      latestArticles: 'Latest articles',
    },
    status: {
      label: 'Availability',
      available: 'Consulting & Freelance',
    },
    ledger: {
      eyebrow: 'Experiment ledger',
      sectionsLabel: 'Ledger — bets by sector',
      headline: '{count} bets run alongside my job.',
      thesis:
        'Launch three ideas per sector, built with AI, to see what works. Here are the results, failures included.',
      verdictLabel: 'Verdict',
      statusCounts: {
        revenue: { one: 'earning revenue', other: 'earning revenue' },
        published: { one: 'published', other: 'published' },
        relaunching: { one: 'relaunching', other: 'relaunching' },
        unsold: { one: 'shipped, never sold', other: 'shipped, never sold' },
        poc: { one: 'POC, never launched', other: 'POCs, never launched' },
      },
    },
    project: {
      label: 'Project',
      demo: 'Visit website',
      source: 'Learn more',
      backToStudio: '← Back to studio',
      technologies: 'Tools & Technologies',
      visual: 'Visual',
      metrics: 'Key figures',
      story: 'The story',
      features: 'Key features',
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
      builtWith: 'Handcrafted with Astro, Tailwind & a lot of coffee',
      legal: 'Legal notice',
      privacy: 'Privacy policy',
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
    services: {
      title: 'What I can do for you',
      subtitle: 'Concrete skills, ready for missions or permanent roles.',
    },
    hiring: {
      title: 'Working together',
      subtitle: 'Employed, not unavailable. What I run, and what I can work on.',
      whyMe: 'By the numbers',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts on instructional design, AI in education, and digital innovation.',
      backToBlog: 'Back to blog',
      empty: 'No articles yet. Check back soon!',
    },
    studio: {
      intro:
        "A collection of what I'm building — in-depth case studies and live sites, grouped by theme.",
      caseStudyBadge: 'Case study',
      liveSiteBadge: 'Live site',
      clusterCountProjects: '{n} projects',
      clusterCountSites: '{n} sites',
    },
    education: 'Education',
    scrollToTop: 'Scroll to top',
    skipToContent: 'Skip to content',
    switchLang: 'Passer en français',
    toggleTheme: 'Toggle theme',
  },
};
