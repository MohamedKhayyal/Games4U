import Link from "next/link";
import { Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="w-32 h-16 mb-3">
            <img
              src="/images/logo.jpeg"
              alt="Games4U Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            Your trusted store for games, consoles, and gaming accessories. Best
            prices, original products, and fast support.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-sky-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop/games" className="hover:text-sky-400">
                Games
              </Link>
            </li>
            <li>
              <Link href="/shop/devices" className="hover:text-sky-400">
                Devices
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>مدينة نصر – السراج مول</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>0100 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@games4u.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Facebook size={16} />
              <Link
                href="https://www.facebook.com/profile.php?id=100064743069105"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400"
              >
                Facebook Page
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Our Location</h4>

          <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-800 mb-3">
            <iframe
              src="https://www.google.com/maps?q=30.050871019897244,31.34882117211757&hl=ar&z=16&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Games4U. All rights reserved.
      </div>
    </footer>
  );
}
