"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

type TimelineItemProps = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  bullets: string[];
  icon?: string; // optional emoji/icon
  side?: "left" | "right"; // for alternating layout
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  id,
  title,
  subtitle,
  period,
  bullets,
  icon,
  side = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLeft = side === "left";

  return (
    <>
      <motion.div
        id={id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`relative flex flex-col ${
          isLeft ? "items-start" : "items-end"
        } group cursor-pointer`}
        onClick={() => setIsOpen(true)}
      >
        {/* Line and dot */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-400 z-0" />
        <div
          className={`absolute top-2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md z-10 ${
            isLeft ? "-left-2" : "-right-2"
          }`}
        />

        <div
          className={`bg-white shadow-lg p-4 rounded-xl max-w-md w-full border border-gray-200 z-10 ${
            isLeft ? "ml-6 text-left" : "mr-6 text-right"
          }`}
        >
          <div className="flex items-center gap-2">
            {icon && <span className="text-xl">{icon}</span>}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-sm italic text-gray-500 mt-1">
            {subtitle} | {period}
          </p>
          <ul className="list-disc text-sm text-gray-700 mt-2 space-y-1 ml-4">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <p className="text-xs text-blue-500 mt-2 group-hover:underline">
            Click to view more
          </p>
        </div>
      </motion.div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-2">
              {title}
            </Dialog.Title>
            <Dialog.Description className="italic text-sm text-gray-500 mb-4">
              {subtitle} | {period}
            </Dialog.Description>
            <ul className="list-disc text-gray-800 ml-5 space-y-1 text-sm">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default TimelineItem;
