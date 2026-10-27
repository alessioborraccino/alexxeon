"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ImageSource = { srcSet: string; type: string; sizes?: string };
type ImageWithPlaceholderProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
  sources?: ImageSource[];
  fit?: "cover" | "contain";
};

export default function ImageWithPlaceholder({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  sizes,
  sources = [],
  fit = "cover",
}: ImageWithPlaceholderProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">(
    "loading",
  );
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) {
      setStatus(image.naturalWidth > 0 ? "loaded" : "failed");
    }
  }, []);

  return (
    <span
      className={`image-frame image-frame--${status}${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {status === "failed" ? (
        <span className="image-frame__fallback">
          <Image
            src="/full-logo-white.png"
            alt={alt}
            width={314}
            height={48}
            unoptimized
          />
        </span>
      ) : (
        <>
          {status === "loading" && (
            <span className="image-frame__shimmer" aria-hidden="true" />
          )}
          <picture className="image-frame__picture">
            {sources.map((source) => (
              <source
                key={`${source.type}-${source.srcSet}`}
                srcSet={source.srcSet}
                type={source.type}
                sizes={source.sizes || sizes}
              />
            ))}
            <img
              ref={imageRef}
              src={src}
              width={width}
              height={height}
              alt={alt}
              loading={loading}
              sizes={sizes}
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("failed")}
              style={{ objectFit: fit }}
            />
          </picture>
        </>
      )}
    </span>
  );
}
