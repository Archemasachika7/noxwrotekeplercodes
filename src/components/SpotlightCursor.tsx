"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function SpotlightCursor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      style={{
        background: "rgba(88,166,255,0.03)",
      }}
    />
  );
}
