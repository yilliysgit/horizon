'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';

/*
  ---------------------------------------------------------------------------
  Diensten Overzicht - HARD CODED Horizon Colors
  - Geen CSS variabelen, alles hard-coded
  - Gouden kleuren gegarandeerd zichtbaar
  ---------------------------------------------------------------------------
*/

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

/* =========================
   Types
========================= */
export type CategoryId =
  | 'totaalbouw'
  | 'ruwbouw'
  | 'dakwerken'
  | 'afbouw'
  | 'interieurbouw'
  | 'Installaties';

export type Href = `/${string}` | `http${string}`;

export type ServiceItem = {
  label: string;
  slug: string;
  ctaHref?: Href;
  excerpt?: string;
  description?: string;
  thumb?: string;
  icon?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

export type CategoryMetrics = {
  projects?: number;
  satisfactionPct?: number;
  avgDuration?: string;
  order?: number;
};

export type ServiceCategory = {
  id: CategoryId;
  title: string;
  description: string;
  items: ServiceItem[];
  ctaHref?: Href;
  icon?: string;
  heroImage?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
  metrics?: CategoryMetrics;
};

export type ServiceCategoryList = ReadonlyArray<ServiceCategory>;

/* =========================
   Helpers
========================= */
const fallbacks: Record<CategoryId, string> = {
  totaalbouw:
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop',
  ruwbouw:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
  dakwerken:
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
  afbouw:
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop',
  interieurbouw:
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop',
  Installaties:
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80&auto=format&fit=crop',
};

const coverFor = (cat: ServiceCategory) =>
  cat.heroImage || cat.items.find((i) => i.thumb)?.thumb || fallbacks[cat.id];

/* =========================
   ServiceCard - HARD CODED GOLD
========================= */
type CardProps = { category: ServiceCategory; index: number };

function ServiceCard({ category, index }: CardProps) {
  const href = (category.ctaHref ?? (`/diensten/${category.id}` as Href)) as string;
  const cover = coverFor(category);
  const { projects, satisfactionPct, avgDuration, order } = category.metrics ?? {};
  const remaining = Math.max(category.items.length - 4, 0);

  return (
    <div 
      className="group relative flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2"
      style={{
        background: HORIZON_COLORS.white,
        border: `1px solid ${HORIZON_COLORS.gray200}`,
        borderRadius: "20px",
        padding: "0",
        boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
      }}
    >
      {/* COVER */}
      <Link
        href={href}
        aria-label={`Bekijk ${category.title}`}
        className="relative block h-56 md:h-60 will-change-transform transition-transform duration-700 focus-visible:ring-2 focus-visible:ring-blue-500/30"
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        <Image
          src={cover}
          alt={category.seo?.title ?? category.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ backgroundColor: HORIZON_COLORS.gray100 }}
          sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

        {/* rechtsboven badges */}
        <div className="absolute right-3 top-3 space-y-2">
          <span 
            className="px-3 py-1 text-xs font-semibold shadow backdrop-blur rounded-full"
            style={{
              background: "rgba(255,255,255,0.9)",
              color: HORIZON_COLORS.ink,
              border: "none"
            }}
          >
            {category.items.length} diensten
          </span>
          {avgDuration && (
            <span 
              className="px-3 py-1 text-xs font-semibold backdrop-blur rounded-full"
              style={{
                background: "rgba(0,0,0,0.6)",
                color: HORIZON_COLORS.white,
                border: "none"
              }}
            >
              {avgDuration}
            </span>
          )}
        </div>

        {/* GOUDEN volgnummer - HARD CODED */}
        <div 
          className="absolute left-3 top-3 grid h-12 w-12 place-items-center text-sm font-bold shadow"
          style={{
            background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
            color: HORIZON_COLORS.navy800,
            borderRadius: "12px",
            fontFamily: "Kanit, sans-serif"
          }}
        >
          {String(order ?? index + 1).padStart(2, '0')}
        </div>

        {/* onder: stats */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white">
          {typeof projects === 'number' && (
            <span 
              className="px-2 py-1 text-xs font-semibold backdrop-blur rounded-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                color: HORIZON_COLORS.white,
                border: "none"
              }}
            >
              {projects}+ <span className="font-normal text-white/80">projecten</span>
            </span>
          )}
          {typeof satisfactionPct === 'number' && (
            <span 
              className="px-2 py-1 text-xs font-semibold backdrop-blur rounded-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                color: HORIZON_COLORS.white,
                border: "none"
              }}
            >
              {satisfactionPct}% <span className="font-normal text-white/80">tevredenheid</span>
            </span>
          )}
        </div>

        {/* GOUDEN Corner accent */}
        <div 
          className="absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2" 
          style={{ 
            borderColor: HORIZON_COLORS.gold500,
            borderTopLeftRadius: "8px"
          }} 
        />
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6">
        {/* Titel */}
        <h2 className="text-2xl font-bold" style={{ fontFamily: "Kanit, sans-serif" }}>
          <Link
            href={href}
            className="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 rounded"
            style={{ 
              color: HORIZON_COLORS.ink,
              textDecoration: "none"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = HORIZON_COLORS.navy600 }}
            onMouseLeave={(e) => { e.currentTarget.style.color = HORIZON_COLORS.ink }}
          >
            {category.title}
          </Link>
        </h2>

        {/* Beschrijving */}
        <p 
          className="mt-2 text-sm leading-relaxed line-clamp-3"
          style={{ color: HORIZON_COLORS.gray600 }}
        >
          {category.description}
        </p>

        {/* GOUDEN Features lijst */}
        <ul className="mt-4 space-y-2">
          {category.items.slice(0, 4).map((item) => (
            <li key={item.slug} className="flex items-center gap-3 text-sm">
              <span 
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: HORIZON_COLORS.gold500 }}
              />
              <span 
                className="font-semibold"
                style={{ color: HORIZON_COLORS.ink }}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <div className="mt-4">
            <span 
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
              style={{
                background: HORIZON_COLORS.gray100,
                color: HORIZON_COLORS.gray600,
                border: `1px solid ${HORIZON_COLORS.gray200}`
              }}
            >
              Nog {remaining} {remaining === 1 ? 'dienst' : 'diensten'}
            </span>
          </div>
        )}

        {/* GOUDEN CTA button - HARD CODED */}
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
                color: HORIZON_COLORS.navy800,
                borderRadius: "12px",
                textDecoration: "none"
              }}
            >
              Meer informatie
              <ArrowRight className="h-4 w-4" />
            </Link>
            {/* Microcopy */}
            <span className="text-sm font-medium" style={{ color: HORIZON_COLORS.gray600 }}>
              Snel overzicht
            </span>
          </div>
        </div>

        {/* GOUDEN Progress underline */}
        <span 
          className="pointer-events-none absolute bottom-0 left-0 block h-1 w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: HORIZON_COLORS.gold500 }}
        />
      </div>
    </div>
  );
}

