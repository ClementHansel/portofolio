"use client";

import { motion } from "framer-motion";
import ConnectCard from "./ConnectCard";
import { FaLinkedin, FaYoutube, FaUserPlus } from "react-icons/fa";

export default function Connect() {
  const connectOptions = [
    {
      title: "Connect on LinkedIn",
      description:
        "Follow my journey in software architecture, dev leadership, and freelancing tips.",
      icon: FaLinkedin,
      href: "https://linkedin.com/in/clementhansel",
      cta: "Follow Me",
      color: "bg-blue-600",
      subtext: "2.3K connections • Posts weekly",
    },
    {
      title: "Subscribe on YouTube",
      description: "Watch devlogs, coding breakdowns, and game dev tutorials.",
      icon: FaYoutube,
      href: "https://youtube.com/@yourchannel",
      cta: "Subscribe",
      color: "bg-red-600",
      subtext: "1.5K+ subscribers • New video every week",
    },
    {
      title: "Join the Web",
      description:
        "Register to access the backend demo and receive content notifications directly.",
      icon: FaUserPlus,
      href: "/(main)/register",
      cta: "Register Now",
      color: "bg-yellow-500 text-black",
      subtext: "Get alerts for new blogs, tools, and project updates",
    },
  ];

  return (
    <section className="w-full bg-black py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-md mb-12 text-center md:text-left"
        >
          Stay Connected
        </motion.h2>

        <div className="space-y-8">
          {connectOptions.map((option, idx) => (
            <ConnectCard key={option.href} {...option} delay={idx * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
