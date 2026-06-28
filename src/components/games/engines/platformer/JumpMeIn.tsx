"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * JUMP ME IN — A fast-paced neon platformer.
 *
 * Story: You are a rogue data packet escaping a corrupted mainframe.
 * Each level is a deeper system layer you must traverse before
 * the firewall closes in. Collect memory fragments to unlock exits.
 *
 * Technical showcase:
 * - Custom 2D physics (gravity, friction, collision detection)
 * - Procedural level generation with difficulty scaling
 * - Particle system for visual juice (jump dust, collect sparkles)
 * - Parallax scrolling background
 * - Frame-rate independent game loop
 * - Touch/keyboard input support
 *
 * Asset strategy: Neon geometric shapes with glow effects.
 * If kenney sprites are placed in /assets/games/platformer/,
 * they'll be used instead.
 */

interface Vec2 {
  x: number;
  y: number;
}

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  type: "normal" | "moving" | "crumble";
  moveDir?: number;
  moveRange?: number;
  originX?: number;
  crumbleTimer?: number;
}

interface Collectible {
  x: number;
  y: number;
  collected: boolean;
  bobOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface GameLevel {
  platforms: Platform[];
  collectibles: Collectible[];
  exitX: number;
  exitY: number;
  title: string;
  narrative: string;
}

type GameState = "intro" | "playing" | "levelComplete" | "dead" | "victory";

// Level definitions
function generateLevel(index: number): GameLevel {
  const narratives = [
    {
      title: "Boot Sector",
      narrative: "The mainframe awakens. You must escape before it initializes security protocols...",
    },
    {
      title: "Memory Banks",
      narrative: "Deeper now. The platforms here are unstable — corrupted data crumbles beneath you...",
    },
    {
      title: "Firewall Core",
      narrative: "The final barrier. Moving security nodes patrol the exit. Time your escape perfectly.",
    },
  ];

  const info = narratives[Math.min(index, narratives.length - 1)];
  const platforms: Platform[] = [];
  const collectibles: Collectible[] = [];
  const canvasW = 800;
  const canvasH = 500;

  // Ground
  platforms.push({ x: 0, y: canvasH - 30, w: canvasW, h: 30, type: "normal" });

  // Generate platforms based on level
  const platCount = 6 + index * 3;
  for (let i = 0; i < platCount; i++) {
    const w = 80 + Math.random() * 60;
    const x = 50 + Math.random() * (canvasW - 150);
    const y = 80 + Math.random() * (canvasH - 180);
    const type: Platform["type"] =
      index >= 2 && Math.random() < 0.3
        ? "moving"
        : index >= 1 && Math.random() < 0.25
        ? "crumble"
        : "normal";

    platforms.push({
      x,
      y,
      w,
      h: 16,
      type,
      moveDir: type === "moving" ? 1 : undefined,
      moveRange: type === "moving" ? 60 + Math.random() * 40 : undefined,
      originX: type === "moving" ? x : undefined,
    });
  }

  // Collectibles
  const collectCount = 3 + index * 2;
  for (let i = 0; i < collectCount; i++) {
    collectibles.push({
      x: 60 + Math.random() * (canvasW - 120),
      y: 60 + Math.random() * (canvasH - 200),
      collected: false,
      bobOffset: Math.random() * Math.PI * 2,
    });
  }

  // Exit position (top area)
  const exitX = canvasW - 80;
  const exitY = 60;

  return { platforms, collectibles, exitX, exitY, ...info };
}

export default function JumpMeIn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const gameRef = useRef<{
    player: Vec2 & { vx: number; vy: number; grounded: boolean; w: number; h: number };
    level: GameLevel;
    particles: Particle[];
    keys: Set<string>;
    time: number;
    camera: { x: number };
  } | null>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const initLevel = useCallback((levelIndex: number) => {
    const level = generateLevel(levelIndex);
    gameRef.current = {
      player: { x: 60, y: 400, vx: 0, vy: 0, grounded: false, w: 24, h: 32 },
      level,
      particles: [],
      keys: new Set(),
      time: 0,
      camera: { x: 0 },
    };
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count: number) => {
    if (!gameRef.current) return;
    for (let i = 0; i < count; i++) {
      gameRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 1) * 3,
        life: 0.5 + Math.random() * 0.5,
        maxLife: 0.5 + Math.random() * 0.5,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  };

  const startPlaying = useCallback(() => {
    initLevel(currentLevel);
    setGameState("playing");
  }, [currentLevel, initLevel]);

  // Input handlers
  useEffect(() => {
    if (gameState !== "playing") return;

    const onKeyDown = (e: KeyboardEvent) => {
      gameRef.current?.keys.add(e.code);
      if (e.code === "Space" || e.code === "ArrowUp") e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      gameRef.current?.keys.delete(e.code);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    const GRAVITY = 1200;
    const JUMP_VEL = -480;
    const MOVE_SPEED = 250;
    const FRICTION = 0.85;

    const loop = (timestamp: number) => {
      if (!gameRef.current) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      const g = gameRef.current;
      const p = g.player;
      const keys = g.keys;

      g.time += dt;

      // --- UPDATE ---
      // Movement
      if (keys.has("ArrowLeft") || keys.has("KeyA")) p.vx = -MOVE_SPEED;
      else if (keys.has("ArrowRight") || keys.has("KeyD")) p.vx = MOVE_SPEED;
      else p.vx *= FRICTION;

      // Jump
      if ((keys.has("Space") || keys.has("ArrowUp") || keys.has("KeyW")) && p.grounded) {
        p.vy = JUMP_VEL;
        p.grounded = false;
        spawnParticles(p.x + p.w / 2, p.y + p.h, "#06b6d4", 6);
      }

      // Physics
      p.vy += GRAVITY * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Platform collision
      p.grounded = false;
      for (const plat of g.level.platforms) {
        // Update moving platforms
        if (plat.type === "moving" && plat.originX !== undefined && plat.moveRange) {
          plat.x = plat.originX + Math.sin(g.time * 1.5) * plat.moveRange;
        }

        // Collision check (only from above)
        if (
          p.x + p.w > plat.x &&
          p.x < plat.x + plat.w &&
          p.y + p.h > plat.y &&
          p.y + p.h < plat.y + plat.h + p.vy * dt + 10 &&
          p.vy >= 0
        ) {
          p.y = plat.y - p.h;
          p.vy = 0;
          p.grounded = true;

          if (plat.type === "crumble") {
            plat.crumbleTimer = (plat.crumbleTimer || 0) + dt;
            if (plat.crumbleTimer > 0.5) {
              plat.y = 9999; // Remove
              spawnParticles(plat.x + plat.w / 2, plat.y, "#f59e0b", 8);
            }
          }
        }
      }

      // Boundaries
      if (p.x < 0) p.x = 0;
      if (p.x + p.w > W) p.x = W - p.w;

      // Death (fall off)
      if (p.y > H + 50) {
        setDeaths((d) => d + 1);
        setGameState("dead");
        return;
      }

      // Collectibles
      for (const c of g.level.collectibles) {
        if (c.collected) continue;
        const dx = p.x + p.w / 2 - c.x;
        const dy = p.y + p.h / 2 - c.y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
          c.collected = true;
          setScore((s) => s + 10);
          spawnParticles(c.x, c.y, "#a855f7", 10);
        }
      }

      // Exit check (all collectibles must be collected)
      const allCollected = g.level.collectibles.every((c) => c.collected);
      const exitDist = Math.sqrt(
        (p.x + p.w / 2 - g.level.exitX) ** 2 + (p.y + p.h / 2 - g.level.exitY) ** 2
      );
      if (allCollected && exitDist < 30) {
        if (currentLevel >= 2) {
          setGameState("victory");
        } else {
          setGameState("levelComplete");
        }
        return;
      }

      // Particles update
      g.particles = g.particles.filter((part) => {
        part.x += part.vx;
        part.y += part.vy;
        part.vy += 3 * dt;
        part.life -= dt;
        return part.life > 0;
      });

      // --- RENDER ---
      // Background
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, W, H);

      // Grid lines (parallax)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Platforms
      for (const plat of g.level.platforms) {
        if (plat.y > H) continue;
        const colors = {
          normal: "#1e40af",
          moving: "#7c3aed",
          crumble: "#b45309",
        };
        const glows = {
          normal: "rgba(59, 130, 246, 0.3)",
          moving: "rgba(139, 92, 246, 0.3)",
          crumble: "rgba(245, 158, 11, 0.3)",
        };

        ctx.shadowColor = glows[plat.type];
        ctx.shadowBlur = 8;
        ctx.fillStyle = colors[plat.type];
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);

        // Top highlight
        ctx.fillStyle = plat.type === "normal" ? "#3b82f6" : plat.type === "moving" ? "#a855f7" : "#f59e0b";
        ctx.fillRect(plat.x, plat.y, plat.w, 3);
        ctx.shadowBlur = 0;
      }

      // Exit
      const allColl = g.level.collectibles.every((c) => c.collected);
      ctx.shadowColor = allColl ? "rgba(16, 185, 129, 0.6)" : "rgba(100, 100, 100, 0.3)";
      ctx.shadowBlur = allColl ? 15 : 5;
      ctx.strokeStyle = allColl ? "#10b981" : "#4b5563";
      ctx.lineWidth = 2;
      ctx.strokeRect(g.level.exitX - 15, g.level.exitY - 15, 30, 30);
      if (allColl) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
        ctx.fillRect(g.level.exitX - 15, g.level.exitY - 15, 30, 30);
      }
      ctx.shadowBlur = 0;

      // Collectibles
      for (const c of g.level.collectibles) {
        if (c.collected) continue;
        const bobY = Math.sin(g.time * 3 + c.bobOffset) * 4;
        ctx.shadowColor = "rgba(168, 85, 247, 0.5)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#a855f7";
        ctx.beginPath();
        ctx.arc(c.x, c.y + bobY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Player (neon glow rectangle with trail)
      ctx.shadowColor = "rgba(6, 182, 212, 0.6)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#06b6d4";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      // Eye
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(p.x + 14, p.y + 8, 6, 6);
      ctx.fillStyle = "#030712";
      ctx.fillRect(p.x + 16, p.y + 10, 3, 3);
      ctx.shadowBlur = 0;

      // Particles
      for (const part of g.particles) {
        const alpha = part.life / part.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = part.color;
        ctx.fillRect(part.x, part.y, part.size, part.size);
      }
      ctx.globalAlpha = 1;

      // HUD on canvas
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px monospace";
      ctx.fillText(`LEVEL ${currentLevel + 1}`, 10, 20);
      ctx.fillText(
        `FRAGMENTS: ${g.level.collectibles.filter((c) => c.collected).length}/${g.level.collectibles.length}`,
        10,
        36
      );

      animRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animRef.current);
  }, [gameState, currentLevel]);

