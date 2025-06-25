import { ProjectItem } from "@/types/cv";

export const projects: ProjectItem[] = [
  {
    title: "Disaster Mitigation & Monitoring Platform (Demo)",
    organization: "BPBD – West Java",
    period: "March 2025 – May 2025",
    status: "demo",
    bullets: [
      "Led development of an anomaly detection system with GIS mapping and real-time sensor alerts for BPBD West Java.",
      // "Collaborated directly with government stakeholders to align technical solutions with operational disaster response goals.",
      "Designed and built the system using Next.js, React.js, PostgreSQL (PostGIS), and Leaflet.js.",
      "Integrated IoT sensors for real-time data processing and early warning notifications.",
      "Delivered a prototype currently under final review for official integration into BPPD’s workflow.",
    ],
    notes: ["Disaster Mitigation Dashboard"],
  },
  {
    title: "Structure Health Monitoring System (Demo)",
    organization: "PT. Graha Survey Indonesia",
    period: "December 2024 – March 2025",
    status: "demo",
    bullets: [
      "Designed and deployed a real-time structural monitoring dashboard with alert mechanisms.",
      "Led the project from planning to deployment, engaging stakeholders to ensure alignment with operational goals.",
      "Developed interactive data visualizations for easier interpretation by maintenance teams.",
      "Enabled early risk detection, improving the overall safety and responsiveness of infrastructure management.",
    ],
    notes: ["Structure Health Monitoring System Dashboard"],
  },
  {
    title: "Weigh-in-Motion Sensor with Lidar (Deployed)",
    organization: "PUPR - DisHub",
    period: "April 2023 – March 2024",
    status: "deployed",
    bullets: [
      "Developed and deployed a nationwide truck monitoring system integrating weight sensors, Lidar, and national transportation databases.",
      "Led on-site implementation and directly trained DisHub personnel for system operations.",
      "Coordinated with regulatory bodies to ensure compliance and support future scalability.",
      "System supports real-time vehicle monitoring and policy enforcement as part of the UPPKB initiative.",
    ],
    notes: [
      "Note: Post-deployment details are covered under a Non-Disclosure Agreement (NDA).",
    ],
  },
];
