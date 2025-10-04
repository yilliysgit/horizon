"use client";
import React from "react";
import { motion } from "framer-motion";

export type Pillar = {
  icon: React.ReactNode;
  title: string;
  description?: string;   // kort houden (1–2 zinnen)
  href?: string;
  accent?: "blue" | "orange";
};

export type PillarsProps = {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;     // zet hier je Archivo styled H2 in
  subheading?: React.ReactNode;
  items: Pillar[];
  className?: string;
  tone?: "steel" | "light";      // steel = donkerder kaarten
  compact?: boolean;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const accent = {
  blue:   { badge: "from-blue-600 to-blue-500", ring: "ring-blue-100",  icon: "text-blue-500"  },
  orange: { badge: "from-orange-500 to-orange-400", ring: "ring-orange-100", icon: "text-orange-500" },
} as const;

export default function Pillars({
  eyebrow, heading, subheading, items, className,
  tone = "steel", compact = true,
}: PillarsProps) {
  const baseCard =
    tone === "steel"
      ? "bg-slate-900/80 border-slate-800 text-slate-100 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
      : "bg-white border-slate-200 text-slate-900 shadow-sm";

  const descColor = tone === "steel" ? "text-slate-300/90" : "text-slate-600";

  return (
    <section className={cx("relative isolate py-16 md:py-20", className)}>
      {/* subtiele glows */}
      <div className="pointer-events-none absolute -left-24 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-32 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="container mx-auto max-w-screen-2xl px-6">
        {(eyebrow || heading || subheading) && (
          <header className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
              <p className={cx("mb-2 text-xs font-semibold uppercase tracking-[0.18em]", tone === "steel" ? "text-blue-300/80" : "text-blue-700")}>
                {eyebrow}
              </p>
            ) : null}
            {heading ? (
              <h2 className="font-archivo text-3xl font-extrabold text-slate-900 md:text-4xl">
                {heading}
              </h2>
            ) : null}
            {subheading ? (
              <p className={cx("mt-4 md:text-lg", tone === "steel" ? "text-slate-300/90" : "text-slate-600")}>
                {subheading}
              </p>
            ) : null}
          </header>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 sm:grid-cols-2 xl:grid-cols-4" role="list">
          {items.map((it, i) => {
            const alt = (i + 1) % 2 === 0;
            const ac = it.accent ?? (alt ? "orange" : "blue");
            const A = it.href ? "a" : "div";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className="relative">
                  {/* nummer badge */}
                  <span
                    className={cx(
                      "pointer-events-none absolute -top-3 right-5 z-10 inline-flex select-none items-center justify-center rounded-full px-3 py-1 text-xs font-archivo font-extrabold text-white shadow-lg bg-gradient-to-br",
                      accent[ac].badge
                    )}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>

                  {React.createElement(
                    A as any,
                    {
                      href: it.href,
                      className: cx(
                        "group block h-full rounded-2xl border p-6 transition-all",
                        baseCard,
                        compact ? "p-6" : "p-7",
                        "hover:translate-y-[-2px] hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65)]"
                      ),
                      role: "listitem",
                    },
                    <>
                      {/* icon */}
                      <div className={cx("mb-4 inline-flex size-12 items-center justify-center rounded-xl ring-8", accent[ac].ring, tone === "steel" ? "bg-slate-900" : "bg-white")}>
                        <div className={cx("size-6", accent[ac].icon, "group-hover:scale-110 transition-transform")}>
                          {it.icon}
                        </div>
                      </div>

                      {/* titel */}
                      <h3 className={cx("font-archivo text-lg font-extrabold", tone === "steel" ? "text-white" : "text-slate-900")}>
                        {it.title}
                      </h3>

                      {/* korte tekst */}
                      {it.description ? (
                        <p className={cx("mt-2 text-sm leading-6", descColor, compact && "line-clamp-2")}>
                          {it.description}
                        </p>
                      ) : null}

                      {/* link hint */}
                      {it.href ? (
                        <span className={cx("mt-4 inline-flex items-center gap-1 text-sm font-medium", tone === "steel" ? "text-slate-200/80 group-hover:text-white" : "text-slate-900/70 group-hover:text-slate-900")}>
                          Lees meer
                          <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
