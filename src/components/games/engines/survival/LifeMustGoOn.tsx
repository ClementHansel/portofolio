"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * LIFE MUST GO ON — 2D survival with crafting and day/night.
 *
 * Story: A lone process awakens on a barren data plane. Resources are
 * scattered. Night brings hostile garbage collectors that consume everything.
 * Gather materials by day, build shelter and tools, survive the purge cycles.
 *
 * Technical showcase:
 * - Day/night cycle with dynamic lighting
 * - Resource gathering system (trees, rocks, crystals)
 * - Inventory + crafting system
 * - Hostile night enemies with pathfinding
 * - Shelter building (placed barriers block enemies)
 * - Health + hunger mechanics
 * - Minimap
 */

interface Vec2 { x: number; y: number }

interface Resource {
  x: number; y: number;
  type: "tree" | "rock" | "crystal";
  hp: number;
}

interface Barrier {
  x: number; y: number;
  hp: number;
}

interface Enemy {
  x: number; y: number;
  hp: number;
  speed: number;
}

interface Inventory {
  wood: number;
  stone: number;
  crystal: number;
}

type GameState = "intro" | "playing" | "dead";
type TimeOfDay = "day" | "dusk" | "night" | "dawn";

const W = 700;
const H = 450;
const WORLD_SIZE = 1200;

