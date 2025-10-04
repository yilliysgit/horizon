// /components/faqs/FaqSection.tsx
import React from "react";
import type { FAQItem } from "@/types/faqs/faq.types";
import { FAQJsonLd } from "./JsonLd";

export type FaqSectionProps = {
  items: FAQItem[];
  title?: string;
  intro?: string;
  className?: string;
  includeJsonLd?: boolean; // voeg schema.org FAQ toe
  id?: string; // optionele anchor-id voor deeplinks
};

export const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  title = "Veelgestelde vragen",
  intro,
  className = "",
  includeJsonLd = true,
  id,
}) => {
  return (
    <section id={id} className={`mx-auto max-w-3xl ${className}`.trim()}>
      <header className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {intro && <p className="mt-2 text-base text-muted-foreground">{intro}</p>}
      </header>

      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.id}
            className="group rounded-2xl border border-gray-200 p-4 shadow-sm open:shadow-md open:border-gray-300 transition-all bg-white"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="text-base font-medium leading-6 group-open:text-primary">
                {item.question}
              </span>
              <span
                aria-hidden
                className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm group-open:rotate-45 transition-transform"
                title="Open/Sluit"
              >
                +
              </span>
            </summary>
            <div className="mt-3 text-[15px] leading-6 text-gray-700">
              {/* answer is string (data-only). Preserve newlines nicely. */}
              <p className="whitespace-pre-line">{item.answer}</p>

              {item.keywords?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.keywords.slice(0, 6).map((k) => (
                    <span
                      key={k}
                      className="rounded-full border px-2 py-0.5 text-xs text-gray-600"
                      aria-label={`keyword: ${k}`}
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>

      {/* JSON‑LD voor rich results; toon alleen als er items zijn */}
      {includeJsonLd && items.length > 0 && (
        <FAQJsonLd items={items} id={id ? `${id}-jsonld` : undefined} />
      )}
    </section>
  );
};

export default FaqSection;
