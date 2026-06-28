"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { expertiseDomains } from "@/data/expertise/domains";
import GlassCard from "@/components/ui/GlassCard";

export default function ExpertisePreview() {
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
            Expertise Domains
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Eight specialized domains, unified by systems thinking and a drive
            to ship impactful solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseDomains.map((domain, i) => (
            <Link key={domain.id} href={`/expertise/${domain.id}`}>
              <GlassCard
                delay={i * 0.08}
                glowColor={domain.glowColor}
                className="h-full cursor-pointer group"
              >
                <div className="text-4xl mb-4">{domain.icon}</div>
                <h3
                  className="text-lg font-semibold mb-2 group-hover:text-white transition-colors"
                  style={{ color: domain.color }}
                >
                  {domain.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                  {domain.subtitle}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {domain.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.name}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/expertise"
            className="text-sm text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            Explore all domains →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
