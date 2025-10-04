"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

/** Zelfde API als jouw demo */
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
};

const palettes = {
  blue: {
    gradient: "bg-gradient-to-b from-[#0B1C4F] via-[#0E2F92] to-[#0B1C4F]",
    text: "text-white",
    accent: "bg-amber-400",
    ring: "ring-amber-300/40",
  },
  midnight: {
    gradient: "bg-gradient-to-b from-[#0A0B12] via-[#121426] to-[#0A0B12]",
    text: "text-slate-100",
    accent: "bg-amber-400",
    ring: "ring-amber-300/30",
  },
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Home-optimized CategoryHero:
 * - Hoogte: 100svh - header (pas --header-h aan in je layout)
 * - Vierkantjes-animatie (i.p.v. cirkel-nodes)
 * - Copy semantisch & SEO-gericht
 */
export default function CategoryHero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  variant = "blue",
  className,
}: HeroHeaderProps) {
  const theme = palettes[variant];

  return (
    <section
      className={cx(
        "relative isolate overflow-hidden",
        theme.gradient,
        theme.text,
        "pt-28 pb-16 md:pt-36 md:pb-24",
        className
      )}
      style={{ minHeight: "calc(100svh - var(--header-h, 80px))" }}
      aria-label="Introductiesectie"
    >
      {/* Subtiele grid overlay */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.14]"
      >
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Zachte glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Eyebrow */}
        {eyebrow ? (
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            {eyebrow}
          </div>
        ) : null}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-4xl font-bold leading-tight md:text-6xl"
        >
          {title}
        </motion.h1>

        {/* Accent underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cx("mt-5 h-1 w-24 origin-left rounded-full", theme.accent)}
        />

        {/* SEO/SEA-optimized subkop */}
        {subtitle ? (
          <p className="mt-6 max-w-2xl text-pretty text-base/7 text-white/80 md:text-lg/8">
            {subtitle}
          </p>
        ) : null}

        {/* CTA's */}
        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {ctaPrimary && (
              <a
                href={ctaPrimary.href}
                className={cx(
                  "group inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium",
                  "bg-white text-slate-900 shadow/30 shadow-black/20 transition",
                  "hover:translate-y-[-1px] hover:shadow-lg focus:outline-none",
                  "ring-1 ring-white/10"
                )}
                data-analytics="hero_cta_primary"
              >
                {ctaPrimary.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}

            {ctaSecondary && (
              <a
                href={ctaSecondary.href}
                className={cx(
                  "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium",
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

        {/* Metrics */}
        {stats && stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:max-w-5xl">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <div className="flex items-baseline gap-1">
                  <div className="text-4xl font-semibold md:text-5xl">{s.value}</div>
                  {s.suffix && (
                    <div className="text-xl text-white/70 md:text-2xl">{s.suffix}</div>
                  )}
                </div>
                <div className="mt-1 text-sm text-white/70">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Vierkantjes-decoratie (onder-rechts) */}
      <SquaresDecoration />
    </section>
  );
}

/* === Decor met vierkantjes (GPU-friendly transforms) === */
function SquaresDecoration() {
  const squares = [
    { top: "64%", left: "68%", size: 18, delay: 0.0 },
    { top: "74%", left: "84%", size: 12, delay: 0.3 },
    { top: "86%", left: "56%", size: 14, delay: 0.6 },
    { top: "58%", left: "88%", size: 10, delay: 0.9 },
    { top: "78%", left: "72%", size: 16, delay: 1.2 },
  ] as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-[-8%] right-[-8%] -z-10 aspect-square w-[56vw] max-w-[860px]"
    >
      <div className="relative size-full overflow-visible">
        {/* licht ruitpatroon als mask/glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="size-full bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.28)_1px,transparent_1px)] bg-[size:14px_14px]" />
        </div>

        {/* floating squares */}
        {squares.map((s, idx) => (
          <motion.span
            key={idx}
            className="absolute rounded-[6px] bg-amber-400/90 shadow-[0_0_14px_rgba(251,191,36,0.55)]"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}vmin`,
              height: `${s.size}vmin`,
            }}
            initial={{ opacity: 0, rotate: -6, x: -8, y: 8, scale: 0.95 }}
            animate={{
              opacity: [0.22, 0.5, 0.22],
              rotate: [-6, 6, -6],
              x: [-8, 10, -8],
              y: [8, -10, 8],
              scale: [0.95, 1.03, 0.95],
            }}
            transition={{
              duration: 9 + idx * 0.8,
              delay: s.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
