"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SOLVE ME — A sliding number puzzle with narrative layers.
 *
 * Story: You are a data recovery specialist. Fragmented memory blocks
 * must be reassembled in sequence to restore corrupted systems.
 * Each level represents a deeper layer of the corrupted network.
 *
 * Mechanics:
 * - Classic 15-puzzle (4x4 grid, slide tiles into empty space)
 * - Progressive difficulty: 3x3 → 4x4 → 5x5
 * - Moves counter & timer for scoring
 * - Narrative text between levels
 */

type Tile = number | null;
type GameState = "intro" | "playing" | "won" | "paused";

interface Level {
  size: number;
  title: string;
  narrative: string;
}

const levels: Level[] = [
  {
    size: 3,
    title: "Surface Layer",
    narrative:
      "Memory blocks scattered. The system's outer cache is fragmented. Reassemble the sequence to proceed deeper...",
  },
  {
    size: 4,
    title: "Core Memory",
    narrative:
      "You've breached the outer shell. The core memory banks are in disarray — 15 fragments to reconstruct. The corruption runs deeper than expected...",
  },
  {
    size: 5,
    title: "Deep Archive",
    narrative:
      "The deepest layer. 24 fragments of critical data. If you can restore this, the entire system recovers. Focus. Every move counts.",
  },
];

function generateSolvableBoard(size: number): Tile[] {
  const total = size * size;
  const tiles: Tile[] = Array.from({ length: total - 1 }, (_, i) => i + 1);
  tiles.push(null);

  // Fisher-Yates shuffle until solvable
  let board: Tile[];
  do {
    board = [...tiles];
    for (let i = board.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [board[i], board[j]] = [board[j], board[i]];
    }
  } while (!isSolvable(board, size));

  return board;
}

function isSolvable(board: Tile[], size: number): boolean {
  let inversions = 0;
  const flat = board.filter((t) => t !== null) as number[];

  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++;
    }
  }

  if (size % 2 === 1) {
    return inversions % 2 === 0;
  } else {
    const emptyRow = Math.floor(board.indexOf(null) / size);
    const fromBottom = size - emptyRow;
    return (inversions + fromBottom) % 2 === 0;
  }
}

function isWon(board: Tile[]): boolean {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[board.length - 1] === null;
}

export default function SolveMe() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [board, setBoard] = useState<Tile[]>([]);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [bestScores, setBestScores] = useState<number[]>([0, 0, 0]);

  const level = levels[currentLevel];

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const startLevel = useCallback(() => {
    setBoard(generateSolvableBoard(level.size));
    setMoves(0);
    setTimer(0);
    setGameState("playing");
  }, [level.size]);

  const handleTileClick = (index: number) => {
    if (gameState !== "playing") return;

    const emptyIndex = board.indexOf(null);
    const size = level.size;
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    // Check if adjacent to empty
    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (!isAdjacent) return;

    const newBoard = [...board];
    [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];
    setBoard(newBoard);
    setMoves((m) => m + 1);

    if (isWon(newBoard)) {
      setGameState("won");
      const newBest = [...bestScores];
      if (newBest[currentLevel] === 0 || moves + 1 < newBest[currentLevel]) {
        newBest[currentLevel] = moves + 1;
        setBestScores(newBest);
      }
    }
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((l) => l + 1);
      setGameState("intro");
    }
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  // Intro / Narrative screen
  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <div className="text-xs font-mono text-[var(--accent-cyan)] mb-2">
            LEVEL {currentLevel + 1} / {levels.length}
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{level.title}</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 italic">
            &quot;{level.narrative}&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6">
            Grid: {level.size}×{level.size} • {level.size * level.size - 1} fragments
          </div>
          <button onClick={startLevel} className="neon-btn px-8 py-3">
            Begin Recovery
          </button>
        </motion.div>
      </div>
    );
  }

  // Win screen
  if (gameState === "won") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md"
        >
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-[var(--accent-emerald)] mb-2">
            Memory Restored
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {level.title} recovered in {moves} moves • {formatTime(timer)}
          </p>
          {currentLevel < levels.length - 1 ? (
            <button onClick={nextLevel} className="neon-btn px-8 py-3">
              Proceed Deeper →
            </button>
          ) : (
            <div>
              <p className="text-[var(--accent-cyan)] font-semibold mb-4">
                All systems restored. Full recovery complete.
              </p>
              <button
                onClick={() => { setCurrentLevel(0); setGameState("intro"); }}
                className="neon-btn px-8 py-3"
              >
                Play Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Playing state — render the board
  const tileSize = Math.min(400 / level.size, 80);
  const boardSize = tileSize * level.size;

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-4">
      {/* HUD */}
      <div className="flex items-center gap-8 mb-6">
        <div className="text-center">
          <div className="text-xs text-[var(--text-muted)] uppercase">Moves</div>
          <div className="text-xl font-mono text-white">{moves}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--text-muted)] uppercase">Time</div>
          <div className="text-xl font-mono text-[var(--accent-cyan)]">
            {formatTime(timer)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--text-muted)] uppercase">Level</div>
          <div className="text-xl font-mono text-[var(--accent-purple)]">
            {currentLevel + 1}
          </div>
        </div>
      </div>

      {/* Board */}
      <div
        className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-2"
        style={{ width: boardSize + 16, height: boardSize + 16 }}
      >
        <AnimatePresence>
          {board.map((tile, index) => {
            if (tile === null) return null;
            const row = Math.floor(index / level.size);
            const col = index % level.size;

            return (
              <motion.button
                key={tile}
                layout
                onClick={() => handleTileClick(index)}
                className="absolute flex items-center justify-center rounded-lg font-bold cursor-pointer border border-[var(--accent-blue)]/30 select-none"
                style={{
                  width: tileSize - 4,
                  height: tileSize - 4,
                  left: col * tileSize + 2,
                  top: row * tileSize + 2,
                  background: `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))`,
                  fontSize: tileSize > 50 ? 18 : 14,
                  color: tile === index + 1 ? "#10b981" : "#e2e8f0",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(59,130,246,0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {tile}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={startLevel}
          className="text-xs text-[var(--text-muted)] hover:text-white transition-colors px-3 py-1 border border-[var(--border-subtle)] rounded-lg"
        >
          Shuffle
        </button>
        <button
          onClick={() => setGameState("intro")}
          className="text-xs text-[var(--text-muted)] hover:text-white transition-colors px-3 py-1 border border-[var(--border-subtle)] rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
}
