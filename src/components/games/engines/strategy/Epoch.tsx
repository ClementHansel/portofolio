"use client";

import { useState, useCallback } from "react";

/**
 * EPOCH — Turn-based hex territory strategy.
 *
 * Story: Civilizations rise from the digital void. You command the Cyan Empire,
 * expanding across a procedural hex grid. Capture territories, gather resources,
 * build armies. The Red Dominion grows relentlessly. Only one can control the grid.
 *
 * Technical showcase:
 * - Hex grid rendering with axial coordinates
 * - Territory capture mechanic
 * - Resource generation per territory
 * - Turn-based AI opponent with expansion strategy
 * - Unit placement and combat resolution
 * - Victory conditions (control 60%+ of map)
 */

interface HexCell {
  q: number;
  r: number;
  owner: "neutral" | "player" | "ai";
  units: number;
  isCapital: boolean;
}

type GamePhase = "intro" | "playing" | "gameOver";
type TurnPhase = "select" | "action" | "aiTurn";

const GRID_RADIUS = 4;

function generateGrid(): HexCell[] {
  const cells: HexCell[] = [];
  for (let q = -GRID_RADIUS; q <= GRID_RADIUS; q++) {
    const r1 = Math.max(-GRID_RADIUS, -q - GRID_RADIUS);
    const r2 = Math.min(GRID_RADIUS, -q + GRID_RADIUS);
    for (let r = r1; r <= r2; r++) {
      cells.push({ q, r, owner: "neutral", units: 0, isCapital: false });
    }
  }
  // Assign capitals
  const playerCap = cells.find((c) => c.q === -GRID_RADIUS && c.r === 0);
  const aiCap = cells.find((c) => c.q === GRID_RADIUS && c.r === 0);
  if (playerCap) { playerCap.owner = "player"; playerCap.units = 3; playerCap.isCapital = true; }
  if (aiCap) { aiCap.owner = "ai"; aiCap.units = 3; aiCap.isCapital = true; }
  return cells;
}

function hexToPixel(q: number, r: number, size: number) {
  const x = size * (3 / 2 * q);
  const y = size * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
  return { x, y };
}

function getNeighbors(q: number, r: number): [number, number][] {
  return [
    [q + 1, r], [q - 1, r], [q, r + 1], [q, r - 1],
    [q + 1, r - 1], [q - 1, r + 1],
  ];
}

