"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const COLORS = {
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow700: "#d97706",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  gray900: "#111827",
  gray600: "#4b5563",
  gray200: "#e5e7eb",
  white: "#ffffff",
};

type BlobSpec = {
  w: number;
  h: number;
  left: string;
  top: string;
  color: string;
  dur: number;
  delay: number;
};

export type SubdienstIntroProps = {
  eyebrow?: string;
  title?: string;
  content: string;
  bullets?: Array<{
    icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    text: string;
  }>;
  highlightStats?: Array<{
    value: string;
    label: string;
  }>;
  className?: string;
};

export default function SubdienstIntro({
  eyebrow,
  title,
  content,
  bullets = [],
  highlightStats,
  className = "",
}: SubdienstIntroProps) {
  const reduce = useReducedMotion();

  /* Client-only blob generatie */
  const [blobs, setBlobs] = useState<BlobSpec[]>([]);
  useEffect(() => {
    const n = 3;
    const specs: BlobSpec[] = Array.from({ length: n }).map((_, i) => {
      const seed = i + 1;
      const rand = (min: number, max: number) =>
        min + ((Math.sin(seed * 777) + 1) / 2) * (max - min);
      const size = rand(120, 180);
      const left = `${rand(10, 85)}%`;
      const top = `${rand(10, 85)}%`;
      const color = i % 2 === 0 ? COLORS.blue700 : COLORS.yellow600;
      const dur = rand(22, 32);
      const delay = rand(0, 2);
      return { w: size, h: size, left, top, color, dur, delay };
    });
    setBlobs(specs);
  }, []);

  return (
    <section
      className={`relative py-16 md:py-24 px-6 md:px-12 overflow-hidden bg-white ${className}`}
    >
      {/* Achtergrond blobs - subtiel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.w,
              height: b.h,
              left: b.left,
              top: b.top,
              backgroundColor: b.color,
              opacity: 0.04,
              filter: "blur(40px)",
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: [0, 15, -10, 0],
                    y: [0, -15, 10, 0],
                    scale: [1, 1.08, 0.92, 1],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* LEFT: Text content */}
          <div className="w-full lg:w-1/2">
            {/* Eyebrow badge */}
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm mb-6">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: COLORS.yellow600 }}
                />
                {eyebrow}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Title */}
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-gray-900">
                  {title}
                </h2>
              )}

              {/* Content */}
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                {content}
              </p>

              {/* Stats - compacter */}
              {highlightStats && highlightStats.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {highlightStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                    >
                      <div className="text-2xl font-bold text-blue-700 tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT: Bullets - met cards */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              {bullets.map((bullet, index) => {
                const Icon = bullet.icon || CheckCircle;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    whileHover={reduce ? undefined : { x: 4, scale: 1.01, transition: { duration: 0.2 } }}
                    className="group relative bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                        }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Text */}
                      <p className="text-sm md:text-base font-medium text-gray-900 leading-relaxed flex-1">
                        {bullet.text}
                      </p>
                    </div>

                    {/* Hover gradient overlay */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.yellow600}05, transparent)`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// VOORBEELD GEBRUIK
export function ExampleUsage() {
  return (
    <SubdienstIntro
      eyebrow="Onze aanpak"
      title="Uw totaalrenovatie in goede handen"
      content="We begeleiden uw renovatie van eerste schets tot oplevering. Met één aanspreekpunt, een transparante planning en ons eigen vakteam blijft u altijd in control. We combineren traditioneel vakmanschap met moderne technieken en duurzame materialen."
      bullets={[
        {
          text: "Strakke planning: vaste afspraken en heldere mijlpalen per fase",
        },
        {
          text: "Eén aanspreekpunt: directe communicatie met uw projectleider",
        },
        {
          text: "Duurzaam materiaalgebruik: energie-efficiënt en toekomstbestendig",
        },
      ]}
      highlightStats={[
        { value: "25+", label: "Jaar ervaring" },
        { value: "500+", label: "Projecten" },
      ]}
    />
  );
}