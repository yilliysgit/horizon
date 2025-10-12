"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

/** Navy + Gold (consistent met jouw andere secties) */
const COLORS = {
  navy800: "#00296b",
  navy700: "#003f88",
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333",
};

/** Losse, tolerante type: sluit aan op je datafile */
type FAQItemLike = {
  id?: string;
  question: string;
  answer?: string;
  answerText?: string;
  category?: string;
  keywords?: string[];
};

type FAQSectionProps = {
  items?: FAQItemLike[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  telHref?: string;
  contactHref?: string;
  showTags?: boolean;        // toon tags (keywords) onder ieder antwoord
  singleOpen?: boolean;      // één antwoord tegelijk open
};

export default function FAQSection({
  items = [],
  eyebrow = "Veelgestelde vragen",
  title = "Veelgestelde vragen over totaalbouw",
  intro = "Antwoorden op planning, kosten, kwaliteit en nazorg.",
  telHref = "tel:0850000000",
  contactHref = "/contact",
  showTags = true,
  singleOpen = true,
}: FAQSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (singleOpen) {
      setOpenIds((prev) => (prev[0] === id ? [] : [id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    }
  };

  /** JSON-LD (veilig: alleen als er items zijn, en pakt answer of answerText) */
  const jsonLd = useMemo(() => {
    if (!items || !Array.isArray(items) || items.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({
        "@type": "Question",
        name: it.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: it.answer ?? it.answerText ?? "",
        },
      })),
    };
  }, [items]);

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gray50} 50%, ${COLORS.white} 100%)`,
      }}
    >
      {/* Subtiele decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-3xl" style={{ backgroundColor: `${COLORS.navy600}10` }} />
        <div className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-2xl" style={{ backgroundColor: `${COLORS.gold500}10` }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {eyebrow && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold mb-6"
              style={{
                background: `${COLORS.navy800}15`,
                color: COLORS.navy800,
                border: `1px solid ${COLORS.navy700}30`,
              }}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.gold500 }} />
              {eyebrow}
            </span>
          )}

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: COLORS.ink, fontFamily: "Kanit, sans-serif" }}
          >
            {title}
          </h2>

          {intro && (
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: COLORS.gray600 }}>
              {intro}
            </p>
          )}
        </div>

        {/* FAQ lijst */}
        <div className="space-y-4">
          {items.map((it, index) => {
            const id = it.id ?? `faq-${index}`;
            const isOpen = openIds.includes(id);
            const answer = it.answer ?? it.answerText ?? "";
            return (
              <motion.div key={id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div
                  className="bg-white rounded-2xl border-2 shadow-sm transition-colors overflow-hidden"
                  style={{
                    borderColor: isOpen ? COLORS.navy600 : COLORS.gray200,
                    boxShadow: "0 4px 12px rgba(17,24,39,.06)", // geen zware hover-shadows
                  }}
                >
                  {/* Vraag */}
                  <button
                    onClick={() => toggle(id)}
                    className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                  >
                    <div className="flex-1">
                      {it.category && (
                        <span
                          className="inline-block px-3 py-1 rounded-lg text-xs font-medium mb-2"
                          style={{ background: `${COLORS.gold500}20`, color: COLORS.navy800, border: `1px solid ${COLORS.gold500}40` }}
                        >
                          {it.category}
                        </span>
                      )}

                      <h3
                        className="text-base md:text-lg font-semibold leading-relaxed"
                        style={{ color: isOpen ? COLORS.navy700 : COLORS.gray900 }}
                      >
                        {it.question}
                      </h3>
                    </div>

                    <motion.div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: isOpen ? COLORS.navy700 : COLORS.gray200,
                        color: isOpen ? COLORS.white : COLORS.gray600,
                      }}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.div>
                  </button>

                  {/* Antwoord */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-panel`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 border-t" style={{ borderColor: COLORS.gray200 }}>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.gray600 }}>
                            {answer}
                          </p>

                          {/* Tags/keywords uit je datafile (optioneel) */}
                          {showTags && Array.isArray(it.keywords) && it.keywords.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {it.keywords.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    background: COLORS.gray100,
                                    color: COLORS.navy700,
                                    border: `1px solid ${COLORS.gray200}`,
                                  }}
                                >
                                  <HelpCircle className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA blok */}
        <div
          className="mt-12 text-center rounded-2xl p-8 border-2"
          style={{ borderColor: COLORS.gray200, background: `linear-gradient(135deg, ${COLORS.navy600}08, ${COLORS.gold500}08)` }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{ color: COLORS.ink }}>
            Staat uw vraag er niet tussen?
          </h3>
          <p className="text-base mb-6" style={{ color: COLORS.gray600 }}>
            Bel ons of stuur een bericht – we helpen graag verder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={telHref}
              className="px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.gold500}, ${COLORS.gold400})`,
                color: COLORS.navy800,
                boxShadow: "0 6px 18px rgba(253,197,0,.25)",
              }}
            >
              Bellen
            </a>

            <a
              href={contactHref}
              className="px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
              style={{
                border: `2px solid ${COLORS.navy700}`,
                color: COLORS.navy700,
                background: COLORS.white,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.navy700;
                e.currentTarget.style.color = COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.white;
                e.currentTarget.style.color = COLORS.navy700;
              }}
            >
              Bericht sturen
            </a>
          </div>
        </div>
      </div>

      {/* SEO */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </section>
  );
}
