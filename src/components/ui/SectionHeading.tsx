"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  gradient?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  gradient = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === "center" ? "text-center" : ""}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          gradient ? "gradient-text" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
