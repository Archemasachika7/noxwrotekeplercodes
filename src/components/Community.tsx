"use client";

import { FadeIn, RevealSlow } from "./MotionWrappers";

export default function Community() {
  return (
    <section id="community" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              They Came. They Coded.{" "}
              <span className="text-[var(--primary)]">They Got Hired.</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Join our thriving community of developers making an impact.
            </p>
          </div>
        </FadeIn>

        <RevealSlow delay={0.2}>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 24 }).map((_, i) => {
              const opacities = [0.7, 0.8, 0.9, 1, 0.75, 0.85, 0.95, 0.65, 0.7, 0.8, 0.9, 1, 0.75, 0.85, 0.95, 0.65, 0.7, 0.8, 0.9, 1, 0.75, 0.85, 0.95, 0.65];
              const symbols = ["</>", "{ }", "=>", "fn", ">>", "&&", "[]", "++"];
              return (
              <div
                key={i}
                className="aspect-square rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-lg"
                style={{ opacity: opacities[i] }}
              >
                <div className="w-full h-full rounded-xl bg-[var(--primary)]/5 flex items-center justify-center">
                  <span className="text-sm font-mono text-[var(--primary)]">
                    {symbols[i % 8]}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        </RevealSlow>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--card)] transition-colors"
            >
              Join Our Discord Community
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
