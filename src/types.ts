export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Creative 3D' | 'Web App' | 'E-Commerce';
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  featured: boolean;
  accentColor: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  duration?: string;
  location: string;
  type: string;
  highlights: string[];
  technologies: string[];
  accentColor: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  boardOrUniversity: string;
  scoreOrStatus: string;
  period: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  categoryKey: 'frontend' | 'backend' | 'database' | 'tools' | 'creative';
  skills: {
    name: string;
    level: string; // e.g. "Core Stack", "Proficient", "Interactive"
    iconName: string;
    description: string;
  }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  description: string;
  badge: string;
  link?: string;
}
