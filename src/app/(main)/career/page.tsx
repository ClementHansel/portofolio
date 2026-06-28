"use client";

import { motion } from "framer-motion";
import { careerMilestones } from "@/data/career/milestones";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CareerPage() {
  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Career Journey"
          subtitle="A non-linear path built on leadership, adaptability, and relentless curiosity. From executive kitchens across three countries to architecting national-scale technology systems."
        />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-emerald)]" />

          <div className="space-y-16">
            {careerMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full border-2 border-[var(--accent-blue)] bg-[var(--bg-primary)]">
                  <div className="absolute inset-1 rounded-full bg-[var(--accent-blue)]" />
                </div>

                {/* Content */}
                <div className="glass-card p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm font-mono text-[var(--accent-cyan)]">
                      {milestone.date}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--accent-blue)]/30 text-[var(--accent-blue)]">
                      {milestone.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {milestone.title}
                  </h3>

                  <p className="text-sm text-[var(--accent-purple)] mb-3">
                    {milestone.organization}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {milestone.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
