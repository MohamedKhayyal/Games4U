import GamesClient from "@/components/games/GamesClient";

export const metadata = {
  title: "Games Store | Games4U",
  description:
    "Browse and buy the best PlayStation and console games at the best prices on Games4U.",
  openGraph: {
    title: "Games Store | Games4U",
    description:
      "Browse and buy the best PlayStation and console games at the best prices on Games4U.",
  },
};

export default function GamesPage() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 text-white">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8">
        Games Store
      </h1>

      <GamesClient />
    </div>
  );
}
