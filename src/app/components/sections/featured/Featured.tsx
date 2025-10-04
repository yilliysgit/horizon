"use client";

import React from "react";
import Link from "next/link";
import AppIcon from "../../iconRenderer/IconRenderer";

type FeatureCard = {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  icon: string; // Phosphor (bv. "Buildings", "Hammer", "HardHat")
};

/** Alleen deze array aanpassen als je content wisselt */
const featureCards: FeatureCard[] = [
  {
    id: 1,
    title: "Totaalbouw",
    description:
      "Van casco tot sleutelklare oplevering. Eén aanspreekpunt, strakke planning en hoogwaardig vakwerk.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Bekijk totaalbouw",
    ctaLink: "/diensten/totaalbouw",
    icon: "Buildings",
  },
  {
    id: 2,
    title: "Ruwbouw",
    description:
      "Fundering, metselwerk en constructie. Een robuuste basis met focus op veiligheid en draagkracht.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Alles over ruwbouw",
    ctaLink: "/diensten/ruwbouw",
    icon: "Hammer",
  },
];

const BeautifulFeatureSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-16"
      aria-labelledby="features-title"
    >
      {/* Achtergrond */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800" />

      {/* Decoratieve blur-bollen */}
      <div className="pointer-events-none absolute -top-16 left-1/3 h-[420px] w-[420px] rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
      <div className="pointer-events-none absolute top-1/3 left-4 h-28 w-28 rounded-full bg-brand-500/10 blur-xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            id="features-title"
            className="mb-4 text-3xl font-bold text-white md:text-4xl"
          >
            Waarom kiezen voor Horizon Totaalbouw?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            Ervaren aannemer voor{" "}
            <strong>totaalbouw, ruwbouw, renovatie en afbouw</strong>. Vaste
            contactpersoon, strakke planning en VCA-gecertificeerd team.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Feature cards (links) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
            {featureCards.map(
              ({ id, title, description, image, ctaText, ctaLink, icon }) => (
                <article
                  key={id}
                  aria-labelledby={`feature-${id}-title`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={`${title} – projectvoorbeeld`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/800x400/111827/ffffff?text=Bouwproject";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Icon badge */}
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 p-2 shadow">
                      <AppIcon
                        name={icon}
                        size={26}
                        className="h-6 w-6 text-brand"
                        weight="duotone"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      id={`feature-${id}-title`}
                      className="mb-2 text-xl font-bold text-gray-900"
                    >
                      {title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                      {description}
                    </p>

                    <Link
                      href={ctaLink}
                      aria-label={`${ctaText} – Horizon Totaalbouw`}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand via-brand to-brand-700 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2"
                    >
                      <span>{ctaText}</span>
                      <AppIcon name="ArrowRight" size={18} className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>

          {/* Rechter banner (USP/CTA) */}
          <aside
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-700 to-brand-800 shadow-xl"
            aria-label="Zorgeloze bouw"
          >
            {/* patroon */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,.18) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            {/* image tint (optioneel) */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img
                src="https://images.unsplash.com/photo-1523419409543-8f6f9a5b0b9b?auto=format&fit=crop&w=1200&q=70"
                alt="Bouwplaats – uitvoering op locatie"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* content */}
            <div className="relative flex h-full flex-col justify-between p-8 text-white">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur">
                  <AppIcon name="ShieldCheck" size={16} className="h-4 w-4" />
                  <span className="text-sm font-bold">Gecertificeerd & veilig</span>
                </div>

                <h3 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
                  Bouw zonder zorgen — strak gepland, vakkundig uitgevoerd
                </h3>

                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center gap-2">
                    <AppIcon name="CalendarCheck" size={18} className="h-4 w-4" />
                    Strakke planning & heldere communicatie
                  </li>
                  <li className="flex items-center gap-2">
                    <AppIcon name="HardHat" size={18} className="h-4 w-4" />
                    VCA-gecertificeerd team op elke klus
                  </li>
                  <li className="flex items-center gap-2">
                    <AppIcon name="Wrench" size={18} className="h-4 w-4" />
                    Afwerking op hoog niveau (interieur & exterieur)
                  </li>
                </ul>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href="/over-ons"
                  className="block w-full rounded-xl border-2 border-white/40 px-6 py-3 text-center font-semibold text-white transition-all hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2"
                >
                  Over ons
                </Link>
                <Link
                  href="/diensten"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-amber-500 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2"
                >
                  <span>Alle diensten</span>
                  <AppIcon name="ArrowRight" size={18} className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* onderlijn */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
    </section>
  );
};

export default BeautifulFeatureSection;
