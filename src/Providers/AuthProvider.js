"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  let refreshing = false;

  const fetchUser = async () => {
    try {
      let res = await fetch("/api/users/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401 && !refreshing) {
        refreshing = true;

        const refreshRes = await fetch("/api/auth/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        refreshing = false;

        if (!refreshRes.ok) throw new Error("Session expired");

        res = await fetch("/api/users/me", {
          credentials: "include",
          cache: "no-store",
        });
      }

      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();
      setUser(data.data.user);
      return data.data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refetchUser: fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
