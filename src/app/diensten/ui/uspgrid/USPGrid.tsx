"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const HORIZON_COLORS = {
  navy800: "#00296b",
  navy700: "#003f88", 
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333"
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
        background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 50%, ${HORIZON_COLORS.white} 100%)`
      }}
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${HORIZON_COLORS.gold500} 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, ${HORIZON_COLORS.navy600} 1px, transparent 1px),
                           radial-gradient(circle at 40% 40%, ${HORIZON_COLORS.gold400} 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 80px 80px, 60px 60px'
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-20 w-24 h-24 opacity-10"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full rounded-full blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${HORIZON_COLORS.gold500} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-20 w-32 h-32 opacity-10"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full rounded-full blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${HORIZON_COLORS.navy600} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800}15, ${HORIZON_COLORS.navy700}10)`,
                border: `1px solid ${HORIZON_COLORS.navy700}30`
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: HORIZON_COLORS.gold500 }}
              />
              <span 
                className="text-sm font-bold tracking-wide uppercase"
                style={{ 
                  color: HORIZON_COLORS.navy800,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                {eyebrow}
              </span>
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: HORIZON_COLORS.gold400 }}
              />
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            {title}
          </motion.h2>

          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: HORIZON_COLORS.gray600 }}
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
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              style={{
                background: hoveredIndex === idx 
                  ? `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`
                  : `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
                border: `1px solid ${hoveredIndex === idx ? HORIZON_COLORS.gold500 : HORIZON_COLORS.gray200}`,
                borderRadius: '24px',
                padding: '32px',
                boxShadow: hoveredIndex === idx 
                  ? `0 20px 40px rgba(253, 197, 0, 0.15), 0 8px 16px rgba(51, 51, 51, 0.08)` 
                  : `0 4px 12px rgba(51, 51, 51, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
              }}
            >
              {/* Gouden accent strip */}
              <div 
                className="absolute top-0 left-0 w-full h-1 transition-all duration-300"
                style={{ 
                  background: hoveredIndex === idx 
                    ? `linear-gradient(90deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                    : 'transparent',
                  borderRadius: '24px 24px 0 0'
                }}
              />

              {/* Background glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${HORIZON_COLORS.gold500}08, transparent 70%)`
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  animate={hoveredIndex === idx ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className="mb-6 inline-flex items-center justify-center p-4 rounded-2xl self-start"
                  style={{
                    background: hoveredIndex === idx 
                      ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                      : `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
                    color: hoveredIndex === idx ? HORIZON_COLORS.navy800 : HORIZON_COLORS.gold500,
                    boxShadow: hoveredIndex === idx 
                      ? `0 8px 24px rgba(253, 197, 0, 0.3)`
                      : `0 4px 12px rgba(0, 41, 107, 0.3)`
                  }}
                >
                  {usp.icon}
                </motion.div>

                {/* Title */}
                <h3 
                  className="text-xl md:text-2xl font-bold mb-4 transition-colors duration-300"
                  style={{ 
                    color: hoveredIndex === idx ? HORIZON_COLORS.gold500 : HORIZON_COLORS.ink,
                    fontFamily: "Kanit, sans-serif"
                  }}
                >
                  {usp.title}
                </h3>

                {/* Description */}
                {usp.desc && (
                  <p 
                    className="text-sm md:text-base leading-relaxed flex-1"
                    style={{ color: HORIZON_COLORS.gray600 }}
                  >
                    {usp.desc}
                  </p>
                )}

                {/* Hover indicator */}
                <motion.div
                  className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: HORIZON_COLORS.gold500 }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: HORIZON_COLORS.gold400 }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: HORIZON_COLORS.gold500 }}
                  />
                </motion.div>
              </div>

              {/* Floating decoration on hover */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: HORIZON_COLORS.gold500 }}
                animate={hoveredIndex === idx ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            <div 
              className="w-16 h-0.5"
              style={{ backgroundColor: HORIZON_COLORS.gray200 }}
            />
            <div 
              className="w-5 h-5 rounded-full animate-pulse"
              style={{ 
                backgroundColor: HORIZON_COLORS.navy600,
                animationDelay: '0.5s'
              }}
            />
            <div 
              className="w-16 h-0.5"
              style={{ backgroundColor: HORIZON_COLORS.gray200 }}
            />
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                backgroundColor: HORIZON_COLORS.gold400,
                animationDelay: '1s'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}