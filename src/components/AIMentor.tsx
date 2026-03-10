"use client";

import { FadeIn } from "./MotionWrappers";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import NeuralBackground from "./NeuralBackground";

export default function AIMentor() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Neural network particle background */}
      <NeuralBackground className="opacity-40" particleCount={60} connectionDistance={100} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)] text-xs font-medium text-[var(--muted-foreground)] mb-6">
                <Sparkles className="w-3 h-3 text-[var(--primary)]" />
                AI-Powered
              </div>
              <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight mb-6">
                Your Personal <span className="text-[var(--primary)]">AI Mentor</span>
              </h2>
              <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                Ask coding questions instantly and get AI guidance. Our AI mentor understands your
                learning context and provides personalized explanations, code reviews, and debugging help.
              </p>
              <ul className="space-y-3 text-sm text-[var(--foreground)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
                  Instant code explanations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
                  Debug assistance 24/7
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
                  Personalized learning suggestions
                </li>
              </ul>

              {/* Ambient data visualization — wireframe truss */}
              <div className="mt-8">
                <svg
                  viewBox="0 0 240 60"
                  className="w-60 h-auto opacity-30"
                  aria-hidden="true"
                >
                  <motion.g
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "120px 30px" }}
                  >
                    {/* Wireframe structural truss lines */}
                    {[
                      [0, 30, 40, 0],
                      [40, 0, 80, 30],
                      [80, 30, 40, 60],
                      [40, 60, 0, 30],
                      [80, 30, 120, 0],
                      [120, 0, 160, 30],
                      [160, 30, 120, 60],
                      [120, 60, 80, 30],
                      [160, 30, 200, 0],
                      [200, 0, 240, 30],
                      [240, 30, 200, 60],
                      [200, 60, 160, 30],
                    ].map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="var(--primary)"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    ))}
                    {/* Nodes */}
                    {[
                      [0, 30], [40, 0], [40, 60], [80, 30],
                      [120, 0], [120, 60], [160, 30],
                      [200, 0], [200, 60], [240, 30],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="2"
                        fill="var(--primary)"
                        opacity="0.6"
                      />
                    ))}
                  </motion.g>
                </svg>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl overflow-hidden shadow-xl"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Kepler AI Mentor</p>
                  <p className="text-xs text-[var(--secondary)]">Online</p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-4 space-y-4 min-h-[280px]">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--muted)] flex items-center justify-center flex-shrink-0 text-xs">
                    You
                  </div>
                  <div className="rounded-lg bg-[var(--muted)] px-3 py-2 text-sm text-[var(--foreground)] max-w-[80%]">
                    How do I implement a binary search tree in Python?
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[var(--primary)]" />
                  </div>
                  <div className="rounded-lg bg-[var(--muted)] px-3 py-2 text-sm text-[var(--foreground)] max-w-[80%]">
                    <p className="mb-2">Great question! Here&apos;s a clean BST implementation:</p>
                    <div className="bg-[var(--background)] rounded-md p-2 font-mono text-xs text-[#8b949e]">
                      <div><span className="text-[var(--primary)]">class</span> <span className="text-[var(--primary)]">Node</span>:</div>
                      <div className="pl-4">
                        <span className="text-[var(--primary)]">def</span> __init__(self, val):
                      </div>
                      <div className="pl-8">self.val = val</div>
                      <div className="pl-8">self.left = <span className="text-[var(--primary)]">None</span></div>
                      <div className="pl-8">self.right = <span className="text-[var(--primary)]">None</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2">
                  <input
                    type="text"
                    placeholder="Ask your coding question..."
                    className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none"
                    readOnly
                  />
                  <button className="w-8 h-8 rounded-md bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)]">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
