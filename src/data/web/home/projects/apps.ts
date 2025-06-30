import { AppProject } from "@/types/projects";

const apps: AppProject[] = [
  {
    id: 1,
    title: "TaskFlow",
    slug: "taskFlow",
    description: "A modern task manager app for teams.",
    coverImage: "/assets/images/projects/apps/taskFlow/cover.jpg",
    gallery: [
      "/assets/images/projects/apps/taskFlow/1.jpg",
      "/assets/images/projects/apps/taskFlow/2.jpg",
    ],
    tags: ["Productivity", "Team", "Web"],
    releaseDate: "2024-04-10",
    isFeatured: true,
    platform: ["Web", "iOS", "Android"],
  },
  {
    id: 2,
    title: "FinTrack",
    slug: "finTrack",
    description: "Personal finance tracking made easy.",
    coverImage: "/assets/images/projects/apps/finTrack/cover.jpg",
    gallery: [
      "/assets/images/projects/apps/finTrack/1.jpg",
      "/assets/images/projects/apps/finTrack/2.jpg",
    ],
    tags: ["Finance", "Budgeting"],
    releaseDate: "2023-12-01",
    platform: ["Web", "Android"],
  },
  {
    id: 3,
    title: "EduSpark",
    slug: "eduSpark",
    description: "Interactive learning platform for students.",
    coverImage: "/assets/images/projects/apps/eduSpark/cover.jpg",
    gallery: [
      "/assets/images/projects/apps/eduSpark/1.jpg",
      "/assets/images/projects/apps/eduSpark/2.jpg",
    ],
    tags: ["Education", "Interactive", "E-learning"],
    isFeatured: true,
    platform: ["Web"],
  },
  {
    id: 4,
    title: "FitMate",
    slug: "fitMate",
    description: "A fitness tracker and virtual coach.",
    coverImage: "/assets/images/projects/apps/fitMate/cover.jpg",
    gallery: [
      "/assets/images/projects/apps/fitMate/1.jpg",
      "/assets/images/projects/apps/fitMate/2.jpg",
    ],
    tags: ["Fitness", "Health", "Tracking"],
    platform: ["iOS", "Android"],
  },
  {
    id: 5,
    title: "Cookpedia",
    slug: "cookpedia",
    description: "Browse, save, and share your favorite recipes.",
    coverImage: "/assets/images/projects/apps/cookpedia/cover.jpg",
    gallery: [
      "/assets/images/projects/apps/cookpedia/1.jpg",
      "/assets/images/projects/apps/cookpedia/2.jpg",
    ],
    tags: ["Cooking", "Lifestyle", "Recipes"],
    releaseDate: "2023-08-15",
    platform: ["Web"],
  },
];

export default apps;
