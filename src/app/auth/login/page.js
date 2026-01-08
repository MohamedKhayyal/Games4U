"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#0b1020] text-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative">
        <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>

        <input
          type="email"
          placeholder="Email Address"
          className="mb-4 px-4 py-3 rounded-md bg-slate-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400"
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-slate-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button className="border border-sky-400 hover:bg-sky-400 transition py-3 rounded-md font-medium mb-6">
          Log in
        </button>

        <p className="text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signUp"
            className="text-white font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="hidden lg:block w-1/2 relative">
        <img
          src="/images/auth.jpg"
          alt="Game background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
