"use client";

import { createContext, useContext, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/users/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
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
        logout: async () => {
          await fetch(`${API}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
