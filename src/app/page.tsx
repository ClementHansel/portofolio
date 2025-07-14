"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "@/components/webpage/layout/Header";
import Footer from "@/components/webpage/layout/Footer";
import Intro from "@/components/webpage/Home/Intro";
import Hero from "@/components/webpage/Home/Hero";
import Projects from "@/components/webpage/Home/projects/projects";
import Service from "@/components/webpage/Home/services/Service";
import Blog from "@/components/webpage/Home/blog/Blog";
import Connect from "@/components/webpage/Home/connect/Connect";
import Testimonial from "@/components/webpage/Home/testimonial/Testimonial";
import Contact from "@/components/webpage/Home/Contact";
import Skills from "@/components/webpage/Home/skills/Skills";

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateSection = (
      target: string,
      animation: gsap.TweenVars,
      options: Partial<ScrollTrigger> = {}
    ) => {
      const element = document.querySelector(target);
      if (!element) return;

      gsap.from(element, {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          // If you want replay-on-scroll-up: use toggleActions
          toggleActions: "play none play none",
          ...options,
        },
      });
    };

    // ✨ Animate each section naturally when in view
    animateSection("#hero", {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      ease: "power2.out",
    });

    animateSection("#projects", {
      x: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    animateSection("#service", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power2.out",
    });

    animateSection("#testimonial", {
      scale: 0.9,
      filter: "blur(6px)",
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
    });

    animateSection("#blog", {
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
      duration: 1.5,
      ease: "power3.out",
    });

    animateSection("#connect", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power1.out",
    });

    animateSection("#contact", {
      scale: 0.8,
      rotate: 5,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.4)",
    });

    ScrollTrigger.refresh(); // Recalculate layout
  }, []);

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden bg-black text-white">
      <Header />

      {/* ✅ Let Intro handle its own animation & pinning */}
      <div id="intro" className="bg-black">
        <Intro />
      </div>

      {/* ✅ Each section now scroll-animates naturally */}
      <div id="hero">
        <Hero />
      </div>

      <div id="hero">
        <Skills />
      </div>

      <div id="projects" className="bg-white text-black">
        <Projects />
      </div>

      <div id="service" className="bg-white text-black">
        <Service />
      </div>

      <div id="testimonial" className="bg-white text-black">
        <Testimonial />
      </div>

      <div id="blog" className="bg-white text-black">
        <Blog />
      </div>

      <div id="connect" className="bg-white text-black">
        <Connect />
      </div>

      <div id="contact" className="bg-white text-black">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
