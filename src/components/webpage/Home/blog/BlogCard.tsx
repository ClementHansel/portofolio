"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PlatformBadge from "./PlatformBadge";
import { BlogPreview } from "@/types/blog";

type BlogCardProps = BlogPreview;

export default function BlogCard({
  id,
  title,
  url,
  platform,
  type,
  date,
  thumbnail,
}: BlogCardProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform"
    >
      <div className="relative w-full h-48">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5 space-y-3">
        <span className="text-sm text-gray-400">{date}</span>
        <h3 className="text-lg font-semibold text-white leading-snug">
          {title}
        </h3>
        <div className="flex items-center justify-between pt-2">
          <PlatformBadge platform={platform} />
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-yellow-400 hover:underline"
          >
            {type === "video" ? "Watch ➜" : "Read ➜"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
