import GameDetailsClient from "@/components/games/GameDetailsClient";

async function getGame(slug) {
  const res = await fetch(
    `${process.env.API_URL}/api/games/${slug}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.game;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const game = await getGame(slug);

  if (!game) {
    return { title: "Game not found | Games4U" };
  }

  return {
    title: `${game.name} | Games4U`,
    description: game.description?.slice(0, 160),
  };
}

export default async function GameDetailsPage({ params }) {
  const { slug } = await params;

  const game = await getGame(slug);

  if (!game) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-white">
        <h1 className="text-3xl font-bold mb-8">Game Not Found</h1>
        <p>The game you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <GameDetailsClient game={game} />
    </div>
  );
}

