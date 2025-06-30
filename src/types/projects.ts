// src/types/projects.ts

export interface ProjectCategory {
  title: string;
  description: string;
  icon: string; // path to the icon
  images: string[]; // image paths for modal/carousel
  href: string; // navigation path
  themeColor?: string; // optional: e.g., for hover effects or UI styling
}

export interface GameProject {
  id: number;
  title: string;
  slug: string; // used for routing
  description: string;
  coverImage: string; // thumbnail or featured image
  gallery: string[]; // carousel/modal images
  tags?: string[]; // genres or technologies
  releaseDate?: string; // optional
  isFeatured?: boolean; // for homepage highlights
}

export interface AppProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  gallery: string[];
  tags?: string[];
  releaseDate?: string;
  isFeatured?: boolean;
  platform?: string[]; // e.g., ["Web", "iOS", "Android"]
}
