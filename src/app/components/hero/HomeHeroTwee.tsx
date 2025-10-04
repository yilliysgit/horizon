"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

/* ---------- Public API (zelfde als jouw demo) ---------- */
export type Stat = { value: string | number; suffix?: string; label: string };
export type HeroHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  stats?: Stat[];
  variant?: "blue" | "midnight";
  className?: string;
  backgroundUrl?: string;
};

const palettes = {
  blue: {
    accent: "bg-amber-400",
    ring: "ring-amber-300/40",
    overlayFrom: "rgba(11,28,79,0.82)",
    overlayTo: "rgba(14,47,146,0.62)",
  },
  midnight: {
    accent: "bg-amber-400",
    ring: "ring-amber-300/30",
    overlayFrom: "rgba(10,11,18,0.84)",
    overlayTo: "rgba(18,20,38,0.62)",
  },
} as const;

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

/* ---------- Component ---------- */
export default function HomeHeroTwee({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  variant = "blue",
  className,
  backgroundUrl = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2100&q=80",
}: HeroHeaderProps) {
  const theme = palettes[variant];

  return (
    <section
      className={cx("relative isolate overflow-hidden", className)}
      style={{ minHeight: "calc(100svh - var(--header-h, 96px))" }}
      aria-label="Introductiesectie"
    >
      {/* 1) Achtergrondfoto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundUrl}')` }}
        role="img"
      />

      {/* 2) Diepe kleur-overlay voor contrast */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background: `linear-gradient(180deg, ${theme.overlayFrom} 0%, ${theme.overlayTo} 50%, ${theme.overlayFrom} 100%)`,
        }}
      />

      {/* 3) Vierkantjes-patroon (grid) – duidelijk zichtbaar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      >
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:22px_22px]" />
      </div>

      {/* 4) Animerende vierkanten – nu boven overlay/grid */}
      <SquaresField />

      {/* 5) Content */}
      <div className="container mx-auto max-w-screen-2xl px-6 relative z-10">
        <div className="py-24 md:py-32 lg:py-40">
          {eyebrow ? (
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
              {eyebrow}
            </div>
          ) : null}

          {/* H1: groter, zwaarder, zeker wit */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl font-extrabold leading-[1.05] text-white md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h1>

          {/* Accent-lijn */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cx("mt-6 h-1.5 w-28 origin-left rounded-full", theme.accent)}
          />

          {/* Subtitel in wit-tint */}
          {subtitle ? (
            <p className="mt-7 max-w-4xl text-pretty text-lg/8 text-white/90 md:text-xl/9">
              {subtitle}
            </p>
          ) : null}

          {/* CTA's */}
          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className={cx(
                    "group inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold",
                    "bg-white text-slate-900 shadow/30 shadow-black/20 transition",
                    "hover:translate-y-[-1px] hover:shadow-xl focus:outline-none",
                    "ring-1 ring-white/10"
                  )}
                  data-analytics="hero_cta_primary"
                >
                  {ctaPrimary.label}
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold",
                    "backdrop-blur-sm ring-1",
                    theme.ring,
                    "text-white/90 hover:text-white"
                  )}
                  data-analytics="hero_cta_secondary"
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="mt-14 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: 0.12 * i }}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md"
                >
                  <div className="flex items-baseline gap-1">
                    <div className="text-5xl font-bold text-white md:text-6xl">
                      {s.value}
                    </div>
                    {s.suffix && (
                      <div className="text-2xl text-white/70 md:text-3xl">
                        {s.suffix}
                      </div>
                    )}
                  </div>
                  <div className="mt-1.5 text-sm text-white/85">{s.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Achtergrond-vierkantjes (animatie) ---------- */
const SquaresField: React.FC = () => {
  // 14 vierkanten verspreid; vaste posities (geen hydration-issues)
  const squares = [
    { top: "6%", left: "8%", size: 16, d: 0.0 },
    { top: "12%", left: "28%", size: 11, d: 0.4 },
    { top: "9%", left: "72%", size: 13, d: 0.8 },
    { top: "22%", left: "52%", size: 15, d: 0.2 },
    { top: "30%", left: "12%", size: 12, d: 0.6 },
    { top: "34%", left: "84%", size: 18, d: 0.9 },
    { top: "46%", left: "6%", size: 13, d: 0.5 },
    { top: "52%", left: "38%", size: 16, d: 0.1 },
    { top: "58%", left: "64%", size: 12, d: 0.7 },
    { top: "66%", left: "88%", size: 13, d: 0.3 },
    { top: "72%", left: "24%", size: 19, d: 1.1 },
    { top: "78%", left: "48%", size: 12, d: 0.6 },
    { top: "84%", left: "70%", size: 15, d: 0.4 },
    { top: "88%", left: "10%", size: 11, d: 0.95 },
  ] as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      {squares.map((s, idx) => (
        <motion.span
          key={idx}
          className="absolute rounded-[7px] bg-white/12"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}vmin`,
            height: `${s.size}vmin`,
            boxShadow: "0 0 26px rgba(255,255,255,0.10)",
          }}
          initial={{ opacity: 0.0, rotate: -4, x: -10, y: 10, scale: 0.92 }}
          animate={{
            opacity: [0.08, 0.18, 0.08],
            scale: [0.94, 1.05, 0.94],
            rotate: [-4, 4, -4],
            x: [-8, 10, -8],
            y: [8, -8, 8],
          }}
          transition={{
            duration: 12 + idx * 0.7,
            delay: s.d,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
