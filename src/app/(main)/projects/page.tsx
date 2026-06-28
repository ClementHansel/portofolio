"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { domainColors } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Domain } from "@/types/project";

const domains: { id: Domain | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "system-architecture", label: "Architecture" },
  { id: "iot", label: "IoT" },
  { id: "ai-ml", label: "AI/ML" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "games", label: "Games" },
  { id: "ui-ux", label: "UI/UX" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Domain | "all">("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.domain.includes(filter));

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Case studies from real-world systems I've designed, built, and shipped."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setFilter(d.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === d.id
                  ? "bg-[var(--accent-blue)] text-white"
                  : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent-blue)]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              layout
            >
              <Link href={`/projects/${project.slug}`} className="block group">
                <div className="glass-card overflow-hidden h-full">
                  <div className="relative h-40 bg-[var(--bg-secondary)]">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-mono text-[var(--accent-cyan)] mb-2">
                      {project.role} • {project.year}
                    </p>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--accent-blue)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">
                      {project.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.domain.slice(0, 3).map((d) => (
                        <Badge key={d} color={domainColors[d]?.color}>
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)]">
            No projects found for this filter. More coming soon.
          </div>
        )}
      </div>
    </div>
  );
}
