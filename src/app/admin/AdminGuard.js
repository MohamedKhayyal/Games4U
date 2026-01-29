"use client";

import { useEffect } from "react";
import { useAuth } from "@/Providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (user.role !== "admin") {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Checking admin permissions...
      </div>
    );
  }

  return children;
}
