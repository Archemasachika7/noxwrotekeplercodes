"use client";

import { useEffect, useState } from "react";
import { FadeIn, RevealSlow } from "./MotionWrappers";
import { Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
}

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        if (data.length > 0) setActiveVideo(data[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="video-section" className="py-24 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[var(--foreground)] tracking-tight">
              How We Teach <span className="text-[var(--primary)]">Differently</span>
            </h2>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              Project-based learning with real-world applications and AI-powered guidance.
            </p>
          </div>
        </FadeIn>

        <RevealSlow delay={0.2}>
          {activeVideo && (
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden glass-card shadow-2xl">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </RevealSlow>

        {videos.length > 1 && (
          <div className="flex gap-3 justify-center mt-8 flex-wrap">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  activeVideo?.id === video.id
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                    : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--foreground)]"
                }`}
              >
                <Play className="w-3 h-3 inline mr-1.5" />
                {video.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
