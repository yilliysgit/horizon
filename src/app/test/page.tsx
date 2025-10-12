"use client";
import React from "react";
import Link from "next/link";

/**
 * SboHero — Hero voor de SBO-overzichtspagina (AEO/GEO-ready)
 *
 * Kernprincipes voor AEO/GEO:
 * - Korte, citeerbare samenvatting (tlDr) met optioneel label (tldrLabel)
 * - Duidelijke, feitelijke claims (trustSignals) en verifieerbare ankers
 * - Semantische structuur + id's/anchors voor deeplinks vanuit AI-antwoord
 * - Optionele JSON-LD injectie (jsonLd) dicht bij de content
 */

export type SboHeroProps = {
  eyebrow?: string;
  title: React.ReactNode; // mag rich met <span> voor accentkleur
  subtitle?: string;
  tlDr?: string; // korte, citeerbare samenvatting; als leeg: niet renderen
  tldrLabel?: string | null; // "Kort:" | "Samenvatting:" | null (verberg label)
  breadcrumbs?: Array<{ label: string; href?: string }>;
  trustSignals?: string[]; // bv. ["SBB-erkend leerbedrijf", "VCA-gecertificeerd"]
  kpis?: Array<{ value: string; label: string }>; // bv. [{ value: "90%", label: "Doorstroom naar werk (12m)" }]
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  quickLinks?: Array<{ label: string; href: string }>; // deeplinks naar secties (HowTo, Cases, FAQ)
  image?: { src: string; alt: string; position?: "center" | "left" | "right" };
  overlayClassName?: string; // voor theming (bv. bg-black/50)
  jsonLd?: object; // optioneel: extra schema
  orgSlug?: string; // gebruikt voor id's/anchors
  className?: string;
};

export default function SboHero({
  eyebrow = "Samen leren bouwen aan de toekomst",
  title,
  subtitle,
  tlDr,
  tldrLabel = "Kort:",
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Partners", href: "/partners" },
    { label: "SBO / beroepsonderwijs" },
  ],
  trustSignals = ["SBB-erkend leerbedrijf", "VCA-gecertificeerd", "Leermeesters met onderwijservaring"],
  kpis = [{ value: "90%", label: "Doorstroom naar werk (12m)" }],
  ctaPrimary = { label: "Plan kennismaking / samenwerking", href: "?offerte=1" },
  ctaSecondary = { label: "Download informatiepakket", href: "/downloads/sbo-info.pdf" },
  quickLinks = [
    { label: "Stappenplan", href: "#howto-bpv" },
    { label: "Projecten", href: "#cases" },
    { label: "Veelgestelde vragen", href: "#faq" },
  ],
  image = {
    src: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1600&q=80&auto=format&fit=crop",
    alt: "Studenten en leermeester op bouwplaats",
    position: "center",
  },
  overlayClassName = "bg-black/50",
  jsonLd,
  orgSlug = "sbo",
  className = "",
}: SboHeroProps) {
  return (
    <header id="hero" className={`relative isolate ${className}`}>
      {/* Optional JSON-LD close to the hero for better association */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          // @ts-ignore: JSON stringified object
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${image.src})`, backgroundPosition: image.position || "center" }}
        role="img"
        aria-label={image.alt}
      />
      <div className={`absolute inset-0 -z-10 ${overlayClassName}`} aria-hidden />

      {/* Breadcrumbs */}
      <nav className="mx-auto max-w-7xl px-4 pt-6 text-sm text-white/80" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((bc, i) => (
            <li key={i} className="flex items-center gap-2">
              {bc.href ? (
                <Link href={bc.href} className="hover:text-white/100 underline-offset-2 hover:underline">
                  {bc.label}
                </Link>
              ) : (
                <span className="font-medium" aria-current="page">{bc.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span aria-hidden>›</span>}
            </li>
          ))}
        </ol>
      </nav>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        {eyebrow && (
          <p className="text-white/80 tracking-wide uppercase text-xs sm:text-sm mb-3">{eyebrow}</p>
        )}

        <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight max-w-3xl">{title}</h1>

        {/* Optional summary (AEO/GEO) */}
        {tlDr ? (
          <p className="mt-4 text-white/90 max-w-2xl" id={`tldr-${orgSlug}`}>
            {tldrLabel ? <strong>{tldrLabel} </strong> : null}
            {tlDr}
          </p>
        ) : null}

        {subtitle ? (
          <p className="mt-3 text-white/85 max-w-3xl">{subtitle}</p>
        ) : null}

        {/* CTA's */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {ctaPrimary ? (
            <Link href={ctaPrimary.href} className="rounded-2xl bg-white text-gray-900 px-5 py-3 font-medium shadow hover:shadow-md transition">
              {ctaPrimary.label}
            </Link>
          ) : null}
          {ctaSecondary ? (
            <Link href={ctaSecondary.href} className="rounded-2xl bg-white/10 text-white px-5 py-3 font-medium ring-1 ring-white/30 hover:bg-white/15 transition">
              {ctaSecondary.label}
            </Link>
          ) : null}
        </div>

        {/* Trust bar / KPIs */}
        {(trustSignals?.length || kpis?.length) ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
            {trustSignals?.slice(0, 2).map((t, idx) => (
              <div key={`trust-${idx}`} className="rounded-xl bg-white/10 text-white px-4 py-3 ring-1 ring-white/20">
                <span className="inline-block align-middle">✅</span>
                <span className="ml-2 align-middle">{t}</span>
              </div>
            ))}
            {kpis?.slice(0, 2).map((k, idx) => (
              <div key={`kpi-${idx}`} className="rounded-xl bg-white/10 text-white px-4 py-3 ring-1 ring-white/20">
                <div className="text-xl font-semibold">{k.value}</div>
                <div className="text-sm opacity-90">{k.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Quick links for deeplinks (AEO citeable anchors) */}
        {quickLinks?.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {quickLinks.map((q, i) => (
              <Link key={i} href={q.href} className="text-white/90 underline underline-offset-4 hover:text-white">
                {q.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
