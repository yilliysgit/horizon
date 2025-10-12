'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

/*
  Diensten Overzicht - Horizon Colors (Blue + Yellow)
*/

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  gray900: "#111827",
  gray700: "#374151",
  gray600: "#4b5563",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  gray50: "#f9fafb",
  white: "#ffffff",
};

/* Types */
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
  heroImage?: string;
  metrics?: CategoryMetrics;
};

/* Helpers */
const fallbacks: Record<CategoryId, string> = {
  totaalbouw: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop',
  ruwbouw: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
  dakwerken: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
  afbouw: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop',
  interieurbouw: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop',
  Installaties: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80&auto=format&fit=crop',
};

const coverFor = (cat: ServiceCategory) =>
  cat.heroImage || fallbacks[cat.id];

/* ServiceCard */
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
        background: COLORS.white,
        border: `1px solid ${COLORS.gray200}`,
        borderRadius: "20px",
        padding: "0",
        boxShadow: "0 4px 12px rgba(17, 24, 39, 0.08)"
      }}
    >
      {/* COVER */}
      <Link
        href={href}
        aria-label={`Bekijk ${category.title}`}
        className="relative block h-56 md:h-60 will-change-transform transition-transform duration-700"
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        <img
          src={cover}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ backgroundColor: COLORS.gray100 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

        {/* rechtsboven badges */}
        <div className="absolute right-3 top-3 space-y-2">
          <span 
            className="px-3 py-1 text-xs font-semibold shadow backdrop-blur rounded-full block"
            style={{
              background: "rgba(255,255,255,0.9)",
              color: COLORS.gray900,
            }}
          >
            {category.items.length} diensten
          </span>
          {avgDuration && (
            <span 
              className="px-3 py-1 text-xs font-semibold backdrop-blur rounded-full block"
              style={{
                background: "rgba(0,0,0,0.6)",
                color: COLORS.white,
              }}
            >
              {avgDuration}
            </span>
          )}
        </div>

        {/* YELLOW volgnummer */}
        <div 
          className="absolute left-3 top-3 grid h-12 w-12 place-items-center text-sm font-bold shadow"
          style={{
            background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
            color: COLORS.white,
            borderRadius: "12px",
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
                color: COLORS.white,
              }}
            >
              {projects}+ <span className="font-normal" style={{ color: "rgba(255,255,255,0.8)" }}>projecten</span>
            </span>
          )}
          {typeof satisfactionPct === 'number' && (
            <span 
              className="px-2 py-1 text-xs font-semibold backdrop-blur rounded-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                color: COLORS.white,
              }}
            >
              {satisfactionPct}% <span className="font-normal" style={{ color: "rgba(255,255,255,0.8)" }}>tevredenheid</span>
            </span>
          )}
        </div>

        {/* YELLOW Corner accent */}
        <div 
          className="absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2" 
          style={{ 
            borderColor: COLORS.yellow600,
            borderTopLeftRadius: "8px"
          }} 
        />
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6">
        {/* Titel */}
        <h2 className="text-2xl font-semibold">
          <Link
            href={href}
            className="transition-colors rounded"
            style={{ 
              color: COLORS.gray900,
              textDecoration: "none"
            }}
          >
            {category.title}
          </Link>
        </h2>

        {/* Beschrijving */}
        <p 
          className="mt-2 text-sm leading-relaxed line-clamp-3"
          style={{ color: COLORS.gray600 }}
        >
          {category.description}
        </p>

        {/* YELLOW Features lijst */}
        <ul className="mt-4 space-y-2">
          {category.items.slice(0, 4).map((item) => (
            <li key={item.slug} className="flex items-center gap-3 text-sm">
              <span 
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS.yellow600 }}
              />
              <span 
                className="font-medium"
                style={{ color: COLORS.gray700 }}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <div className="mt-4">
            <span 
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium"
              style={{
                background: COLORS.gray50,
                color: COLORS.gray600,
                border: `1px solid ${COLORS.gray200}`
              }}
            >
              Nog {remaining} {remaining === 1 ? 'dienst' : 'diensten'}
            </span>
          </div>
        )}

        {/* BLUE CTA button */}
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                color: COLORS.white,
                borderRadius: "12px",
                textDecoration: "none"
              }}
            >
              Meer informatie
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm font-medium" style={{ color: COLORS.gray600 }}>
              Snel overzicht
            </span>
          </div>
        </div>

        {/* BLUE Progress underline */}
        <span 
          className="pointer-events-none absolute bottom-0 left-0 block h-1 w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: COLORS.blue700 }}
        />
      </div>
    </div>
  );
}

/* Demo data */
const serviceCategories: ServiceCategory[] = [
  {
    id: 'totaalbouw',
    title: 'Totaalbouw',
    description: 'Van casco tot sleutelklare oplevering: wij realiseren complete verbouwingen die technisch kloppen, esthetisch sterk zijn en volledig aansluiten bij jouw wensen.',
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
    description: 'De stevige basis van ieder bouwproject: funderingen, dragende constructies en ruwbouwafwerking met vakmanschap en precisie.',
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
    description: 'Van nieuwe daken tot renovatie, isolatie en onderhoud: wij leveren vakmanschap voor een duurzaam en waterdicht resultaat.',
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
    description: 'Maatwerk interieuroplossingen die jouw woning of kantoor een unieke uitstraling geven.',
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
    description: 'Moderne technieken, slimme systemen en duurzame oplossingen voor uw woning of bedrijfspand.',
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

/* Compacte CTA */
function CompactCTA() {
  return (
    <section 
      className="mx-auto max-w-6xl p-10 text-center shadow-lg"
      style={{
        background: COLORS.gray900,
        border: `1px solid ${COLORS.gray700}`,
        borderRadius: "20px",
        color: COLORS.white
      }}
    >
      <h2 
        className="mx-auto mb-2 max-w-3xl text-2xl font-semibold md:text-3xl"
        style={{ color: COLORS.white }}
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
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
            color: COLORS.white,
            borderRadius: "12px",
            textDecoration: "none"
          }}
        >
          Plan een gesprek
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="tel:0850000000"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300"
          style={{
            background: "transparent",
            color: COLORS.white,
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "12px",
            textDecoration: "none"
          }}
        >
          <Phone className="h-4 w-4" />
          085 - 200 3300
        </a>
      </div>
    </section>
  );
}

/* Hoofdcomponent */
export default function DienstenOverzicht() {
  return (
    <section style={{ background: COLORS.white }}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <div className="max-w-3xl">
            <div 
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                background: `${COLORS.yellow600}15`,
                color: COLORS.yellow600,
                border: `1px solid ${COLORS.yellow600}30`
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS.yellow600 }}
              />
              Onze specialisaties
            </div>

            <h1 
              className="mb-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight"
              style={{ color: COLORS.gray900 }}
            >
              Vakmanschap
              <br />
              <span style={{ color: COLORS.blue700 }}>in elke fase</span>
            </h1>

            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: COLORS.gray600 }}
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