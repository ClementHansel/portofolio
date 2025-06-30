"use client";

import { education } from "@/data/CV";
import { motion } from "framer-motion";
import useResponsiveBookPage from "@/hooks/useResponsiveBookPage";

export default function EducationPage() {
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
          Education
        </h2>

        {education.map((item, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-base font-semibold text-gray-800">
              {item.school}
            </h3>
            <p className="text-gray-600 text-sm italic mt-2 mb-2">
              {item.degree}
            </p>
            <p>{item.period}</p>
            <p className="text-gray-500 text-xs mb-1">{item.notes}</p>
          </div>
        ))}
      </motion.div>
    </Page>
  );
}
