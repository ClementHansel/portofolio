"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import Lottie from "lottie-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: IconType;
  lottie?: object;
  delay: number;
}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  href,
  icon: Icon,
  lottie,
  delay,
}) => {
  // CTA text based on title
  const getCTA = (title: string) => {
    switch (title.toLowerCase()) {
      case "hire me":
        return "Let's chat →";
      case "digital shop":
        return "Start shopping →";
      case "support me":
        return "Support me →";
      default:
        return "Let's go →";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl p-[2px] bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-2xl"
    >
      <div className="relative z-10 h-full rounded-[inherit] bg-gradient-to-r from-neutral-900 to-black text-white px-6 py-8 shadow-inner shadow-neutral-900 overflow-hidden">
        {/* Glowing animated border overlay */}
        <div className="absolute inset-0 rounded-[inherit] before:absolute before:inset-0 before:rounded-[inherit] before:content-[''] before:animate-glow before:bg-[conic-gradient(from_0deg_at_50%_50%,#ff00cc,#3333ff,#00ffee,#ff00cc)] before:blur-md before:opacity-40 z-[-1]" />

        <div className="mb-4 h-32">
          {lottie ? (
            <Lottie animationData={lottie} loop className="h-full w-full" />
          ) : Icon ? (
            <div className="text-4xl text-blue-400">
              <Icon />
            </div>
          ) : null}
        </div>

        <h3 className="text-xl font-semibold mb-2 drop-shadow-md">{title}</h3>
        <p className="text-sm text-neutral-300 mb-4 flex-1">{description}</p>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 2,
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <Link
            href={href}
            className="mt-auto inline-block text-blue-400 hover:text-cyan-300 font-medium transition hover:underline"
          >
            {getCTA(title)}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
