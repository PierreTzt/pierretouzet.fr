export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
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

export type ProjectStatus = 'active' | 'paused' | 'archived';

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
    allSkills: string;
    latestArticles: string;
  };
  status: {
    label: string;
    available: string;
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
  process: {
    title: string;
    subtitle: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  speaker: {
    title: string;
    subtitle: string;
    cta: string;
    format: string;
  };
  ebook: {
    title: string;
    subtitle: string;
    cta: string;
    landing: {
      metaDescription: string;
      heroSubtitle: string;
      formTitle: string;
      formName: string;
      formEmail: string;
      formCta: string;
      formSuccess: string;
      formSuccessDetail: string;
      tocTitle: string;
      tocItems: string[];
      credibilityTitle: string;
      credibilityItems: string[];
      testimonialQuote: string;
      testimonialAuthor: string;
      testimonialRole: string;
      freeLabel: string;
      pagesLabel: string;
      formatLabel: string;
    };
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
  hello: {
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

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  examples: string[];
}

export interface SpeakerTopic {
  title: string;
  abstract: string;
  format: string;
  tags: string[];
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
  processSteps: ProcessStep[];
  services: Service[];
  speakerTopics: SpeakerTopic[];
  funFacts: FunFact[];
  ui: UITranslations;
}
