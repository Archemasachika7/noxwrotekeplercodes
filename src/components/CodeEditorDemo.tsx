"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Terminal, RotateCcw } from "lucide-react";
import { FadeIn } from "./MotionWrappers";

const codeLines = [
  { text: "def train_model(data):", color: "keyword" },
  { text: "    model = LinearRegression()", color: "default" },
  { text: "    model.fit(data)", color: "default" },
  { text: "    return model", color: "keyword" },
];

const mockOutput = `Model Training successfully.
Accuracy: 92%`;

function syntaxHighlight(text: string) {
  if (text.trimStart().startsWith("#")) {
    return [{ text, className: "text-[var(--muted-foreground)] italic" }];
  }

  if (text.includes('"""') || text.includes("'''")) {
    return [{ text, className: "text-[var(--secondary)]" }];
  }

  // Simple token-based highlighting
  let i = 0;
  let current = "";
  const chars = text.split("");
  const result: { text: string; className: string }[] = [];

  while (i < chars.length) {
    // Check for string
    if (chars[i] === '"' || chars[i] === "'") {
      if (current) {
        result.push(...highlightTokens(current));
        current = "";
      }
      const quote = chars[i];
      let str = quote;
      i++;
      while (i < chars.length && chars[i] !== quote) {
        str += chars[i];
        i++;
      }
      if (i < chars.length) {
        str += chars[i];
        i++;
      }
      result.push({ text: str, className: "text-[var(--secondary)]" });
      continue;
    }

    // Check for comment
    if (chars[i] === "#") {
      if (current) {
        result.push(...highlightTokens(current));
        current = "";
      }
      result.push({
        text: text.slice(i),
        className: "text-[var(--muted-foreground)] italic",
      });
      break;
    }

    current += chars[i];
    i++;
  }

  if (current) {
    result.push(...highlightTokens(current));
  }

  return result.length > 0 ? result : [{ text, className: "text-[var(--foreground)]" }];
}

function highlightTokens(text: string) {
  const keywords = new Set([
    "def", "return", "import", "from", "class", "if", "else",
    "for", "in", "print", "and", "or", "not", "True", "False",
  ]);

  const tokens = text.split(/(\b\w+\b|[^\w]+)/g).filter(Boolean);
  return tokens.map((token) => {
    if (keywords.has(token)) {
      return { text: token, className: "text-[var(--primary)]" };
    }
    if (/^\d+/.test(token)) {
      return { text: token, className: "text-orange-400" };
    }
    return { text: token, className: "text-[var(--foreground)]" };
  });
}

export default function CodeEditorDemo() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setDisplayedLines(0);
    setOutput("");
    setIsRunning(false);

    let line = 0;
    const interval = setInterval(() => {
      line++;
      if (line > codeLines.length) {
        clearInterval(interval);
        setIsTyping(false);
      } else {
        setDisplayedLines(line);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const timer = setTimeout(startTyping, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, startTyping]);

  const handleRun = () => {
    if (isRunning || isTyping) return;
    setIsRunning(true);
    setOutput("");

    const lines = mockOutput.split("\n");
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setOutput((prev) => (prev ? prev + "\n" + lines[i] : lines[i]));
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 400);
  };

  const handleReset = () => {
    hasStarted.current = false;
    setDisplayedLines(0);
    setOutput("");
    setIsRunning(false);
    setIsTyping(false);
    setTimeout(startTyping, 300);
  };

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Interactive Demo
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Learn by <span className="text-[var(--primary)]">Writing Code</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Our platform features an integrated code editor with instant feedback.
            </p>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-xl overflow-hidden shadow-2xl">
            {/* Editor header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[var(--muted-foreground)] font-mono">
                  train_model.py
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
                  disabled={isRunning || isTyping}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--secondary)] text-white text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Play className="w-3 h-3" />
                  Run
                </button>
              </div>
            </div>

            {/* Code area */}
            <div className="p-4 min-h-[200px] bg-[var(--background)] font-mono text-[14px]">
              {codeLines.slice(0, displayedLines).map((line, i) => (
                <div key={i} className="flex gap-3 leading-6">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right text-xs leading-6">
                    {i + 1}
                  </span>
                  <span>
                    {syntaxHighlight(line.text).map((token, j) => (
                      <span key={j} className={token.className}>
                        {token.text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 leading-6">
                  <span className="text-[var(--muted-foreground)] select-none w-6 text-right text-xs leading-6">
                    {displayedLines + 1}
                  </span>
                  <span className="inline-block w-2 h-4 bg-[var(--primary)] animate-pulse mt-1" />
                </div>
              )}
            </div>

            {/* Output panel */}
            {output && (
              <div className="border-t border-[var(--border)]">
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-[var(--muted-foreground)] border-b border-[var(--border)]">
                  <Terminal className="w-3.5 h-3.5" />
                  Output
                </div>
                <div className="p-4 bg-[var(--background)] font-mono text-xs text-[var(--secondary)] whitespace-pre-wrap leading-5">
                  {output}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
