// Design System Tokens
export const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  accent: {
    cyan: "#06b6d4",
    purple: "#a855f7",
    emerald: "#10b981",
    amber: "#f59e0b",
    rose: "#f43f5e",
  },
  neutral: {
    950: "#030712",
    900: "#111827",
    800: "#1f2937",
    700: "#374151",
    600: "#4b5563",
    500: "#6b7280",
    400: "#9ca3af",
    300: "#d1d5db",
    200: "#e5e7eb",
    100: "#f3f4f6",
  },
} as const;

// Domain color mapping
export const domainColors: Record<string, { color: string; glow: string }> = {
  iot: { color: "#06b6d4", glow: "0 0 20px rgba(6, 182, 212, 0.4)" },
  frontend: { color: "#3b82f6", glow: "0 0 20px rgba(59, 130, 246, 0.4)" },
  backend: { color: "#10b981", glow: "0 0 20px rgba(16, 185, 129, 0.4)" },
  "ai-ml": { color: "#a855f7", glow: "0 0 20px rgba(168, 85, 247, 0.4)" },
  devops: { color: "#f59e0b", glow: "0 0 20px rgba(245, 158, 11, 0.4)" },
  "system-architecture": { color: "#ef4444", glow: "0 0 20px rgba(239, 68, 68, 0.4)" },
  "ui-ux": { color: "#ec4899", glow: "0 0 20px rgba(236, 72, 153, 0.4)" },
  games: { color: "#8b5cf6", glow: "0 0 20px rgba(139, 92, 246, 0.4)" },
  "digital-marketing": { color: "#14b8a6", glow: "0 0 20px rgba(20, 184, 166, 0.4)" },
  "data-analytics": { color: "#f97316", glow: "0 0 20px rgba(249, 115, 22, 0.4)" },
};

// Navigation items
export const navItems = [
  { name: "Expertise", href: "/expertise" },
  { name: "Projects", href: "/projects" },
  { name: "Career", href: "/career" },
  { name: "Contact", href: "/contact" },
] as const;

// All searchable pages for Command Palette
export const allPages = [
  { name: "Home", href: "/", keywords: ["home", "landing", "command center"] },
  { name: "Expertise", href: "/expertise", keywords: ["skills", "domains", "competency"] },
  { name: "Projects", href: "/projects", keywords: ["work", "portfolio", "case studies"] },
  { name: "Architecture", href: "/architecture", keywords: ["system design", "diagrams", "infrastructure"] },
  { name: "Career", href: "/career", keywords: ["timeline", "experience", "journey"] },
  { name: "Blog", href: "/blog", keywords: ["articles", "thoughts", "writing"] },
  { name: "Contact", href: "/contact", keywords: ["hire", "email", "connect", "services"] },
  { name: "CV", href: "/cv", keywords: ["resume", "curriculum vitae", "download"] },
  { name: "Demos", href: "/demos", keywords: ["interactive", "live", "playground"] },
  { name: "Support", href: "/support", keywords: ["donate", "sponsor"] },
] as const;

// Site metadata
export const siteConfig = {
  name: "Clement Hansel",
  title: "Clement Hansel | Technology Executive & System Architect",
  description:
    "CTO-level technology executive specializing in IoT, AI/ML, system architecture, and full-stack development. Building scalable solutions that drive business impact.",
  url: "https://clementhansel.com",
  ogImage: "/assets/images/og-image.png",
  links: {
    github: "https://github.com/ClementHansel",
    linkedin: "https://www.linkedin.com/in/clement-hansel/",
    email: "clement_hansel@yahoo.com",
    whatsapp: "https://wa.me/628111546034",
  },
} as const;
