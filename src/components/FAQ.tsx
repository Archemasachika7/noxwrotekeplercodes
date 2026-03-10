"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./MotionWrappers";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What programming experience do I need to start?",
    a: "Our courses range from beginner to advanced. If you're completely new, start with our fundamentals track. If you have some experience, jump straight into specialized courses.",
  },
  {
    q: "How long does it take to complete a course?",
    a: "Most courses take 4-8 weeks to complete at a pace of 8-10 hours per week. Bootcamp cohorts run for 12-16 weeks with a more intensive schedule.",
  },
  {
    q: "Do you offer job placement assistance?",
    a: "Yes! Our Bootcamp plan includes career support, resume reviews, mock interviews, and direct connections to our 300+ hiring partners.",
  },
  {
    q: "What makes Kepler Codes different from other platforms?",
    a: "We focus on real-world projects, AI-powered mentorship, and a developer-focused learning experience. Our curriculum is continuously updated by industry engineers.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    q: "How does the AI mentor work?",
    a: "Our AI mentor provides instant coding assistance, explains concepts, reviews your code, and suggests improvements — available 24/7 during your learning journey.",
  },
  {
    q: "Are the certificates recognized by employers?",
    a: "Yes, our certificates are recognized by our 300+ hiring partners and can be shared on LinkedIn. Many students report their certificates helping in job interviews.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[var(--muted)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
              Frequently Asked <span className="text-[var(--primary)]">Questions</span>
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-[var(--foreground)] pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
