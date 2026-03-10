"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { motion } from "framer-motion";
import { GraduationCap, FolderGit2, Handshake, TrendingUp } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 10000, suffix: "+", label: "Students", prefix: "" },
  { icon: FolderGit2, value: 200, suffix: "+", label: "Projects Built", prefix: "" },
  { icon: Handshake, value: 300, suffix: "+", label: "Hiring Partners", prefix: "" },
  { icon: TrendingUp, value: 92, suffix: "%", label: "Completion Rate", prefix: "" },
];

function Counter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-[var(--foreground)]">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Student <span className="text-[var(--primary)]">Success</span> Stats
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="mt-2 text-sm text-[var(--muted-foreground)] font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
