// src/components/CV/CVBookWrapper.tsx
"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Book from "./Book";
import BookMobile from "./BookMobile";

export default function CVBookWrapper() {
  const isMobile = useIsMobile();
  return isMobile ? <BookMobile /> : <Book />;
}
