import GameDetailsClient from "@/components/games/GameDetailsClient";

export default async function GameDetailsPage({ params }) {
  const { slug } = await params;
  return <GameDetailsClient slug={slug} />;
}
