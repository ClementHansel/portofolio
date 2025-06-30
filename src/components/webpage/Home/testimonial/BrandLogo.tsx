"use client";

import Image from "next/image";
import { useId } from "react";

// Example logo data (replace with real client logos later)
const logos = [
  { src: "/images/logos/google.png", alt: "Google" },
  { src: "/images/logos/microsoft.png", alt: "Microsoft" },
  { src: "/images/logos/spotify.png", alt: "Spotify" },
  { src: "/images/logos/vercel.png", alt: "Vercel" },
  { src: "/images/logos/amazon.png", alt: "Amazon" },
];

export default function BrandLogo() {
  const id = useId();

  return (
    <div className="relative overflow-hidden w-full">
      {/* Gradient mask edges */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          background: "transparent",
        }}
      />

      <div
        className="flex gap-12 animate-marquee whitespace-nowrap"
        style={{ animationDuration: "40s" }}
        aria-hidden="true"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${id}-${index}`}
            className="relative h-12 w-28 flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
