// src/components/Book/BookPage.tsx
"use client";

import { forwardRef } from "react";

const BookPage = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; cover?: boolean }
>(({ children, cover = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`page w-[600px] h-[800px] bg-white text-gray-800 font-serif overflow-hidden shadow-inner flex flex-col justify-center items-center rounded-md ${
        cover ? "page-cover" : ""
      }`}
      style={{
        backgroundImage: "url('/assets/textures/paperTexture.webp')",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
});

BookPage.displayName = "BookPage";

export default BookPage;
