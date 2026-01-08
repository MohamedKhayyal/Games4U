"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 px-6 md:px-16 lg:px-24 xl:px-20 py-4
      transition-all duration-300
      ${
        scrolled
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

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/" className="hover:text-sky-400">
            Home
          </Link>

          <Link href="/shop" className="hover:text-sky-400">
            Browse
          </Link>

          <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full">
            <input
              className="bg-transparent outline-none placeholder-slate-400 w-40"
              placeholder="Search games"
            />
          </div>

          <Link href="/cart" className="relative hover:text-white">
            <CartIcon />
            <Badge />
          </Link>

          <Link
            href="/auth/login"
            className="px-6 py-2 border border-sky-400 hover:bg-sky-400 transition rounded-full text-sm"
          >
            Login
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-4 sm:hidden">
          <Link href="/cart" className="relative hover:text-sky-400">
            <CartIcon />
            <Badge />
          </Link>

          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="22" height="16" viewBox="0 0 21 15" fill="none">
              <rect width="21" height="2" rx="1" fill="#e5e7eb" />
              <rect y="6" width="21" height="2" rx="1" fill="#e5e7eb" />
              <rect y="12" width="21" height="2" rx="1" fill="#e5e7eb" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 bg-slate-900/90 backdrop-blur px-6 py-4 rounded-lg">
          <Link href="/" className="hover:text-sky-400">
            Home
          </Link>
          <Link href="/shop" className="hover:text-sky-400">
            Browse
          </Link>
          <Link
            href="/auth/login"
            className="mt-2 text-center bg-sky-500 py-2 rounded-full hover:bg-sky-400"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

/* Icons */
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
      <path
        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Badge() {
  return (
    <span className="absolute -top-2 -right-2 text-xs bg-sky-500 w-5 h-5 flex items-center justify-center rounded-full">
      3
    </span>
  );
}
