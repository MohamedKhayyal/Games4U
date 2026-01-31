"use client";

import { useRouter, usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/Providers/AuthProvider";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const pageTitle = pathname
    .replace("/admin/", "")
    .replace("-", " ")
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      {/* Left */}
      <h2 className="text-lg font-semibold text-white">
        {pageTitle || "DASHBOARD"}
      </h2>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-300">
          <User size={18} />
          <span className="text-sm font-medium">{user?.name || "Admin"}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
