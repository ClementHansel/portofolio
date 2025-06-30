"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  testimony: string;
  avatar: string;
  delay?: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  testimony,
  avatar,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between h-full"
    >
      {/* Quote Section */}
      <div className="flex flex-col gap-4 flex-1">
        <span className="text-4xl text-yellow-400 leading-none">“{quote}”</span>
        <p className="text-sm text-gray-200 leading-relaxed">{testimony}</p>
      </div>

      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mt-6">
        <div className="w-12 h-12 relative rounded-full overflow-hidden border border-yellow-400">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-white">{name}</h4>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
