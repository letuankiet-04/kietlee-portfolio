export type Language = 'vi' | 'en';
export type ThemePalette = 'spring' | 'cyber' | 'java';

export interface ProjectArchitecture {
  client: string;
  controller: string;
  service: string;
  repository: string;
  database: string;
  cache?: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  tagline: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  features: {
    vi: string[];
    en: string[];
  };
  technologies: string[];
  githubBackend?: string;
  githubFrontend?: string;
  github?: string;
  featured: boolean;
  accent: string;
  architecture: ProjectArchitecture;
}

export interface SkillItem {
  name: string;
  level: number;
  highlight?: boolean;
}

export interface SkillCategory {
  key: string;
  label: {
    vi: string;
    en: string;
  };
  skills: SkillItem[];
}

export interface WorkExperience {
  period: string;
  company: string;
  role: {
    vi: string;
    en: string;
  };
  type: string;
  technologies: string[];
  description: {
    vi: string[];
    en: string[];
  };
  highlightNode?: boolean;
}

export interface ActivityItem {
  period: string;
  title: {
    vi: string;
    en: string;
  };
  role: {
    vi: string;
    en: string;
  };
  organization: string;
  description: {
    vi: string;
    en: string;
  };
  highlight: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  badgeType: 'java' | 'spring' | 'architecture' | 'design' | 'general';
}
