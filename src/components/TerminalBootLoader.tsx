"use client";

/**
 * TerminalBootLoader — Full-screen entry animation that mimics a terminal
 * booting up before fading out to reveal the main site.
 *
 * Uses Framer Motion for sequenced line reveals, a blinking cursor, and
 * the final fade-out transition. Renders nothing once the animation is
 * complete so it doesn't block interaction with the page beneath.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Boot sequence configuration                                        */
/* ------------------------------------------------------------------ */

/** Each line in the simulated terminal boot sequence. */
interface BootLine {
  /** The text to display (supports a prefix like "> "). */
  text: string;
  /** Status tag appended after the line (e.g. "[OK]"). */
  status?: string;
  /** Color class for the status tag. */
  statusColor?: string;
  /** Milliseconds to wait before showing this line. */
  delay: number;
}

const bootSequence: BootLine[] = [
  {
    text: "> initializing Kepler_Core...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 400,
  },
  {
    text: "> loading neural_engine v3.2.1...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 500,
  },
  {
    text: "> compiling curriculum_modules...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 600,
  },
  {
    text: "> connecting to mentor_network...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 450,
  },
  {
    text: "> establishing secure_link...",
    status: "[OK]",
    statusColor: "text-[#2EA043]",
    delay: 350,
  },
  {
    text: "> system ready.",
    status: "[LAUNCH]",
    statusColor: "text-[#58A6FF]",
    delay: 600,
  },
];

/** How long (ms) to keep the completed screen before fading out. */
const HOLD_AFTER_COMPLETE = 600;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TerminalBootLoader() {
  /** Lines that have been "typed" so far. */
  const [visibleLines, setVisibleLines] = useState<number>(0);
  /** True while boot is still playing. */
  const [isBooting, setIsBooting] = useState(true);
  /** True once the component should be removed from the DOM. */
  const [isDone, setIsDone] = useState(false);

  /** Run the boot sequence on mount. */
  const runBoot = useCallback(() => {
    let cumulativeDelay = 300; // initial pause before first line

    bootSequence.forEach((line, index) => {
      cumulativeDelay += line.delay;

      setTimeout(() => {
        setVisibleLines(index + 1);
      }, cumulativeDelay);
    });

    /* After all lines have been displayed, hold briefly then fade out. */
    cumulativeDelay += HOLD_AFTER_COMPLETE;
    setTimeout(() => setIsBooting(false), cumulativeDelay);
  }, []);

  useEffect(() => {
    runBoot();
  }, [runBoot]);

  /** Once the exit animation finishes, mark as done to un-mount. */
  const handleExitComplete = () => setIsDone(true);

  /* After the animation is fully done, render nothing. */
  if (isDone) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isBooting && (
        <motion.div
          key="terminal-boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0D1117]"
        >
          {/* Terminal window ──────────────────────────────────── */}
          <div className="w-full max-w-2xl mx-4">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] rounded-t-xl border border-white/10 border-b-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-[#8B949E] font-mono">
                kepler_core — bash
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0D1117] border border-white/10 border-t-0 rounded-b-xl p-6 font-mono text-sm min-h-[260px]">
              {/* Rendered boot lines */}
              {bootSequence.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-2 mb-1.5 leading-6"
                >
                  <span className="text-[#E6EDF3]">{line.text}</span>
                  {line.status && (
                    <span className={`${line.statusColor ?? "text-[#8B949E]"}`}>
                      {line.status}
                    </span>
                  )}
                </motion.div>
              ))}

              {/* Blinking cursor on the "current" line */}
              {visibleLines < bootSequence.length && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#8B949E]">&gt;</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.6,
                    }}
                    className="inline-block w-2 h-4 bg-[#58A6FF]"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
