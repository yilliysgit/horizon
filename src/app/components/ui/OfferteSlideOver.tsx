// src/app/components/ui/OfferteSlideOver.tsx
"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string; // bv. "max-w-xl"
};

export default function OfferteSlideOver({
  open,
  title,
  onClose,
  children,
  widthClass = "max-w-2xl",
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      // Start met mounten
      setIsVisible(true);
      // Kleine delay voor smooth slide-in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      // Voorkom body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Start slide-out animatie
      setIsAnimating(false);
      // Wacht op animatie voordat we unmounten
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      // Herstel body scroll
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Render niets als niet zichtbaar
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300
                    ${isAnimating ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Formulier"}
        className={`absolute right-0 top-0 h-full w-full ${widthClass} bg-white shadow-xl
                    transition-transform duration-300 will-change-transform
                    ${isAnimating ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100"
            aria-label="Sluiten"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100%-60px)] overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
}