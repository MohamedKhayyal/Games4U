// "use client";

// import { useAuth } from "@/Providers/AuthProvider";
// import { useRouter } from "next/navigation";
// import AdminSidebar from "@/components/admin/AdminSidebar";

// export default function AdminLayout({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   if (loading) return null;

//   if (!user) {
//     router.replace("/auth/login");
//     return null;
//   }

//   if (user.role !== "admin") {
//     router.replace("/");
//     return null;
//   }

//   return (
//     <div className="flex min-h-screen bg-slate-950 text-white">
//       <AdminSidebar />

//       <main className="flex-1 p-8 overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }

import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      cookie: "",
    },
  });

  if (!res.ok) {
    redirect("/auth/login");
  }

  const data = await res.json();
  const user = data?.data?.user;

  if (user?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
