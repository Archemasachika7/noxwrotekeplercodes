"use client";

/**
 * InteractiveCodeEditor — A competitive-programming-style split-pane
 * interface: problem description on the left, Monaco Editor on the right,
 * with execution metrics (time, memory) displayed after running.
 */

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play,
  Terminal,
  X,
  RotateCcw,
  Loader2,
  Clock,
  Cpu,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { FadeIn } from "./MotionWrappers";
import dynamic from "next/dynamic";

/* ------------------------------------------------------------------ */
/*  Dynamic import for Monaco (client only, no SSR)                    */
/* ------------------------------------------------------------------ */

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#0D1117] text-[#8b949e] text-sm font-mono">
      Loading editor…
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/*  Problem description & default code                                 */
/* ------------------------------------------------------------------ */

const problemTitle = "Implement a Linear Regression Model";
const problemDifficulty = "Medium";
const problemDescription = `Given a set of data points, implement a simple linear regression model using NumPy and scikit-learn.

**Requirements:**
1. Create a function \`train_model(X, y)\` that accepts feature matrix X and target vector y
2. Fit a \`LinearRegression\` model to the data
3. Return the trained model and its R² score
4. Generate sample data and print the model's prediction for X=6

**Expected Output:**
\`\`\`
Model trained successfully!
R² Score: 0.6552
Prediction for X=6: 5.40
\`\`\``;

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-500",
  Medium: "bg-yellow-500/20 text-yellow-500",
  Hard: "bg-red-500/20 text-red-500",
};

const problemConstraints = [
  "Use NumPy for data generation",
  "Use scikit-learn LinearRegression",
  "Print results with 4 decimal places for R²",
  "Print results with 2 decimal places for predictions",
];

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
/*  Mock execution metrics                                             */
/* ------------------------------------------------------------------ */

const mockMetrics = {
  executionTime: "12ms",
  memory: "4.2MB",
  status: "Accepted",
};

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
  const [showMetrics, setShowMetrics] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /** Handle "Run" button click. */
  const handleRun = useCallback(() => {
    if (drawerState === "compiling") return;
    setShowMetrics(false);
    setDrawerState("compiling");

    setTimeout(() => {
      setDrawerState("success");
      setShowMetrics(true);
    }, 1500);
  }, [drawerState]);

  /** Close the terminal drawer. */
  const handleClose = () => {
    setDrawerState("hidden");
    setShowMetrics(false);
  };

  /** Reset editor to defaults. */
  const handleReset = () => {
    setCode(defaultCode);
    setDrawerState("hidden");
    setShowMetrics(false);
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
              A competitive-programming-style environment. Read the problem,
              write your solution, and hit{" "}
              <kbd className="px-1.5 py-0.5 text-xs rounded border border-[var(--border)] bg-[var(--muted)] font-mono text-[#8b949e]">
                Run
              </kbd>{" "}
              to see execution metrics.
            </p>
          </div>
        </FadeIn>

        {/* ── Split-pane editor card ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--card)]">
            {/* ── Title bar ────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[#121314]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[#8b949e] font-mono">
                  playground.py
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[#8b949e]"
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

            {/* ── Split pane: problem + editor ─────────────── */}
            <div className="flex flex-col lg:flex-row">
              {/* Left pane — Problem description */}
              <div className="lg:w-[40%] border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--card)] overflow-y-auto">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-[var(--primary)]" />
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      {problemTitle}
                    </h3>
                  </div>
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${difficultyColors[problemDifficulty] ?? "bg-yellow-500/20 text-yellow-500"} mb-4`}>
                    {problemDifficulty}
                  </span>
                  <div className="text-xs text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line mb-4">
                    {problemDescription}
                  </div>
                  <div className="border-t border-[var(--border)] pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                      Constraints
                    </p>
                    <ul className="space-y-1.5">
                      {problemConstraints.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--primary)] mt-1.5 flex-shrink-0" />
                          <span className="font-mono text-[#8b949e]">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right pane — Monaco Editor */}
              <div className="lg:w-[60%] min-h-[350px]">
                <MonacoEditor
                  height="350px"
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
            </div>

            {/* ── Execution Metrics Bar ───────────────────── */}
            <AnimatePresence>
              {showMetrics && (
                <motion.div
                  key="metrics-bar"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-[var(--border)]"
                >
                  <div className="flex flex-wrap items-center gap-4 px-4 py-2.5 bg-[#121314]">
                    <div className="flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--secondary)]" />
                      <span className="font-semibold text-[var(--secondary)]">
                        {mockMetrics.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
                      Execution Time:{" "}
                      <span className="text-[var(--foreground)]">
                        {mockMetrics.executionTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] font-mono">
                      <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" />
                      Memory:{" "}
                      <span className="text-[var(--foreground)]">
                        {mockMetrics.memory}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[#121314]">
                    <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                      <Terminal className="w-3.5 h-3.5" />
                      Terminal Output
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-1 rounded-md hover:bg-[var(--muted)] transition-colors text-[#8b949e]"
                      title="Close terminal"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Drawer body */}
                  <div className="p-4 bg-[#08090A] font-mono text-xs leading-5 min-h-[100px] text-[#8b949e]">
                    {drawerState === "compiling" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-[#8b949e]"
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
