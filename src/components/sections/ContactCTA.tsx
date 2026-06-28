"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="section-padding relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-[var(--accent-blue)] rounded-full opacity-[0.03] blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something{" "}
            <span className="gradient-text">Extraordinary</span>?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Whether you need a CTO-level partner, a system architect, or a
            hands-on engineer — let&apos;s discuss how I can drive your
            technology forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-[var(--accent-blue)] text-white font-semibold hover:bg-[var(--accent-blue)]/90 transition-all hover:shadow-[var(--glow-blue)]"
            >
              Start a Conversation
            </Link>
            <Link
              href="/cv"
              className="neon-btn px-8 py-4"
            >
              View My CV
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
