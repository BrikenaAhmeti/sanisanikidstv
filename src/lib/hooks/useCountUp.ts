"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, suffix = "", initial = "0") {
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState(initial);

  useEffect(() => {
    const node = ref.current;
    if (!node || !target) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() =>
        setText(target.toLocaleString() + suffix),
      );
      return () => cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const start = performance.now();
          const duration = 1600;
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setText(Math.round(target * eased).toLocaleString() + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [target, suffix]);

  return { ref, text };
}
