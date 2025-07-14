"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Intro() {
  const containerRef = useRef(null);
  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);
  const welcomeRef = useRef(null);
  const profileRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const enjoyRef = useRef(null);
  const dotsRef = useRef(null);
  const hasScrolledToHero = useRef(false);

  const fullText = "Welcome to my page ! ";
  const [typedText, setTypedText] = useState("");

  const [writingDone, setWritingDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        const nextChar = fullText.charAt(currentIndex);
        setTypedText((prev) => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(interval);
        setWritingDone(true); // ✅ fire when done
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!writingDone) return;

    let introTL: gsap.core.Timeline | null = null;
    let trigger: ScrollTrigger | undefined;

    const delay = setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);

      introTL = createIntroTimeline();

      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        onEnterBack: () => {
          introTL?.kill();
          introTL = createIntroTimeline();
        },
      });
    }, 1000);

    return () => {
      clearTimeout(delay);
      trigger?.kill?.();
      introTL?.kill?.();
    };
  }, [writingDone]);

  // 👇 Define outside useEffect
  const createIntroTimeline = () => {
    // Reset elements first
    gsap.set(
      [
        logo1Ref.current,
        logo2Ref.current,
        profileRef.current,
        nameRef.current,
        roleRef.current,
        enjoyRef.current,
        dotsRef.current,
      ],
      { clearProps: "all" }
    );

    // Initial position reset
    gsap.set([profileRef.current, dotsRef.current], { opacity: 0, x: -50 });
    gsap.set([nameRef.current, roleRef.current, enjoyRef.current], {
      opacity: 0,
      x: 50,
    });
    gsap.set([logo1Ref.current, logo2Ref.current], {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
    });

    const tl = gsap.timeline();

    tl.to(welcomeRef.current, { opacity: 0, y: -50, duration: 1 })
      .to(logo1Ref.current, { y: -150, duration: 0.8 })
      .to(logo2Ref.current, { y: 150, duration: 0.8 }, "<")
      .to(logo1Ref.current, { x: -500, opacity: 0, duration: 1 })
      .to(logo2Ref.current, { x: 500, opacity: 0, duration: 1 }, "<")
      .to({}, { duration: 0.5 })
      .to({}, { duration: 0.3 })
      .to(
        [profileRef.current, dotsRef.current],
        { opacity: 1, x: 100, duration: 1.2, ease: "power2.out" },
        2.3
      )
      .to(
        [nameRef.current, roleRef.current],
        {
          opacity: 1,
          x: -200,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.2,
        },
        2.3
      )
      .to([profileRef.current, dotsRef.current], {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        [nameRef.current, roleRef.current],
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      )
      .to({}, { duration: 0.5 })
      .to(enjoyRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      })
      .to({}, { duration: 2 })
      .to(enjoyRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });

    tl.call(() => {
      const next = document.querySelector("#hero");
      if (next) next.scrollIntoView({ behavior: "smooth" });
      hasScrolledToHero.current = true; // ✅ prevent future scrolls
    });

    return tl;
  };

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* Logos */}
      <div className="absolute top-[20%] sm:top-[25%] left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
        <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]">
          <div ref={logo1Ref} className="absolute inset-0">
            <Image
              src="/assets/images/logo/Clogo.png"
              alt="Logo 1"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] -ml-[90px] sm:-ml-[120px] md:-ml-[150px]">
          <div ref={logo2Ref} className="absolute inset-0">
            <Image
              src="/assets/images/logo/Hlogo.png"
              alt="Logo 2"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div
        className="absolute top-[60%] sm:top-[55%] flex flex-col items-center text-base sm:text-lg md:text-xl"
        ref={welcomeRef}
      >
        <div>
          {typedText}
          <span className="animate-pulse">|</span>
        </div>
      </div>

      {/* Profile & Info */}
      <div
        ref={profileRef}
        className="opacity-0 absolute top-[30%] w-full flex flex-col md:flex-row items-center px-4 sm:px-10 md:px-20 gap-8"
      >
        {/* Profile + Orbit */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]">
            <Image
              src="/assets/images/profile/profile.jpg"
              alt="Profile"
              fill
              className="rounded-full border-4 border-yellow-500 shadow-lg z-10 object-cover"
            />
            {/* Yellow Planet */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center origin-center"
                style={{
                  transform: "rotateX(60deg) rotateZ(20deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-2 h-2 bg-yellow-300 rounded-full relative"
                  style={{
                    transform: "translateX(120px)",
                    filter: "blur(0.5px)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <div
                      className="w-1 h-1 bg-white rounded-full"
                      style={{
                        transform: "translateX(10px)",
                        filter: "blur(0.5px)",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Red Planet */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center origin-center"
                style={{
                  transform: "rotateX(60deg) rotateZ(10deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-4 h-4 bg-red-300 rounded-full relative"
                  style={{
                    transform: "translateX(170px) scale(1.1)",
                    filter: "blur(0.5px)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <div
                      className="w-1.5 h-1.5 bg-purple-300 rounded-full"
                      style={{
                        transform: "translateX(16px)",
                        filter: "blur(0.5px)",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Green Planet */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center origin-center"
                style={{
                  transform: "rotateX(60deg) rotateZ(-30deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-6 h-6 bg-green-300 rounded-full relative"
                  style={{
                    transform: "translateY(220px) scale(1.3)",
                    filter: "blur(0.5px)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <div
                      className="w-2 h-2 bg-blue-200 rounded-full"
                      style={{
                        transform: "translateX(20px)",
                        filter: "blur(0.5px)",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Name + Role */}
        <div className="w-full md:w-1/2 flex justify-center text-center md:text-left">
          <div className="flex flex-col gap-2">
            <div
              ref={nameRef}
              className="opacity-0 text-xl sm:text-2xl md:text-3xl"
            >
              I&apos;m{" "}
              <span className="relative inline-block text-transparent bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-[length:250%_100%] bg-clip-text animate-shine animate-glow">
                Clement Hansel
              </span>
            </div>
            <div
              ref={roleRef}
              className="opacity-0 text-green-400 text-lg sm:text-xl md:text-2xl"
            >
              Software Engineer
            </div>
          </div>
        </div>
      </div>

      {/* Outro */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          ref={enjoyRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-4xl italic text-white/70 opacity-0 text-center"
        >
          I hope you enjoy this portfolio
        </div>
      </div>
    </div>
  );
}
