import GameDetailsClient from "@/components/games/GameDetailsClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/games/${slug}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        title: "Game not found | Games4U",
      };
    }

    const data = await res.json();
    const game = data?.data?.game;

    if (!game) {
      return {
        title: "Game not found | Games4U",
      };
    }

    return {
      title: `${game.name} | Games4U`,
      description: game.description?.slice(0, 160),
      openGraph: {
        title: game.name,
        description: game.description,
        images: [
          {
            url: game.photo,
            width: 800,
            height: 800,
            alt: game.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Games4U",
    };
  }
}

export default async function GameDetailsPage({ params }) {
  const { slug } = await params;

  return <GameDetailsClient slug={slug} />;
}
