// src/components/CV/treeParts/Fruits.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { projects } from "../data/projectData";

export default function Fruits() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <motion.svg
        ref={ref}
        viewBox="0 0 200 200"
        className="absolute top-[20%] left-[50%] w-32 h-32 -translate-x-1/2 z-20"
        style={{ opacity, scale }}
      >
        {projects.map((project) => (
          <image
            key={project.id}
            href={project.icon}
            x={project.position.x}
            y={project.position.y}
            width="20"
            height="20"
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer"
          />
        ))}
      </motion.svg>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedProject.name}</h2>
            <p className="mb-4">{selectedProject.description}</p>
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
