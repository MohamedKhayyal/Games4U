"use client";

import { AuthProvider } from "./AuthProvider";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </AuthProvider>
  );
}
