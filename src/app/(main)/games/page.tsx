import Image from "next/image";
import Link from "next/link";

const games = [
  {
    id: 1,
    title: "Jump Me In",
    description: "A fast-paced platformer.",
    link: "/games/jumpMeIn",
    image: "/assets/images/games/platform.jpeg",
  },
  {
    id: 2,
    title: "Solve Me",
    description: "An exciting puzzle adventure.",
    link: "/games/solveMe",
    image: "/assets/images/games/puzzle.jpeg",
  },
  {
    id: 3,
    title: "Karate Boy",
    description: "Test your reflexes in this arcade-style game.",
    link: "/games/karateBoy",
    image: "/assets/images/games/karate.jpeg",
  },
  {
    id: 4,
    title: "Build Out",
    description: "A relaxing sandbox builder.",
    link: "/games/buildOut",
    image: "/assets/images/games/sandbox.jpeg",
  },
  {
    id: 5,
    title: "Haunted Villa",
    description: "A mysterious horror exploration game.",
    link: "/games/hauntedVilla",
    image: "/assets/images/games/haunted.jpeg",
  },
  {
    id: 6,
    title: "Deck Me",
    description: "Card Games.",
    link: "/games/deckMe",
    image: "/assets/images/games/card.jpeg",
  },
  {
    id: 7,
    title: "Counter Me",
    description: "A 2D shooter with RPG elements.",
    link: "/games/counterMe",
    image: "/assets/images/games/shoot.jpeg",
  },
  {
    id: 8,
    title: "Epoch",
    description: "Strategy game with historical settings.",
    link: "/games/epoch",
    image: "/assets/images/games/strategy.jpeg",
  },
  {
    id: 9,
    title: "Life must go on",
    description: "Survival and crafting in space.",
    link: "/games/lifeMustGoOn",
    image: "/assets/images/games/survival.jpeg",
  },
  {
    id: 10,
    title: "Fast and Blast",
    description: "Fast-paced racing challenge.",
    link: "/games/fastAndBlast",
    image: "/assets/images/games/racing.jpeg",
  },
];

export default function GameShowcasePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={game.link}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white dark:bg-zinc-900"
          >
            <div>
              <Image
                src={game.image}
                alt={game.title}
                width={400}
                height={225}
                className="rounded-md object-cover w-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {game.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
