"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

interface GameInfo {
  slug: string;
  title: string;
  description: string;
  genre: string;
  engine: string;
  status: "playable" | "coming-soon";
  color: string;
  icon: string;
}

const games: GameInfo[] = [
  {
    slug: "jumpMeIn",
    title: "Jump Me In",
    description:
      "A rogue data packet escapes a corrupted mainframe. Fast-paced neon platformer with custom physics, particle effects, and procedural levels.",
    genre: "Platformer",
    engine: "Canvas 2D",
    status: "playable",
    color: "#06b6d4",
    icon: "🏃",
  },
  {
    slug: "solveMe",
    title: "Solve Me",
    description:
      "Fragmented memory blocks must be reassembled to restore corrupted systems. Sliding puzzle with progressive difficulty and narrative layers.",
    genre: "Puzzle",
    engine: "React/Framer",
    status: "playable",
    color: "#a855f7",
    icon: "🧩",
  },
  {
    slug: "deckMe",
    title: "Deck Me",
    description:
      "Two AIs compete for processing dominance. Strategic card battle with attack/defense mechanics and adaptive AI opponent.",
    genre: "Card Battle",
    engine: "React/Framer",
    status: "playable",
    color: "#3b82f6",
    icon: "🃏",
  },
  {
    slug: "karateBoy",
    title: "Karate Boy",
    description:
      "A martial arts prodigy fights through digital dojos. Combo-based fighting with frame-perfect timing and AI opponents.",
    genre: "Fighting",
    engine: "Canvas 2D",
    status: "playable",
    color: "#ef4444",
    icon: "🥋",
  },
  {
    slug: "buildOut",
    title: "Build Out",
    description:
      "A sandbox construction simulator. Place blocks, orbit the camera, and build structures in a voxel-based world.",
    genre: "Sandbox",
    engine: "Three.js",
    status: "playable",
    color: "#10b981",
    icon: "🧱",
  },
  {
    slug: "hauntedVilla",
    title: "Haunted Villa",
    description:
      "Explore a haunted mansion in first-person. Atmospheric horror with volumetric fog, spatial audio cues, and puzzle elements.",
    genre: "Horror",
    engine: "Three.js",
    status: "playable",
    color: "#6b21a8",
    icon: "👻",
  },
  {
    slug: "counterMe",
    title: "Counter Me",
    description:
      "A top-down neon shooter. Survive waves of geometric enemies with upgradeable weapons and score multipliers.",
    genre: "Shooter",
    engine: "Canvas 2D",
    status: "playable",
    color: "#f43f5e",
    icon: "🔫",
  },
  {
    slug: "epoch",
    title: "Epoch",
    description:
      "Turn-based strategy across historical eras. Manage resources, build civilizations, and outwit AI opponents on hex grids.",
    genre: "Strategy",
    engine: "React/SVG",
    status: "playable",
    color: "#f59e0b",
    icon: "⚔️",
  },
  {
    slug: "lifeMustGoOn",
    title: "Life Must Go On",
    description:
      "Stranded on a procedural planet. Gather resources, craft tools, and survive day-night cycles in low-poly 3D.",
    genre: "Survival",
    engine: "Canvas 2D",
    status: "playable",
    color: "#22c55e",
    icon: "🌍",
  },
  {
    slug: "fastAndBlast",
    title: "Fast and Blast",
    description:
      "Infinite neon highway. Dodge obstacles, boost through checkpoints, and chase high scores at increasing speeds.",
    genre: "Racing",
    engine: "Canvas 2D",
    status: "playable",
    color: "#eab308",
    icon: "🏎️",
  },
];

export default function GamesPage() {
  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Game Arcade"
          subtitle="Playable games built from scratch — showcasing physics engines, AI systems, procedural generation, and real-time rendering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {game.status === "playable" ? (
                <Link href={`/games/${game.slug}`} className="block group">
                  <GameCard game={game} />
                </Link>
              ) : (
                <GameCard game={game} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Attribution */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-12">
          Games built with Canvas 2D, Three.js, and React. Assets by{" "}
          <a
            href="https://kenney.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-blue)] hover:underline"
          >
            Kenney.nl
          </a>{" "}
          (CC0).
        </p>
      </div>
    </div>
  );
}

function GameCard({ game }: { game: GameInfo }) {
  return (
    <div
      className="glass-card overflow-hidden h-full relative"
      style={{ borderColor: game.status === "playable" ? `${game.color}30` : undefined }}
    >
      {/* Color accent top bar */}
      <div className="h-1" style={{ background: game.color }} />

      <div className="p-6">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">{game.icon}</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${
              game.status === "playable"
                ? "border-emerald-500/30 text-emerald-400"
                : "border-amber-500/30 text-amber-400"
            }`}
          >
            {game.status === "playable" ? "▶ PLAY" : "COMING SOON"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--accent-blue)] transition-colors">
          {game.title}
        </h3>

        <div className="flex gap-2 mb-3">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full border"
            style={{ borderColor: `${game.color}40`, color: game.color }}
          >
            {game.genre}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)]">
            {game.engine}
          </span>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
          {game.description}
        </p>
      </div>
    </div>
  );
}
