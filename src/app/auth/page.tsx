import AuthHypePanel from "@/components/auth/AuthHypePanel";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign In | KEPLER CODES",
  description: "Sign in to your KEPLER CODES engineering workspace.",
};

export default function AuthPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left — Hype Panel (hidden on mobile, 50% on desktop) */}
      <section className="hidden lg:block lg:w-1/2 h-screen sticky top-0">
        <AuthHypePanel />
      </section>

      {/* Right — Auth Form */}
      <section className="w-full lg:w-1/2">
        <AuthForm />
      </section>
    </main>
  );
}
