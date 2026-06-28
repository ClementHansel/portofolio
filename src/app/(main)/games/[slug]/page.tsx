"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import GamePlayer from "@/components/games/GamePlayer";

// Lazy load game engines
const SolveMe = dynamic(
  () => import("@/components/games/engines/puzzle/SolveMe"),
  { ssr: false }
);
const DeckMe = dynamic(
  () => import("@/components/games/engines/card/DeckMe"),
  { ssr: false }
);
const JumpMeIn = dynamic(
  () => import("@/components/games/engines/platformer/JumpMeIn"),
  { ssr: false }
);
const CounterMe = dynamic(
  () => import("@/components/games/engines/shooter/CounterMe"),
  { ssr: false }
);
const FastAndBlast = dynamic(
  () => import("@/components/games/engines/racing/FastAndBlast"),
  { ssr: false }
);
const KarateBoy = dynamic(
  () => import("@/components/games/engines/fighting/KarateBoy"),
  { ssr: false }
);
const BuildOut = dynamic(
  () => import("@/components/games/engines/sandbox/BuildOut"),
  { ssr: false }
);
const Epoch = dynamic(
  () => import("@/components/games/engines/strategy/Epoch"),
  { ssr: false }
);
const HauntedVilla = dynamic(
  () => import("@/components/games/engines/horror/HauntedVilla"),
  { ssr: false }
);
const LifeMustGoOn = dynamic(
  () => import("@/components/games/engines/survival/LifeMustGoOn"),
  { ssr: false }
);

const gameMap: Record<string, { title: string; component: React.ComponentType }> = {
  solveMe: { title: "Solve Me", component: SolveMe },
  deckMe: { title: "Deck Me", component: DeckMe },
  jumpMeIn: { title: "Jump Me In", component: JumpMeIn },
  counterMe: { title: "Counter Me", component: CounterMe },
  fastAndBlast: { title: "Fast and Blast", component: FastAndBlast },
  karateBoy: { title: "Karate Boy", component: KarateBoy },
  buildOut: { title: "Build Out", component: BuildOut },
  epoch: { title: "Epoch", component: Epoch },
  hauntedVilla: { title: "Haunted Villa", component: HauntedVilla },
  lifeMustGoOn: { title: "Life Must Go On", component: LifeMustGoOn },
};

export default function GamePage() {
  const params = useParams();
  const slug = params.slug as string;
  const game = gameMap[slug];

  if (!game) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl text-white mb-4">Game Not Available Yet</h1>
        <p className="text-[var(--text-muted)] mb-6">
          This game is currently in development. Check back soon!
        </p>
        <Link href="/games" className="text-[var(--accent-blue)]">
          ← Back to Games
        </Link>
      </div>
    );
  }

  const GameComponent = game.component;

  return (
    <GamePlayer title={game.title}>
      <GameComponent />
    </GamePlayer>
  );
}
