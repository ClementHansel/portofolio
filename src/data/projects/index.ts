import { Project } from "@/types/project";

// Import individual project files as you create them
// import { aivory } from "./aivory";
// import { wimSystem } from "./wim-system";

// For now, placeholder data structure — replace with real projects as you build them
export const projects: Project[] = [
  {
    slug: "aivory",
    title: "AiVory",
    subtitle: "Enterprise AI Workflow Builder",
    domain: ["ai-ml", "frontend", "backend", "system-architecture"],
    description:
      "A modern AI workflow builder enabling companies to fully integrate their business processes with AI. Features visual pipeline editor, model management, and automated deployment.",
    challenge:
      "Enterprises struggle to integrate AI into existing workflows without dedicated ML engineering teams.",
    solution:
      "Built a visual drag-and-drop workflow builder that abstracts ML complexity while maintaining flexibility for advanced users.",
    impact:
      "Reduced AI integration time from months to days for pilot clients. Currently serving enterprise customers.",
    techStack: ["Next.js", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "Docker", "AWS"],
    role: "CTO",
    teamSize: 5,
    duration: "8 months",
    coverImage: "/assets/projects/aivory/cover.svg",
    gallery: ["/assets/projects/aivory/1.jpg", "/assets/projects/aivory/2.jpg"],
    liveUrl: "https://aivory.app",
    featured: true,
    status: "completed",
    year: 2024,
  },
  {
    slug: "wim-system",
    title: "National Weigh-in-Motion System",
    subtitle: "IoT Infrastructure for Indonesian Government",
    domain: ["iot", "system-architecture", "backend", "devops"],
    description:
      "National-scale vehicle weighing system deployed across Indonesian highways. Real-time sensor data collection, processing, and enforcement dashboard.",
    challenge:
      "Indonesia needed a scalable, reliable system to monitor overloaded vehicles across thousands of highway kilometers in real-time.",
    solution:
      "Designed distributed sensor network with LoRa + GSM connectivity, edge processing, and centralized monitoring dashboard with anomaly detection.",
    impact:
      "Deployed across multiple provinces. Processing 100K+ vehicle measurements daily with 99.9% uptime.",
    techStack: ["Node.js", "LoRaWAN", "MQTT", "PostgreSQL", "React", "Docker", "Nginx"],
    role: "Lead Architect",
    teamSize: 12,
    duration: "14 months",
    coverImage: "/assets/projects/wim/cover.svg",
    gallery: ["/assets/projects/wim/1.jpg", "/assets/projects/wim/2.jpg"],
    featured: true,
    status: "completed",
    year: 2023,
  },
  {
    slug: "smart-buoy",
    title: "Smart Buoy Coastal Monitoring",
    subtitle: "Real-time Marine Sensor Platform",
    domain: ["iot", "backend", "data-analytics"],
    description:
      "Smart buoy system for real-time coastal and marine monitoring. Collects water quality, wave height, temperature, and GPS positioning data.",
    challenge:
      "Coastal authorities lacked real-time visibility into marine conditions for disaster preparedness and environmental monitoring.",
    solution:
      "Engineered solar-powered buoys with multi-sensor arrays, satellite uplinks, and a real-time dashboard with historical analysis and alerting.",
    impact:
      "Enabled early warning capabilities for coastal communities. Data used for environmental research and disaster response planning.",
    techStack: ["Python", "MQTT", "LoRa", "React", "TimescaleDB", "Grafana", "AWS IoT"],
    role: "IoT Engineer",
    teamSize: 8,
    duration: "10 months",
    coverImage: "/assets/projects/smart-buoy/cover.svg",
    gallery: ["/assets/projects/smart-buoy/1.jpg"],
    featured: true,
    status: "completed",
    year: 2023,
  },
  {
    slug: "disaster-response",
    title: "Disaster Response Platform",
    subtitle: "GIS-Powered Emergency Management",
    domain: ["system-architecture", "frontend", "backend", "ai-ml"],
    description:
      "Emergency response platform with GIS mapping, real-time sensor integration, and AI-powered anomaly detection for natural disaster management.",
    challenge:
      "Emergency responders needed a unified platform to visualize threat levels, coordinate resources, and detect anomalies across large geographic areas.",
    solution:
      "Built a GIS-integrated command center with real-time data feeds, ML-based anomaly detection, and automated alert escalation workflows.",
    impact:
      "Improved emergency response coordination time by 60%. Used by government agencies for disaster preparedness planning.",
    techStack: ["Next.js", "Python", "TensorFlow", "PostGIS", "WebSocket", "Mapbox", "Docker"],
    role: "Lead Architect",
    teamSize: 6,
    duration: "6 months",
    coverImage: "/assets/projects/disaster-response/cover.svg",
    gallery: [],
    featured: false,
    status: "completed",
    year: 2024,
  },
  {
    slug: "game-arcade",
    title: "Game Arcade",
    subtitle: "10 Playable Web Games",
    domain: ["games", "frontend"],
    description:
      "A collection of 10 web-based games built from scratch using Canvas 2D, Three.js, and React. Features custom physics engines, AI opponents, procedural generation, and particle systems.",
    challenge:
      "Demonstrate advanced frontend engineering through interactive entertainment — from game loops to collision detection to AI decision trees.",
    solution:
      "Built each game with clean architecture: shared GameLoop utility, InputManager, AssetLoader with fallback support, and modular engine components per genre.",
    impact:
      "10 fully playable games showcasing platformer physics, card game AI, puzzle algorithms, real-time rendering, and procedural content generation.",
    techStack: ["TypeScript", "Canvas 2D", "Three.js", "React", "Framer Motion", "WebGL"],
    role: "Game Developer",
    teamSize: 1,
    duration: "Ongoing",
    coverImage: "/assets/images/games/platform.jpeg",
    gallery: ["/assets/images/games/puzzle.jpeg", "/assets/images/games/card.jpeg"],
    liveUrl: "/games",
    featured: false,
    status: "in-progress",
    year: 2025,
  },
];

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByDomain(domain: string): Project[] {
  return projects.filter((p) => p.domain.includes(domain as Project["domain"][number]));
}
