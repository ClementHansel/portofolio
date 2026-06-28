export type Domain =
  | "iot"
  | "frontend"
  | "backend"
  | "ai-ml"
  | "devops"
  | "system-architecture"
  | "ui-ux"
  | "games"
  | "digital-marketing"
  | "data-analytics";

export type ProjectRole =
  | "CTO"
  | "Lead Architect"
  | "Full Stack Developer"
  | "Frontend Lead"
  | "Backend Lead"
  | "IoT Engineer"
  | "AI/ML Engineer"
  | "Game Developer"
  | "DevOps Engineer"
  | "UI/UX Designer";

export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  domain: Domain[];
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  techStack: string[];
  role: ProjectRole;
  teamSize?: number;
  duration?: string;
  coverImage: string;
  gallery: string[];
  liveUrl?: string;
  sourceUrl?: string;
  previewComponent?: string;
  featured: boolean;
  status: ProjectStatus;
  year: number;
}
