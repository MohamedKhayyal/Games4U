"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();
  const scrollPositions = useRef({});

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const onScroll = ({ scroll }) => {
      scrollPositions.current[pathname] = scroll;
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const savedPosition = scrollPositions.current[pathname];

    if (savedPosition !== undefined) {
      lenis.scrollTo(savedPosition, { immediate: true });
    } else {
      lenis.scrollTo(0, { immediate: false });
    }
  }, [pathname]);

  return children;
}
