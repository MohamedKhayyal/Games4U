"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#0b1020] text-white">
      
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative">
        <h1 className="text-3xl font-bold mb-8">Create Account</h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="mb-4 px-4 py-3 rounded-md bg-slate-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="mb-4 px-4 py-3 rounded-md bg-slate-800 placeholder-gray-300 outline-none focus:ring-2 focus:ring-sky-400"
        />

        {/* Password */}
        <div className="relative mb-4">
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

        {/* Signup Button */}
        <button className="border border-sky-400 hover:bg-sky-400 hover:text-black transition py-3 rounded-md font-medium mb-6">
          Sign up
        </button>

        {/* Login link */}
        <p className="text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-white font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Right - Image */}
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
