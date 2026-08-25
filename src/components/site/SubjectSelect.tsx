"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const markerColors = ["bg-blue", "bg-tang", "bg-grape", "bg-aqua"] as const;

export function SubjectSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();
  const selectedIndex = Math.max(0, options.indexOf(value));

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[focusIndex]?.focus();
  }, [focusIndex, open]);

  const openAt = (index: number) => {
    setFocusIndex(index);
    setOpen(true);
  };

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const moveFocus = (index: number) => {
    const next = (index + options.length) % options.length;
    setFocusIndex(next);
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAt(selectedIndex);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      openAt(selectedIndex || options.length - 1);
    }
  };

  const onOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(index + 1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(index - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      moveFocus(options.length - 1);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={onTriggerKeyDown}
        className="flex min-h-[58px] w-full items-center gap-3 rounded-2xl border-[1.5px] border-line bg-bg px-3.5 text-left shadow-[0_3px_0_var(--line)] transition-[border-color,box-shadow,transform] hover:-translate-y-px hover:border-blue focus-visible:border-blue focus-visible:shadow-[0_4px_0_var(--blue)]"
      >
        <span
          className={`grid h-9 w-9 flex-none place-items-center rounded-xl text-sm font-black text-white ${markerColors[selectedIndex % markerColors.length]}`}
        >
          {value.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 truncate text-base font-extrabold text-ink">
          {value}
        </span>
        <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-surface2">
          <span
            aria-hidden
            className={`h-2.5 w-2.5 border-b-2 border-r-2 border-blue-deep transition-transform ${open ? "translate-y-[2px] rotate-[-135deg]" : "-translate-y-[2px] rotate-45"}`}
          />
        </span>
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute inset-x-0 top-[calc(100%+10px)] z-40 grid gap-1.5 rounded-[18px] border-[1.5px] border-line bg-surface p-2.5 shadow-lift"
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <button
                key={option}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => choose(option)}
                onKeyDown={(event) => onOptionKeyDown(event, index)}
                className={`flex min-h-12 w-full items-center gap-3 rounded-[13px] px-3.5 text-left font-bold transition-colors ${selected ? "bg-blue-soft text-blue-deep" : "text-ink hover:bg-surface2"}`}
              >
                <span
                  className={`h-3 w-3 flex-none rounded-full ${markerColors[index % markerColors.length]}`}
                />
                <span className="flex-1">{option}</span>
                {selected ? (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-blue text-sm font-black text-white">
                    ✓
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
