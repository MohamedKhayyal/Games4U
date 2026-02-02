import GameDetailsClient from "@/components/games/GameDetailsClient";
import { notFound } from "next/navigation";

async function getGame(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.data?.game || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params; 

  const game = await getGame(slug);

  if (!game) {
    return {
      title: "Game not found | Games4U",
    };
  }

  return {
    title: `${game.name} | Games4U`,
    description: game.description?.slice(0, 160),
  };
}

export default async function GameDetailsPage({ params }) {
  const { slug } = await params;

  const game = await getGame(slug);

  if (!game) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <GameDetailsClient game={game} />
    </div>
  );
}
