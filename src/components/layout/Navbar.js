"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/Providers/AuthProvider";
import { useCart } from "@/Providers/CartProvider";
import { ShoppingCart, User } from "lucide-react";
import { getImageUrl } from "../lib/imageHelper";

export default function Navbar() {
  const { user, loading, refetchUser } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Logout */
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    refetchUser();
    window.location.href = "/";
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-6 md:px-16 lg:px-24 xl:px-20 py-4
      transition-all duration-300
      ${scrolled
          ? "bg-slate-900/70 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
        }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-900/80 flex items-center justify-center">
            <img
              src="/images/logo.jpeg"
              alt="Games4U Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/" className="hover:text-sky-400">Home</Link>
          <Link href="/shop" className="hover:text-sky-400">Games</Link>
          <Link href="/shop" className="hover:text-sky-400">Devices</Link>

          <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full">
            <input
              className="bg-transparent outline-none placeholder-slate-400 w-40"
              placeholder="Search games"
            />
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative hover:text-white">
            <ShoppingCart className="w-5 h-5" />
            <Badge count={count} />
          </Link>

          {/* Auth */}
          {!loading && !user ? (
            <Link
              href="/auth/login"
              className="px-6 py-2 border border-sky-400 hover:bg-sky-400 transition rounded-full text-sm"
            >
              Login
            </Link>
          ) : (
            user && (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdown(!dropdown)}>
                  {user.photo ? (
                    <img
                      src={getImageUrl(user.photo)}
                      width={40}
                      height={40}
                      alt="User"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon />
                  )}
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-3 w-44 bg-slate-900 rounded-xl shadow-lg overflow-hidden">
                    <Link
                      href="/profile"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-3 hover:bg-slate-800"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-3 hover:bg-slate-800"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 hover:bg-red-500/20 text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 sm:hidden">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <Badge count={count} />
          </Link>

          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="22" height="16" viewBox="0 0 21 15">
              <rect width="21" height="2" rx="1" fill="#e5e7eb" />
              <rect y="6" width="21" height="2" rx="1" fill="#e5e7eb" />
              <rect y="12" width="21" height="2" rx="1" fill="#e5e7eb" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -top-2 -right-2 text-xs bg-sky-500 w-5 h-5 flex items-center justify-center rounded-full">
      {count}
    </span>
  );
}

function UserIcon() {
  return (
    <div className="w-10 h-10 rounded-full border border-sky-400 flex items-center justify-center">
      <User className="w-5 h-5" />
    </div>
  );
}
