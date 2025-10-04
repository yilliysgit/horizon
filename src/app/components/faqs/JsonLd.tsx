// /components/faqs/core/jsonld.tsx
import React from "react";
import type { FAQItem } from "@/types/faqs/faq.types";

// Minimaal type voor schema (maakt 'm compatibel met meerdere data-vormen)
type FaqForSchema = Pick<FAQItem, "question" | "answerText">;

export const toFaqJsonLd = (items: FaqForSchema[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.question,
    acceptedAnswer: { "@type": "Answer", text: i.answerText },
  })),
} as const);

export const FAQJsonLd: React.FC<{ items: FaqForSchema[]; id?: string }> = ({ items, id }) => {
  if (!items?.length) return null; // niets injecteren als er geen vragen zijn
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(toFaqJsonLd(items)) }}
    />
  );
};
