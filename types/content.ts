export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
}

export interface HeroConfig {
  badge: {
    text: string;
    icon: string;
  };
  title: string;
  subtitle: string;
  buttons: {
    primary: {
      text: string;
      href: string;
      icon: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  stats: {
    gpa: string;
    basketball: string;
    graduation: string;
  };
}

export interface AboutConfig {
  name: string;
  bio: string;
  education: string;
  interests: string;
  skills: string;
  coreThemes: {
    title: string;
    description1: string;
    description2: string;
    description3?: string;
    description4?: string;
  };
  interestsSection: {
    title: string;
    items: Array<{
      label: string;
      description: string;
      icon: string;
    }>;
  };
}

export interface PageConfig {
  pageTitle: string;
  pageDescription: string;
  badge: string;
}

export interface ContactConfig extends PageConfig {
  form: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitText: string;
    sendingText: string;
  };
  sidebar: {
    title: string;
    links: {
      email: {
        text: string;
        href: string;
      };
      linkedin: {
        text: string;
        href: string;
      };
      github: {
        text: string;
        href: string;
      };
      resume: {
        text: string;
        href: string;
      };
    };
    note: string;
  };
}

export interface ContentConfig {
  site: SiteConfig;
  hero: HeroConfig;
  about: AboutConfig;
  experience: PageConfig;
  projects: PageConfig;
  contact: ContactConfig;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  link?: string | null;
  image?: string;
}

export interface ProjectLinks {
  github?: string;
}

export interface Project {
  title: string;
  image: string;
  description: string;
  tags: string[];
  links: ProjectLinks;
}
