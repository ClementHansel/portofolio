"use client";

import BookPage from "../BookPage";
import { motion } from "framer-motion";
import { certifications } from "@/data/CV/certifications"; // Adjust path if different

export default function CertificationPage() {
  return (
    <BookPage>
      <motion.div
        className="h-full w-full flex flex-col px-4 py-2 overflow-y-auto text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-4">
          Certifications
        </h2>

        <ul className="space-y-4">
          {certifications.map((cert, index) => (
            <li key={index} className="">
              <h3 className="text-base font-semibold text-gray-800">
                {cert.title}
              </h3>
              <p className="text-gray-600 text-sm italic">{cert.issuer}</p>
              <p className="text-gray-500 text-xs">{cert.date}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </BookPage>
  );
}
