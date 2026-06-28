"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="glass-card p-6 text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {count}
        <span className="text-[var(--accent-cyan)]">{suffix}</span>
      </div>
      <div className="text-sm text-[var(--text-muted)]">{label}</div>
    </motion.div>
  );
}

const stats = [
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Years in Tech" },
  { value: 99, suffix: ".9%", label: "System Uptime" },
  { value: 100, suffix: "K+", label: "Daily Data Points Processed" },
  { value: 12, suffix: "+", label: "Team Members Led" },
  { value: 8, suffix: "", label: "Expertise Domains" },
];

export default function ImpactDashboard() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Impact at a Glance
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Numbers that reflect real systems shipped, teams led, and problems
            solved.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
