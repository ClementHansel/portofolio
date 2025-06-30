// src/components/CV/BookPageMobile.tsx
"use client";

import { forwardRef } from "react";

const BookPageMobile = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; cover?: boolean }
>(({ children, cover = false }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "320px",
        height: "600px",
        backgroundImage: "url('/assets/textures/paperTexture.webp')",
        backgroundPosition: "center",
      }}
      className={`page bg-white text-gray-800 font-serif overflow-hidden shadow-inner flex flex-col justify-start items-center rounded-md ${
        cover ? "page-cover" : ""
      }`}
    >
      {/* Inner content wrapper */}
      <div className="w-full h-full  text-sm overflow-y-auto">{children}</div>
    </div>
  );
});

BookPageMobile.displayName = "BookPageMobile";

export default BookPageMobile;
