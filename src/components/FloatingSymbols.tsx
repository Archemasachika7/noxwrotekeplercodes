"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

const symbols = [
  "{ }",
  "<>",
  "</>",
  "function()",
  "console.log()",
  "SELECT *",
  "import",
  "=>",
  "async",
  "await",
  "npm run",
  "git push",
  "python",
  "class",
  "return",
  "0x",
  "//",
  "&&",
  "||",
  "===",
];

interface FloatingItem {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
}

export default function FloatingSymbols() {
  const { resolvedTheme } = useTheme();
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const itemsRef = useRef<FloatingItem[]>([]);

  useEffect(() => {
    setMounted(true);
    const generated: FloatingItem[] = symbols.slice(0, 15).map((text, i) => ({
      id: i,
      text,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 4,
      speed: 0.02 + Math.random() * 0.03,
      opacity: 0.06 + Math.random() * 0.08,
      rotation: Math.random() * 30 - 15,
    }));
    setItems(generated);
    itemsRef.current = generated;
  }, []);

  useEffect(() => {
    if (resolvedTheme !== "dark" || !mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          y: item.y - item.speed * delta * 20 < -5
            ? 105
            : item.y - item.speed * delta * 20,
          rotation:
            item.rotation + Math.sin(time / 3000 + item.id) * 0.02,
        }))
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resolvedTheme, mounted]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => {
        const parallaxX = (mouseRef.current.x - 0.5) * 10;
        const parallaxY = (mouseRef.current.y - 0.5) * 10;

        return (
          <div
            key={item.id}
            className="absolute font-mono text-[var(--primary)] select-none whitespace-nowrap"
            style={{
              left: `${item.x + parallaxX * (item.speed * 10)}%`,
              top: `${item.y + parallaxY * (item.speed * 10)}%`,
              fontSize: `${item.size}px`,
              opacity: item.opacity,
              transform: `rotate(${item.rotation}deg)`,
              transition: "left 0.3s ease-out, top 0.1s linear",
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}
