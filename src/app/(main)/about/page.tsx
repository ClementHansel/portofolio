"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const highlights = [
  { label: "Years in Tech", value: "5+", icon: "💻" },
  { label: "Years in Leadership", value: "12+", icon: "👔" },
  { label: "Countries Worked", value: "4", icon: "🌏" },
  { label: "Systems Architected", value: "30+", icon: "🏗️" },
];

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="From executive kitchens to executive technology — a non-linear path built on leadership, adaptability, and relentless curiosity."
        />

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {highlights.map((h, i) => (
            <GlassCard key={h.label} delay={i * 0.1} className="text-center p-4">
              <div className="text-2xl mb-1">{h.icon}</div>
              <div className="text-xl font-bold text-white">{h.value}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{h.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Story sections */}
        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">The Journey</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              I&apos;m <span className="text-[var(--accent-cyan)] font-medium">Clement Hansel</span> — a
              technology executive who made a bold transition from a decade-long leadership career in
              culinary and hospitality industries into software engineering, IoT, and AI systems.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Having led teams of 20-50+ in 4- and 5-star establishments across New Zealand,
              Malaysia, and Indonesia, I built a deep foundation in operations, high-pressure
              decision making, and cross-functional leadership. These skills translate directly
              into managing engineering teams and architecting complex systems.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">What I Build Today</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Today, I architect and deliver real-time monitoring platforms, AI-integrated
              dashboards, and end-to-end IoT solutions that help cities and industries
              modernize their infrastructure.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Recent work includes leading national-scale Weigh-in-Motion systems for the
              Indonesian Ministry of Transportation, developing smart buoy systems for coastal
              monitoring, and creating disaster response platforms with GIS-powered anomaly detection.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">How I Work</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I&apos;m a problem solver by nature. Whether managing vendors, coordinating with
              governments, or writing scalable code, I focus on clarity, reliability, and
              measurable impact. Beyond technical skills, I bring strong communication,
              mentorship, and project management capabilities. I lead with ownership and foster
              collaboration.
            </p>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--text-secondary)] mb-6">
            Looking for a CTO-level partner who understands the intersection of
            people, technology, and operations?
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-xl bg-[var(--accent-blue)] text-white font-semibold hover:bg-[var(--accent-blue)]/90 transition-all hover:shadow-[var(--glow-blue)]"
          >
            Let&apos;s Connect
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
