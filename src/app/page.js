import HomeClient from "@/components/home/HomeClient";

export const metadata = {
  title: {
    default: "Games4U | Buy Console Games Online",
    template: "%s | Games4U",
  },

  description:
    "Games4U is your ultimate online console game store. Buy PlayStation and Xbox games with great deals and instant access.",

  keywords: [
    "games store",
    "buy games online",
    "console games",
    "PlayStation games",
    "Xbox games",
    "Games4U",
  ],

  alternates: {
    canonical: "https://games4u.com",
  },

  openGraph: {
    title: "Games4U | Buy Console Games Online",
    description:
      "Discover top PlayStation and Xbox console games at Games4U. Best prices and instant delivery.",
    siteName: "Games4U",
    locale: "en_US",
    type: "website",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "Games4U Console Game Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Games4U | Buy Console Games Online",
    description:
      "Shop the latest PlayStation and Xbox games with instant access.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <HomeClient />;
}
