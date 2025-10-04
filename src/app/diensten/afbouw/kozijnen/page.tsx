"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * HomeHero – Horizon Totaalbouw
 * - Hoogte: min(100svh - var(--header-h, 80px))
 * - Geen offerteformulier; wel sterke CTA's
 * - Geanimeerde vierkantjes i.p.v. cirkels
 * - SEO/SEA-optimized copy (NL)
 *
 * Tip: zet in je layout/header: :root { --header-h: 80px; } of pas aan.
 */

type CTA = { label: string; href: string };

export default function HomeHero({
  className,
  ctaPrimary = { label: "Bekijk projecten", href: "/projecten" },
  ctaSecondary = { label: "Plan adviesgesprek", href: "/contact" },
}: {
  className?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
}) {
  return (
    <section
      className={[
        "relative isolate overflow-hidden",
        "bg-gradient-to-br from-blue-50 via-white to-orange-50",
        "px-6",
        className,
      ].join(" ")}
      style={{ minHeight: "calc(100svh - var(--header-h, 80px))" }}
      aria-label="Introsectie Horizon Totaalbouw"
    >
      {/* Decor: geanimeerde vierkantjes */}
      <SquaresBackground />

      <div className="container mx-auto grid h-full max-w-7xl gap-8 py-10 md:grid-cols-3 md:py-14">
        {/* Linkerzijde: key visual + badge */}
        <div className="md:col-span-2">
          <HeroImageCard />
        </div>

        {/* Rechterzijde: copy + CTA's + trust */}
        <div className="flex items-center">
          <aside className="w-full rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm">
            <header className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700/80">
                Horizon Totaalbouw
              </p>
              <h1 className="mt-2 text-balance text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                Aannemer voor <span className="text-blue-700">nieuwbouw</span>,{" "}
                <span className="text-blue-700">verbouwing</span> &{" "}
                <span className="text-blue-700">totaalrenovaties</span>
              </h1>
              <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-orange-500" />
            </header>

            <p className="text-pretty text-slate-700">
              Wij realiseren bouwprojecten van A tot Z —{" "}
              <strong>planning</strong>, <strong>ruwbouw</strong>,{" "}
              <strong>dakwerken</strong>, <strong>afwerking</strong> en{" "}
              <strong>installaties</strong>. Eén aanspreekpunt, vaste
              opleverafspraken en aantoonbaar <strong>vakmanschap</strong>.
            </p>

            {/* USP bullets voor SEO/CTR */}
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {[
                "Turn-key oplevering & transparant budget",
                "Gecertificeerde vakmensen en bouwbegeleiding",
                "Binnen 24 uur reactie op uw aanvraag",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 inline-block size-4 rounded-[4px] bg-gradient-to-br from-blue-600 to-blue-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {/* CTA's */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={ctaPrimary.href}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl"
                data-analytics="home_hero_cta_primary"
              >
                {ctaPrimary.label}
                <svg
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </a>
              <a
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-blue-200/80 text-blue-900 hover:bg-blue-50"
                data-analytics="home_hero_cta_secondary"
              >
                {ctaSecondary.label}
              </a>
            </div>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: "25+", l: "jaar ervaring" },
                { v: "9,3", l: "klantbeoordeling" },
                { v: "500+", l: "projecten opgeleverd" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-slate-200/80 bg-white p-4 text-center">
                  <div className="text-2xl font-semibold text-slate-900">{s.v}</div>
                  <div className="text-xs text-slate-600">{s.l}</div>
                </div>
              ))}
            </div>

            {/* NAP/SEO microcopy (zoekwoorden + telefoon voor SEA extensions) */}
            <p className="mt-5 text-xs text-slate-500">
              Betrouwbaar bouwbedrijf en aannemer voor particulieren en bedrijven. Bel{" "}
              <a className="font-medium text-blue-700 hover:underline" href="tel:+31852003300">
                085-200 3300
              </a>{" "}
              of plan een adviesgesprek.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ======================= Helpers / Partials ======================= */

function HeroImageCard() {
  return (
    <div
      className="relative h-[42vh] min-h-[320px] rounded-2xl border border-blue-100 shadow-xl md:h-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2080&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Bouwplaats met team: betrouwbaarheid en vakmanschap"
      role="img"
    >
      {/* Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-orange-600/60" />

      {/* Badge */}
      <div className="absolute left-5 top-5 z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          <span className="inline-block size-1.5 animate-ping rounded-full bg-white" />
          LIVE PROJECT
        </span>
      </div>

      {/* Text */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow md:text-3xl">Bouw met vertrouwen</h2>
          <p className="mt-2 max-w-xl text-sm text-white/95 md:text-base">
            Persoonlijke begeleiding en transparante communicatie bij elk project.
          </p>
        </div>
        <div>
          <a
            href="/projecten"
            className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-5 py-3 text-sm font-semibold text-slate-900 shadow transition hover:translate-y-[-1px] hover:shadow-lg"
          >
            Bekijk projecten
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Vierkantjes-achtergrond:
 * - Semitransparante vierkanten die zachtjes zweven/roteren (GPU-friendly transforms)
 * - Voor voorspelbaarheid gebruiken we vaste posities (geen random SSR mismatch)
 */
function SquaresBackground() {
  const squares = [
    { top: "8%", left: "6%", size: 18, delay: 0 },
    { top: "18%", left: "28%", size: 12, delay: 0.4 },
    { top: "30%", left: "8%", size: 14, delay: 0.8 },
    { top: "22%", left: "88%", size: 16, delay: 0.2 },
    { top: "62%", left: "90%", size: 12, delay: 0.6 },
    { top: "70%", left: "6%", size: 14, delay: 0.3 },
    { top: "78%", left: "36%", size: 18, delay: 0.9 },
    { top: "46%", left: "50%", size: 14, delay: 0.5 },
  ] as const;

  return (
    <>
      {/* subtiele grid glow */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.10]">
        <defs>
          <pattern id="sqgrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1c4f" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sqgrid)" />
      </svg>

      {/* floating squares */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {squares.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-[6px] bg-gradient-to-br from-blue-600/25 to-orange-500/25 shadow-[0_0_20px_rgba(59,130,246,0.18)]"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}vmin`,
              height: `${s.size}vmin`,
              backdropFilter: "blur(2px)",
            }}
            initial={{ opacity: 0, rotate: -6, x: -10, y: 10, scale: 0.9 }}
            animate={{
              opacity: [0.18, 0.32, 0.18],
              rotate: [ -6, 4, -6 ],
              x: [ -10, 10, -10 ],
              y: [ 10, -8, 10 ],
              scale: [0.95, 1.03, 0.95],
            }}
            transition={{
              duration: 10 + i * 0.6,
              delay: s.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}
