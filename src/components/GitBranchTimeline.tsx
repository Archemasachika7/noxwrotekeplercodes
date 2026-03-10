"use client";

/**
 * GitBranchTimeline — A vertical scroll-triggered timeline for the
 * "Journey" section. As the user scrolls, a glowing SVG line "draws"
 * itself downward and lights up commit-style nodes (Step 01, 02…).
 *
 * Uses GSAP ScrollTrigger for the scroll-driven line-draw animation
 * and Framer Motion for individual node entrance animations.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Code2, Cpu, Rocket } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Journey step data                                                  */
/* ------------------------------------------------------------------ */

interface JourneyStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string; // Tailwind bg- class for the node circle
}

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Initialize — Learn the Fundamentals",
    description:
      "Build a rock-solid foundation in algorithms, data structures, and system design. The same fundamentals used by engineers at FAANG.",
    icon: BookOpen,
    color: "bg-[#58A6FF]",
  },
  {
    number: "02",
    title: "Commit — Build Real Projects",
    description:
      "Apply your knowledge by shipping real-world projects — from AI chatbots to full-stack SaaS applications.",
    icon: Code2,
    color: "bg-[#2EA043]",
  },
  {
    number: "03",
    title: "Merge — Master Industry Tools",
    description:
      "Git, Docker, AWS, CI/CD pipelines — master the professional toolchain used by engineering teams worldwide.",
    icon: Cpu,
    color: "bg-purple-500",
  },
  {
    number: "04",
    title: "Deploy — Get Hired",
    description:
      "Interview prep, portfolio reviews, and direct introductions to 300+ hiring partners. Launch your career.",
    icon: Rocket,
    color: "bg-amber-500",
  },
];

/* ------------------------------------------------------------------ */
/*  StepNode — individual timeline node with entrance animation        */
/* ------------------------------------------------------------------ */

function StepNode({ step, index }: { step: JourneyStep; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
      }
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="relative flex items-start gap-5 sm:gap-8"
    >
      {/* ── Node (commit dot) ─────────────────────────────── */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
            isInView ? step.color : "bg-[var(--muted)]"
          } transition-colors duration-500 shadow-lg`}
        >
          <Icon
            className={`w-5 h-5 ${
              isInView ? "text-white" : "text-[var(--muted-foreground)]"
            } transition-colors duration-500`}
          />
          {/* Glow ring when active */}
          {isInView && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className={`absolute inset-0 rounded-full ${step.color} opacity-30`}
            />
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="pb-16 sm:pb-20">
        <span className="inline-block text-xs font-mono font-semibold text-[var(--primary)] mb-1">
          STEP {step.number}
        </span>
        <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-2">
          {step.title}
        </h3>
        <p className="text-[var(--muted-foreground)] leading-relaxed max-w-md text-sm sm:text-base">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  GitBranchTimeline — main section component                         */
/* ------------------------------------------------------------------ */

export default function GitBranchTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  /**
   * Register GSAP ScrollTrigger to animate the SVG line's stroke-dashoffset
   * as the user scrolls through the section.
   */
  useEffect(() => {
    /* Dynamic import — GSAP + ScrollTrigger only needed on the client. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    async function initGSAP() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !lineRef.current) return;

      /* Measure the full height that the line should cover. */
      const totalHeight = sectionRef.current.scrollHeight;
      setLineHeight(totalHeight);

      const line = lineRef.current;
      line.setAttribute("y2", String(totalHeight));
      const length = totalHeight;

      /* Prepare the dash for draw animation */
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;

      ctx = gsap.context(() => {
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }, sectionRef);
    }

    initGSAP();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section id="git-timeline" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ───────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
            Your Journey
          </p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
            The{" "}
            <span className="text-[var(--primary)]">Git-Branch</span>{" "}
            Roadmap
          </h2>
          <p className="mt-4 text-base text-[var(--muted-foreground)]">
            Follow the commits from beginner to hired — each step builds on the
            last, just like a clean Git history.
          </p>
        </div>

        {/* ── Timeline container ───────────────────────────── */}
        <div ref={sectionRef} className="relative max-w-2xl mx-auto">
          {/* SVG vertical line (drawn by GSAP on scroll) */}
          <svg
            ref={svgRef}
            className="absolute left-[23px] top-0 w-[2px] pointer-events-none"
            style={{ height: lineHeight || "100%" }}
            aria-hidden="true"
          >
            {/* Background track */}
            <line
              x1="1"
              y1="0"
              x2="1"
              y2={lineHeight || "100%"}
              stroke="var(--border)"
              strokeWidth="2"
            />
            {/* Animated glowing line */}
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2={lineHeight || "100%"}
              stroke="#58A6FF"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            {/* SVG glow filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
          </svg>

          {/* Step nodes */}
          {journeySteps.map((step, index) => (
            <StepNode key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
