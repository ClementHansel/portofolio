"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GameModal from "./GameModal";
import { AppProject } from "@/types/projects";

interface AppCarouselProps {
  data: AppProject[];
}

export default function AppCarousel({ data }: AppCarouselProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const focusedApp = data[focusedIndex];
  const appImages = focusedApp?.gallery || [];

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      setFocusedIndex((prev) =>
        e.deltaY > 0
          ? (prev + 1) % data.length
          : (prev - 1 + data.length) % data.length
      );
    },
    [data.length]
  );

  const handleTouchStart = useRef<number | null>(null);
  const handleTouchEnd = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleTouchEnd.current = e.changedTouches[0].clientY;
    if (handleTouchStart.current !== null && handleTouchEnd.current !== null) {
      const deltaY = handleTouchStart.current - handleTouchEnd.current;
      if (deltaY > 30) setFocusedIndex((prev) => (prev + 1) % data.length);
      else if (deltaY < -30)
        setFocusedIndex((prev) => (prev - 1 + data.length) % data.length);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleScroll);
    return () => container.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center h-[400px] md:h-[500px] w-full overflow-hidden bg-neutral-950"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        {appImages.map((src, idx) => {
          const isFocused = idx === 0; // Only first image shown at a time
          const scale = isFocused ? 1.15 : 0.85;
          const zIndex = isFocused ? 30 : 10;
          const blur = isFocused ? "" : "blur-sm opacity-60";

          return (
            <motion.div
              key={idx}
              style={{ zIndex, scale }}
              className={`absolute transition-all duration-500 ease-in-out ${blur}`}
              onMouseEnter={() => isFocused && setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Image
                src={src}
                alt={`App ${idx}`}
                width={480}
                height={270}
                className="rounded-xl shadow-lg object-cover"
              />

              {/* Hover Modal */}
              <GameModal
                images={appImages}
                initialIndex={idx}
                show={hovered && isFocused}
                onClose={() => setHovered(false)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
