"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "./MotionWrappers";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with basic tutorials",
    features: [
      "Access to 50+ free tutorials",
      "Community Discord access",
      "Basic coding challenges",
      "Weekly newsletters",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹15,000",
    period: "/month",
    description: "Full course access with projects",
    features: [
      "All free features",
      "Full course library access",
      "Hands-on projects",
      "Certificates of completion",
      "AI mentor access",
      "Priority support",
    ],
    cta: "Start Pro Plan",
    popular: true,
  },
  {
    name: "Bootcamp",
    price: "₹25,000",
    period: "/month",
    description: "Live mentorship and career support",
    features: [
      "All Pro features",
      "Live cohort sessions",
      "1-on-1 mentorship",
      "Career support & resume review",
      "Placement preparation",
      "Mock interviews",
      "Direct hiring partner access",
    ],
    cta: "Join Bootcamp",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              Simple, Transparent <span className="text-[var(--primary)]">Pricing</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Choose the plan that fits your learning goals. No hidden fees.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`glass-card rounded-xl p-6 relative ${
                plan.popular ? "ring-2 ring-[var(--primary)]" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--foreground)]">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-extrabold text-[var(--foreground)]">{plan.price}</span>
                <span className="text-sm text-[var(--muted-foreground)]">{plan.period}</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                    <Check className="w-4 h-4 text-[var(--secondary)] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/auth"
                className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-opacity ${
                  plan.popular
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"
                    : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card)]"
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
