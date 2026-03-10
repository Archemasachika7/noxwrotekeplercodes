import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "var(--font-geist-mono)", "monospace"],
        manrope: ["Manrope", "sans-serif"],
      },
      animation: {
        "scroll-left": "scroll-left 30s linear infinite",
        "fade-in": "fade-in 1.0s ease-out forwards",
        "slide-up": "slide-up 1.0s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "reveal-slow": "reveal-slow 1.4s ease-out forwards",
        "scale-in": "scale-in 1.0s ease-out forwards",
        "blob-1": "blob-1 20s ease-in-out infinite",
        "blob-2": "blob-2 25s ease-in-out infinite",
        "blob-3": "blob-3 22s ease-in-out infinite",
        "blob-4": "blob-4 18s ease-in-out infinite",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "reveal-slow": {
          "0%": { opacity: "0", transform: "translateY(40px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "blob-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(40px, -60px) scale(1.1)" },
          "50%": { transform: "translate(-30px, 40px) scale(0.95)" },
          "75%": { transform: "translate(50px, 20px) scale(1.05)" },
        },
        "blob-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(-50px, 30px) scale(1.05)" },
          "50%": { transform: "translate(40px, -50px) scale(1.1)" },
          "75%": { transform: "translate(-20px, -30px) scale(0.95)" },
        },
        "blob-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-40px, 30px) scale(0.92)" },
        },
        "blob-4": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-60px, 20px) scale(1.1)" },
          "66%": { transform: "translate(30px, -50px) scale(0.9)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
