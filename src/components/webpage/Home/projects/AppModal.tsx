"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface AppModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  show: boolean;
}

export default function AppModal({
  images,
  initialIndex,
  onClose,
  show,
}: AppModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 40) nextImage();
    else if (deltaX < -40) prevImage();

    setTouchStartX(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose, prevImage, nextImage]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="relative w-[95vw] max-w-5xl rounded-xl overflow-hidden border border-white/10 bg-neutral-900 p-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full h-[50vh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[currentIndex]}
                  src={images[currentIndex]}
                  alt={`Preview ${currentIndex}`}
                  className="w-full h-full object-contain rounded-lg"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              <button
                onClick={prevImage}
                title="Previous image"
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full hover:bg-white/20"
              >
                <IoChevronBack size={24} />
              </button>
              <button
                onClick={nextImage}
                title="Next image"
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full hover:bg-white/20"
              >
                <IoChevronForward size={24} />
              </button>
            </div>

            <div className="text-center mt-2 text-white/70 text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
