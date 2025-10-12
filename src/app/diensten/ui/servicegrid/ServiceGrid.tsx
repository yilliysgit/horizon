"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  gray900: "#111827",
  gray700: "#374151",
  gray600: "#4b5563",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  white: "#ffffff",
};

export type ServiceItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string;
  features?: string[];
};

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: ServiceItem[];
  columns?: 1 | 2 | 3;
  ctaLabel?: string;
  className?: string;
};

export default function ServicesGrid({
  eyebrow,
  title,
  intro,
  items,
  columns = 3,
  ctaLabel = "Meer info",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section ref={ref} className={`relative py-16 md:py-24 px-6 bg-white ${className}`}>
      {/* header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm mb-6"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: COLORS.yellow600 }}
              />
              {eyebrow}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.45 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-5"
            style={{ color: COLORS.gray900, fontFamily: "Kanit, sans-serif" }}
          >
            {title}
          </motion.h2>

          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
              style={{ color: COLORS.gray600 }}
            >
              {intro}
            </motion.p>
          )}
        </div>

        {/* grid */}
        <div className={`grid gap-6 md:gap-8 ${colClass}`}>
          {items.map((it, index) => (
            <motion.article
              key={`${it.title}-${index}`}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="relative p-6 md:p-8 rounded-2xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: COLORS.gray200 }}
            >
              {it.badge && (
                <span
                  className="absolute top-4 right-4 text-xs px-3 py-1 rounded-lg"
                  style={{ background: `${COLORS.yellow600}20`, color: COLORS.yellow600 }}
                >
                  {it.badge}
                </span>
              )}

              <div className="space-y-6">
                {/* icon + title */}
                <div className="space-y-4">
                  <motion.div
                    className="inline-flex items-center justify-center p-4 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                      color: COLORS.white,
                      boxShadow: "0 6px 16px rgba(0,102,204,0.18)",
                    }}
                    animate={
                      reduce
                        ? undefined
                        : { scale: [1, 1.04, 1], rotate: [0, 1.5, 0] }
                    }
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
                  >
                    {it.icon}
                  </motion.div>

                  <h3
                    className="text-xl md:text-2xl font-semibold leading-snug"
                    style={{ color: COLORS.gray900, fontFamily: "Kanit, sans-serif" }}
                  >
                    {it.title}
                  </h3>
                </div>

                {/* description */}
                {it.desc && (
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.gray600 }}>
                    {it.desc}
                  </p>
                )}

                {/* optional features */}
                {it.features?.length ? (
                  <ul className="space-y-2">
                    {it.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: COLORS.yellow600 }}
                        />
                        <span className="text-sm" style={{ color: COLORS.gray700 }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* cta */}
                <div className="pt-2">
                  <a
                    href={it.href ?? "#"}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                      color: COLORS.white,
                    }}
                  >
                    {ctaLabel}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
