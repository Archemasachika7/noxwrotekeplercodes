"use client";

import { ScaleIn } from "./MotionWrappers";
import { ArrowRight, Rocket } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <div className="glass-card rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--primary)]/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">
                Transform Your Learning Journey
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-xl mx-auto mb-8">
                Join 12,000+ students who are building the future with code.
                Start learning today and accelerate your career.
              </p>
              <a
                href="#courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-base hover:opacity-90 transition-opacity"
              >
                Start Learning Today <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
