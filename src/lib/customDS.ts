/**
 * Represents an entire post with structured content.
 * Includes metadata such as title, tags, and publication date.
 */
export interface Post {
  slug: string; // Unique identifier for the post (used in URLs)
  title: string; // Title of the post
  tags: string[]; // List of tags for categorization
  date: string; // Publication date in ISO format (e.g., "2025-01-31")
  coverImage: string; // URL or path to the main cover image

  /**
   * Optional author information.
   * Can include name, profile image, and a short bio.
   */
  author?: {
    name: string; // Author's name
    profileImage?: string; // Optional author profile image
    bio?: string; // Short biography or description
  };

  content: PostSection[]; // The post's main content, which can be a mix of different section types
}

/**
 * A post section can be an image, sketch, markdown, or a gallery.
 * This allows different types of content within a post.
 */
export type PostSection = 
  | PostSectionImage 
  | PostSectionSketch 
  | PostSectionMarkdown 
  | PostSectionGallery;

/**
 * Represents an image section in a post.
 * Can include a caption and different styling themes.
 */
export interface PostSectionImage {
  type: "image"; // Identifies this section as an image
  src: string; // Image URL or path
  alt?: string; // Optional alt text for accessibility
  caption?: string; // Optional caption displayed with the image
  theme?: "default" | "highlight" | "bordered" | "shadowed"; // Styling options
  metadata?: Record<string, any>; // Additional metadata (e.g., dimensions, EXIF data)
}

/**
 * Represents an SVG sketch section in a post.
 * Stores SVG data as a string and supports different artistic themes.
 */
export interface PostSectionSketch {
  type: "sketch"; // Identifies this section as a sketch
  data: string; // SVG data stored as a string
  description?: string; // Optional description of the sketch
  theme?: "default" | "artistic" | "minimal" | "detailed"; // Styling themes
  metadata?: Record<string, any>; // Additional metadata (e.g., creation tool, dimensions)
}

/**
 * Represents a markdown text section in a post.
 * Supports different themes such as info, warning, and quotes.
 */
export interface PostSectionMarkdown {
  type: "markdown"; // Identifies this section as markdown text
  content: string; // Markdown-formatted text content
  theme?: "default" | "info" | "warning" | "quote"; // Styling themes (e.g., warning messages, quotes)
  metadata?: Record<string, any>; // Additional metadata (e.g., word count, reading time)
}

/**
 * Represents a gallery section that contains a mix of images and sketches.
 * Can be displayed in different layouts such as a slideshow or grid.
 */
export interface PostSectionGallery {
  type: "gallery"; // Identifies this section as a gallery
  items: (PostSectionImage | PostSectionSketch)[]; // Array of images and sketches
  layout?: "slideshow" | "grid" | "carousel"; // Layout style for displaying items
  metadata?: Record<string, any>; // Additional metadata (e.g., transition effects, autoplay settings)
}




