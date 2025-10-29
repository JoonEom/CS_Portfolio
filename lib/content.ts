import { ContentConfig, ExperienceEntry, Project } from '@/types/content';

// Import all content data
import contentConfig from '@/data/content.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';

// Type-safe content access
export const content = contentConfig as ContentConfig;
export const experience = experienceData as ExperienceEntry[];
export const projects = projectsData as Project[];

// Helper functions for easy content access
export const getSiteInfo = () => content.site;
export const getHeroContent = () => content.hero;
export const getAboutContent = () => content.about;
export const getExperienceContent = () => content.experience;
export const getProjectsContent = () => content.projects;
export const getContactContent = () => content.contact;

// Export all content for easy access
export { experience, projects };
