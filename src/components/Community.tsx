"use client";

import { FadeIn } from "./MotionWrappers";

export default function Community() {
  return (
    <section id="community" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
              They Came. They Coded.{" "}
              <span className="text-[var(--primary)]">They Got Hired.</span>
            </h2>
            <p className="mt-4 text-[var(--muted-foreground)]">
              Join our thriving community of developers making an impact.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-lg"
                style={{ opacity: 0.6 + Math.random() * 0.4 }}
              >
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 flex items-center justify-center">
                  <span className="text-2xl">
                    {["👩‍💻", "👨‍💻", "🧑‍💻", "💻", "🚀", "⚡", "🎯", "🔥"][i % 8]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

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
