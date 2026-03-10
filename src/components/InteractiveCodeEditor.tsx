"use client";

/**
 * InteractiveCodeEditor — A UI block featuring Monaco Editor with a
 * "Terminal Output Drawer" that slides up when the "Run" button is
 * clicked, showing a compilation loading state before revealing a
 * green success output.
 *
 * Uses @monaco-editor/react for the editor and Framer Motion for
 * the drawer slide-up and loading animations.
 */

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Terminal, X, RotateCcw, Loader2 } from "lucide-react";
import { FadeIn } from "./MotionWrappers";
import dynamic from "next/dynamic";

/* ------------------------------------------------------------------ */
/*  Dynamic import for Monaco (client only, no SSR)                    */
/* ------------------------------------------------------------------ */

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[300px] bg-[#0D1117] text-[var(--muted-foreground)] text-sm font-mono">
      Loading editor…
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/*  Default code & mock output                                         */
/* ------------------------------------------------------------------ */

const defaultCode = `# Kepler Codes — Interactive Playground
import numpy as np
from sklearn.linear_model import LinearRegression

def train_model(X, y):
    """Train a simple linear regression model."""
    model = LinearRegression()
    model.fit(X, y)
    score = model.score(X, y)
    return model, score

# Generate sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

model, accuracy = train_model(X, y)
print(f"Model trained successfully!")
print(f"R² Score: {accuracy:.4f}")
print(f"Prediction for X=6: {model.predict([[6]])[0]:.2f}")
`;

const mockOutput = `$ python playground.py
Model trained successfully!
R² Score: 0.6552
Prediction for X=6: 5.40

Process exited with code 0`;

/* ------------------------------------------------------------------ */
/*  Terminal drawer states                                             */
/* ------------------------------------------------------------------ */

type DrawerState = "hidden" | "compiling" | "success";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InteractiveCodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const [drawerState, setDrawerState] = useState<DrawerState>("hidden");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /** Handle "Run" button click. */
  const handleRun = useCallback(() => {
    if (drawerState === "compiling") return; // prevent double-clicks

    setDrawerState("compiling");

    /* Simulate compilation delay (1.5 s) then reveal output. */
    setTimeout(() => {
      setDrawerState("success");
    }, 1500);
  }, [drawerState]);

  /** Close the terminal drawer. */
  const handleClose = () => setDrawerState("hidden");

  /** Reset editor to defaults. */
  const handleReset = () => {
    setCode(defaultCode);
    setDrawerState("hidden");
  };

  return (
    <section ref={sectionRef} id="interactive-editor" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ───────────────────────────────── */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Live Playground
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Write &amp; Run{" "}
              <span className="text-[var(--primary)]">Code</span> Instantly
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Our built-in editor lets you experiment in real time. Hit{" "}
              <kbd className="px-1.5 py-0.5 text-xs rounded border border-[var(--border)] bg-[var(--muted)] font-mono">
                Run
              </kbd>{" "}
              to see it in action.
            </p>
          </div>
        </FadeIn>

        {/* ── Editor card ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[var(--card)]">
            {/* ── Title bar ────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[#161B22]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[var(--muted-foreground)] font-mono">
                  playground.py
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleRun}
                  disabled={drawerState === "compiling"}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--secondary)] text-white text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {drawerState === "compiling" ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Compiling…
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      Run
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── Monaco Editor ─────────────────────────────── */}
            <div className="min-h-[300px]">
              <MonacoEditor
                height="300px"
                language="python"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val ?? "")}
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  renderLineHighlight: "gutter",
                  padding: { top: 16, bottom: 16 },
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                  },
                }}
              />
            </div>

            {/* ── Terminal Output Drawer ─────────────────────── */}
            <AnimatePresence>
              {drawerState !== "hidden" && (
                <motion.div
                  key="terminal-drawer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-[var(--border)]"
                >
                  {/* Drawer header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[#161B22]">
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <Terminal className="w-3.5 h-3.5" />
                      Terminal Output
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-1 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]"
                      title="Close terminal"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Drawer body */}
                  <div className="p-4 bg-[#0D1117] font-mono text-xs leading-5 min-h-[100px]">
                    {drawerState === "compiling" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-[var(--muted-foreground)]"
                      >
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
                        Compiling…
                      </motion.div>
                    )}

                    {drawerState === "success" && (
                      <motion.pre
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#2EA043] whitespace-pre-wrap"
                      >
                        {mockOutput}
                      </motion.pre>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
