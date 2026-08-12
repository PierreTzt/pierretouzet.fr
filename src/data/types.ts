export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  /** Phrase de marque. Tient seule, affichée dans le hero. */
  signature?: string;
  email: string;
  phone?: string;
  location: string;
  avatarAlt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

/**
 * Statuts du carnet d'expériences. Les cinq premiers décrivent un pari
 * commercial et comptent dans le score dérivé ; les trois derniers servent
 * aux études de cas internes et n'entrent pas dans le décompte.
 */
export type ProjectStatus =
  | 'revenue' // génère du chiffre d'affaires
  | 'published' // en ligne, traction faible
  | 'relaunching' // relance en cours
  | 'unsold' // mené à terme, jamais vendu
  | 'poc' // construit, jamais lancé commercialement
  | 'active'
  | 'paused'
  | 'archived';

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageAlt: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status?: ProjectStatus;
  period?: string;
  metrics?: ProjectMetric[];
  story?: string;
  features?: ProjectFeature[];
}

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
  /** Verdict du pari sectoriel. Absent pour les clusters qui ne sont pas des paris (labs). */
  verdict?: string;
  entries: StudioEntryRef[];
}

export interface SkillCategory {
  name: string;
  description?: string;
  icon?: string; // SVG path for category icon
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  highlighted?: boolean;
  badge?: string; // e.g. "Certifié CNIL", "6 campus"
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface UITranslations {
  nav: {
    home: string;
    experiences: string;
    studio: string;
    skills: string;
    contact: string;
    menuLabel: string;
  };
  hero: {
    cta: string;
    ctaSecondary: string;
    downloadCv: string;
  };
  sections: {
    studio: string;
    latestExperiences: string;
    topSkills: string;
    viewAll: string;
    allStudio: string;
    allExperiences: string;
    latestArticles: string;
  };
  status: {
    label: string;
    available: string;
  };
  ledger: {
    eyebrow: string;
    sectionsLabel: string;
    /** Contient le jeton {count}, remplacé par le total dérivé. Ne jamais écrire le nombre. */
    headline: string;
    thesis: string;
    verdictLabel: string;
    statusCounts: {
      revenue: { one: string; other: string };
      published: { one: string; other: string };
      relaunching: { one: string; other: string };
      unsold: { one: string; other: string };
      poc: { one: string; other: string };
    };
  };
  project: {
    label: string;
    demo: string;
    source: string;
    backToStudio: string;
    technologies: string;
    visual: string;
    metrics: string;
    story: string;
    features: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailMe: string;
    letsTalk: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    legal: string;
    privacy: string;
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  hiring: {
    title: string;
    subtitle: string;
    whyMe: string;
  };
  consulting: {
    title: string;
    subtitle: string;
  };
  blog: {
    title: string;
    subtitle: string;
    backToBlog: string;
    empty: string;
  };
  studio: {
    intro: string;
    caseStudyBadge: string;
    liveSiteBadge: string;
    clusterCountProjects: string;
    clusterCountSites: string;
  };
  education: string;
  scrollToTop: string;
  skipToContent: string;
  switchLang: string;
  toggleTheme: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface KeyMetric {
  value: string;
  label: string;
}

export interface Service {
  title: string;
  description: string;
  examples: string[];
}

export interface FunFact {
  emoji: string;
  text: string;
}

export interface SiteData {
  personal: PersonalInfo;
  social: SocialLink[];
  experiences: Experience[];
  projects: Project[];
  studioSites: StudioExternalSite[];
  studioClusters: StudioCluster[];
  skillCategories: SkillCategory[];
  education: Education[];
  testimonials: Testimonial[];
  keyMetrics: KeyMetric[];
  services: Service[];
  funFacts: FunFact[];
  ui: UITranslations;
}
