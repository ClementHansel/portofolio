"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { expertiseDomains } from "@/data/expertise/domains";
import { getProjectsByDomain } from "@/data/projects";
import GlassCard from "@/components/ui/GlassCard";

export default function DomainDetailPage() {
  const params = useParams();
  const domainId = params.domain as string;
  const domain = expertiseDomains.find((d) => d.id === domainId);

  if (!domain) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl text-white mb-4">Domain not found</h1>
        <Link href="/expertise" className="text-[var(--accent-blue)]">
          ← Back to Expertise
        </Link>
      </div>
    );
  }

  const relatedProjects = getProjectsByDomain(domainId);

  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/expertise"
          className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-white mb-8 transition-colors"
        >
          ← Back to Expertise
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-6xl mb-4 block">{domain.icon}</span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: domain.color }}
          >
            {domain.title}
          </h1>
          <p className="text-xl text-[var(--text-secondary)]">
            {domain.subtitle}
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--text-secondary)] leading-relaxed mb-12 text-lg"
        >
          {domain.description}
        </motion.p>

        {/* Skills Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domain.skills.map((skill) => (
              <div
                key={skill.name}
                className="glass-card p-4 flex items-center justify-between"
              >
                <span className="text-sm text-white">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      color: domain.color,
                      backgroundColor: `${domain.color}15`,
                    }}
                  >
                    {skill.level}
                  </span>
                  {skill.years && (
                    <span className="text-xs text-[var(--text-muted)]">
                      {skill.years}y
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Key Highlights
          </h2>
          <ul className="space-y-3">
            {domain.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-[var(--text-secondary)]"
              >
                <span style={{ color: domain.color }}>▸</span>
                {h}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <GlassCard className="cursor-pointer group">
                    <h3 className="text-white font-semibold group-hover:text-[var(--accent-blue)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      {p.subtitle}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
