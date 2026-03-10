"use client";

import { FadeIn } from "./MotionWrappers";
import { Award, Share2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Industry-recognized certificates upon course completion",
  "Shareable credentials for LinkedIn and portfolios",
  "Verified by Kepler Codes and partner institutions",
  "Digital badges for each skill milestone achieved",
];

export default function Certifications() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-6">
                Earn <span className="text-[var(--primary)]">Certifications</span> That Matter
              </h2>
              <p className="text-[var(--muted-foreground)] mb-8">
                Get recognized for your skills with industry-standard certifications that employers trust.
              </p>
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--foreground)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-8 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                Certificate of Completion
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-1">Full Stack Engineering</p>
              <p className="text-xs text-[var(--muted-foreground)] mb-6">Kepler Codes • 2024</p>
              <div className="border-t border-[var(--border)] pt-4 flex justify-center gap-4">
                <button className="inline-flex items-center gap-1.5 text-sm text-[var(--primary)] font-medium">
                  <Share2 className="w-4 h-4" /> Share on LinkedIn
                </button>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
