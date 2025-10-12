import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const COLORS = {
  navy800: "#00296b",
  navy700: "#003f88",
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray600: "#4b5563",
  gray900: "#111827",
  gray200: "#e5e7eb",
};

// Props accepteren any[] zodat het werkt met jouw CaseStudy type
export type SubdienstCasesSectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  cases: any[];  // ← Accepteert elke array
  filterCategory?: string;
  limit?: number;
  showAll?: boolean;
  className?: string;
};

export default function SubdienstCasesSection({
  eyebrow,
  title,
  intro,
  cases,
  filterCategory,
  limit = 3,
  showAll = true,
  className = "",
}: SubdienstCasesSectionProps) {
  const reduce = useReducedMotion();

  // Filter cases op category
  let filteredCases = filterCategory
    ? cases.filter((c) => c.category === filterCategory)
    : cases;

  // Limit cases
  if (limit) {
    filteredCases = filteredCases.slice(0, limit);
  }

  // Functie om HTML tags te strippen
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <section className={`relative py-16 md:py-24 px-6 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          {eyebrow && (
            <div
              className="inline-flex items-center gap-2 rounded-full bg-opacity-10 px-4 py-2 text-sm font-medium mb-4"
              style={{
                backgroundColor: `${COLORS.gold500}20`,
                color: COLORS.navy800,
                border: `1px solid ${COLORS.gold500}50`,
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: COLORS.gold500 }}
              />
              {eyebrow}
            </div>
          )}

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: COLORS.gray900, fontFamily: "Kanit, sans-serif" }}
          >
            {title}
          </h2>

          {intro && (
            <p className="text-lg leading-relaxed" style={{ color: COLORS.gray600 }}>
              {intro}
            </p>
          )}
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/projecten/${caseItem.id}`} className="block group">
                <div
                  className="relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl cursor-pointer"
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.gray200}`,
                    borderRadius: "20px",
                    boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)",
                  }}
                >
                  <div className="relative">
                    <img
                      src={caseItem.heroImage}
                      alt={caseItem.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ borderRadius: "20px 20px 0 0" }}
                    />

                    {/* Gouden volgnummer */}
                    <div
                      className="absolute left-4 top-4 h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`,
                        color: COLORS.navy800,
                        fontFamily: "Kanit, sans-serif",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Gouden corner accent */}
                    <div
                      className="absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2"
                      style={{
                        borderColor: COLORS.gold500,
                        borderTopLeftRadius: "8px",
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{
                        color: COLORS.gray900,
                        fontFamily: "Kanit, sans-serif",
                      }}
                    >
                      {caseItem.title}
                    </h3>
                    {caseItem.subtitle && (
                      <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{ color: COLORS.gray600 }}
                      >
                        {stripHtml(caseItem.subtitle)}
                      </p>
                    )}

                    {/* CTA Button */}
                    <div className="mb-4">
                      <span
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`,
                          color: COLORS.navy800,
                          borderRadius: "12px",
                        }}
                      >
                        Bekijk case
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>

                    <div
                      className="flex justify-between text-sm pt-3 border-t"
                      style={{
                        color: COLORS.gray600,
                        borderColor: COLORS.gray200,
                      }}
                    >
                      <span className="font-medium">{caseItem.client}</span>
                      <span
                        className="font-bold"
                        style={{ color: COLORS.navy600 }}
                      >
                        {caseItem.year}
                      </span>
                    </div>
                  </div>

                  {/* Gouden progress underline */}
                  <span
                    className="absolute bottom-0 left-0 block h-1 w-0 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: COLORS.gold500 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Show All Link */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`,
                color: COLORS.navy800,
              }}
            >
              Bekijk alle projecten
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}