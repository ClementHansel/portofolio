"use client";

import BookPage from "../BookPage";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CoverPage() {
  return (
    <BookPage>
      {/* 3D book shadow frame */}
      <div
        className="relative h-full w-full bg-cover bg-no-repeat shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] border border-black overflow-hidden flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: "url('/assets/textures/FrontCover.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        {/* Semi-circle profile image */}
        <div className="w-40 h-40 overflow-hidden shadow-lg mt-4 mb-6 border border-yellow-600">
          <Image
            src="/assets/images/profile.jpg"
            alt="Clement Hansel"
            width={160}
            height={160}
            className="object-cover w-full h-full "
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-yellow-600 mt-1 mb-1 drop-shadow-sm">
          Curriculum Vitae
        </h1>
        <h2 className="text-2xl font-semibold text-yellow-600 mb-6">
          Clement Hansel
        </h2>

        {/* Quote */}
        <motion.p
          className="text-sm italic text-yellow-500 max-w-[80%]"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          “The journey of a lifetime starts with the turning of a page”
          <br />— Rachel Anders —
        </motion.p>
      </div>
    </BookPage>
  );
}
