"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowColor,
  delay = 0,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: glowColor
                ? `0 0 30px ${glowColor}`
                : "0 0 30px rgba(59, 130, 246, 0.2)",
            }
          : undefined
      }
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
