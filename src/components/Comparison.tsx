"use client";

import { FadeIn } from "./MotionWrappers";
import { Check, X } from "lucide-react";

const features = [
  { feature: "Real-world projects", kepler: true, traditional: false },
  { feature: "AI-powered mentorship", kepler: true, traditional: false },
  { feature: "Live cohort sessions", kepler: true, traditional: true },
  { feature: "Industry certifications", kepler: true, traditional: true },
  { feature: "Placement support", kepler: true, traditional: false },
  { feature: "Peer community access", kepler: true, traditional: false },
  { feature: "Interactive coding labs", kepler: true, traditional: false },
  { feature: "Updated curriculum", kepler: true, traditional: false },
  { feature: "Career coaching", kepler: true, traditional: false },
  { feature: "Affordable pricing", kepler: true, traditional: false },
];

export default function Comparison() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] tracking-tight">
              Kepler Codes vs <span className="text-[var(--muted-foreground)]">Traditional Platforms</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              <div className="p-4 border-b border-[var(--border)] font-semibold text-sm text-[var(--muted-foreground)]">
                Feature
              </div>
              <div className="p-4 border-b border-l border-[var(--border)] text-center font-semibold text-sm text-[var(--primary)]">
                Kepler Codes
              </div>
              <div className="p-4 border-b border-l border-[var(--border)] text-center font-semibold text-sm text-[var(--muted-foreground)]">
                Traditional
              </div>

              {features.map((item, i) => (
                <div key={item.feature} className="contents">
                  <div className={`p-4 text-sm text-[var(--foreground)] ${i < features.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                    {item.feature}
                  </div>
                  <div className={`p-4 border-l text-center ${i < features.length - 1 ? "border-b" : ""} border-[var(--border)]`}>
                    {item.kepler ? (
                      <Check className="w-5 h-5 text-[var(--secondary)] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </div>
                  <div className={`p-4 border-l text-center ${i < features.length - 1 ? "border-b" : ""} border-[var(--border)]`}>
                    {item.traditional ? (
                      <Check className="w-5 h-5 text-[var(--secondary)] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
