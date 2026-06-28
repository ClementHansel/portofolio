"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const architectures = [
  {
    title: "National IoT Monitoring Platform",
    description:
      "Distributed sensor network → Edge processing → Cloud aggregation → Real-time dashboard. Handles 100K+ data points daily across multiple provinces.",
    layers: ["LoRa Sensors", "Edge Gateway", "MQTT Broker", "TimescaleDB", "React Dashboard"],
  },
  {
    title: "AI Workflow Engine",
    description:
      "Visual pipeline builder → Model registry → Job scheduler → Inference API. Enables non-technical users to deploy ML models.",
    layers: ["React Flow UI", "FastAPI", "TensorFlow Serving", "Redis Queue", "PostgreSQL"],
  },
  {
    title: "Multi-Tenant SaaS Platform",
    description:
      "Tenant isolation → Shared infrastructure → Per-tenant customization → Usage-based billing. Serving enterprise clients.",
    layers: ["Next.js", "Node.js API", "PostgreSQL (RLS)", "Stripe", "AWS"],
  },
];

export default function ArchitecturePage() {
  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="System Architecture"
          subtitle="Interactive diagrams and breakdowns of real systems I've designed. Each represents a production solution solving complex problems."
        />

        <div className="space-y-8 mt-12">
          {architectures.map((arch, i) => (
            <GlassCard key={arch.title} delay={i * 0.1}>
              <h3 className="text-xl font-semibold text-white mb-3">
                {arch.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                {arch.description}
              </p>

              {/* Architecture flow */}
              <div className="flex flex-wrap items-center gap-2">
                {arch.layers.map((layer, li) => (
                  <div key={layer} className="flex items-center gap-2">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: li * 0.1 }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-[var(--accent-blue)]/30 text-[var(--accent-cyan)] bg-[var(--accent-blue)]/5"
                    >
                      {layer}
                    </motion.span>
                    {li < arch.layers.length - 1 && (
                      <span className="text-[var(--text-muted)]">→</span>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-12">
          Interactive architecture diagrams with zoom and detail panels coming soon.
        </p>
      </div>
    </div>
  );
}
