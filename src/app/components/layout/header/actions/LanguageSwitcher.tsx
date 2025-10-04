// 📍 src/app/components/layout/header/navigation/actions/LanguageSwitcher.tsx
"use client";

import * as React from "react";
import type { Language } from "@/types/header/header.types";

type Props = {
  languages: Language[];
  current: string;
  onChange?: (code: string) => void;
  className?: string;
  buttonLabel?: "code" | "name";
};

export default function LanguageSwitcher({
  languages,
  current,
  onChange,
  className = "",
  buttonLabel = "code",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const active =
    languages.find((l) => l.code.toLowerCase() === (current || "NL").toLowerCase()) ??
    languages[0];

  // Click outside to close
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (btnRef.current?.contains(e.target as Node)) return;
      if (listRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Escape key to close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const buttonText = buttonLabel === "code" ? active.code.toUpperCase() : active.name;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Taal: ${buttonText}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-primary-blue transition-colors"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span>{buttonText}</span>
        {/* Simple arrow using CSS instead of phosphor-react */}
        <span
          className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ 
            display: 'inline-block',
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '6px solid currentColor'
          }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl bg-white p-1 shadow-lg border border-gray-200"
        >
          {languages.map((lang) => {
            const selected = lang.code.toLowerCase() === active.code.toLowerCase();
            return (
              <li role="none" key={lang.code}>
                <button
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    onChange?.(lang.code);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  className={[
                    "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    selected
                      ? "bg-gray-100 font-semibold text-primary-blue"
                      : "text-gray-700 hover:text-primary-blue hover:bg-gray-50",
                  ].join(" ")}
                >
                  <span className="flex-1">{lang.name}</span>
                  {/* Simple checkmark using CSS instead of phosphor-react */}
                  {selected && (
                    <span
                      className="text-primary-blue font-bold"
                      style={{ fontSize: '14px' }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}