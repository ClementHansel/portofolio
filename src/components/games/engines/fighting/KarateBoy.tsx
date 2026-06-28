"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * KARATE BOY — Combo-based 2D fighter.
 *
 * Story: In the Digital Dojo, warrior programs train endlessly.
 * You are "Cyan" — a newly compiled combat algorithm seeking mastery.
 * Defeat increasingly skilled opponents to earn your place in the system.
 *
 * Technical showcase:
 * - Frame-based animation system (idle, walk, punch, kick, block, hit)
 * - Hitbox/hurtbox collision with active frames
 * - Combo system (light → heavy chains)
 * - AI opponent with state machine (idle, approach, attack, retreat)
 * - Health bars with damage flash
 * - Round system with win tracking
 */

interface Fighter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  facing: 1 | -1;
  state: "idle" | "walk" | "punch" | "kick" | "block" | "hit" | "ko";
  stateTimer: number;
  comboCount: number;
  comboTimer: number;
  attackHit: boolean;
  stunTimer: number;
  color: string;
  name: string;
}

type GameState = "intro" | "fighting" | "roundEnd" | "gameOver";

const W = 700;
const H = 350;
const GROUND = H - 50;
const FIGHTER_W = 30;
const FIGHTER_H = 60;

export default function KarateBoy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("intro");
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);
  const [round, setRound] = useState(1);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const gameRef = useRef<{
    player: Fighter;
    ai: Fighter;
    keys: Set<string>;
    time: number;
    roundTimer: number;
    particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[];
  } | null>(null);

  const createFighter = (x: number, facing: 1 | -1, color: string, name: string): Fighter => ({
    x, y: GROUND - FIGHTER_H, vx: 0, vy: 0,
    hp: 100, maxHp: 100, facing,
    state: "idle", stateTimer: 0, comboCount: 0, comboTimer: 0,
    attackHit: false, stunTimer: 0, color, name,
  });

  const initRound = useCallback(() => {
    gameRef.current = {
      player: createFighter(150, 1, "#06b6d4", "CYAN"),
      ai: createFighter(W - 180, -1, "#ef4444", "RED"),
      keys: new Set(),
      time: 0,
      roundTimer: 60,
      particles: [],
    };
  }, []);

  const startGame = useCallback(() => {
    setPlayerWins(0);
    setAiWins(0);
    setRound(1);
    initRound();
    setGameState("fighting");
  }, [initRound]);

  const nextRound = useCallback(() => {
    setRound((r) => r + 1);
    initRound();
    setGameState("fighting");
  }, [initRound]);

  const spawnHitParticles = (x: number, y: number, color: string) => {
    if (!gameRef.current) return;
    for (let i = 0; i < 8; i++) {
      gameRef.current.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 1) * 4,
        life: 0.3 + Math.random() * 0.2,
        color,
      });
    }
  };

  const tryAttack = (attacker: Fighter, defender: Fighter, type: "punch" | "kick") => {
    if (attacker.state !== "idle" && attacker.state !== "walk") return;
    attacker.state = type;
    attacker.stateTimer = type === "punch" ? 0.25 : 0.35;
    attacker.attackHit = false;
  };

  const checkHit = (attacker: Fighter, defender: Fighter): boolean => {
    if (attacker.attackHit) return false;
    const range = attacker.state === "kick" ? 55 : 40;
    const hitX = attacker.x + attacker.facing * range;
    const inRange = Math.abs(hitX - defender.x) < FIGHTER_W + 10;
    const inHeight = Math.abs(attacker.y - defender.y) < FIGHTER_H;
    return inRange && inHeight;
  };

  const applyDamage = (attacker: Fighter, defender: Fighter) => {
    if (defender.state === "block") {
      spawnHitParticles(defender.x - defender.facing * 15, defender.y + 20, "#64748b");
      defender.stunTimer = 0.1;
      return;
    }
    const dmg = attacker.state === "kick" ? 12 : 8;
    const comboDmg = dmg + attacker.comboCount * 3;
    defender.hp = Math.max(0, defender.hp - comboDmg);
    defender.state = "hit";
    defender.stateTimer = 0.3;
    defender.vx = attacker.facing * 200;
    attacker.comboCount += 1;
    attacker.comboTimer = 1;
    attacker.attackHit = true;
    spawnHitParticles(defender.x, defender.y + 20, attacker.color);
  };

  // Input
  useEffect(() => {
    if (gameState !== "fighting") return;
    const kd = (e: KeyboardEvent) => {
      gameRef.current?.keys.add(e.code);
      if (e.code === "KeyJ") tryAttack(gameRef.current!.player, gameRef.current!.ai, "punch");
      if (e.code === "KeyK") tryAttack(gameRef.current!.player, gameRef.current!.ai, "kick");
    };
    const ku = (e: KeyboardEvent) => { gameRef.current?.keys.delete(e.code); };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "fighting" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const loop = (timestamp: number) => {
      if (!gameRef.current) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;
      const g = gameRef.current;
      g.time += dt;
      g.roundTimer -= dt;

      const p = g.player;
      const ai = g.ai;

      // --- Player Update ---
      if (p.state === "idle" || p.state === "walk") {
        let move = 0;
        if (g.keys.has("KeyA") || g.keys.has("ArrowLeft")) move -= 1;
        if (g.keys.has("KeyD") || g.keys.has("ArrowRight")) move += 1;
        if (g.keys.has("KeyS") || g.keys.has("ArrowDown")) p.state = "block";
        p.vx = move * 180;
        p.state = move !== 0 ? "walk" : "idle";
        p.facing = ai.x > p.x ? 1 : -1;
      }

      // Block release
      if (p.state === "block" && !g.keys.has("KeyS") && !g.keys.has("ArrowDown")) {
        p.state = "idle";
      }

      // State timers
      for (const f of [p, ai]) {
        if (f.stateTimer > 0) {
          f.stateTimer -= dt;
          // Check hit during active frames
          if ((f.state === "punch" || f.state === "kick") && f.stateTimer < 0.15) {
            const target = f === p ? ai : p;
            if (checkHit(f, target)) applyDamage(f, target);
          }
          if (f.stateTimer <= 0) {
            if (f.state === "hit" || f.state === "punch" || f.state === "kick") f.state = "idle";
          }
        }
        f.comboTimer -= dt;
        if (f.comboTimer <= 0) f.comboCount = 0;
        f.stunTimer = Math.max(0, f.stunTimer - dt);

        // Apply velocity + friction
        f.x += f.vx * dt;
        f.vx *= 0.85;
        f.x = Math.max(FIGHTER_W, Math.min(W - FIGHTER_W, f.x));
      }

      // --- AI Logic ---
      if (ai.state === "idle" || ai.state === "walk") {
        const dist = Math.abs(ai.x - p.x);
        ai.facing = p.x < ai.x ? -1 : 1;

        if (dist > 70) {
          ai.vx = ai.facing * 120;
          ai.state = "walk";
        } else if (dist < 50) {
          // Attack decision
          if (Math.random() < 0.02) tryAttack(ai, p, "punch");
          else if (Math.random() < 0.015) tryAttack(ai, p, "kick");
          else if (Math.random() < 0.01) { ai.state = "block"; ai.stateTimer = 0.5; }
        } else {
          ai.state = "idle";
          if (Math.random() < 0.03) tryAttack(ai, p, Math.random() < 0.5 ? "punch" : "kick");
        }
      }

      // Round end check
      if (p.hp <= 0 || ai.hp <= 0 || g.roundTimer <= 0) {
        const playerWon = ai.hp <= 0 || (g.roundTimer <= 0 && p.hp > ai.hp);
        if (playerWon) setPlayerWins((w) => { const nw = w + 1; if (nw >= 2) setGameState("gameOver"); else setGameState("roundEnd"); return nw; });
        else setAiWins((w) => { const nw = w + 1; if (nw >= 2) setGameState("gameOver"); else setGameState("roundEnd"); return nw; });
        return;
      }

      // Particles
      g.particles = g.particles.filter((pt) => { pt.x += pt.vx; pt.y += pt.vy; pt.vy += 10 * dt; pt.life -= dt; return pt.life > 0; });

      // --- RENDER ---
      // Background - dojo
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, W, H);
      // Floor
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.strokeStyle = "rgba(59,130,246,0.1)";
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, GROUND); ctx.lineTo(x, H); ctx.stroke(); }

      // Draw fighters
      const drawFighter = (f: Fighter) => {
        const flash = f.state === "hit" && f.stateTimer > 0.2;
        ctx.shadowColor = f.color;
        ctx.shadowBlur = flash ? 15 : 6;
        ctx.fillStyle = flash ? "#ffffff" : f.color;

        // Body
        ctx.fillRect(f.x - FIGHTER_W / 2, f.y, FIGHTER_W, FIGHTER_H);
        // Head
        ctx.beginPath();
        ctx.arc(f.x, f.y - 8, 12, 0, Math.PI * 2);
        ctx.fill();

        // Attack limb
        if (f.state === "punch") {
          ctx.fillRect(f.x + f.facing * FIGHTER_W / 2, f.y + 15, f.facing * 25, 8);
        }
        if (f.state === "kick") {
          ctx.fillRect(f.x + f.facing * FIGHTER_W / 2, f.y + 40, f.facing * 30, 8);
        }
        // Block indicator
        if (f.state === "block") {
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 3;
          ctx.strokeRect(f.x - FIGHTER_W / 2 - 5, f.y - 5, FIGHTER_W + 10, FIGHTER_H + 10);
        }
        ctx.shadowBlur = 0;
      };

      drawFighter(p);
      drawFighter(ai);

      // Particles
      for (const pt of g.particles) {
        ctx.globalAlpha = pt.life / 0.5;
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      // HUD - Health bars
      const barW = 200;
      // Player HP
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(20, 15, barW, 14);
      ctx.fillStyle = p.hp > 30 ? "#06b6d4" : "#ef4444";
      ctx.fillRect(20, 15, barW * (p.hp / p.maxHp), 14);
      ctx.strokeStyle = "#374151";
      ctx.strokeRect(20, 15, barW, 14);
      // AI HP
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(W - 20 - barW, 15, barW, 14);
      ctx.fillStyle = ai.hp > 30 ? "#ef4444" : "#f59e0b";
      ctx.fillRect(W - 20 - barW * (ai.hp / ai.maxHp), 15, barW * (ai.hp / ai.maxHp), 14);
      ctx.strokeStyle = "#374151";
      ctx.strokeRect(W - 20 - barW, 15, barW, 14);

      // Names
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px monospace";
      ctx.fillText(p.name, 20, 12);
      ctx.fillText(ai.name, W - 50, 12);

      // Timer
      ctx.fillStyle = "#f1f5f9";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(Math.ceil(g.roundTimer).toString(), W / 2, 25);
      ctx.textAlign = "left";

      // Combo
      if (p.comboCount > 1) {
        ctx.fillStyle = "#f59e0b";
        ctx.font = "bold 14px monospace";
        ctx.fillText(`${p.comboCount} HIT COMBO!`, 20, 50);
      }

      // Round indicator
      ctx.fillStyle = "#64748b";
      ctx.font = "10px monospace";
      ctx.fillText(`Round ${round} • Best of 3`, W / 2 - 45, H - 10);

      animRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [gameState, round]);

  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6">
        <div className="max-w-md">
          <div className="text-4xl mb-4">🥋</div>
          <h2 className="text-2xl font-bold text-white mb-4">Karate Boy</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;In the Digital Dojo, warrior programs train endlessly. You are Cyan —
            a newly compiled combat algorithm. Defeat Red to prove your code.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>A/D or ← → — Move</p>
            <p>S or ↓ — Block</p>
            <p>J — Punch • K — Kick</p>
            <p>Chain hits for combo damage!</p>
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Enter Dojo
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "roundEnd") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6">
        <h2 className="text-xl font-bold text-white mb-4">Round Over</h2>
        <div className="flex gap-8 mb-6">
          <div className="text-center">
            <div className="text-[var(--accent-cyan)] font-bold text-lg">{playerWins}</div>
            <div className="text-xs text-[var(--text-muted)]">CYAN</div>
          </div>
          <div className="text-[var(--text-muted)]">vs</div>
          <div className="text-center">
            <div className="text-red-400 font-bold text-lg">{aiWins}</div>
            <div className="text-xs text-[var(--text-muted)]">RED</div>
          </div>
        </div>
        <button onClick={nextRound} className="neon-btn px-8 py-3">
          Next Round
        </button>
      </div>
    );
  }

  if (gameState === "gameOver") {
    const won = playerWins > aiWins;
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6">
        <div className="text-4xl mb-4">{won ? "🏆" : "💀"}</div>
        <h2 className={`text-xl font-bold mb-2 ${won ? "text-[var(--accent-cyan)]" : "text-red-400"}`}>
          {won ? "Cyan Prevails" : "Red Dominates"}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Score: {playerWins} - {aiWins}
        </p>
        <button onClick={startGame} className="neon-btn px-8 py-3">
          Rematch
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
        A/D move • S block • J punch • K kick
      </p>
    </div>
  );
}
