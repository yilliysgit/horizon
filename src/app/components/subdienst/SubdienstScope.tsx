"use client";
import React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  orange600: "#f59e0b",
  green600: "#10b981",
  red600: "#ef4444",
  gray900: "#111827",
  gray600: "#4b5563",
  gray200: "#e5e7eb",
  white: "#ffffff",
};

export type ScopeItem = {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; // optional custom icon per item
};

export type SubdienstScopeProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  included: ScopeItem[];
  optional?: ScopeItem[];
  excluded?: ScopeItem[];
  className?: string;
};

type TabKey = "included" | "optional" | "excluded";

const TAB_META: Record<TabKey, { label: string; color: string; bg: string; Icon: React.ComponentType<any> }>
  = {
    included: { label: "Inbegrepen", color: COLORS.green600, bg: `${COLORS.green600}10`, Icon: Check },
    optional: { label: "Optioneel", color: COLORS.orange600, bg: `${COLORS.orange600}10`, Icon: Plus },
    excluded: { label: "Niet inbegrepen", color: COLORS.red600, bg: `${COLORS.red600}10`, Icon: X },
  };

export default function SubdienstScope({
  eyebrow,
  title,
  intro,
  included,
  optional = [],
  excluded = [],
  className = "",
}: SubdienstScopeProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<TabKey>("included");

  const itemsByTab: Record<TabKey, ScopeItem[]> = {
    included,
    optional,
    excluded,
  };

  const tabs: Array<{ key: TabKey; count: number }> = [
    { key: "included", count: included.length },
    { key: "optional", count: optional.length },
    { key: "excluded", count: excluded.length },
  ];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const order: TabKey[] = ["included", "optional", "excluded"];
    const idx = order.indexOf(active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setActive(order[(idx + 1) % order.length]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setActive(order[(idx - 1 + order.length) % order.length]);
    }
  };

  const renderItems = (items: ScopeItem[], key: TabKey) => {
    const { Icon, color, bg } = TAB_META[key];
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={`${key}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              className="group relative bg-white rounded-xl p-4 border-2 hover:shadow-md transition-all duration-300"
              style={{ borderColor: `${color}30` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: bg }}>
                  {ItemIcon ? (
                    <ItemIcon className="w-4 h-4" style={{ color }} />
                  ) : (
                    <Icon className="w-4 h-4" style={{ color }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm" style={{ color: COLORS.gray900 }}>{item.title}</h4>
                  <p className="text-xs leading-snug mt-0.5" style={{ color: COLORS.gray600 }}>{item.description}</p>
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${color}05, transparent)` }}
              />
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section className={`relative py-16 md:py-24 px-6 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-100 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium mb-4" style={{ color: COLORS.blue700 }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: COLORS.blue600 }} />
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: COLORS.gray900 }}>{title}</h2>
          {intro && (
            <p className="text-lg leading-relaxed" style={{ color: COLORS.gray600 }}>{intro}</p>
          )}
        </motion.div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Werkingssamenstelling"
          className="mx-auto flex w-full max-w-3xl items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm"
          onKeyDown={onKeyDown}
        >
          {tabs.map(({ key, count }) => {
            const selected = active === key;
            const { label, color } = TAB_META[key];
            return (
              <button
                key={key}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${key}`}
                id={`tab-${key}`}
                onClick={() => setActive(key)}
                className={`flex min-w-[9rem] items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                  selected ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: selected ? COLORS.white : color }}
                  aria-hidden="true"
                />
                <span>{label}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${selected ? "bg-white/20" : "bg-neutral-100 text-neutral-600"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panels */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              id={`panel-${active}`}
              aria-labelledby={`tab-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {renderItems(itemsByTab[active], active)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// -- Voorbeeldgebruik --
export function ExampleUsage() {
  return (
    <SubdienstScope
      eyebrow="Wat zit erin"
      title="Wat zit er in een complete renovatie?"
      intro="Overzicht van alle werkzaamheden, opties en wat niet in het standaardpakket zit."
      included={[
        { title: "Sloop & voorbereiding", description: "Verwijderen oude materialen en voorbereiden van de ruimte." },
        { title: "Constructieve aanpassingen", description: "Doorbraken, nieuwe dragende wanden en constructief werk." },
        { title: "Elektra & loodgieterwerk", description: "Nieuwe groepenkast, leidingwerk en sanitair." },
        { title: "Isolatie & ventilatie", description: "Hoogwaardige isolatie en mechanische ventilatie." },
        { title: "Stucwerk & afwerking", description: "Gladde wanden en plafonds, spuitwerk of handwerk." },
        { title: "Vloeren", description: "Parket, laminaat, tegels of andere vloerbedekking." },
        { title: "Keuken & badkamer", description: "Complete nieuwe keuken en badkamer inclusief tegels." },
        { title: "Schilderwerk", description: "Binnen- en buitenschilderwerk in gewenste kleur." },
        { title: "Oplevering & nazorg", description: "Eindschoonmaak, inspectie en garantiedocumenten." },
      ]}
      optional={[
        { title: "Vergunningsaanvragen", description: "Aanvragen van bouw- en omgevingsvergunningen." },
        { title: "Maatwerk interieurbouw", description: "Op maat gemaakte kasten, deuren en interieurelementen." },
        { title: "PV & warmtepomp", description: "Zonnepanelen en warmtepompinstallatie voor energiebesparing." },
        { title: "Domotica", description: "Smart home systemen voor verlichting, verwarming en beveiliging." },
      ]}
      excluded={[
        { title: "Monumentale restauratie", description: "Specialistisch herstelwerk aan monumentale panden." },
        { title: "Spoed binnen 48u", description: "Acute reparaties zonder intake en planning." },
      ]}
    />
  );
}
