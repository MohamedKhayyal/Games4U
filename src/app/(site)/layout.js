import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/Providers/Providers";
import { CartProvider } from "@/Providers/CartProvider";

export default function SiteLayout({ children }) {
  return (
    <Providers>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </CartProvider>
    </Providers>
  );
}
