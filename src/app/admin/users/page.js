"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/Providers/AuthProvider";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const { user: currentUser } = useAuth();
  const currentUserId = currentUser?._id;

  useEffect(() => {
    fetch("/api/users", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setUsers(d.data.users || []))
      .finally(() => setLoading(false));
  }, []);

  const toggleAdmin = async (id) => {
    setUpdating(id);

    try {
      const res = await fetch(`/api/users/${id}/toggle-admin`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update role");
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: data.data.role } : u)),
      );
    } catch (err) {
      alert(err.message || "Failed to update user role");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading users...</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        u.role === "admin"
                          ? "bg-yellow-400 text-black"
                          : "bg-slate-700 text-slate-300"
                      }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    disabled={updating === u._id || u._id === currentUserId}
                    onClick={() => toggleAdmin(u._id)}
                    className={`px-4 py-1 rounded-full text-xs font-semibold transition
    ${
      u.role === "admin"
        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
        : "bg-sky-500/20 text-sky-400 hover:bg-sky-500/30"
    }
    ${u._id === currentUserId ? "opacity-40 cursor-not-allowed" : ""}
  `}
                  >
                    {u._id === currentUserId
                      ? "You"
                      : updating === u._id
                        ? "Updating..."
                        : u.role === "admin"
                          ? "Remove Admin"
                          : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
