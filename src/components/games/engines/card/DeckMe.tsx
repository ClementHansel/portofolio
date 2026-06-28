"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * DECK ME — A strategic card battle game.
 *
 * Story: In a digital realm, two AI systems compete for processing power.
 * You command the "Cyan Protocol" against the "Red Entropy."
 * Each card represents a data packet with attack and defense values.
 * Win rounds to accumulate system resources and defeat the opponent.
 *
 * Mechanics:
 * - 5 cards per hand, drawn from a shared pool
 * - Higher attack wins the round
 * - Winner gains difference as score
 * - Best of 5 rounds per match
 * - AI opponent with basic strategy
 */

interface Card {
  id: number;
  name: string;
  attack: number;
  defense: number;
  type: "data" | "virus" | "firewall" | "exploit";
  description: string;
}

type GamePhase = "intro" | "select" | "battle" | "result" | "gameover";
type RoundResult = "win" | "lose" | "draw";

const cardPool: Card[] = [
  { id: 1, name: "Ping Flood", attack: 7, defense: 2, type: "virus", description: "Overwhelms with volume" },
  { id: 2, name: "Packet Shield", attack: 3, defense: 8, type: "firewall", description: "Absorbs incoming data" },
  { id: 3, name: "Data Burst", attack: 5, defense: 5, type: "data", description: "Balanced transmission" },
  { id: 4, name: "Zero-Day", attack: 9, defense: 1, type: "exploit", description: "Devastating but fragile" },
  { id: 5, name: "Encryption Wall", attack: 2, defense: 9, type: "firewall", description: "Nearly impenetrable" },
  { id: 6, name: "Trojan Horse", attack: 6, defense: 4, type: "virus", description: "Hidden strength" },
  { id: 7, name: "Cache Miss", attack: 4, defense: 6, type: "data", description: "Reliable fallback" },
  { id: 8, name: "Buffer Overflow", attack: 8, defense: 3, type: "exploit", description: "Overloads the target" },
  { id: 9, name: "Rate Limiter", attack: 3, defense: 7, type: "firewall", description: "Slows the assault" },
  { id: 10, name: "Syn Flood", attack: 6, defense: 5, type: "virus", description: "Persistent pressure" },
  { id: 11, name: "Deep Packet", attack: 5, defense: 6, type: "data", description: "Thorough inspection" },
  { id: 12, name: "Root Kit", attack: 8, defense: 2, type: "exploit", description: "Gains full control" },
];

