import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/Providers/SmoothScroll";
import { AuthProvider } from "@/Providers/AuthProvider";
import { CartProvider } from "@/Providers/CartProvider";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Games4U",
  description: "Game Store",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <AuthProvider>
          <CartProvider>
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
