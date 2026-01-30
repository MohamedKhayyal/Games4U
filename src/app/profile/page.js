"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/Providers/AuthProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Image from "next/image";
import { User } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, refetchUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
      setPreview(user.photo || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (photo) formData.append("photo", photo);

      const res = await fetch("/api/users/me", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await refetchUser();
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto py-16 px-6 text-white">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="text-sky-400">{user.name}</span>
        </h1>
        <p className="text-slate-400 mt-2">Manage your profile information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          {getImageUrl(preview) ? (
            <Image
              src={getImageUrl(preview)}
              width={112}
              height={112}
              alt="Profile Photo"
              className="w-28 h-28 rounded-full object-cover border-2 border-sky-500"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-2 border-sky-500 flex items-center justify-center bg-slate-800">
              <User className="w-10 h-10 text-sky-400" />
            </div>
          )}

          <label className="cursor-pointer text-sm text-sky-400 hover:underline">
            Change photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block mb-1 text-sm text-slate-300">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {message && (
          <p className="text-sm text-center text-sky-400">{message}</p>
        )}

        <button
          disabled={loading}
          className="w-full py-3 bg-sky-500 hover:bg-sky-400 rounded font-medium transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
