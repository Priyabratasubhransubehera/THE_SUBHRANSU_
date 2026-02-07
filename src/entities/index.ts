/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: passions
 * Interface for Passions
 */
export interface Passions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  topicTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  inspirationalQuote?: string;
  /** @wixFieldType text */
  quoteAuthor?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  topicImage?: string;
  /** @wixFieldType url */
  relatedLink?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  techStack?: string;
  /** @wixFieldType url */
  githubUrl?: string;
  /** @wixFieldType url */
  liveDemoUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  skillImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  proficiencyLevel?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
}
