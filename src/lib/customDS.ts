// This is the file where we will define the types for our custom data source. We will define the Post type here.
// src/lib/customDS.ts

export interface PostSectionImage {
    type: "image";
    src: string;
    alt?: string;
    caption?: string;
    theme?: "default" | "highlight" | "bordered" | "shadowed";
    metadata?: Record<string, any>;
  }
  
  export interface PostSectionSketch {
    type: "sketch";
    data: string; 
    description?: string;
    theme?: "default" | "artistic" | "minimal" | "detailed";
    metadata?: Record<string, any>;
  }
  
  export interface PostSectionMarkdown {
    type: "markdown";
    content: string;
    theme?: "default" | "info" | "warning" | "quote";
    metadata?: Record<string, any>;
  }
  
  export interface PostSectionGallery {
    type: "gallery";
    items: (PostSectionImage | PostSectionSketch)[]; 
    layout?: "slideshow" | "grid" | "carousel"; 
    metadata?: Record<string, any>;
  }
  
  export type PostSection = PostSectionImage | PostSectionSketch | PostSectionMarkdown | PostSectionGallery;
  
  export interface Post {
    slug: string;
    title: string;
    tags: string[];
    date: string;
    coverImage: string;
    author?: {
      name: string;
      profileImage?: string;
      bio?: string;
    };
    content: PostSection[];
  }
  