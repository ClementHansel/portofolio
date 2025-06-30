"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GameModal from "./GameModal";
import { GameProject } from "@/types/projects";

interface GameCarouselProps {
  data: GameProject[];
}

export default function GameCarousel({ data }: GameCarouselProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const focusedGame = data[focusedIndex];
  const gameImages = focusedGame?.gallery || [];

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;
    setRotateX(-y / 20);
    setRotateY(x / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setFocusedIndex((prev) => (prev + 1) % data.length);
      } else {
        setFocusedIndex((prev) => (prev - 1 + data.length) % data.length);
      }
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
      if (deltaY > 30) {
        setFocusedIndex((prev) => (prev + 1) % data.length);
      } else if (deltaY < -30) {
        setFocusedIndex((prev) => (prev - 1 + data.length) % data.length);
      }
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
      className="relative flex items-center justify-center h-[600px] md:h-[700px] w-full overflow-hidden bg-neutral-950"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
        {gameImages.map((src, idx) => {
          const isFocused = idx === focusedIndex;
          const scale = isFocused ? 1.2 : 0.8;
          const zIndex = isFocused ? 30 : 10;
          const blur = isFocused ? "" : "blur-sm opacity-60";

          return (
            <motion.div
              key={idx}
              style={{ zIndex }}
              animate={
                isFocused
                  ? { scale, rotateX, rotateY }
                  : { scale, rotateX: 0, rotateY: 0 }
              }
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className={`absolute ${blur}`}
              onMouseEnter={() => isFocused && setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
                handleMouseLeave();
              }}
              onMouseMove={(e) => isFocused && handleMouseMove(e)}
            >
              <Image
                src={src}
                alt={`Game ${idx}`}
                width={240}
                height={360}
                className="rounded-xl shadow-lg object-cover"
              />

              {/* Hover Modal */}
              <GameModal
                show={hovered && isFocused}
                onClose={() => setHovered(false)}
                images={gameImages}
                initialIndex={idx}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
