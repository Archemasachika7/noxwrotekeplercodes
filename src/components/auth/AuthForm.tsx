"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { Code2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CLI-style loading spinner frames                                    */
/* ------------------------------------------------------------------ */
const spinnerFrames = ["\\", "|", "/", "-"];

/* ------------------------------------------------------------------ */
/*  OAuth provider config                                               */
/* ------------------------------------------------------------------ */
const oauthProviders = [
  {
    id: "github",
    label: "Continue with GitHub",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    bgClass:
      "bg-[#24292F] hover:bg-[#2d3339] text-white",
    primary: true,
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    bgClass:
      "bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-700",
    primary: false,
  },
  {
    id: "discord",
    label: "Continue with Discord",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    bgClass:
      "bg-[#5865F2] hover:bg-[#4752c4] text-white",
    primary: false,
  },
];

/* ------------------------------------------------------------------ */
/*  AuthForm Component                                                  */
/* ------------------------------------------------------------------ */
export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "magic">("signin");
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // CLI spinner animation
  useEffect(() => {
    if (!isSubmitting) return;
    const interval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % spinnerFrames.length);
    }, 150);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleOAuthSignIn = useCallback(
    (providerId: string) => {
      setIsSubmitting(true);
      signIn(providerId, { callbackUrl: "/onboarding" });
    },
    []
  );

  const handleMagicLink = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      setIsSubmitting(true);
      // Simulate magic link send (actual implementation requires Email provider + DB)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setMagicLinkSent(true);
    },
    [email]
  );

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full min-h-screen px-6 sm:px-12 bg-[#09090b]">
      {/* Subtle background noise */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo — visible on mobile only */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <Code2 className="w-7 h-7 text-blue-400" />
          <span className="text-lg font-bold tracking-tight text-white">
            KEPLER <span className="text-blue-400">CODES</span>
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === "magic" ? "Passwordless Sign In" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {mode === "magic"
              ? "Enter your email to receive a magic link."
              : "Sign in to your engineering workspace."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === "signin" ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* OAuth Buttons */}
              <div className="flex flex-col gap-3">
                {oauthProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOAuthSignIn(provider.id)}
                    disabled={isSubmitting}
                    className={`
                      flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg
                      text-sm font-medium transition-all duration-200 cursor-pointer
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${provider.bgClass}
                      ${provider.primary ? "ring-1 ring-white/10" : ""}
                    `}
                  >
                    {provider.icon}
                    <span>{provider.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-xs text-zinc-600 font-mono uppercase tracking-widest">
                  or
                </span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              {/* Magic Link */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setMode("magic")}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Sign in with Magic Link
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="magic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {magicLinkSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Check your inbox
                  </h3>
                  <p className="text-sm text-zinc-500">
                    We sent a magic link to{" "}
                    <span className="text-zinc-300 font-mono">{email}</span>
                  </p>
                  <button
                    onClick={() => {
                      setMagicLinkSent(false);
                      setMode("signin");
                    }}
                    className="mt-6 text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                  >
                    ← Back to sign in
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleMagicLink}>
                  {/* Email input with focus spotlight */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-px rounded-lg pointer-events-none"
                      animate={{
                        boxShadow:
                          focusedField === "email"
                            ? "0 0 0 1px rgba(96,165,250,0.5), 0 0 20px rgba(96,165,250,0.1)"
                            : "0 0 0 1px transparent",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="engineer@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm font-mono placeholder:text-zinc-700 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Dim overlay when focused */}
                  <AnimatePresence>
                    {focusedField && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 pointer-events-none z-[-1]"
                      />
                    )}
                  </AnimatePresence>

                  {/* Submit button with CLI spinner */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting || !email.trim()}
                    className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="font-mono flex items-center gap-2">
                        <span className="inline-block w-4 text-center">
                          [{spinnerFrames[spinnerIndex]}]
                        </span>
                        Authenticating...
                      </span>
                    ) : (
                      "Send Magic Link"
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="mt-4 w-full text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                  >
                    ← Back to all sign-in options
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="mt-8 text-[11px] text-zinc-700 text-center leading-relaxed">
          By signing in, you agree to our{" "}
          <a href="#" className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
