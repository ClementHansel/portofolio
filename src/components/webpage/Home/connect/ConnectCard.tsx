"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";

interface ConnectCardProps {
  title: string;
  description: string;
  subtext?: string;
  href: string;
  cta: string;
  icon: IconType;
  color?: string;
  delay?: number;
}

const ConnectCard: FC<ConnectCardProps> = ({
  title,
  description,
  subtext,
  href,
  cta,
  icon: Icon,
  color = "bg-blue-600",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      {/* Icon & Text */}
      <div className="flex items-start md:items-center gap-4 flex-1">
        <div className="w-14 h-14 min-w-14 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="text-2xl text-yellow-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
          {subtext && (
            <p className="text-xs text-gray-400 mt-1 italic">{subtext}</p>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="md:flex-shrink-0">
        <Link
          href={href}
          target={href?.startsWith("http") ? "_blank" : "_self"}
          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`inline-block px-6 py-2.5 rounded-full font-semibold transition hover:opacity-90 animate-pulse text-sm ${color}`}
        >
          {cta}
        </Link>
      </div>
    </motion.div>
  );
};

export default ConnectCard;