/* =========================
   Demo data
========================= */
const serviceCategories: ServiceCategoryList = [
  {
    id: 'totaalbouw',
    title: 'Totaalbouw',
    description:
      'Van casco tot sleutelklare oplevering: wij realiseren complete verbouwingen die technisch kloppen, esthetisch sterk zijn en volledig aansluiten bij jouw wensen.',
    ctaHref: '/diensten/totaalbouw',
    metrics: { projects: 180, satisfactionPct: 98, avgDuration: '12–16 weken', order: 1 },
    items: [
      { label: 'Complete renovaties', slug: 'complete-renovaties', ctaHref: '/diensten/totaalbouw/complete-renovaties' },
      { label: 'Op- en aanbouwen', slug: 'op-en-aanbouwen', ctaHref: '/diensten/totaalbouw/op-en-aanbouwen' },
      { label: 'Verbouwingen op maat', slug: 'verbouwingen-op-maat', ctaHref: '/diensten/totaalbouw/verbouwingen-op-maat' },
      { label: 'Renovatieadvies & ontwerp', slug: 'renovatieadvies-ontwerp', ctaHref: '/diensten/totaalbouw/renovatieadvies-ontwerp' },
      { label: 'Herbestemmingen', slug: 'herbestemmingen', ctaHref: '/diensten/totaalbouw/herbestemmingen' },
      { label: 'Projectcoördinatie', slug: 'projectcoordinatie', ctaHref: '/diensten/totaalbouw/projectcoordinatie' },
    ],
  },
  {
    id: 'ruwbouw',
    title: 'Ruwbouw',
    description:
      'De stevige basis van ieder bouwproject: funderingen, dragende constructies en ruwbouwafwerking met vakmanschap en precisie.',
    ctaHref: '/diensten/ruwbouw',
    metrics: { projects: 250, satisfactionPct: 96, avgDuration: '8–12 weken', order: 2 },
    items: [
      { label: 'Funderingen', slug: 'funderingen', ctaHref: '/diensten/ruwbouw/funderingen' },
      { label: 'Dragende constructies', slug: 'dragende-constructies', ctaHref: '/diensten/ruwbouw/dragende-constructies' },
      { label: 'Metselwerk', slug: 'metselwerk', ctaHref: '/diensten/ruwbouw/metselwerk' },
      { label: 'Ruwbouw timmerwerk', slug: 'ruwbouw-timmerwerk', ctaHref: '/diensten/ruwbouw/ruwbouw-timmerwerk' },
      { label: 'Betonwerken', slug: 'betonwerken', ctaHref: '/diensten/ruwbouw/betonwerken' },
      { label: 'Kelderbouw', slug: 'kelderbouw', ctaHref: '/diensten/ruwbouw/kelderbouw' },
    ],
  },
  {
    id: 'dakwerken',
    title: 'Dakwerken',
    description:
      'Van nieuwe daken tot renovatie, isolatie en onderhoud: wij leveren vakmanschap voor een duurzaam en waterdicht resultaat.',
    ctaHref: '/diensten/dakwerken',
    metrics: { projects: 320, satisfactionPct: 99, avgDuration: '3–6 weken', order: 3 },
    items: [
      { label: 'Nieuwe daken', slug: 'nieuwe-daken', ctaHref: '/diensten/dakwerken/nieuwe-daken' },
      { label: 'Dakrenovaties', slug: 'dakrenovaties', ctaHref: '/diensten/dakwerken/dakrenovaties' },
      { label: 'Dakisolatie', slug: 'dakisolatie', ctaHref: '/diensten/dakwerken/dakisolatie' },
      { label: 'Dakramen & lichtkoepels', slug: 'dakramen-lichtkoepels', ctaHref: '/diensten/dakwerken/dakramen-lichtkoepels' },
      { label: 'Zink- en koperwerk', slug: 'zink-koperwerk', ctaHref: '/diensten/dakwerken/zink-koperwerk' },
      { label: 'Dakgoten & regenafvoer', slug: 'dakgoten-regenafvoer', ctaHref: '/diensten/dakwerken/dakgoten-regenafvoer' },
    ],
  },
  {
    id: 'afbouw',
    title: 'Afbouw & Afwerking',
    description: 'Perfecte finishing touch voor binnen en buiten.',
    ctaHref: '/diensten/afbouw',
    metrics: { projects: 290, satisfactionPct: 97, avgDuration: '6–10 weken', order: 4 },
    items: [
      { label: 'Afbouw timmerwerk', slug: 'afbouw-timmerwerk', ctaHref: '/diensten/afbouw/afbouw-timmerwerk' },
      { label: 'Wanden & plafonds', slug: 'wanden-plafonds', ctaHref: '/diensten/afbouw/wanden-plafonds' },
      { label: 'Stuc- en pleisterwerk', slug: 'stuc-pleisterwerk', ctaHref: '/diensten/afbouw/stuc-pleisterwerk' },
      { label: 'Vloeren & tegelwerk', slug: 'vloeren-tegelwerk', ctaHref: '/diensten/afbouw/vloeren-tegelwerk' },
      { label: 'Schilder- en lakwerk', slug: 'schilder-lakwerk', ctaHref: '/diensten/afbouw/schilder-lakwerk' },
      { label: 'Binnen- & buitendeuren', slug: 'binnen-buitendeuren', ctaHref: '/diensten/afbouw/binnen-buitendeuren' },
    ],
  },
  {
    id: 'interieurbouw',
    title: 'Interieurbouw',
    description:
      'Maatwerk interieuroplossingen die jouw woning of kantoor een unieke uitstraling geven. Van keukens en badkamers tot meubels en trappen.',
    ctaHref: '/diensten/interieurbouw',
    metrics: { projects: 150, satisfactionPct: 98, avgDuration: '4–8 weken', order: 5 },
    items: [
      { label: 'Keukens', slug: 'keukens', ctaHref: '/diensten/interieurbouw/keukens' },
      { label: 'Badkamers', slug: 'badkamers', ctaHref: '/diensten/interieurbouw/badkamers' },
      { label: 'Toiletten', slug: 'toiletten', ctaHref: '/diensten/interieurbouw/toiletten' },
      { label: 'Inbouwkasten & maatwerkmeubels', slug: 'inbouwkasten-maatwerkmeubels', ctaHref: '/diensten/interieurbouw/inbouwkasten-maatwerkmeubels' },
      { label: 'Trappen & leuningen', slug: 'trappen-leuningen', ctaHref: '/diensten/interieurbouw/trappen-leuningen' },
      { label: 'Interieurbekleding', slug: 'interieurbekleding', ctaHref: '/diensten/interieurbouw/interieurbekleding' },
    ],
  },
  {
    id: 'Installaties',
    title: 'Installaties',
    description:
      'Moderne technieken, slimme systemen en duurzame oplossingen: wij verzorgen alle installaties in jouw woning of bedrijfspand.',
    ctaHref: '/diensten/installaties',
    metrics: { projects: 400, satisfactionPct: 95, avgDuration: '2–4 weken', order: 6 },
    items: [
      { label: 'Elektrotechniek', slug: 'elektrotechniek', ctaHref: '/diensten/installaties/elektrotechniek' },
      { label: 'Loodgieterswerk', slug: 'loodgieterswerk', ctaHref: '/diensten/installaties/loodgieterswerk' },
      { label: 'Verwarming & ventilatie', slug: 'verwarming-ventilatie', ctaHref: '/diensten/installaties/verwarming-ventilatie' },
      { label: 'Airco & warmtepompen', slug: 'airco-warmtepompen', ctaHref: '/diensten/installaties/airco-warmtepompen' },
      { label: 'Domotica & smart home', slug: 'domotica-smart-home', ctaHref: '/diensten/installaties/domotica-smart-home' },
      { label: 'Zonnepanelen & duurzame energie', slug: 'zonnepanelen-duurzame-energie', ctaHref: '/diensten/installaties/zonnepanelen-duurzame-energie' },
    ],
  },
];

