"use client";

import { useState } from "react";

const parseRatio = (r) => {
  const [a, b] = (r || "9/16").replace(/\s/g, "").split("/").map(Number);
  return a > 0 && b > 0 ? a / b : 9 / 16;
};

// The picture or video shown in a viewer. It reserves its final size straight away and shows a loading skeleton in it
// until the media is ready, so nothing jumps around or shows stray text while a large file loads.
export default function MediaFrame({ kind = "video", src, alt = "", ratio, radius = "clamp(10px,1.2vw,22px)", maxHeight = "82svh" }) {
  const [ready, setReady] = useState(false);
  const r = parseRatio(ratio);
  const fade = `absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative overflow-hidden bg-[#161616]"
      style={{ aspectRatio: r, width: `min(92vw, calc(${maxHeight} * ${r}))`, borderRadius: radius }}
    >
      {!ready && (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-[#1c1c1e]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.04]" />
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-[#f6f561]" />
        </div>
      )}
      {kind === "video" ? (
        <video
          ref={(el) => {
            // Already loaded (cached) before React could attach the handler.
            if (el && el.readyState >= 2) setReady(true);
          }}
          src={src}
          autoPlay
          controls
          loop
          playsInline
          onLoadedData={() => setReady(true)}
          className={fade}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={(el) => {
            if (el && el.complete && el.naturalWidth > 0) setReady(true);
          }}
          src={src}
          alt={alt}
          draggable={false}
          onLoad={() => setReady(true)}
          className={fade}
        />
      )}
    </div>
  );
}
