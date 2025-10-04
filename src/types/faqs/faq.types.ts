// types/faqs/core.faq.types.ts
import type { ReactNode } from "react";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  answerText: string;
  keywords: string[];
};

