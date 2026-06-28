export type MilestoneType =
  | "role"
  | "achievement"
  | "certification"
  | "project"
  | "education";

export interface CareerMilestone {
  id: string;
  date: string;
  year: number;
  title: string;
  organization: string;
  description: string;
  type: MilestoneType;
  tags: string[];
  icon?: string;
}
