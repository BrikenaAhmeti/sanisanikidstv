"use client";

import { useEffect } from "react";

export function LegalDialog({
  title,
  lines,
  onClose,
}: {
  title: string;
  lines: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[150] grid place-items-center bg-[rgba(15,23,37,.6)] p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[82vh] w-full max-w-[680px] overflow-auto rounded-[26px] bg-bg p-8 shadow-lift"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[1.7rem] font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-11 w-11 flex-none rounded-full border-[1.5px] border-line bg-surface text-xl"
          >
            ×
          </button>
        </div>
        <div className="mt-[18px] grid gap-3.5 text-muted">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
