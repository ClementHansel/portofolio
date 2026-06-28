import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { expertiseDomains } from "@/data/expertise/domains";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clementhansel.com";

  const staticPages = [
    "",
    "/expertise",
    "/projects",
    "/architecture",
    "/career",
    "/blog",
    "/contact",
    "/cv",
    "/demos",
    "/games",
    "/about",
    "/support",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const domainPages = expertiseDomains.map((d) => ({
    url: `${baseUrl}/expertise/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const gamePages = [
    "jumpMeIn", "solveMe", "deckMe", "counterMe",
    "fastAndBlast", "karateBoy", "buildOut", "epoch",
    "hauntedVilla", "lifeMustGoOn",
  ].map((slug) => ({
    url: `${baseUrl}/games/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...projectPages, ...domainPages, ...gamePages];
}
