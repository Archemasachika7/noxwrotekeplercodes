"use client";

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Solid background base */}
      <div className="absolute inset-0 bg-[var(--background)]" />
      {/* Subtle grid overlay */}
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