function drawHand(count: number): Card[] {
  const shuffled = [...cardPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function aiSelectCard(hand: Card[]): number {
  // Simple AI: 60% chance pick highest attack, 40% random
  if (Math.random() < 0.6) {
    let bestIdx = 0;
    hand.forEach((card, i) => {
      if (card.attack > hand[bestIdx].attack) bestIdx = i;
    });
    return bestIdx;
  }
  return Math.floor(Math.random() * hand.length);
}

const typeColors: Record<Card["type"], string> = {
  data: "#3b82f6",
  virus: "#ef4444",
  firewall: "#10b981",
  exploit: "#a855f7",
};

export default function DeckMe() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [aiHand, setAiHand] = useState<Card[]>([]);
  const [playerCard, setPlayerCard] = useState<Card | null>(null);
  const [aiCard, setAiCard] = useState<Card | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [round, setRound] = useState(1);
  const [roundResult, setRoundResult] = useState<RoundResult>("draw");
  const [matchHistory, setMatchHistory] = useState<RoundResult[]>([]);

  const startGame = useCallback(() => {
    setPlayerHand(drawHand(5));
    setAiHand(drawHand(5));
    setPlayerScore(0);
    setAiScore(0);
    setRound(1);
    setPlayerCard(null);
    setAiCard(null);
    setMatchHistory([]);
    setPhase("select");
  }, []);

  const playCard = (index: number) => {
    if (phase !== "select") return;

    const pCard = playerHand[index];
    const aiIdx = aiSelectCard(aiHand);
    const aCard = aiHand[aiIdx];

    setPlayerCard(pCard);
    setAiCard(aCard);

    // Remove played cards from hands
    setPlayerHand((h) => h.filter((_, i) => i !== index));
    setAiHand((h) => h.filter((_, i) => i !== aiIdx));

    // Determine winner
    let result: RoundResult;
    if (pCard.attack > aCard.defense) {
      result = "win";
      setPlayerScore((s) => s + (pCard.attack - aCard.defense));
    } else if (aCard.attack > pCard.defense) {
      result = "lose";
      setAiScore((s) => s + (aCard.attack - pCard.defense));
    } else {
      result = "draw";
    }

    setRoundResult(result);
    setMatchHistory((h) => [...h, result]);
    setPhase("result");
  };

  const nextRound = () => {
    if (round >= 5 || playerHand.length === 0) {
      setPhase("gameover");
    } else {
      setRound((r) => r + 1);
      setPlayerCard(null);
      setAiCard(null);
      setPhase("select");
    }
  };

  // Intro
  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <div className="text-4xl mb-4">🃏</div>
          <h2 className="text-2xl font-bold text-white mb-4">Deck Me</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;Two AIs compete for processing dominance. You command the Cyan Protocol —
            deploy data packets strategically against the Red Entropy. Each card is a
            weapon in the digital war.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>• 5 rounds per match</p>
            <p>• Attack vs Defense determines damage</p>
            <p>• Highest total score wins</p>
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Initialize Battle
          </button>
        </motion.div>
      </div>
    );
  }

  // Game Over
  if (phase === "gameover") {
    const won = playerScore > aiScore;
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-4xl mb-4">{won ? "🏆" : "💀"}</div>
          <h2 className={`text-2xl font-bold mb-2 ${won ? "text-[var(--accent-emerald)]" : "text-[var(--accent-rose)]"}`}>
            {won ? "Protocol Victorious" : "Entropy Prevails"}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Final Score: <span className="text-[var(--accent-cyan)]">{playerScore}</span> vs{" "}
            <span className="text-red-400">{aiScore}</span>
          </p>
          <div className="flex gap-1 justify-center mb-6">
            {matchHistory.map((r, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  r === "win" ? "bg-emerald-400" : r === "lose" ? "bg-red-400" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
          <button onClick={startGame} className="neon-btn px-8 py-3">
            Rematch
          </button>
        </motion.div>
      </div>
    );
  }

  // Battle result
  if (phase === "result" && playerCard && aiCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] px-6">
        <div className="text-xs font-mono text-[var(--text-muted)] mb-4">
          ROUND {round} / 5
        </div>

        <div className="flex items-center gap-8 mb-8">
          {/* Player card */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-36 h-48 rounded-xl border-2 p-3 flex flex-col justify-between"
            style={{ borderColor: typeColors[playerCard.type], background: "var(--bg-card)" }}
          >
            <div className="text-[10px] font-mono" style={{ color: typeColors[playerCard.type] }}>
              {playerCard.type.toUpperCase()}
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">{playerCard.name}</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1">{playerCard.description}</div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-red-400">ATK {playerCard.attack}</span>
              <span className="text-blue-400">DEF {playerCard.defense}</span>
            </div>
          </motion.div>

          <div className="text-2xl font-bold text-[var(--text-muted)]">VS</div>

          {/* AI card */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-36 h-48 rounded-xl border-2 p-3 flex flex-col justify-between"
            style={{ borderColor: typeColors[aiCard.type], background: "var(--bg-card)" }}
          >
            <div className="text-[10px] font-mono" style={{ color: typeColors[aiCard.type] }}>
              {aiCard.type.toUpperCase()}
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">{aiCard.name}</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1">{aiCard.description}</div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-red-400">ATK {aiCard.attack}</span>
              <span className="text-blue-400">DEF {aiCard.defense}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-xl font-bold mb-6 ${
            roundResult === "win" ? "text-emerald-400" : roundResult === "lose" ? "text-red-400" : "text-gray-400"
          }`}
        >
          {roundResult === "win" ? "DAMAGE DEALT" : roundResult === "lose" ? "DAMAGE TAKEN" : "BLOCKED"}
        </motion.div>

        <div className="flex gap-8 mb-6 text-sm">
          <span className="text-[var(--accent-cyan)]">You: {playerScore}</span>
          <span className="text-red-400">AI: {aiScore}</span>
        </div>

        <button onClick={nextRound} className="neon-btn px-6 py-2">
          {round >= 5 ? "Final Results" : "Next Round →"}
        </button>
      </div>
    );
  }

  // Card selection phase
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-4">
      {/* HUD */}
      <div className="flex items-center gap-6 mb-6">
        <span className="text-xs font-mono text-[var(--text-muted)]">ROUND {round}/5</span>
        <span className="text-sm text-[var(--accent-cyan)]">You: {playerScore}</span>
        <span className="text-sm text-red-400">AI: {aiScore}</span>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-6">
        Select a card to deploy against Red Entropy
      </p>

      {/* Player hand */}
      <div className="flex flex-wrap gap-3 justify-center">
        {playerHand.map((card, i) => (
          <motion.button
            key={card.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => playCard(i)}
            whileHover={{ y: -8, boxShadow: `0 0 20px ${typeColors[card.type]}40` }}
            whileTap={{ scale: 0.95 }}
            className="w-28 h-40 rounded-xl border p-2 flex flex-col justify-between cursor-pointer transition-colors"
            style={{ borderColor: `${typeColors[card.type]}60`, background: "var(--bg-card)" }}
          >
            <div className="text-[9px] font-mono" style={{ color: typeColors[card.type] }}>
              {card.type.toUpperCase()}
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-white leading-tight">{card.name}</div>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-red-400">⚔{card.attack}</span>
              <span className="text-blue-400">🛡{card.defense}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* AI hand (face down) */}
      <div className="mt-8">
        <div className="text-xs text-[var(--text-muted)] text-center mb-2">
          Red Entropy ({aiHand.length} cards)
        </div>
        <div className="flex gap-2 justify-center">
          {aiHand.map((_, i) => (
            <div
              key={i}
              className="w-10 h-14 rounded-lg border border-red-900/40 bg-red-950/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
