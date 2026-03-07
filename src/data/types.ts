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

export interface Project {
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
    projects: string;
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
    latestProjects: string;
    latestExperiences: string;
    topSkills: string;
    viewAll: string;
    allProjects: string;
    allExperiences: string;
    allSkills: string;
  };
  status: {
    label: string;
    available: string;
  };
  project: {
    label: string;
    demo: string;
    source: string;
    backToProjects: string;
    technologies: string;
    visual: string;
    metrics: string;
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

export interface SiteData {
  personal: PersonalInfo;
  social: SocialLink[];
  experiences: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  education: Education[];
  testimonials: Testimonial[];
  keyMetrics: KeyMetric[];
  ui: UITranslations;
}
