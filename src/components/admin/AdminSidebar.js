"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gamepad2,
  Monitor,
  ShoppingCart,
  Users,
  Tag,
  FileText,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/games", label: "Games", icon: Gamepad2 },
  { href: "/admin/devices", label: "Devices", icon: Monitor },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/offers", label: "Offers", icon: Tag },
  { href: "/admin/logs", label: "Logs", icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5">
      <h1 className="text-xl font-bold mb-8 text-sky-400">Games4U Dashboard</h1>

      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                ${
                  active
                    ? "bg-sky-500 text-black"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
