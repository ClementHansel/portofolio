"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface GamePlayerProps {
  title: string;
  children: ReactNode;
}

export default function GamePlayer({ title, children }: GamePlayerProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
        <Link
          href="/games"
          className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
        >
          ← Back to Games
        </Link>
        <h1 className="text-sm font-mono text-[var(--accent-cyan)]">{title}</h1>
        <div className="w-20" />
      </div>

      {/* Game area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex items-center justify-center p-4"
      >
        {children}
      </motion.div>
    </div>
  );
}
