"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import {
  Brain,
  Rocket,
  GraduationCap,
  Briefcase,
  Code2,
  Users,
} from "lucide-react";

const reasons = [
  { icon: Brain, title: "AI Powered Learning", desc: "Personalized learning paths driven by AI to match your pace and goals." },
  { icon: Rocket, title: "Real World Projects", desc: "Build production-grade projects that you can showcase to employers." },
  { icon: GraduationCap, title: "Industry Mentors", desc: "Learn from engineers working at Google, Amazon, Microsoft, and more." },
  { icon: Briefcase, title: "Placement Preparation", desc: "Mock interviews, resume reviews, and direct hiring partner connections." },
  { icon: Code2, title: "Hands-on Coding Labs", desc: "Interactive coding environments with instant feedback and grading." },
  { icon: Users, title: "Peer Community", desc: "Join 12,000+ learners in our active Discord and study groups." },
];

export default function WhyKeplerCodes() {
  return (
    <section id="why-kepler" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] tracking-tight">
              Why <span className="text-[var(--primary)]">Kepler Codes</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--muted-foreground)]">
              We don&apos;t just teach code — we build engineers.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                <reason.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{reason.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{reason.desc}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
