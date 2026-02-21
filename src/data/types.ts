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
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
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
  education: string;
  scrollToTop: string;
  skipToContent: string;
  switchLang: string;
  toggleTheme: string;
}

export interface SiteData {
  personal: PersonalInfo;
  social: SocialLink[];
  experiences: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  education: Education[];
  ui: UITranslations;
}
