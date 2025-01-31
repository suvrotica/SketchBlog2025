// src/lib/types.ts
export interface Post {
    slug: string;
    title: string;
    sketches: Sketch[];
  }
  
  export interface Sketch {
    id: string;  // This will be like "sketch-001", "sketch-001.5" for inserted ones
    data: string; // The SVG data
  }