"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const COLORS = {
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc",
  blue600: "#1a73e8",
  blue500: "#3182ce",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333",
};

export type USPItem = {
  icon: React.ReactNode;
  title: string;
  desc?: string;
};

type USPGridProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: USPItem[];
  columns?: 2 | 3 | 4;
};

export default function USPGrid({
  eyebrow,
  title,
  intro,
  items,
  columns = 3,
}: USPGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getGridColumns = () => {
    switch (columns) {
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gray50} 50%, ${COLORS.white} 100%)`,
      }}
    >
      {/* Subtle background blobs (Horizon stijl) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-3xl"
          style={{ backgroundColor: `${COLORS.blue500}10` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-2xl"
          style={{ backgroundColor: `${COLORS.yellow600}10` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.1 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight tracking-tight"
            style={{ color: COLORS.gray900, fontFamily: "Kanit, sans-serif" }}
          >
            {title}
          </motion.h2>

          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: COLORS.gray600 }}
            >
              {intro}
            </motion.p>
          )}
        </motion.header>

        {/* Grid */}
        <div className={`grid gap-6 md:gap-8 ${getGridColumns()}`}>
          {items.map((usp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: 0.2 + idx * 0.06 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative backdrop-blur-sm transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gray50} 100%)`,
                border: `1px solid ${hoveredIndex === idx ? COLORS.blue700 : COLORS.gray200}`,
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 4px 12px rgba(17, 24, 39, 0.06)", // vaste subtiele schaduw
              }}
            >
              {/* Blauwe top-accent bij hover (optioneel) */}
              <div
                className="absolute top-0 left-0 w-full h-1 transition-opacity duration-300"
                style={{
                  background:
                    hoveredIndex === idx
                      ? `linear-gradient(90deg, ${COLORS.blue700}, ${COLORS.blue600})`
                      : "transparent",
                  borderRadius: "24px 24px 0 0",
                }}
              />

              {/* Lichte glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${COLORS.yellow600}0D, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  animate={hoveredIndex === idx ? { scale: 1.08, rotate: 3 } : { scale: 1, rotate: 0 }}
                  className="mb-6 inline-flex items-center justify-center p-4 rounded-2xl self-start"
                  style={{
                    background:
                      hoveredIndex === idx
                        ? `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`
                        : `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                    color: COLORS.white,
                    boxShadow: "none", // geen hover-shadow
                  }}
                >
                  {usp.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-semibold mb-4 transition-colors duration-300"
                  style={{
                    color: hoveredIndex === idx ? COLORS.blue700 : COLORS.ink,
                    fontFamily: "Kanit, sans-serif",
                  }}
                >
                  {usp.title}
                </h3>

                {/* Description */}
                {usp.desc && (
                  <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: COLORS.gray600 }}>
                    {usp.desc}
                  </p>
                )}

                {/* Hover indicator (subtiel, geen schaduw) */}
                <motion.div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.yellow600 }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.yellow500 }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.yellow600 }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: COLORS.yellow600 }} />
            <div className="w-16 h-0.5" style={{ backgroundColor: COLORS.gray200 }} />
            <div
              className="w-5 h-5 rounded-full animate-pulse"
              style={{ backgroundColor: COLORS.blue600, animationDelay: "0.5s" }}
            />
            <div className="w-16 h-0.5" style={{ backgroundColor: COLORS.gray200 }} />
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: COLORS.yellow500, animationDelay: "1s" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
