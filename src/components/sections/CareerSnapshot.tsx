"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { careerMilestones } from "@/data/career/milestones";

export default function CareerSnapshot() {
  const displayMilestones = careerMilestones.slice(0, 4);

  return (
    <section className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Career Journey
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            From executive kitchens to executive technology — a non-linear path
            built on leadership, adaptability, and relentless curiosity.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-purple)] to-transparent" />

          <div className="space-y-12">
            {displayMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full border-2 border-[var(--accent-blue)] bg-[var(--bg-primary)]">
                  <div className="absolute inset-1 rounded-full bg-[var(--accent-blue)] animate-pulse" />
                </div>

                {/* Content */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[var(--accent-cyan)]">
                      {milestone.date}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        milestone.type === "role"
                          ? "border-[var(--accent-blue)]/30 text-[var(--accent-blue)]"
                          : "border-[var(--accent-amber)]/30 text-[var(--accent-amber)]"
                      }`}
                    >
                      {milestone.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[var(--accent-purple)]  mb-2">
                    {milestone.organization}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/career"
            className="text-sm text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            View full timeline →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
