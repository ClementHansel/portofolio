"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  title: string;
  items: string[];
  delay?: number;
}

const SkillCard = ({ title, items, delay = 0 }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-left shadow-xl"
    >
      <h3 className="text-yellow-400 text-xl font-bold mb-4">{title}</h3>
      <ul className="list-disc list-inside text-neutral-300 text-sm space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCard;