export default function Epoch() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [grid, setGrid] = useState<HexCell[]>([]);
  const [turn, setTurn] = useState(1);
  const [turnPhase, setTurnPhase] = useState<TurnPhase>("select");
  const [selected, setSelected] = useState<HexCell | null>(null);
  const [resources, setResources] = useState({ player: 5, ai: 5 });
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState<"player" | "ai" | null>(null);

  const startGame = useCallback(() => {
    setGrid(generateGrid());
    setTurn(1);
    setTurnPhase("select");
    setSelected(null);
    setResources({ player: 5, ai: 5 });
    setMessage("Select a territory to reinforce or attack from.");
    setWinner(null);
    setPhase("playing");
  }, []);

  const checkVictory = (cells: HexCell[]) => {
    const total = cells.length;
    const playerCount = cells.filter((c) => c.owner === "player").length;
    const aiCount = cells.filter((c) => c.owner === "ai").length;
    if (playerCount >= total * 0.6) { setWinner("player"); setPhase("gameOver"); }
    else if (aiCount >= total * 0.6) { setWinner("ai"); setPhase("gameOver"); }
  };

  const handleCellClick = (cell: HexCell) => {
    if (turnPhase === "aiTurn") return;

    if (!selected) {
      // Select own territory
      if (cell.owner === "player" && cell.units > 0) {
        setSelected(cell);
        setMessage(`Selected (${cell.units} units). Click adjacent cell to attack/move, or click again to reinforce.`);
      } else if (cell.owner === "player" && resources.player >= 2) {
        // Reinforce
        const newGrid = grid.map((c) =>
          c.q === cell.q && c.r === cell.r ? { ...c, units: c.units + 1 } : c
        );
        setGrid(newGrid);
        setResources((r) => ({ ...r, player: r.player - 2 }));
        setMessage("Reinforced! Select again or end turn.");
      }
    } else {
      if (cell.q === selected.q && cell.r === selected.r) {
        // Deselect
        setSelected(null);
        setMessage("Deselected.");
        return;
      }

      // Check adjacency
      const neighbors = getNeighbors(selected.q, selected.r);
      const isAdj = neighbors.some(([nq, nr]) => nq === cell.q && nr === cell.r);
      if (!isAdj) { setMessage("Not adjacent!"); return; }

      if (cell.owner === "player") {
        // Move units
        const newGrid = grid.map((c) => {
          if (c.q === selected.q && c.r === selected.r) return { ...c, units: 0 };
          if (c.q === cell.q && c.r === cell.r) return { ...c, units: c.units + selected.units };
          return c;
        });
        setGrid(newGrid);
        setMessage("Units moved.");
      } else {
        // Attack
        const attackPower = selected.units;
        const defensePower = cell.units + (cell.owner === "ai" ? 1 : 0);
        const newGrid = grid.map((c) => {
          if (c.q === selected.q && c.r === selected.r) return { ...c, units: 0 };
          if (c.q === cell.q && c.r === cell.r) {
            if (attackPower > defensePower) {
              return { ...c, owner: "player" as const, units: attackPower - defensePower, isCapital: false };
            } else {
              return { ...c, units: defensePower - attackPower };
            }
          }
          return c;
        });
        setGrid(newGrid);
        setMessage(attackPower > defensePower ? "Territory captured!" : "Attack repelled!");
        checkVictory(newGrid);
      }
      setSelected(null);
    }
  };

  const endTurn = () => {
    setTurnPhase("aiTurn");
    setSelected(null);

    // Generate resources
    const playerTerritories = grid.filter((c) => c.owner === "player").length;
    const aiTerritories = grid.filter((c) => c.owner === "ai").length;

    setTimeout(() => {
      // AI turn
      let newGrid = [...grid];
      let aiRes = resources.ai + aiTerritories;

      // AI: reinforce random owned territory
      const aiCells = newGrid.filter((c) => c.owner === "ai");
      if (aiCells.length > 0 && aiRes >= 2) {
        const target = aiCells[Math.floor(Math.random() * aiCells.length)];
        newGrid = newGrid.map((c) =>
          c.q === target.q && c.r === target.r ? { ...c, units: c.units + 1 } : c
        );
        aiRes -= 2;
      }

      // AI: attack adjacent neutral or player territory
      const attackers = newGrid.filter((c) => c.owner === "ai" && c.units > 1);
      if (attackers.length > 0) {
        const attacker = attackers[Math.floor(Math.random() * attackers.length)];
        const neighbors = getNeighbors(attacker.q, attacker.r);
        const targets = neighbors
          .map(([nq, nr]) => newGrid.find((c) => c.q === nq && c.r === nr))
          .filter((c) => c && c.owner !== "ai") as HexCell[];

        if (targets.length > 0) {
          const target = targets[Math.floor(Math.random() * targets.length)];
          const atkPow = attacker.units - 1;
          const defPow = target.units;
          newGrid = newGrid.map((c) => {
            if (c.q === attacker.q && c.r === attacker.r) return { ...c, units: 1 };
            if (c.q === target.q && c.r === target.r) {
              if (atkPow > defPow) return { ...c, owner: "ai" as const, units: atkPow - defPow, isCapital: false };
              else return { ...c, units: defPow - atkPow };
            }
            return c;
          });
        }
      }

      setGrid(newGrid);
      setResources({ player: resources.player + playerTerritories, ai: aiRes });
      setTurn((t) => t + 1);
      setTurnPhase("select");
      setMessage("Your turn. Select a territory.");
      checkVictory(newGrid);
    }, 800);
  };

  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="max-w-md">
          <div className="text-4xl mb-4">⚔️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Epoch</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;Civilizations rise from the digital void. Command the Cyan Empire,
            expand across the hex grid, and crush the Red Dominion. Only one can reign.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>Click your territory to select units</p>
            <p>Click adjacent cells to attack or move</p>
            <p>Spend resources (2) to reinforce empty territory</p>
            <p>Control 60% of the map to win</p>
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Begin Conquest
          </button>
        </div>
      </div>
    );
  }

  if (phase === "gameOver") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">{winner === "player" ? "🏆" : "💀"}</div>
        <h2 className={`text-xl font-bold mb-2 ${winner === "player" ? "text-[var(--accent-cyan)]" : "text-red-400"}`}>
          {winner === "player" ? "Cyan Empire Victorious" : "Red Dominion Prevails"}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Completed in {turn} turns
        </p>
        <button onClick={startGame} className="neon-btn px-8 py-3">
          New Game
        </button>
      </div>
    );
  }

  // Render hex grid
  const hexSize = 28;
  const centerX = 300;
  const centerY = 240;

  return (
    <div className="flex flex-col items-center">
      {/* HUD */}
      <div className="flex items-center gap-6 mb-3 text-xs">
        <span className="text-[var(--accent-cyan)]">Resources: {resources.player}</span>
        <span className="text-[var(--text-muted)]">Turn {turn}</span>
        <span className="text-red-400">AI Resources: {resources.ai}</span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] mb-3 max-w-md text-center">{message}</p>

      {/* Hex grid SVG */}
      <svg width={600} height={480} className="rounded-xl border border-[var(--border-subtle)] bg-[#0a0f1a]">
        {grid.map((cell) => {
          const { x, y } = hexToPixel(cell.q, cell.r, hexSize);
          const px = centerX + x;
          const py = centerY + y;
          const isSelected = selected?.q === cell.q && selected?.r === cell.r;

          // Hex points
          const points = Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 180) * (60 * i - 30);
            return `${px + hexSize * 0.9 * Math.cos(angle)},${py + hexSize * 0.9 * Math.sin(angle)}`;
          }).join(" ");

          const fill =
            cell.owner === "player" ? "rgba(6,182,212,0.3)" :
            cell.owner === "ai" ? "rgba(239,68,68,0.3)" : "rgba(30,41,59,0.5)";
          const stroke =
            isSelected ? "#f59e0b" :
            cell.owner === "player" ? "#06b6d4" :
            cell.owner === "ai" ? "#ef4444" : "#334155";

          return (
            <g key={`${cell.q}-${cell.r}`} onClick={() => handleCellClick(cell)} className="cursor-pointer">
              <polygon
                points={points}
                fill={fill}
                stroke={stroke}
                strokeWidth={isSelected ? 2.5 : 1}
              />
              {cell.units > 0 && (
                <text
                  x={px}
                  y={py + 4}
                  textAnchor="middle"
                  fill={cell.owner === "player" ? "#06b6d4" : cell.owner === "ai" ? "#ef4444" : "#94a3b8"}
                  fontSize={12}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {cell.units}
                </text>
              )}
              {cell.isCapital && (
                <text x={px} y={py - 10} textAnchor="middle" fontSize={10} fill="#f59e0b">★</text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Controls */}
      <div className="mt-3 flex gap-3">
        <button
          onClick={endTurn}
          disabled={turnPhase === "aiTurn"}
          className="neon-btn px-6 py-2 text-sm disabled:opacity-50"
        >
          {turnPhase === "aiTurn" ? "AI Thinking..." : "End Turn"}
        </button>
      </div>
    </div>
  );
}
