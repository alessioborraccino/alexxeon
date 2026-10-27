"use client";
import { useState } from "react";
import Image from "next/image";
type VideoProps = { id?: string | null; title: string; eager?: boolean };
export default function Video({ id, title, eager = false }: VideoProps) {
  const [playing, setPlaying] = useState(false);
  if (!id) return <p>Video unavailable.</p>;
  return (
    <div className="video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={`${title} — Alexx Eon video`}
          width="640"
          height="360"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-preview"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            width="480"
            height="360"
            alt=""
            loading={eager ? "eager" : "lazy"}
            unoptimized
          />
          <span className="play">
            ▶<span className="sr-only"> Play video</span>
          </span>
        </button>
      )}
      <noscript>
        <a href={`https://www.youtube.com/watch?v=${id}`}>
          Watch {title} on YouTube
        </a>
      </noscript>
    </div>
  );
}
