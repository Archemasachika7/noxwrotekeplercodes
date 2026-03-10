"use client";

import { useEffect, useState, useCallback } from "react";
import { FadeIn } from "./MotionWrappers";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX, Clock } from "lucide-react";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
}

/** Extract a YouTube thumbnail URL from the embed URL. */
function getYouTubeThumbnail(embedUrl: string): string {
  const match = embedUrl.match(/embed\/([^?]+)/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return "";
}

/** Mock video durations keyed by video id. */
const videoDurations: Record<string, string> = {
  v1: "14:32",
  v2: "22:18",
  v3: "18:45",
};

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [modalVideo, setModalVideo] = useState<Video | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data: Video[]) => setVideos(data))
      .catch(() => {});
  }, []);

  const openModal = useCallback((video: Video) => setModalVideo(video), []);
  const closeModal = useCallback(() => setModalVideo(null), []);

  return (
    <section id="video-section" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ──────────────────────────── */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
              Free Coding Tutorials
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              How We Teach{" "}
              <span className="text-[var(--primary)]">Differently</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Project-based learning with real-world applications and
              AI-powered guidance.
            </p>
          </div>
        </FadeIn>

        {/* ── Thumbnail grid ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {videos.map((video) => {
            const thumb = video.thumbnail || getYouTubeThumbnail(video.embedUrl);
            return (
              <motion.button
                key={video.id}
                onClick={() => openModal(video)}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(88,166,255,0.25)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[#0D1117] overflow-hidden">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
                      <Play className="w-10 h-10" />
                    </div>
                  )}

                  {/* Overlay play icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg shadow-[#58A6FF]/30">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-mono">
                    <Clock className="w-3 h-3" />
                    {videoDurations[video.id] ?? "10:00"}
                  </div>
                </div>

                {/* Title bar */}
                <div className="px-4 py-3 text-left">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">
                    {video.title}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5 font-mono">
                    Kepler Codes
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Custom Modal Player ──────────────────────── */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            key="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              key="video-modal-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl rounded-xl overflow-hidden border border-[var(--border)] bg-[#08090A] shadow-2xl shadow-[#58A6FF]/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video iframe — key forces remount when mute state changes */}
              <div className="relative aspect-video">
                <iframe
                  key={`${modalVideo.id}-${isMuted}`}
                  src={`${modalVideo.embedUrl}${modalVideo.embedUrl.includes("?") ? "&" : "?"}autoplay=1&mute=${isMuted ? 1 : 0}`}
                  title={modalVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Custom controls bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] bg-[#121314]">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--foreground)] truncate max-w-[200px] sm:max-w-none">
                    {modalVideo.title}
                  </span>
                  <span className="text-xs text-[#8b949e] font-mono hidden sm:inline">
                    {videoDurations[modalVideo.id] ?? "10:00"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-md hover:bg-white/10 transition-colors text-[#8b949e] hover:text-[var(--primary)]"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-md hover:bg-white/10 transition-colors text-[#8b949e] hover:text-[var(--primary)]"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
