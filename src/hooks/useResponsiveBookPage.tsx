// src/hooks/useResponsiveBookPage.tsx
"use client";

import useIsMobile from "@/hooks/useIsMobile";
import BookPage from "@/components/CV/BookPage";
import BookPageMobile from "@/components/CV/BookPageMobile";

export default function useResponsiveBookPage() {
  const isMobile = useIsMobile();
  return isMobile ? BookPageMobile : BookPage;
}
