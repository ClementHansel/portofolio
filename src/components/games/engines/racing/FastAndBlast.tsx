"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * FAST AND BLAST — Infinite neon highway racer.
 *
 * Story: You pilot a data courier through the network's backbone.
 * The highway stretches infinitely. Speed increases relentlessly.
 * Dodge corrupted packets, collect boost fragments, survive.
 *
 * Technical showcase:
 * - Pseudo-3D road rendering (segment-based perspective)
 * - Increasing speed with progressive difficulty
 * - Obstacle spawning and collision
 * - Collectible boost pickups
 * - Parallax star field background
 * - Smooth lane switching with easing
 */

interface Segment {
  z: number;
  curve: number;
  y: number;
}

interface Obstacle {
  z: number;
  lane: number; // -1, 0, 1
  type: "block" | "boost";
  collected: boolean;
}

type GameState = "intro" | "playing" | "dead";

export default function FastAndBlast() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [highScore, setHighScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const W = 700;
  const H = 450;

  const gameRef = useRef<{
    playerX: number;
    targetX: number;
    speed: number;
    maxSpeed: number;
    position: number;
    score: number;
    segments: Segment[];
    obstacles: Obstacle[];
    keys: Set<string>;
    time: number;
    spawnTimer: number;
    stars: { x: number; y: number; speed: number }[];
    boost: number;
    alive: boolean;
  } | null>(null);

  const initGame = useCallback(() => {
    const segments: Segment[] = [];
    for (let i = 0; i < 300; i++) {
      segments.push({
        z: i * 200,
        curve: Math.sin(i * 0.02) * 3,
        y: Math.sin(i * 0.01) * 0.5,
      });
    }

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      speed: 0.5 + Math.random() * 2,
    }));

    gameRef.current = {
      playerX: 0,
      targetX: 0,
      speed: 200,
      maxSpeed: 200,
      position: 0,
      score: 0,
      segments,
      obstacles: [],
      keys: new Set(),
      time: 0,
      spawnTimer: 0,
      stars,
      boost: 0,
      alive: true,
    };
  }, []);

  const startGame = useCallback(() => {
    initGame();
    setGameState("playing");
  }, [initGame]);

  // Input
  useEffect(() => {
    if (gameState !== "playing") return;
    const kd = (e: KeyboardEvent) => { gameRef.current?.keys.add(e.code); };
    const ku = (e: KeyboardEvent) => { gameRef.current?.keys.delete(e.code); };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const ROAD_WIDTH = 2000;
    const SEG_LENGTH = 200;
    const DRAW_DIST = 150;
    const LANES = [-0.3, 0, 0.3];

    const project = (z: number, camX: number, camY: number, camZ: number) => {
      const scale = 300 / (z - camZ);
      return {
        x: W / 2 + (0 - camX) * scale,
        y: H / 2 - (1 - camY) * scale,
        w: ROAD_WIDTH * scale,
        scale,
      };
    };

    const loop = (timestamp: number) => {
      if (!gameRef.current || !gameRef.current.alive) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      const g = gameRef.current;
      g.time += dt;

      // --- UPDATE ---
      // Acceleration
      g.maxSpeed = 200 + g.time * 5; // Speed increases over time
      g.speed = Math.min(g.speed + 40 * dt, g.maxSpeed + g.boost);
      g.boost = Math.max(0, g.boost - 100 * dt);
      g.position += g.speed * dt;
      g.score = Math.floor(g.position / 50);

      // Lane switching
      if (g.keys.has("ArrowLeft") || g.keys.has("KeyA")) g.targetX = Math.max(g.targetX - 4 * dt, -0.4);
      if (g.keys.has("ArrowRight") || g.keys.has("KeyD")) g.targetX = Math.min(g.targetX + 4 * dt, 0.4);
      g.playerX += (g.targetX - g.playerX) * 8 * dt;

      // Spawn obstacles
      g.spawnTimer -= dt;
      if (g.spawnTimer <= 0) {
        g.spawnTimer = 0.8 + Math.random() * 1.2 - g.time * 0.005;
        g.spawnTimer = Math.max(0.3, g.spawnTimer);
        const lane = LANES[Math.floor(Math.random() * 3)];
        const isBoost = Math.random() < 0.2;
        g.obstacles.push({
          z: g.position + DRAW_DIST * SEG_LENGTH,
          lane,
          type: isBoost ? "boost" : "block",
          collected: false,
        });
      }

      // Obstacle collision
      g.obstacles = g.obstacles.filter((obs) => {
        if (obs.collected) return obs.z > g.position - 500;
        const relZ = obs.z - g.position;
        if (relZ < 50 && relZ > -50) {
          const laneX = obs.lane;
          if (Math.abs(g.playerX - laneX) < 0.12) {
            if (obs.type === "boost") {
              obs.collected = true;
              g.boost = 150;
              g.score += 50;
            } else {
              g.alive = false;
              setLastScore(g.score);
              setHighScore((prev) => Math.max(prev, g.score));
              setGameState("dead");
              return true;
            }
          }
        }
        return obs.z > g.position - 500;
      });

      // Stars parallax
      for (const star of g.stars) {
        star.y += star.speed;
        if (star.y > H * 0.5) { star.y = 0; star.x = Math.random() * W; }
      }

      // --- RENDER ---
      // Sky gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      grad.addColorStop(0, "#020617");
      grad.addColorStop(1, "#0f172a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Stars
      ctx.fillStyle = "#94a3b8";
      for (const star of g.stars) {
        ctx.globalAlpha = 0.3 + star.speed * 0.2;
        ctx.fillRect(star.x, star.y, 1.5, 1.5);
      }
      ctx.globalAlpha = 1;

      // Road segments
      const baseSegIdx = Math.floor(g.position / SEG_LENGTH) % g.segments.length;
      let cumCurve = 0;
      let prevProj = project(SEG_LENGTH, g.playerX * ROAD_WIDTH, 0, 0);

      for (let i = 1; i < DRAW_DIST; i++) {
        const segIdx = (baseSegIdx + i) % g.segments.length;
        const seg = g.segments[segIdx];
        cumCurve += seg.curve;

        const z = i * SEG_LENGTH - (g.position % SEG_LENGTH);
        const p1 = project(z, g.playerX * ROAD_WIDTH - cumCurve * 30, seg.y, 0);

        if (p1.y < 0 || p1.y > H) { prevProj = p1; continue; }

        // Ground
        const dark = i % 2 === 0;
        ctx.fillStyle = dark ? "#0f172a" : "#111827";
        ctx.fillRect(0, p1.y, W, prevProj.y - p1.y + 1);

        // Road
        const roadW = p1.w * 0.4;
        const rx = p1.x - roadW / 2;
        ctx.fillStyle = dark ? "#1e293b" : "#1f2937";
        ctx.fillRect(rx, p1.y, roadW, prevProj.y - p1.y + 1);

        // Road edges (neon lines)
        ctx.fillStyle = g.boost > 0 ? "#f59e0b" : "#3b82f6";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(rx, p1.y, 3, prevProj.y - p1.y + 1);
        ctx.fillRect(rx + roadW - 3, p1.y, 3, prevProj.y - p1.y + 1);
        ctx.globalAlpha = 1;

        // Lane markers
        if (!dark) {
          ctx.fillStyle = "rgba(59,130,246,0.2)";
          ctx.fillRect(rx + roadW / 3, p1.y, 2, prevProj.y - p1.y + 1);
          ctx.fillRect(rx + (roadW * 2) / 3, p1.y, 2, prevProj.y - p1.y + 1);
        }

        prevProj = p1;
      }

      // Obstacles
      for (const obs of g.obstacles) {
        if (obs.collected) continue;
        const relZ = obs.z - g.position;
        if (relZ < 0 || relZ > DRAW_DIST * SEG_LENGTH) continue;
        const op = project(relZ, g.playerX * ROAD_WIDTH - cumCurve * 0.3, 0, 0);
        const ox = op.x + obs.lane * op.w * 0.4 * 0.5;
        const oSize = 20 * op.scale * 100;
        if (oSize < 1) continue;

        if (obs.type === "block") {
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#dc2626";
          ctx.fillRect(ox - oSize / 2, op.y - oSize, oSize, oSize);
        } else {
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.arc(ox, op.y - oSize / 2, oSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // Player car (triangle/chevron)
      const px = W / 2;
      const py = H - 60;
      ctx.shadowColor = g.boost > 0 ? "#f59e0b" : "#06b6d4";
      ctx.shadowBlur = 15;
      ctx.fillStyle = g.boost > 0 ? "#f59e0b" : "#06b6d4";
      ctx.beginPath();
      ctx.moveTo(px, py - 20);
      ctx.lineTo(px - 14, py + 10);
      ctx.lineTo(px + 14, py + 10);
      ctx.closePath();
      ctx.fill();
      // Exhaust
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(59,130,246,0.4)";
      ctx.fillRect(px - 3, py + 10, 6, 4 + Math.random() * 8);

      // HUD
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px monospace";
      ctx.fillText(`SCORE ${g.score}`, 10, 20);
      ctx.fillText(`SPEED ${Math.floor(g.speed)}`, 10, 36);
      if (highScore > 0) ctx.fillText(`BEST ${highScore}`, 10, 52);

      animRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [gameState, highScore]);

  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="max-w-md">
          <div className="text-4xl mb-4">🏎️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Fast and Blast</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;You pilot a data courier through the network backbone. The highway
            stretches infinitely ahead. Speed is mandatory. Survival is optional.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>← → or A/D — Steer</p>
            <p>Dodge red blocks, collect gold boosts</p>
            <p>Speed increases forever. How far can you go?</p>
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Launch Courier
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "dead") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">💥</div>
        <h2 className="text-xl font-bold text-red-400 mb-2">Packet Lost</h2>
        <p className="text-2xl font-bold text-[var(--accent-cyan)] mb-2">
          Score: {lastScore}
        </p>
        {lastScore >= highScore && lastScore > 0 && (
          <p className="text-xs text-[var(--accent-amber)] mb-4">New High Score!</p>
        )}
        <button onClick={startGame} className="neon-btn px-8 py-3">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="rounded-xl border border-[var(--border-subtle)] max-w-full"
      />
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        ← → or A/D to steer
      </p>
    </div>
  );
}
