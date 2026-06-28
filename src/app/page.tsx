"use client";

import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import HeroCommand from "@/components/sections/HeroCommand";
import ExpertisePreview from "@/components/sections/ExpertisePreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ImpactDashboard from "@/components/sections/ImpactDashboard";
import CareerSnapshot from "@/components/sections/CareerSnapshot";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactCTA from "@/components/sections/ContactCTA";

// Lazy load heavy Three.js components
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden noise-overlay">
      <Nav />

      {/* WebGL Particle background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Scan line effect */}
      <div className="scan-line" />

      <main className="grid-bg">
        <HeroCommand />
        <ImpactDashboard />
        <ExpertisePreview />
        <FeaturedProjects />
        <CareerSnapshot />
        <ServicesSection />
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
