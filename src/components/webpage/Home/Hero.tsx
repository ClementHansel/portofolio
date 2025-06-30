"use client";

import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

// Reusable animated tech component
function AnimatedTech({
  name,
  iconSrc,
  color,
}: {
  name: string;
  iconSrc: string;
  color: string;
}) {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setShowIcon((prev) => !prev);
      }, 5000);

      // Cleanup
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="relative w-[70px] h-[25px] text-center inline-block">
      {/* Text */}
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: showIcon ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ color }}
      >
        {name}
      </motion.span>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIcon ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src={iconSrc}
          alt={name}
          width={40}
          height={40}
          className="inline-block object-contain w-10 h-10 mx-auto"
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
    else setHasAnimated(false);
  }, [inView]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/textures/bg_dark_spotlight.jpg"
        alt="Spotlight Background"
        fill
        className="object-cover opacity-40"
        priority
      />

      {/* Content Wrapper */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col md:flex-row gap-10 w-full max-w-7xl px-6 py-20 text-white"
      >
        {/* Left Section - Text */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-center text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-md">
            Clement Hansel
          </h1>
          <span className="text-lg md:text-xl text-white/80 relative">
            I&apos;m a full stack software engineer, a multidisciplinary
            professional who thrive in
            <span className="relative inline-block mx-1">
              Empowering
              <Image
                src="/assets/images/props/crown.png"
                alt="Crown"
                width={24}
                height={24}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-bounce"
              />
            </span>
            businesses and
            <motion.span
              className="text-green-400 font-semibold mx-2 inline-block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              increasing
            </motion.span>
            productivity
          </span>

          <motion.p
            className="text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            My journey is driven by curiosity, resilience, and a passion for
            turning complex problems into
            <span className="text-cyan-400 font-semibold">
              {" "}
              simple, impactful solutions
            </span>
            .
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            I&apos;m proficient in
            <AnimatedTech
              name="TypeScript"
              iconSrc="/assets/images/props/typescript.png"
              color="#3178C6"
            />
            ,
            <AnimatedTech
              name="React"
              iconSrc="/assets/images/props/react.png"
              color="#61DAFB"
            />
            ,
            <AnimatedTech
              name="Next.js"
              iconSrc="/assets/images/props/next.png"
              color="#00dc82"
            />
            ,
            <AnimatedTech
              name="Node.js"
              iconSrc="/assets/images/props/node.png"
              color="#339933"
            />
            , and
            <AnimatedTech
              name="AWS"
              iconSrc="/assets/images/props/aws.png"
              color="#FF9900"
            />
            , with hands-on experience integrating
            <AnimatedTech
              name="LoRa"
              iconSrc="/assets/images/props/lora.png"
              color="#00BFFF"
            />
            ,
            <AnimatedTech
              name="GSM"
              iconSrc="/assets/images/props/gsm.png"
              color="#F7931E"
            />
            ,
            <AnimatedTech
              name="GPS"
              iconSrc="/assets/images/props/gps.png"
              color="#4682B4"
            />
            , and{" "}
            <AnimatedTech
              name="Sensor"
              iconSrc="/assets/images/props/iot.png"
              color="#20C997"
            />
            into scalable platforms.
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 mt-4 w-full justify-center items-center">
              <Link href="/cv">
                <button className="neon-btn w-40 text-center">My CV</button>
              </Link>
              <Link href="/about">
                <button className="neon-btn w-40 text-center">About Me</button>
              </Link>
              <Link href="/contact">
                <button className="neon-btn w-40 text-center">
                  Let&apos;s Chat
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Section - 3D Robot */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 5 }}
        >
          <Spline scene="https://prod.spline.design/ls4lnLmVpe8gPJl2/scene.splinecode" />
        </motion.div>
      </div>
    </div>
  );
}
