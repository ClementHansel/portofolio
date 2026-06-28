"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * COUNTER ME — Top-down neon wave shooter.
 *
 * Story: You are the last defense subroutine inside a breached server.
 * Waves of malicious processes flood in from all sides. Eliminate them
 * before they overwhelm the core. Each wave is faster, tougher, smarter.
 *
 * Technical showcase:
 * - Top-down twin-stick movement (WASD move, mouse aim, click shoot)
 * - Wave-based enemy spawning with progressive difficulty
 * - Collision detection (circle-circle, bullet-enemy)
 * - Particle explosions on enemy death
 * - Score multiplier for rapid kills
 * - Screen shake on damage
 */

interface Vec2 { x: number; y: number }

interface Bullet {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
}

interface Enemy {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  hp: number;
  maxHp: number;
  type: "grunt" | "tank" | "fast" | "splitter";
  color: string;
  flashTimer: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  color: string;
  size: number;
}

type GameState = "intro" | "playing" | "dead";

export default function CounterMe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [finalScore, setFinalScore] = useState(0);
  const [finalWave, setFinalWave] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const gameRef = useRef<{
    player: Vec2 & { radius: number; hp: number; maxHp: number; invincible: number };
    bullets: Bullet[];
    enemies: Enemy[];
    particles: Particle[];
    keys: Set<string>;
    mouse: Vec2 & { down: boolean };
    score: number;
    multiplier: number;
    multiTimer: number;
    wave: number;
    waveTimer: number;
    enemiesRemaining: number;
    shakeMag: number;
    shakeTimer: number;
    shootCooldown: number;
    time: number;
  } | null>(null);

  const W = 700;
  const H = 500;

  const initGame = useCallback(() => {
    gameRef.current = {
      player: { x: W / 2, y: H / 2, radius: 12, hp: 5, maxHp: 5, invincible: 0 },
      bullets: [],
      enemies: [],
      particles: [],
      keys: new Set(),
      mouse: { x: W / 2, y: 0, down: false },
      score: 0,
      multiplier: 1,
      multiTimer: 0,
      wave: 0,
      waveTimer: 2,
      enemiesRemaining: 0,
      shakeMag: 0,
      shakeTimer: 0,
      shootCooldown: 0,
      time: 0,
    };
  }, []);

  const spawnWave = (wave: number) => {
    if (!gameRef.current) return;
    const g = gameRef.current;
    const count = 4 + wave * 2;
    g.enemiesRemaining = count;

    for (let i = 0; i < count; i++) {
      // Spawn from edges
      let x: number, y: number;
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { x = -20; y = Math.random() * H; }
      else if (side === 1) { x = W + 20; y = Math.random() * H; }
      else if (side === 2) { x = Math.random() * W; y = -20; }
      else { x = Math.random() * W; y = H + 20; }

      const typeRoll = Math.random();
      let type: Enemy["type"], hp: number, radius: number, color: string;

      if (wave >= 3 && typeRoll < 0.15) {
        type = "tank"; hp = 4; radius = 18; color = "#f59e0b";
      } else if (wave >= 2 && typeRoll < 0.35) {
        type = "fast"; hp = 1; radius = 8; color = "#ef4444";
      } else if (wave >= 4 && typeRoll < 0.45) {
        type = "splitter"; hp = 2; radius = 14; color = "#a855f7";
      } else {
        type = "grunt"; hp = 2; radius = 10; color = "#f43f5e";
      }

      g.enemies.push({
        x, y, vx: 0, vy: 0, radius, hp, maxHp: hp, type, color, flashTimer: 0,
      });
    }
  };

  const spawnParticles = (x: number, y: number, color: string, count: number) => {
    if (!gameRef.current) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      gameRef.current.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.4 + Math.random() * 0.4,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  };

  const startGame = useCallback(() => {
    initGame();
    setGameState("playing");
  }, [initGame]);

  // Input
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onKey = (down: boolean) => (e: KeyboardEvent) => {
      if (down) gameRef.current?.keys.add(e.code);
      else gameRef.current?.keys.delete(e.code);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!gameRef.current || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      gameRef.current.mouse.x = (e.clientX - rect.left) * (W / rect.width);
      gameRef.current.mouse.y = (e.clientY - rect.top) * (H / rect.height);
    };
    const onMouseDown = () => { if (gameRef.current) gameRef.current.mouse.down = true; };
    const onMouseUp = () => { if (gameRef.current) gameRef.current.mouse.down = false; };

    const kd = onKey(true);
    const ku = onKey(false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const PLAYER_SPEED = 220;
    const BULLET_SPEED = 500;
    const SHOOT_RATE = 0.12;

    const loop = (timestamp: number) => {
      if (!gameRef.current) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      const g = gameRef.current;
      g.time += dt;

      // --- UPDATE ---
      const p = g.player;

      // Movement
      let mx = 0, my = 0;
      if (g.keys.has("KeyW") || g.keys.has("ArrowUp")) my -= 1;
      if (g.keys.has("KeyS") || g.keys.has("ArrowDown")) my += 1;
      if (g.keys.has("KeyA") || g.keys.has("ArrowLeft")) mx -= 1;
      if (g.keys.has("KeyD") || g.keys.has("ArrowRight")) mx += 1;
      const mag = Math.sqrt(mx * mx + my * my) || 1;
      p.x += (mx / mag) * PLAYER_SPEED * dt;
      p.y += (my / mag) * PLAYER_SPEED * dt;
      p.x = Math.max(p.radius, Math.min(W - p.radius, p.x));
      p.y = Math.max(p.radius, Math.min(H - p.radius, p.y));
      p.invincible = Math.max(0, p.invincible - dt);

      // Shooting
      g.shootCooldown -= dt;
      if (g.mouse.down && g.shootCooldown <= 0) {
        g.shootCooldown = SHOOT_RATE;
        const dx = g.mouse.x - p.x;
        const dy = g.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        g.bullets.push({
          x: p.x, y: p.y,
          vx: (dx / dist) * BULLET_SPEED,
          vy: (dy / dist) * BULLET_SPEED,
          life: 1.2,
        });
      }

      // Update bullets
      g.bullets = g.bullets.filter((b) => {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life -= dt;
        return b.life > 0 && b.x > -10 && b.x < W + 10 && b.y > -10 && b.y < H + 10;
      });

      // Update enemies
      for (const e of g.enemies) {
        // Move toward player
        const dx = p.x - e.x;
        const dy = p.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = e.type === "fast" ? 160 : e.type === "tank" ? 60 : 90;
        e.vx = (dx / dist) * speed;
        e.vy = (dy / dist) * speed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.flashTimer = Math.max(0, e.flashTimer - dt);

        // Collision with player
        const pDist = Math.sqrt((p.x - e.x) ** 2 + (p.y - e.y) ** 2);
        if (pDist < p.radius + e.radius && p.invincible <= 0) {
          p.hp -= 1;
          p.invincible = 1;
          g.shakeMag = 6;
          g.shakeTimer = 0.2;
          spawnParticles(p.x, p.y, "#06b6d4", 8);
          if (p.hp <= 0) {
            setFinalScore(g.score);
            setFinalWave(g.wave);
            setGameState("dead");
            return;
          }
        }
      }

      // Bullet-enemy collision
      for (const b of g.bullets) {
        for (let i = g.enemies.length - 1; i >= 0; i--) {
          const e = g.enemies[i];
          const d = Math.sqrt((b.x - e.x) ** 2 + (b.y - e.y) ** 2);
          if (d < e.radius + 4) {
            e.hp -= 1;
            e.flashTimer = 0.1;
            b.life = 0;
            if (e.hp <= 0) {
              spawnParticles(e.x, e.y, e.color, 12);
              g.score += 10 * g.multiplier;
              g.multiplier = Math.min(g.multiplier + 0.5, 8);
              g.multiTimer = 2;
              g.enemiesRemaining -= 1;

              // Splitter spawns 2 small grunts
              if (e.type === "splitter") {
                for (let s = 0; s < 2; s++) {
                  g.enemies.push({
                    x: e.x + (Math.random() - 0.5) * 20,
                    y: e.y + (Math.random() - 0.5) * 20,
                    vx: 0, vy: 0, radius: 6, hp: 1, maxHp: 1,
                    type: "grunt", color: "#ec4899", flashTimer: 0,
                  });
                  g.enemiesRemaining += 1;
                }
              }
              g.enemies.splice(i, 1);
            }
            break;
          }
        }
      }

      // Multiplier decay
      g.multiTimer -= dt;
      if (g.multiTimer <= 0) g.multiplier = Math.max(1, g.multiplier - dt * 2);

      // Wave management
      if (g.enemies.length === 0 && g.enemiesRemaining <= 0) {
        g.waveTimer -= dt;
        if (g.waveTimer <= 0) {
          g.wave += 1;
          g.waveTimer = 3;
          spawnWave(g.wave);
        }
      }

      // Particles
      g.particles = g.particles.filter((pt) => {
        pt.x += pt.vx; pt.y += pt.vy;
        pt.vx *= 0.95; pt.vy *= 0.95;
        pt.life -= dt;
        return pt.life > 0;
      });

      // Shake
      g.shakeTimer = Math.max(0, g.shakeTimer - dt);
      if (g.shakeTimer <= 0) g.shakeMag = 0;

      // --- RENDER ---
      ctx.save();
      if (g.shakeMag > 0) {
        ctx.translate(
          (Math.random() - 0.5) * g.shakeMag * 2,
          (Math.random() - 0.5) * g.shakeMag * 2
        );
      }

      // BG
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = "rgba(59,130,246,0.03)";
      for (let x = 0; x < W; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Bullets
      ctx.shadowColor = "rgba(6,182,212,0.8)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "#06b6d4";
      for (const b of g.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Enemies
      for (const e of g.enemies) {
        ctx.shadowColor = e.color;
        ctx.shadowBlur = e.flashTimer > 0 ? 15 : 6;
        ctx.fillStyle = e.flashTimer > 0 ? "#ffffff" : e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
        // HP bar for tanks
        if (e.type === "tank" && e.hp < e.maxHp) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#1f2937";
          ctx.fillRect(e.x - 12, e.y - e.radius - 8, 24, 4);
          ctx.fillStyle = e.color;
          ctx.fillRect(e.x - 12, e.y - e.radius - 8, 24 * (e.hp / e.maxHp), 4);
        }
      }
      ctx.shadowBlur = 0;

      // Player
      ctx.shadowColor = p.invincible > 0 ? "rgba(255,255,255,0.5)" : "rgba(6,182,212,0.6)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = p.invincible > 0 && Math.floor(g.time * 10) % 2 === 0 ? "#1f2937" : "#06b6d4";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      // Aim line
      const aimDx = g.mouse.x - p.x;
      const aimDy = g.mouse.y - p.y;
      const aimDist = Math.sqrt(aimDx * aimDx + aimDy * aimDy) || 1;
      ctx.strokeStyle = "rgba(6,182,212,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + (aimDx / aimDist) * 40, p.y + (aimDy / aimDist) * 40);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Particles
      for (const pt of g.particles) {
        ctx.globalAlpha = pt.life / 0.8;
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      }
      ctx.globalAlpha = 1;

      // HUD
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px monospace";
      ctx.fillText(`WAVE ${g.wave}`, 10, 20);
      ctx.fillText(`SCORE ${g.score}`, 10, 36);
      if (g.multiplier > 1) {
        ctx.fillStyle = "#f59e0b";
        ctx.fillText(`x${g.multiplier.toFixed(1)}`, 10, 52);
      }
      // HP
      for (let i = 0; i < p.maxHp; i++) {
        ctx.fillStyle = i < p.hp ? "#06b6d4" : "#1f2937";
        ctx.fillRect(W - 20 - i * 16, 10, 12, 12);
      }

      ctx.restore();
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
          <div className="text-4xl mb-4">🔫</div>
          <h2 className="text-2xl font-bold text-white mb-4">Counter Me</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;You are the last defense subroutine. Malicious processes flood the server
            from every direction. Hold the core. Eliminate everything.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>WASD or Arrow Keys — Move</p>
            <p>Mouse Aim + Click — Shoot</p>
            <p>Kill fast for score multiplier</p>
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Activate Defense
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "dead") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">💀</div>
        <h2 className="text-xl font-bold text-red-400 mb-2">Core Breached</h2>
        <p className="text-sm text-[var(--text-muted)] mb-2">
          Survived {finalWave} waves
        </p>
        <p className="text-2xl font-bold text-[var(--accent-cyan)] mb-6">
          Score: {finalScore}
        </p>
        <button onClick={startGame} className="neon-btn px-8 py-3">
          Reboot Defense
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
        className="rounded-xl border border-[var(--border-subtle)] max-w-full cursor-crosshair"
      />
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        WASD move • Mouse aim + click shoot
      </p>
    </div>
  );
}