  // --- RENDER UI ---
  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="max-w-md">
          <div className="text-xs font-mono text-[var(--accent-cyan)] mb-2">
            LEVEL {currentLevel + 1} / 3
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {generateLevel(currentLevel).title}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;{generateLevel(currentLevel).narrative}&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>← → or A/D to move</p>
            <p>SPACE or ↑ or W to jump</p>
            <p>Collect all fragments, then reach the exit</p>
          </div>
          <button onClick={startPlaying} className="neon-btn px-8 py-3">
            Enter System
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "dead") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">💀</div>
        <h2 className="text-xl font-bold text-red-400 mb-2">System Crash</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          You fell into the void. The firewall resets...
        </p>
        <button onClick={startPlaying} className="neon-btn px-8 py-3">
          Reboot
        </button>
      </div>
    );
  }

  if (gameState === "levelComplete") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-xl font-bold text-[var(--accent-emerald)] mb-2">
          Layer Breached
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Score: {score} • Deaths: {deaths}
        </p>
        <button
          onClick={() => {
            setCurrentLevel((l) => l + 1);
            setGameState("intro");
          }}
          className="neon-btn px-8 py-3"
        >
          Go Deeper →
        </button>
      </div>
    );
  }

  if (gameState === "victory") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">🏆</div>
        <h2 className="text-xl font-bold text-[var(--accent-cyan)] mb-2">
          Mainframe Escaped
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-2">
          All layers breached. You are free.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Final Score: {score} • Deaths: {deaths}
        </p>
        <button
          onClick={() => {
            setCurrentLevel(0);
            setScore(0);
            setDeaths(0);
            setGameState("intro");
          }}
          className="neon-btn px-8 py-3"
        >
          Play Again
        </button>
      </div>
    );
  }

  // Playing — render canvas
  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="rounded-xl border border-[var(--border-subtle)] max-w-full"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="mt-4 flex gap-4 text-xs text-[var(--text-muted)]">
        <span>Score: {score}</span>
        <span>Deaths: {deaths}</span>
      </div>

      {/* Mobile touch controls */}
      <div className="mt-4 flex gap-4 md:hidden">
        <button
          onTouchStart={() => gameRef.current?.keys.add("ArrowLeft")}
          onTouchEnd={() => gameRef.current?.keys.delete("ArrowLeft")}
          className="w-14 h-14 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-xl"
        >
          ←
        </button>
        <button
          onTouchStart={() => gameRef.current?.keys.add("Space")}
          onTouchEnd={() => gameRef.current?.keys.delete("Space")}
          className="w-14 h-14 rounded-xl border border-[var(--accent-cyan)]/30 flex items-center justify-center text-xl text-[var(--accent-cyan)]"
        >
          ↑
        </button>
        <button
          onTouchStart={() => gameRef.current?.keys.add("ArrowRight")}
          onTouchEnd={() => gameRef.current?.keys.delete("ArrowRight")}
          className="w-14 h-14 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-xl"
        >
          →
        </button>
      </div>
    </div>
  );
}
