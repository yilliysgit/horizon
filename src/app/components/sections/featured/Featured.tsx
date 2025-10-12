"use client";

import React from "react";
import Link from "next/link";
import AppIcon from "../../iconRenderer/IconRenderer";

/*
  BeautifulFeatureSection — Consistent met Hero & WhyChooseUs
  - Blue (#0066cc) + Yellow (#f59e0b)
  - Lichtere font-weights (500-600)
  - SEO-geoptimaliseerde content
  - Betere spacing & hierarchy
*/

const COLORS = {
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc",
  blue600: "#1a73e8",
  blue500: "#3182ce",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
};

type FeatureCard = {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  icon: string;
};

const featureCards: FeatureCard[] = [
  {
    id: 1,
    title: "Totaalbouw Amsterdam",
    description:
      "Van casco tot sleutelklare oplevering. Eén aanspreekpunt voor totaalrenovaties, nieuwbouw en uitbreidingen met strakke planning.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Meer over totaalbouw",
    ctaLink: "/diensten/totaalbouw",
    icon: "Buildings",
  },
  {
    id: 2,
    title: "Ruwbouw & Nieuwbouw",
    description:
      "Fundaties, metselwerk en draagconstructies. Vakkundig uitgevoerd met VCA-gecertificeerd team en focus op veiligheid.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Bekijk ruwbouw",
    ctaLink: "/diensten/ruwbouw",
    icon: "Hammer",
  },
];

const BeautifulFeatureSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      aria-labelledby="services-title"
      style={{
        background: `linear-gradient(180deg, ${COLORS.blue700} 0%, ${COLORS.blue800} 100%)`,
      }}
    >
      {/* Decoratieve blur-bollen - subtiel */}
      <div 
        className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: COLORS.blue500 }}
      />
      <div 
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: COLORS.yellow600 }}
      />
      <div 
        className="pointer-events-none absolute top-1/2 left-8 h-32 w-32 rounded-full blur-2xl opacity-10"
        style={{ backgroundColor: COLORS.yellow500 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header - SEO optimized */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm mb-6">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.yellow600 }} />
            Onze Diensten
          </div>

          <h2
            id="services-title"
            className="mb-5 text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight"
          >
            Totaaloplossingen voor bouw & renovatie
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-white/90 leading-relaxed font-normal">
            Specialist in{" "}
            <strong className="font-medium text-white">totaalbouw</strong>,{" "}
            <strong className="font-medium text-white">ruwbouw</strong> en{" "}
            <strong className="font-medium text-white">complete renovaties</strong> in Amsterdam. 
            Van eerste schets tot sleuteloverdracht.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          
          {/* Feature cards (links) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-2">
            {featureCards.map(
              ({ id, title, description, image, ctaText, ctaLink, icon }) => (
                <article
                  key={id}
                  aria-labelledby={`feature-${id}-title`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={image}
                      alt={`${title} - Horizon Totaalbouw project Amsterdam`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/800x400/0066cc/ffffff?text=Bouwproject";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Icon badge - Yellow accent */}
                    <div 
                      className="absolute left-4 top-4 rounded-xl p-2.5 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})` 
                      }}
                    >
                      <AppIcon
                        name={icon}
                        size={24}
                        className="text-white"
                        weight="duotone"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      id={`feature-${id}-title`}
                      className="mb-3 text-xl md:text-2xl font-semibold text-gray-900 leading-tight"
                    >
                      {title}
                    </h3>
<p className="mb-6 text-base md:text-lg leading-relaxed text-gray-600">
                      {description}
                    </p>

                    <Link
                      href={ctaLink}
                      aria-label={`${ctaText} - Horizon Totaalbouw Amsterdam`}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                      }}
                    >
                      <span>{ctaText}</span>
                      <AppIcon name="ArrowRight" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>

          {/* Rechter banner (USP/CTA) */}
          <aside
            className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
            aria-label="Waarom Horizon Totaalbouw"
            style={{
              background: `linear-gradient(180deg, ${COLORS.blue800} 0%, ${COLORS.blue900} 100%)`,
            }}
          >
            {/* Patroon overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,.2) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Image tint (subtiel) */}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay">
              <img
                src="https://images.unsplash.com/photo-1523419409543-8f6f9a5b0b9b?auto=format&fit=crop&w=1200&q=70"
                alt="Bouwplaats Amsterdam - professionele uitvoering"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative flex h-full flex-col justify-between p-8 text-white">
              <div>
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <AppIcon name="ShieldCheck" size={16} className="text-white" />
                  <span className="text-sm font-medium">VCA Gecertificeerd</span>
                </div>

                {/* Heading */}
                <h3 className="mb-4 text-2xl md:text-3xl font-semibold leading-tight">
                  Bouw zonder zorgen in Amsterdam
                </h3>

                <p className="mb-6 text-sm md:text-base text-white/90 leading-relaxed">
                  Strakke planning, transparante communicatie en vakkundig team voor elk bouwproject.
                </p>

                {/* USP lijst */}
<ul className="space-y-3 text-base md:text-lg text-white/90">
                  <li className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 rounded-lg p-1.5 mt-0.5"
                      style={{ backgroundColor: COLORS.yellow600 }}
                    >
                      <AppIcon name="CalendarCheck" size={16} className="text-white" />
                    </div>
                    <span>Heldere planning & vaste deadlines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 rounded-lg p-1.5 mt-0.5"
                      style={{ backgroundColor: COLORS.yellow600 }}
                    >
                      <AppIcon name="HardHat" size={16} className="text-white" />
                    </div>
                    <span>Eigen vakteam, geen onderaannemers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div 
                      className="flex-shrink-0 rounded-lg p-1.5 mt-0.5"
                      style={{ backgroundColor: COLORS.yellow600 }}
                    >
                      <AppIcon name="Wrench" size={16} className="text-white" />
                    </div>
                    <span>Hoogwaardige afwerking & garantie</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 space-y-3">
                <Link
                  href="/over-ons"
                  className="block w-full rounded-xl border-2 border-white/30 px-6 py-3.5 text-center font-medium text-white transition-all hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Over Horizon Totaalbouw
                </Link>
                <Link
                  href="/diensten"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-medium text-white transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                  }}
                >
                  <span>Bekijk alle diensten</span>
                  <AppIcon 
                    name="ArrowRight" 
                    size={18} 
                    className="transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.yellow600}40, transparent)`,
        }}
      />
    </section>
  );
};

export default BeautifulFeatureSection;