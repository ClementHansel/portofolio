"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/data/projects";
import { domainColors } from "@/lib/constants";
import Badge from "@/components/ui/Badge";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Selected case studies showcasing architecture decisions, technical
            depth, and real-world impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="block group">
                <div className="glass-card overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative h-48 bg-[var(--bg-secondary)] overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--glass-bg)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-[var(--accent-cyan)]">
                        {project.role}
                      </span>
                      {project.teamSize && (
                        <span className="text-xs text-[var(--text-muted)]">
                          • {project.teamSize} people
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--accent-blue)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Domain tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.domain.map((d) => (
                        <Badge key={d} color={domainColors[d]?.color}>
                          {d.replace("-", "/")}
                        </Badge>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="text-[10px] px-2 py-0.5 text-[var(--text-muted)]">
                          +{project.techStack.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/projects" className="neon-btn inline-block">
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
