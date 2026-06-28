import { Domain } from "./project";

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "proficient";
  years?: number;
}

export interface ExpertiseDomain {
  id: Domain;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
  skills: Skill[];
  highlights: string[];
  certifications?: string[];
}
