"use client";

import { FadeIn } from "./MotionWrappers";
import { Play, ExternalLink } from "lucide-react";

const tutorials = [
  { title: "Intro to Neural Networks", duration: "15:32", category: "AI" },
  { title: "Build a REST API with Node.js", duration: "22:14", category: "Full Stack" },
  { title: "Cybersecurity Fundamentals", duration: "18:45", category: "Security" },
  { title: "Smart Contracts with Solidity", duration: "25:10", category: "Blockchain" },
  { title: "Binary Search Explained", duration: "12:08", category: "DSA" },
  { title: "Python for Data Science", duration: "20:30", category: "Data Science" },
  { title: "React Hooks Deep Dive", duration: "17:22", category: "Frontend" },
  { title: "Docker in 20 Minutes", duration: "19:55", category: "DevOps" },
];

export default function FreeContent() {
  return (
    <section id="free-content" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              200+ Free <span className="text-[var(--primary)]">Coding Tutorials</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Start learning for free with our extensive library of video tutorials.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tutorials.map((tut, i) => (
            <FadeIn key={tut.title} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-[var(--muted)] relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center group-hover:bg-[var(--primary)]/30 transition-colors">
                    <Play className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs bg-black/70 text-white rounded">
                    {tut.duration}
                  </span>
                </div>
                <div className="p-3">
                  <span className="text-xs text-[var(--primary)] font-medium">{tut.category}</span>
                  <h3 className="text-sm font-medium text-[var(--foreground)] mt-1 group-hover:text-[var(--primary)] transition-colors">
                    {tut.title}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline">
              View All Tutorials <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
