"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Step data                                                           */
/* ------------------------------------------------------------------ */

const tracks = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    icon: "🧠",
    description: "Neural networks, NLP, computer vision, and more.",
  },
  {
    id: "fullstack",
    label: "Full Stack Engineering",
    icon: "🚀",
    description: "Build production-grade web apps end to end.",
  },
  {
    id: "dsa",
    label: "DSA & Competitive Programming",
    icon: "⚡",
    description: "Master algorithms, data structures, and problem solving.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    icon: "🔐",
    description: "Ethical hacking, network security, and penetration testing.",
  },
];

const themes = [
  { id: "dark", label: "Dark Mode", icon: "🌙" },
  { id: "light", label: "Light Mode", icon: "☀️" },
];

const editors = [
  { id: "vscode", label: "VS Code", icon: "💻" },
  { id: "neovim", label: "Neovim", icon: "⌨️" },
  { id: "jetbrains", label: "JetBrains", icon: "🔧" },
  { id: "other", label: "Other", icon: "🛠️" },
];

/* ------------------------------------------------------------------ */
/*  Onboarding Page                                                     */
/* ------------------------------------------------------------------ */

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("dark");
  const [selectedEditor, setSelectedEditor] = useState<string | null>(null);

  const canProceed =
    (step === 1 && selectedTrack) ||
    (step === 2 && selectedEditor) ||
    step === 3;

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-10"
      >
        <Code2 className="w-7 h-7 text-blue-400" />
        <span className="text-lg font-bold tracking-tight text-white">
          KEPLER <span className="text-blue-400">CODES</span>
        </span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-zinc-800">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: step >= s ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-zinc-600 font-mono">Choose Track</span>
          <span className="text-[10px] text-zinc-600 font-mono">Environment</span>
          <span className="text-[10px] text-zinc-600 font-mono">Launch</span>
        </div>
      </div>

      {/* Step content */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-1">
                Choose Your Track
              </h2>
              <p className="text-sm text-zinc-500 mb-6">
                Select your primary learning path. You can always explore other
                tracks later.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {tracks.map((track) => (
                  <motion.button
                    key={track.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      selectedTrack === track.id
                        ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                        : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{track.icon}</span>
                    <div>
                      <span className="text-sm font-semibold text-white">
                        {track.label}
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {track.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-1">
                Setup Your Environment
              </h2>
              <p className="text-sm text-zinc-500 mb-6">
                Customize your learning experience.
              </p>

              {/* Theme preference */}
              <div className="mb-6">
                <label className="text-xs text-zinc-400 font-mono uppercase tracking-wider mb-3 block">
                  Theme Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedTheme === theme.id
                          ? "border-blue-500/50 bg-blue-500/5 text-white"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <span>{theme.icon}</span>
                      {theme.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Editor preference */}
              <div>
                <label className="text-xs text-zinc-400 font-mono uppercase tracking-wider mb-3 block">
                  Editor Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {editors.map((editor) => (
                    <motion.button
                      key={editor.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedEditor(editor.id)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedEditor === editor.id
                          ? "border-blue-500/50 bg-blue-500/5 text-white"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <span>{editor.icon}</span>
                      {editor.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center"
              >
                <span className="text-4xl">🚀</span>
              </motion.div>
              <h2 className="text-xl font-bold text-white mb-2">
                You&apos;re all set!
              </h2>
              <p className="text-sm text-zinc-500 mb-2">
                Your workspace is configured and ready to go.
              </p>
              <p className="text-xs text-zinc-600 font-mono">
                Redirecting to kepler_core — bash&gt; dashboard
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!canProceed}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {step === 3 ? "Launch Dashboard →" : "Continue →"}
          </motion.button>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={() => router.push("/")}
        className="mt-8 text-xs text-zinc-700 hover:text-zinc-500 transition-colors cursor-pointer"
      >
        Skip onboarding
      </button>
    </main>
  );
}
