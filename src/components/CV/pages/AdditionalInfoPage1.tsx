"use client";

import { additionalInfo } from "@/data/CV";
import useResponsiveBookPage from "@/hooks/useResponsiveBookPage";

import { motion } from "framer-motion";

export default function AdditionalInfoPage() {
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
          Additional Information
        </h2>

        {/* Technical Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Technical Skills
          </h3>
          <div className="space-y-2">
            {additionalInfo.technicalSkills.map((skillGroup, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-blue-600">
                  {skillGroup.category}
                </h4>
                <ul className="list-disc list-inside text-gray-700 text-sm ml-4">
                  {skillGroup.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Page>
  );
}