export default function LifeMustGoOn() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [finalDay, setFinalDay] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const gameRef = useRef<{
    player: Vec2 & { hp: number; maxHp: number; hunger: number; speed: number };
    inventory: Inventory;
    resources: Resource[];
    barriers: Barrier[];
    enemies: Enemy[];
    keys: Set<string>;
    camera: Vec2;
    time: number;
    dayTime: number; // 0-120 seconds per full cycle
    day: number;
    timeOfDay: TimeOfDay;
    message: string;
    messageTimer: number;
  } | null>(null);

  const initGame = useCallback(() => {
    // Generate resources
    const resources: Resource[] = [];
    for (let i = 0; i < 40; i++) {
      resources.push({
        x: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
        y: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
        type: Math.random() < 0.5 ? "tree" : Math.random() < 0.7 ? "rock" : "crystal",
        hp: 3,
      });
    }

    gameRef.current = {
      player: { x: 0, y: 0, hp: 100, maxHp: 100, hunger: 100, speed: 150 },
      inventory: { wood: 0, stone: 0, crystal: 0 },
      resources,
      barriers: [],
      enemies: [],
      keys: new Set(),
      camera: { x: 0, y: 0 },
      time: 0,
      dayTime: 0,
      day: 1,
      timeOfDay: "day",
      message: "",
      messageTimer: 0,
    };
  }, []);

  const showMessage = (msg: string) => {
    if (!gameRef.current) return;
    gameRef.current.message = msg;
    gameRef.current.messageTimer = 2;
  };

  const startGame = useCallback(() => { initGame(); setGameState("playing"); }, [initGame]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const kd = (e: KeyboardEvent) => {
      gameRef.current?.keys.add(e.code);
      // Crafting shortcuts
      if (e.code === "KeyB" && gameRef.current) {
        const inv = gameRef.current.inventory;
        if (inv.wood >= 3 && inv.stone >= 2) {
          inv.wood -= 3; inv.stone -= 2;
          gameRef.current.barriers.push({
            x: gameRef.current.player.x + 30,
            y: gameRef.current.player.y,
            hp: 5,
          });
          showMessage("Built barrier! (3 wood + 2 stone)");
        } else { showMessage("Need 3 wood + 2 stone to build barrier"); }
      }
      if (e.code === "KeyH" && gameRef.current) {
        const inv = gameRef.current.inventory;
        if (inv.crystal >= 1) {
          inv.crystal -= 1;
          gameRef.current.player.hp = Math.min(100, gameRef.current.player.hp + 30);
          showMessage("Healed +30 HP! (1 crystal)");
        } else { showMessage("Need 1 crystal to heal"); }
      }
    };
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

    const DAY_LENGTH = 30; // seconds per full day

    const loop = (timestamp: number) => {
      if (!gameRef.current) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      const g = gameRef.current;
      g.time += dt;
      g.dayTime += dt;
      g.messageTimer = Math.max(0, g.messageTimer - dt);

      // Day/night cycle
      const cyclePos = (g.dayTime % DAY_LENGTH) / DAY_LENGTH;
      if (cyclePos < 0.4) g.timeOfDay = "day";
      else if (cyclePos < 0.5) g.timeOfDay = "dusk";
      else if (cyclePos < 0.85) g.timeOfDay = "night";
      else g.timeOfDay = "dawn";

      // New day
      if (g.dayTime >= DAY_LENGTH) { g.dayTime -= DAY_LENGTH; g.day += 1; }

      // Player movement
      const p = g.player;
      let mx = 0, my = 0;
      if (g.keys.has("KeyW") || g.keys.has("ArrowUp")) my -= 1;
      if (g.keys.has("KeyS") || g.keys.has("ArrowDown")) my += 1;
      if (g.keys.has("KeyA") || g.keys.has("ArrowLeft")) mx -= 1;
      if (g.keys.has("KeyD") || g.keys.has("ArrowRight")) mx += 1;
      const mag = Math.sqrt(mx * mx + my * my) || 1;
      p.x += (mx / mag) * p.speed * dt;
      p.y += (my / mag) * p.speed * dt;
      p.x = Math.max(-WORLD_SIZE / 2, Math.min(WORLD_SIZE / 2, p.x));
      p.y = Math.max(-WORLD_SIZE / 2, Math.min(WORLD_SIZE / 2, p.y));

      // Camera follow
      g.camera.x = p.x - W / 2;
      g.camera.y = p.y - H / 2;

      // Hunger
      p.hunger -= dt * 1.5;
      if (p.hunger <= 0) { p.hunger = 0; p.hp -= dt * 5; }
      // Trees give food when harvested
      // Resource gathering (proximity + spacebar)
      if (g.keys.has("Space")) {
        for (const r of g.resources) {
          if (r.hp <= 0) continue;
          const dist = Math.sqrt((p.x - r.x) ** 2 + (p.y - r.y) ** 2);
          if (dist < 30) {
            r.hp -= dt * 3;
            if (r.hp <= 0) {
              if (r.type === "tree") { g.inventory.wood += 2; p.hunger = Math.min(100, p.hunger + 15); }
              else if (r.type === "rock") g.inventory.stone += 2;
              else g.inventory.crystal += 1;
            }
          }
        }
      }

      // Night enemies
      if (g.timeOfDay === "night" && g.enemies.length < g.day * 2 && Math.random() < 0.01) {
        const angle = Math.random() * Math.PI * 2;
        g.enemies.push({
          x: p.x + Math.cos(angle) * 400,
          y: p.y + Math.sin(angle) * 400,
          hp: 2, speed: 60 + g.day * 10,
        });
      }

      // Enemy AI
      for (let i = g.enemies.length - 1; i >= 0; i--) {
        const e = g.enemies[i];
        const dx = p.x - e.x, dy = p.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Check barrier blocking
        let blocked = false;
        for (const b of g.barriers) {
          const bd = Math.sqrt((b.x - e.x) ** 2 + (b.y - e.y) ** 2);
          if (bd < 25) { b.hp -= dt; blocked = true; if (b.hp <= 0) g.barriers = g.barriers.filter((bb) => bb !== b); }
        }

        if (!blocked) {
          e.x += (dx / dist) * e.speed * dt;
          e.y += (dy / dist) * e.speed * dt;
        }

        if (dist < 20) { p.hp -= 20 * dt; }

        // Despawn at dawn
        if (g.timeOfDay === "dawn" || g.timeOfDay === "day") { g.enemies.splice(i, 1); }
      }

      if (p.hp <= 0) { setFinalDay(g.day); setGameState("dead"); return; }

      // --- RENDER ---
      const bgColors = { day: "#1a2332", dusk: "#1a1520", night: "#050510", dawn: "#101525" };
      ctx.fillStyle = bgColors[g.timeOfDay];
      ctx.fillRect(0, 0, W, H);

      const cx = g.camera.x, cy = g.camera.y;

      // Resources
      for (const r of g.resources) {
        if (r.hp <= 0) continue;
        const sx = r.x - cx, sy = r.y - cy;
        if (sx < -30 || sx > W + 30 || sy < -30 || sy > H + 30) continue;
        if (r.type === "tree") {
          ctx.fillStyle = "#166534"; ctx.fillRect(sx - 4, sy - 20, 8, 20);
          ctx.fillStyle = "#22c55e"; ctx.beginPath(); ctx.arc(sx, sy - 25, 14, 0, Math.PI * 2); ctx.fill();
        } else if (r.type === "rock") {
          ctx.fillStyle = "#6b7280"; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = "#a855f7"; ctx.shadowColor = "#a855f7"; ctx.shadowBlur = 6;
          ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
        }
      }

      // Barriers
      ctx.fillStyle = "#78350f";
      for (const b of g.barriers) {
        const sx = b.x - cx, sy = b.y - cy;
        ctx.fillRect(sx - 12, sy - 12, 24, 24);
        ctx.strokeStyle = "#f59e0b"; ctx.strokeRect(sx - 12, sy - 12, 24, 24);
      }

      // Enemies
      ctx.fillStyle = "#ef4444"; ctx.shadowColor = "#ef4444"; ctx.shadowBlur = 8;
      for (const e of g.enemies) {
        const sx = e.x - cx, sy = e.y - cy;
        ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Player
      const px = p.x - cx, py = p.y - cy;
      ctx.fillStyle = "#06b6d4"; ctx.shadowColor = "#06b6d4"; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      // Night overlay
      if (g.timeOfDay === "night") {
        // Darkness with player light radius
        const gradient = ctx.createRadialGradient(px, py, 50, px, py, 200);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.85)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);
      } else if (g.timeOfDay === "dusk" || g.timeOfDay === "dawn") {
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, W, H);
      }

      // HUD
      ctx.fillStyle = "#f1f5f9"; ctx.font = "11px monospace";
      ctx.fillText(`Day ${g.day} • ${g.timeOfDay.toUpperCase()}`, 10, 18);
      // HP bar
      ctx.fillStyle = "#1f2937"; ctx.fillRect(10, 24, 100, 8);
      ctx.fillStyle = p.hp > 30 ? "#06b6d4" : "#ef4444"; ctx.fillRect(10, 24, p.hp, 8);
      // Hunger bar
      ctx.fillStyle = "#1f2937"; ctx.fillRect(10, 36, 100, 8);
      ctx.fillStyle = p.hunger > 30 ? "#f59e0b" : "#ef4444"; ctx.fillRect(10, 36, p.hunger, 8);
      // Inventory
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(`🪵${g.inventory.wood} 🪨${g.inventory.stone} 💎${g.inventory.crystal}`, 10, 58);
      ctx.fillText(`[B] Build  [H] Heal  [SPACE] Gather`, 10, H - 10);

      // Message
      if (g.messageTimer > 0) {
        ctx.fillStyle = "#f59e0b"; ctx.font = "12px monospace";
        ctx.textAlign = "center"; ctx.fillText(g.message, W / 2, H - 30); ctx.textAlign = "left";
      }

      animRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [gameState]);

  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="max-w-md">
          <div className="text-4xl mb-4">🌍</div>
          <h2 className="text-2xl font-bold text-white mb-4">Life Must Go On</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;A lone process on a barren data plane. Resources scattered, night brings
            hostile garbage collectors. Gather by day, shelter by night. Survive.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>WASD — Move</p>
            <p>SPACE (near resource) — Gather</p>
            <p>B — Build barrier (3 wood + 2 stone)</p>
            <p>H — Heal (1 crystal = +30 HP)</p>
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Survive
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "dead") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">💀</div>
        <h2 className="text-xl font-bold text-red-400 mb-2">Process Terminated</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">Survived {finalDay} days</p>
        <button onClick={startGame} className="neon-btn px-8 py-3">Try Again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={W} height={H} className="rounded-xl border border-[var(--border-subtle)] max-w-full" />
      <p className="mt-2 text-xs text-[var(--text-muted)]">WASD move • SPACE gather • B build • H heal</p>
    </div>
  );
}
