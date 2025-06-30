"use client";

import { projects } from "@/data/CV";
import { motion } from "framer-motion";
import useResponsiveBookPage from "@/hooks/useResponsiveBookPage";

export default function ProjectsPage() {
  const Page = useResponsiveBookPage();
  return (
    <Page>
      <motion.div
        className="h-full w-full flex flex-col px-4 py-2 overflow-y-auto text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-4">
          Project Experience
        </h2>

        {projects.map((item, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-base font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm italic">
              {item.organization} – {item.status}
            </p>
            <p className="text-gray-500 text-xs mb-1">{item.period}</p>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              {item.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </Page>
  );
}
