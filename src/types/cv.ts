export type WorkExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  notes?: string[];
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
};

export type ProjectItem = {
  title: string;
  organization: string;
  period: string;
  bullets: string[];
  status?: "demo" | "deployed" | "under review";
  notes?: string[];
};

export type AdditionalInfo = {
  technicalSkills: {
    category: string;
    items: string[];
  }[];
  softSkills?: string[];
};

export type SubjectBranch = {
  icon: string; // e.g., emoji
  title: string;
  topics: string[];
};

export interface OrganizationExperienceItem {
  title: string;
  date: string;
  institution: string;
  link?: string;
}