/* =========================
   Compacte CTA - HARD CODED
========================= */
function CompactCTA() {
  return (
    <section 
      className="mx-auto max-w-6xl p-10 text-center shadow-lg"
      style={{
        background: HORIZON_COLORS.ink,
        border: `1px solid ${HORIZON_COLORS.gray600}`,
        borderRadius: "20px",
        color: HORIZON_COLORS.white
      }}
    >
      <h2 
        className="mx-auto mb-2 max-w-3xl text-2xl font-bold md:text-3xl"
        style={{ 
          color: HORIZON_COLORS.white,
          fontFamily: "Kanit, sans-serif"
        }}
      >
        Bespreek uw plannen met onze specialisten
      </h2>
      <p 
        className="mx-auto mb-7 max-w-2xl text-lg leading-relaxed"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        Vrijblijvend advies en een offerte op maat.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="#offerte"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          style={{ 
            background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
            color: HORIZON_COLORS.navy800,
            borderRadius: "12px",
            textDecoration: "none"
          }}
        >
          Plan een gesprek
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="tel:0201234567"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300"
          style={{
            background: "transparent",
            color: HORIZON_COLORS.white,
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "12px",
            textDecoration: "none"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
        >
          <Phone className="h-4 w-4" />
          020 123 4567
        </a>
      </div>
    </section>
  );
}

/* =========================
   Pagina - HARD CODED COLORS
========================= */
export default function DienstenOverzicht() {
  return (
    <section style={{ background: HORIZON_COLORS.white }}>
      <div 
        className="mx-auto max-w-7xl px-6 py-20 md:px-12"
      >
        {/* Header */}
        <div className="mb-12">
          <div className="max-w-3xl">
            <div 
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                background: `rgba(${parseInt(HORIZON_COLORS.gold500.slice(1,3), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(3,5), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(5,7), 16)}, 0.1)`,
                color: HORIZON_COLORS.navy800,
                border: `1px solid rgba(${parseInt(HORIZON_COLORS.gold500.slice(1,3), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(3,5), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(5,7), 16)}, 0.3)`
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: HORIZON_COLORS.gold500 }}
              />
              Onze specialisaties
            </div>

            <h1 
              className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Vakmanschap
              <br />
              <span style={{ color: HORIZON_COLORS.navy600 }}>in elke fase</span>
            </h1>

            <p 
              className="text-xl leading-relaxed"
              style={{ color: HORIZON_COLORS.gray600 }}
            >
              Van fundament tot afwerking – wij beheersen elke discipline in de
              bouw en leveren kwaliteit die generaties meegaat.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="mb-16 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category, i) => (
            <ServiceCard key={category.id} category={category} index={i} />
          ))}
        </div>

        {/* Compacte CTA */}
        <CompactCTA />
      </div>
    </section>
  );
}