"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ProjectCardProps {
  icon: ReactNode;
  title: string;
  color: string; // e.g., "text-yellow-300"
  description: string;
  href?: string; // 🔧 Optional link for navigation
  children?: ReactNode;
}

export default function ProjectCard({
  icon,
  title,
  color,
  description,
  href,
  children,
}: ProjectCardProps) {
  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-[#1a1a1a] border border-white/10 rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
        <h3 className={`text-2xl font-semibold ${color}`}>{title}</h3>
      </div>
      <p className="text-white/60 text-sm md:text-base leading-relaxed">
        {description}
      </p>
      {children && (
        <div className="relative w-full overflow-hidden mt-4 rounded-xl">
          {children}
        </div>
      )}
    </motion.div>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
}
