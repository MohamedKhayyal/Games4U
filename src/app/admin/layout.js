// app/admin/layout.js
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "./AdminGuard";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </AdminGuard>
  );
}
