import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminGuard from "./AdminGuard";
import Providers from "@/Providers/Providers";

export default function AdminLayout({ children }) {
  return (
    <Providers>
      <AdminGuard>
        <div className="flex min-h-screen bg-slate-950 text-white">
          <AdminSidebar />

          <div className="flex-1 flex flex-col">
            <AdminNavbar />

            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </AdminGuard>
    </Providers>
  );
}
