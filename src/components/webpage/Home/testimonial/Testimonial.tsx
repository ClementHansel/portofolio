"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import BrandLogo from "./BrandLogo";

// Mock data (you can move this to a separate file later)
const testimonials = [
  {
    name: "Alice Tan",
    role: "CTO, Fintech Startup",
    quote:
      "Clement restructured our entire codebase. We saved months of dev time.",
    testimony:
      "Working with Clement was a game-changer. We had a legacy system that was messy, tightly coupled, and nearly unscalable. Clement jumped in, introduced a modular architecture, and transformed our engineering process. His ability to balance performance, maintainability, and clear documentation was rare. Our team saved countless hours and now ships features faster than ever.",
    avatar: "/images/testimonials/alice.jpg",
  },
  {
    name: "David Kim",
    role: "Game Studio Lead",
    quote: "Clement’s modular systems were seamless and future-proof.",
    testimony:
      "We brought Clement on to improve the core engine of our indie game pipeline. He immediately understood the scope, optimized the build system, and introduced tooling that made our lives easier. What stood out the most was his eye for reusable components and clean design patterns. Our team learned a ton just by working alongside him.",
    avatar: "/images/testimonials/david.jpg",
  },
  {
    name: "Sara Li",
    role: "Founder, EdTech App",
    quote: "Scalable, clean, and fast — Clement nailed it across the stack.",
    testimony:
      "As a startup founder without a strong tech background, I was worried about scaling. Clement not only built the architecture but explained every trade-off in a way I could understand. He ensured our codebase was clean, SEO-optimized, and secure. I’ve worked with many devs, but Clement is on another level — professional, transparent, and always ahead of the curve.",
    avatar: "/images/testimonials/sara.jpg",
  },
];

export default function Testimonial() {
  return (
    <section className="w-full bg-neutral-950 py-20 px-4 md:px-10 lg:px-20 text-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-md mb-12 text-center md:text-left"
        >
          What Clients Say
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={i * 0.15} />
          ))}
        </div>

        {/* Brand Logos Strip */}
        <div className="mt-16">
          <BrandLogo />
        </div>
      </div>
    </section>
  );
}
