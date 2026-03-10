"use client";

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)] rounded-full opacity-[0.02] blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)] rounded-full opacity-[0.02] blur-[100px]" />
    </div>
  );
}
