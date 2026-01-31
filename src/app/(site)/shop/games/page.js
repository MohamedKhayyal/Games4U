import GamesClient from "@/components/games/GamesClient";
import GamesSkeleton from "@/components/skeletons/GamesSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Games Store | Games4U",
  description: "Browse the best games at the best prices.",
};

async function GamesData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data?.games || [];
}

export default async function GamesPage() {
  const games = await GamesData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Games Store</h1>

      <Suspense fallback={<GamesSkeleton />}>
      <GamesClient initialGames={games} />
      </Suspense>
    </div>
  );
}
