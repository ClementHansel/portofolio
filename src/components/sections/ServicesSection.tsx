"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const services = [
  {
    icon: "🏛️",
    title: "Fractional CTO",
    description:
      "Strategic technology leadership for startups and growing companies. Architecture decisions, team building, and technical roadmaps.",
    color: "var(--accent-blue)",
  },
  {
    icon: "🔬",
    title: "System Architecture Consulting",
    description:
      "Design reviews, scalability audits, and architecture blueprints for complex distributed systems and IoT platforms.",
    color: "var(--accent-cyan)",
  },
  {
    icon: "⚡",
    title: "Full Stack Development",
    description:
      "End-to-end product development from UI/UX to deployed infrastructure. Web apps, dashboards, and real-time systems.",
    color: "var(--accent-emerald)",
  },
  {
    icon: "📡",
    title: "IoT & AI Solutions",
    description:
      "Sensor-to-cloud platforms, ML model integration, and data pipeline engineering for industrial and government applications.",
    color: "var(--accent-purple)",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            How I Can Help
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Whether you need executive-level technology guidance or hands-on
            engineering, I deliver results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <GlassCard key={service.title} delay={i * 0.1} className="p-8">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/contact" className="neon-btn inline-block">
            Discuss Your Project →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
