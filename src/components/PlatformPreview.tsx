"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import {
  BarChart3,
  Code,
  MessageSquare,
  FolderGit2,
  Trophy,
} from "lucide-react";

const features = [
  { icon: BarChart3, label: "Course Progress Tracking", desc: "Track your learning journey with detailed analytics" },
  { icon: Code, label: "Coding Challenges", desc: "Solve real-world problems with instant feedback" },
  { icon: MessageSquare, label: "AI Mentor Chat", desc: "Get instant help from our AI coding assistant" },
  { icon: FolderGit2, label: "Project Submissions", desc: "Build and submit portfolio-ready projects" },
  { icon: Trophy, label: "Leaderboards", desc: "Compete with peers and track your ranking" },
];

export default function PlatformPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] tracking-tight">
              A Learning Platform Built for{" "}
              <span className="text-[var(--primary)]">Developers</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--muted-foreground)]">
              Everything you need to go from beginner to industry-ready engineer.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FadeIn key={feature.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card rounded-xl p-6 h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{feature.label}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{feature.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Dashboard Preview */}
        <FadeIn delay={0.3}>
          <div className="mt-16 glass-card rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-[var(--muted-foreground)] font-mono">Kepler Dashboard</span>
            </div>
            <div className="p-6 grid md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-[var(--muted)] p-4">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">Courses Completed</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">7/12</p>
                <div className="mt-2 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full w-[58%] bg-[var(--primary)] rounded-full" />
                </div>
              </div>
              <div className="rounded-lg bg-[var(--muted)] p-4">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">Challenges Solved</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">142</p>
                <div className="mt-2 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-[var(--secondary)] rounded-full" />
                </div>
              </div>
              <div className="rounded-lg bg-[var(--muted)] p-4">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">Rank</p>
                <p className="text-2xl font-bold text-[var(--primary)]">#24</p>
                <p className="mt-2 text-xs text-[var(--muted-foreground)]">Top 5% of learners</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
