import type { SiteData } from './types';

export const data: SiteData = {
  personal: {
    name: 'Pierre Touzet',
    title: 'I make the complex accessible.',
    description:
      "15 years across IT, education and digital innovation — I manage 6 national campuses, built Gradly to automate RNCP (France's national competency certification framework) management, and I help educational organizations transform. Available for consulting and freelance.",
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
      position: 'National Program Director',
      startDate: '2024-01',
      endDate: 'Present',
      description:
        'Brought in to structure programs for a fast-growing tourism school. I now single-handedly lead the academic strategy across 6 national campuses, with a team of 11 on the ground and around 400 learners.',
      achievements: [
        'Full academic harmonization across 6 campuses: unified curricula, assessments and methods where each campus used to do things differently',
        'Deployed new programs from design to launch, driving significant enrollment growth',
        'Designed syllabi, competency blocks and RNCP-compliant evaluation grids',
        'Secured certification and jury approvals (RNCP, Qualiopi — France\'s mandatory quality label for training providers)',
        'Cross-functional management of a team of 11 coordinators and academic directors',
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
        "I built Distil out of frustration: AI courses are either too long or already outdated. Distil cuts through the noise and keeps only what works. 25 modules, 42 lessons of 10-15 min each, lifetime access and regular updates. Condensed pedagogy designed for professionals who want real results without spending months.",
      technologies: ['Astro', 'Tailwind CSS', 'Vercel', 'PostHog'],
      imageAlt: 'Distil Academy interface - AI training platform',
      demoUrl: 'https://www.distil.academy/',
      featured: true,
      status: 'active',
      period: '2026 — Present',
      metrics: [
        { label: 'Format', value: '10-15 min lessons' },
        { label: 'Access', value: 'Lifetime' },
        { label: 'Updates', value: 'Continuous' },
      ],
      story: "Available AI courses always frustrated me: either outdated YouTube videos or €2,000 programs recycling the same content. I thought: what if I built the course I wish I'd taken? Modules under one hour, 10-15 min lessons, only what works in the field. No hype, no hollow theory — just concrete, tested content updated continuously. Distil was born from this conviction: AI moves too fast for static courses.",
      features: [
        {
          title: 'Short, dense courses',
          description: "Each module is under one hour, each lesson 10-15 min. No filler, just the essentials.",
        },
        {
          title: 'Lifetime access + updates',
          description: "One purchase, permanent access. Courses are regularly updated to keep pace with AI evolution.",
        },
        {
          title: 'Filtered, tested content',
          description: "Continuous monitoring and real-world testing. Only what actually works gets taught.",
        },
        {
          title: 'Built for professionals',
          description: "No technical background needed. Concrete results you can apply immediately in your work.",
        },
      ],
    },
    {
      id: 'gradly',
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
      status: 'active',
      period: '2023 — Present',
      metrics: [
        { label: 'Admin time', value: '÷ 3' },
        { label: 'Data', value: '100% offline' },
        { label: 'Compatibility', value: 'Yparéo & ERP' },
      ],
      story: "Every semester, I watched the same scene unfold: academic coordinators locked in their offices for days, copy-pasting grades into Excel spreadsheets to produce RNCP-compliant competency bulletins. Hours of repetitive work, prone to errors and frustration. I thought: \"If I'm living this problem, hundreds of others are too.\" I started with a prototype for my own use. Then colleagues wanted it. Then other campuses. Gradly was born from this field observation — not from a market study, but from real pain.",
      features: [
        {
          title: '100% offline — data sovereignty',
          description: "No data ever leaves the user's machine. No cloud, no server, no GDPR risk. Learner data stays where it belongs.",
        },
        {
          title: 'Smart import',
          description: "Direct import from Excel, CSV or ERP exports (Yparéo). Gradly adapts to existing formats — not the other way around.",
        },
        {
          title: 'RNCP-compliant PDF bulletins',
          description: "Automatic generation of competency bulletins that comply with RNCP standards. Blocks, competencies, acquisition levels — everything is calculated and formatted.",
        },
        {
          title: 'Admin time divided by 3',
          description: "What used to take days now takes hours. Coordinators can focus on supporting learners, not on paperwork.",
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
        "As national coordinator within the Compétences & Développement network (IFAG, IEFT), I led the digital transformation of pedagogical tools. POC management, satisfaction data analysis, permanent EdTech watch. Goal: give educational teams the means to focus on what matters most — supporting learners.",
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
      shortDescription:
        'This website, designed as a showcase for my career and projects.',
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
      id: 'twitch-tech',
      slug: 'twitch-tech',
      title: 'Twitch Show — Tech News',
      shortDescription:
        'Nearly a year of weekly live shows: public speaking, streaming techniques and tech education for a curious audience.',
      longDescription:
        'For nearly a year, I hosted a weekly live show on Twitch covering tech news in the broadest sense. Research, editorial preparation, live hosting and community interaction. What I gained: mastery of live streaming, the tech behind it, and most importantly — public speaking skills.',
      technologies: ['Twitch', 'Live', 'Tech Education', 'Tech Watch'],
      imageAlt: 'Twitch tech news show',
      featured: false,
      status: 'paused',
      period: '~1 year · Weekly',
      metrics: [
        { label: 'Duration', value: '~1 year' },
        { label: 'Pace', value: 'Weekly' },
        { label: 'Skill', value: 'Public speaking' },
      ],
    },
    {
      id: 'youtube-impots',
      slug: 'youtube-taxes',
      title: 'YouTube — Tax Education',
      shortDescription:
        "~20 videos and Shorts to make taxes simple. Proof that I can break down any topic — even taxation.",
      longDescription:
        "Created a YouTube channel with about 20 videos and Shorts to make taxation accessible to everyone. One video every 3 days, from quick editing to platform algorithms. What I gained: understanding recommendation algorithms and mastering rapid video editing.",
      technologies: ['YouTube', 'Shorts', 'Video Editing', 'Taxation'],
      imageAlt: 'YouTube tax education channel',
      featured: false,
      status: 'paused',
      period: '~20 videos · 1 every 3 days',
      metrics: [
        { label: 'Videos', value: '~20' },
        { label: 'Pace', value: '1 / 3 days' },
        { label: 'Format', value: 'Shorts + long' },
      ],
    },
    {
      id: 'podcast',
      slug: 'podcast',
      title: 'Podcast — Tech News',
      shortDescription:
        'Daily tech podcast over several months. An editorial and technical challenge with one goal: professional-grade output.',
      longDescription:
        'Designed, recorded and published a daily podcast covering tech news in the broadest sense. An intense pace over several months. What I gained: the joy of sharing and the constant pursuit of professional-grade production.',
      technologies: ['Podcast', 'Audio', 'Production', 'Tech Watch'],
      imageAlt: 'Tech and innovation podcast',
      featured: false,
      status: 'paused',
      period: 'Several months · Daily',
      metrics: [
        { label: 'Pace', value: 'Daily' },
        { label: 'Duration', value: 'Several months' },
        { label: 'Quality', value: 'Pro-grade' },
      ],
    },
    {
      id: 'newsletter-tech',
      slug: 'newsletter-tech',
      title: 'LinkedIn Newsletter — Tech News',
      shortDescription:
        '~20 weekly editions breaking down tech news. Result: non-tech readers hooked on every issue.',
      longDescription:
        'Wrote and published a weekly newsletter on LinkedIn covering tech news in the broadest sense. About 20 editions published. What I gained: the ability to hook non-tech people on complex subjects.',
      technologies: ['LinkedIn', 'Newsletter', 'Writing', 'Tech Watch'],
      imageAlt: 'LinkedIn tech newsletter',
      featured: false,
      status: 'paused',
      period: '~20 editions · Weekly',
      metrics: [
        { label: 'Editions', value: '~20' },
        { label: 'Pace', value: 'Weekly' },
        { label: 'Audience', value: 'Non-tech' },
      ],
    },
    {
      id: 'ebook-ia-education',
      slug: 'ebook-ai-education',
      title: 'Ebook — AI in Education',
      shortDescription:
        "A 10-page ebook offering a practitioner's perspective on generative AI in education. Finalized, ready to share.",
      longDescription:
        "Wrote an ebook on AI in education, combining my field experience with the challenges of generative AI. About ten pages offering a practitioner's viewpoint, not a theorist's. What I gained: the satisfaction of putting my ideas on paper and structuring long-form thinking.",
      technologies: ['Writing', 'Generative AI', 'Education'],
      imageAlt: 'Ebook on AI in education',
      featured: true,
      status: 'active',
      period: 'Finalized',
      metrics: [
        { label: 'Pages', value: '10' },
        { label: 'Angle', value: 'Practitioner' },
        { label: 'Status', value: 'Ready' },
      ],
    },
    {
      id: 'accompagnement-entrepreneurial',
      slug: 'entrepreneurial-mentoring',
      title: 'Entrepreneurial Mentoring & AI',
      shortDescription:
        'End-to-end mentoring of an entrepreneur: micro-business creation and upskilling on generative AI.',
      longDescription:
        "End-to-end mentoring of an entrepreneur in creating their micro-business: offer structuring, digital strategy and upskilling on generative AI. Mission completed. What I gained: the joy of mentoring and watching someone take the leap.",
      technologies: ['Consulting', 'Generative AI', 'Strategy', 'Mentoring'],
      imageAlt: 'Entrepreneurial mentoring and AI',
      featured: false,
      status: 'archived',
      period: 'Mission completed',
      metrics: [
        { label: 'Mentored', value: '1 entrepreneur' },
        { label: 'Scope', value: 'End-to-end' },
        { label: 'Status', value: 'Completed' },
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
        { name: 'GDPR & Data Protection', level: 85, highlighted: true, badge: 'Certified DPO (CNIL, France)' },
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
  processSteps: [
    {
      number: '01',
      title: 'Observe',
      description: "I listen, audit, and uncover the real problem — not the one presented to me, but the one hiding behind it.",
    },
    {
      number: '02',
      title: 'Design',
      description: 'I craft a tailored solution, prototype fast, and test with real users before building everything.',
    },
    {
      number: '03',
      title: 'Deploy',
      description: "I train the teams, support change management and don't let go until adoption is real.",
    },
    {
      number: '04',
      title: 'Iterate',
      description: 'I measure results, collect feedback and start again — because a good process lives and evolves.',
    },
  ],
  speakerTopics: [
    {
      title: 'From IT technician to program director: 15 years of curiosity',
      abstract: "A non-linear career, a vocational diploma, and one conviction: curiosity is the best career engine. A look back at 15 years of pivots, risk-taking and transformation — in IT, education and entrepreneurship.",
      format: 'Keynote · 30-45 min',
      tags: ['Career', 'Multipotentialist', 'Career change'],
    },
    {
      title: 'How I automated RNCP management for a school network',
      abstract: "Academic coordinators spend days manually producing RNCP bulletins. I built a tool to divide that time by 3. A concrete look at problem identification, prototyping, deployment and results.",
      format: 'Case study · 20-30 min',
      tags: ['EdTech', 'RNCP', 'Automation', 'Gradly'],
    },
    {
      title: "AI in education: a practitioner's view, not a theorist's",
      abstract: "Everyone talks about AI in education. Few people actually use it daily with learners. What I've tested, what works, what doesn't, and why we need to stop being afraid.",
      format: 'Keynote · 30-45 min',
      tags: ['Generative AI', 'Education', 'Practice'],
    },
  ],
  funFacts: [
    { emoji: '🚀', text: 'Space enthusiast — can talk about SpaceX for hours' },
    { emoji: '💎', text: 'Jewelry maker in his spare time' },
    { emoji: '🏃', text: 'Regular runner — running as a pressure valve' },
    { emoji: '🧠', text: 'Proud multipotentialist — always 5 projects running in parallel' },
  ],
  services: [
    {
      title: 'Instructional Design & Certification',
      description: 'Designing programs that meet RNCP and Qualiopi standards, from curriculum to certification.',
      examples: ['Curricula & syllabi', 'RNCP applications', 'Qualiopi audits', 'Competency blocks'],
    },
    {
      title: 'Digital Transformation',
      description: 'Identifying, deploying and driving adoption of digital tools for educational and administrative teams.',
      examples: ['LMS deployment', 'Automation', 'Change management', 'Team training'],
    },
    {
      title: 'Content Creation & Education',
      description: 'Creating content that makes the complex accessible — video, podcast, newsletter, ebook or live.',
      examples: ['Video & Shorts', 'Podcast', 'Newsletter', 'Ebook & guides'],
    },
    {
      title: 'AI Consulting & Mentoring',
      description: 'Supporting the integration of generative AI into your educational processes or business.',
      examples: ['AI audit', 'Upskilling', 'Digital strategy', 'Mentoring'],
    },
  ],
  ui: {
    nav: {
      home: 'Home',
      experiences: 'Experience',
      studio: 'Studio',
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
      studio: 'Studio',
      latestExperiences: 'Background',
      topSkills: 'Key Skills',
      viewAll: 'View all',
      allStudio: 'Full studio',
      allExperiences: 'All Experience',
      allSkills: 'All Skills',
      latestArticles: 'Latest articles',
    },
    status: {
      label: 'Availability',
      available: 'Consulting & Freelance',
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
    process: {
      title: 'How I work',
      subtitle: 'Every project follows the same logic — adapted to context.',
    },
    services: {
      title: 'What I can do for you',
      subtitle: 'Concrete skills, ready for missions or permanent roles.',
    },
    speaker: {
      title: 'Speaking & conferences',
      subtitle: 'I talk about what I experience in the field — education, AI, digital transformation, atypical careers.',
      cta: 'Invite me to speak',
      format: 'Format',
    },
    ebook: {
      title: 'AI in Education — Free Ebook',
      subtitle: "A practitioner's take on generative AI in education. 10 pages to understand the real stakes, jargon-free.",
      cta: 'Download for free',
      landing: {
        metaDescription: "Download Pierre Touzet's free ebook on generative AI in education. 10 pages of field experience, jargon-free.",
        heroSubtitle: "10 pages to understand how generative AI is transforming education — from a practitioner's perspective, not a theorist's. Based on 15 years of field experience.",
        formTitle: 'Download for free',
        formName: 'Your first name',
        formEmail: 'Your email',
        formCta: 'Get the ebook (PDF)',
        formSuccess: 'Your download will start shortly.',
        formSuccessDetail: 'If the download does not start automatically, click the link below.',
        tocTitle: 'What you will discover',
        tocItems: [
          'Why generative AI is a game-changer in education — beyond the buzz',
          'What actually works in the field (and what does not)',
          'How to integrate AI into your teaching practices without reinventing everything',
          'The mistakes to avoid when starting with AI in training',
        ],
        credibilityTitle: 'Why read this ebook',
        credibilityItems: [
          'Written by a practitioner who uses AI daily with learners',
          'Based on concrete experiments, not theoretical projections',
          'Immediately actionable — each chapter offers concrete next steps',
          'Free, no strings attached, no spam',
        ],
        testimonialQuote: "Pierre is someone you can truly count on: professional, committed, always willing to help. He has an excellent big-picture vision while paying attention to detail.",
        testimonialAuthor: 'Za Nguyen',
        testimonialRole: 'Academic Coordinator — IHECF Montpellier',
        freeLabel: 'Free',
        pagesLabel: '10 pages',
        formatLabel: 'PDF',
      },
    },
    hiring: {
      title: 'Looking to hire?',
      subtitle: "Discover why Pierre is the profile you need.",
      whyMe: 'Why me',
    },
    consulting: {
      title: 'Looking for a consultant?',
      subtitle: 'Concrete missions, clear process, measurable results.',
    },
    hello: {
      title: 'Nice to meet you!',
      subtitle: 'Pierre Touzet in 30 seconds.',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts on instructional design, AI in education, and digital innovation.',
      backToBlog: 'Back to blog',
      empty: 'No articles yet. Check back soon!',
    },
    studio: {
      intro: "A collection of what I'm building — in-depth case studies and live sites, grouped by theme.",
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
