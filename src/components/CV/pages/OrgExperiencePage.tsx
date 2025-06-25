"use client";

import BookPage from "../BookPage";
import { motion } from "framer-motion";
import { organizationExperience } from "@/data/CV/organization";

export default function OrgExperiencePage() {
  return (
    <BookPage>
      <motion.div
        className="h-full w-full flex flex-col px-4 py-2 overflow-y-auto text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-4">
          Organizational Experience
        </h2>

        <ul className="space-y-3">
          {organizationExperience.map((item, index) => (
            <li key={index} className="">
              <h3 className="text-base font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm italic">{item.institution}</p>
              <p className="text-gray-500 text-xs">{item.date}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {item.link}
                </a>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </BookPage>
  );
}
