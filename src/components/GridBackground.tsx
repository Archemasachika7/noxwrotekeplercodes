"use client";

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="grid-bg absolute inset-0" />

      {/* Animated gradient blobs */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[var(--primary)] rounded-full opacity-[0.03] blur-[120px] animate-blob-1 will-change-transform" />
      <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[var(--secondary)] rounded-full opacity-[0.03] blur-[120px] animate-blob-2 will-change-transform" />
      <div className="absolute bottom-[10%] left-[30%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] bg-[var(--accent)] rounded-full opacity-[0.025] blur-[130px] animate-blob-3 will-change-transform" />
      <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500 rounded-full opacity-[0.02] blur-[100px] animate-blob-4 will-change-transform" />
    </div>
  );
}
