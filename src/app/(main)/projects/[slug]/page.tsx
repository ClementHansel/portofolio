"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";
import { domainColors } from "@/lib/constants";
import Badge from "@/components/ui/Badge";

export default function ProjectCaseStudy() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl text-white mb-4">Project not found</h1>
        <Link href="/projects" className="text-[var(--accent-blue)]">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-white mb-8 transition-colors"
        >
          ← Back to Projects
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-[var(--accent-cyan)]">
              {project.role}
            </span>
            {project.teamSize && (
              <span className="text-sm text-[var(--text-muted)]">
                • Team of {project.teamSize}
              </span>
            )}
            {project.duration && (
              <span className="text-sm text-[var(--text-muted)]">
                • {project.duration}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {project.title}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-6">
            {project.subtitle}
          </p>

          {/* Domain + Tech badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.domain.map((d) => (
              <Badge key={d} color={domainColors[d]?.color}>
                {d.replace("-", "/")}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12 glass-card"
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                Overview
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                The Challenge
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {project.challenge}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                The Solution
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {project.solution}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                Impact & Results
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {project.impact}
              </p>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.sourceUrl) && (
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-[var(--accent-blue)] hover:text-[var(--accent-cyan)]"
                    >
                      🔗 Live Site →
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-[var(--accent-blue)] hover:text-[var(--accent-cyan)]"
                    >
                      📦 Source Code →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
