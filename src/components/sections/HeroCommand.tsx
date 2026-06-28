"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/three/Globe"), { ssr: false });

const roles = [
  "CTO & Technology Executive",
  "System Architect",
  "IoT Solutions Engineer",
  "AI/ML Integration Specialist",
  "Full Stack Developer",
];

export default function HeroCommand() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  // Typewriter effect for roles
  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === role) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayText(
        isDeleting ? role.slice(0, displayText.length - 1) : role.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--accent-blue)] rounded-full opacity-[0.04] blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--accent-purple)] rounded-full opacity-[0.04] blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-cyan)] rounded-full opacity-[0.02] blur-[120px]" />

      {/* 3D Globe - behind content */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-bg)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-[var(--text-secondary)]">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-white">Clement</span>{" "}
          <span className="gradient-text">Hansel</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-10 mb-8 flex items-center justify-center"
        >
          <span className="text-lg md:text-2xl text-[var(--accent-cyan)] font-mono">
            {displayText}
            <span className="animate-pulse text-[var(--accent-blue)]">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          I architect and deliver scalable systems that bridge hardware and
          software — from national-scale IoT platforms to AI-powered enterprise
          applications. A decade of leadership, now channeled into technology
          that drives measurable impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/projects" className="neon-btn px-8 py-4 text-center">
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-[var(--accent-blue)] text-white font-semibold hover:bg-[var(--accent-blue)]/90 transition-all hover:shadow-[var(--glow-blue)] text-center"
          >
            Let&apos;s Work Together
          </Link>
          <Link
            href="/cv"
            className="px-8 py-4 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-cyan)] transition-all text-center"
          >
            Download CV
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-[var(--border-subtle)] flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--accent-blue)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
