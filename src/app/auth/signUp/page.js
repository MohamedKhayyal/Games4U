"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";
import { useCart } from "@/Providers/CartProvider";

export default function SignupPage() {
  const router = useRouter();
  const { user, loading, refetchUser } = useAuth();
  const { refetchCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || user) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      await refetchUser();
      await refetchCart();

      router.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b1020] text-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24">
        <h1 className="text-3xl font-bold mb-8">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="mb-4 px-4 py-3 w-full rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="mb-4 px-4 py-3 w-full rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-slate-800 outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <button
            disabled={submitting}
            className="border border-sky-400 hover:bg-sky-400 hover:text-black transition py-3 w-full rounded-md font-medium mb-6"
          >
            {submitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium hover:underline">
            Log in
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
