"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/types";
import { LegalDialog } from "@/components/site/LegalDialog";

export type LegalTopic = "privacy" | "imprint" | "terms";

type LegalContextValue = {
  open: (topic: LegalTopic) => void;
  close: () => void;
};

const LegalContext = createContext<LegalContextValue | null>(null);

export function useLegal() {
  const ctx = useContext(LegalContext);
  if (!ctx) throw new Error("useLegal must be used inside <LegalProvider>");
  return ctx;
}

export function LegalProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const [topic, setTopic] = useState<LegalTopic | null>(null);

  const open = useCallback((next: LegalTopic) => setTopic(next), []);
  const close = useCallback(() => setTopic(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  const content: Record<LegalTopic, { title: string; lines: string[] }> = {
    privacy: {
      title: dictionary.legal_privacy,
      lines: [dictionary.pv1, dictionary.pv2, dictionary.pv3, dictionary.pv4],
    },
    imprint: {
      title: dictionary.legal_imprint,
      lines: [
        dictionary.im1,
        dictionary.im2,
        dictionary.im3,
        dictionary.im4,
        dictionary.im5,
      ],
    },
    terms: { title: dictionary.legal_terms, lines: [dictionary.tm1, dictionary.tm2] },
  };

  return (
    <LegalContext.Provider value={value}>
      {children}
      {topic ? (
        <LegalDialog
          title={content[topic].title}
          lines={content[topic].lines}
          onClose={close}
        />
      ) : null}
    </LegalContext.Provider>
  );
}
