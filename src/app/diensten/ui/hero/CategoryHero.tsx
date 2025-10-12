"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  gray900: "#111827",
  gray600: "#4b5563",
  white: "#ffffff",
};

type Stat = { value: string; label: string };
type CTA = { label: string; href: string };

export type ConstructionHeroProps = {
  breadcrumbs?: React.ReactNode;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  microcopy?: string;
  right?:
    | { type: "stats"; items: Stat[] }
    | { type: "image"; src: string; alt?: string }
    | { type: "custom"; node: React.ReactNode };
  className?: string;
};

export default function ConstructionHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  microcopy,
  right,
  className,
}: ConstructionHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={[
        "relative overflow-hidden flex items-center",
        className ?? "",
      ].join(" ")}
      style={{
        minHeight: "calc(60vh - 80px)",
        background: `linear-gradient(135deg, ${COLORS.blue700} 0%, ${COLORS.blue600} 100%)`,
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
      aria-labelledby="construction-hero-title"
    >
      {/* Subtiele Horizon-blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-3xl"
          style={{ backgroundColor: `${COLORS.blue600}10` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-2xl"
          style={{ backgroundColor: `${COLORS.yellow600}10` }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full py-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LINKS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* breadcrumbs */}
            {breadcrumbs && (
              <div
                className="mb-3 text-sm font-medium"
                style={{ color: `${COLORS.white}CC` }}
              >
                {breadcrumbs}
              </div>
            )}

            {/* eyebrow pill */}
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS.yellow600 }}
                />
                <span
                  className="text-xs font-medium tracking-wide"
                  style={{ color: COLORS.white }}
                >
                  {eyebrow}
                </span>
              </div>
            )}

            {/* H1 */}
            <h1
              id="construction-hero-title"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-4"
              style={{ color: COLORS.white, fontFamily: "Kanit, sans-serif" }}
            >
              {title}
            </h1>

            {/* subtitle */}
            {subtitle && (
              <p
                className="max-w-2xl text-sm md:text-base leading-relaxed mb-6"
                style={{ color: `${COLORS.white}E6` }}
              >
                {subtitle}
              </p>
            )}

            {/* CTA’s */}
            {(ctaPrimary || ctaSecondary) && (
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {ctaPrimary && (
                  <motion.a
                    whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={ctaPrimary.href}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium shadow-lg transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                      color: COLORS.white,
                    }}
                  >
                    {ctaPrimary.label}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                )}
                {ctaSecondary && (
                  <motion.a
                    whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={ctaSecondary.href}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all"
                    style={{
                      border: `2px solid ${COLORS.white}66`,
                      color: COLORS.white,
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${COLORS.white}10`;
                      e.currentTarget.style.borderColor = `${COLORS.white}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = `${COLORS.white}66`;
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {ctaSecondary.label}
                  </motion.a>
                )}
              </div>
            )}

            {/* microcopy */}
            {microcopy && (
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  fill={COLORS.yellow600}
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  className="text-xs md:text-sm font-medium leading-relaxed"
                  style={{ color: `${COLORS.white}CC` }}
                >
                  {microcopy}
                </p>
              </div>
            )}
          </motion.div>

          {/* RECHTS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:justify-self-end"
          >
            {right?.type === "stats" && (
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {right.items.map((s) => (
                  <div
                    key={s.label}
                    className="relative rounded-2xl p-5 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: `${COLORS.white}10`,
                      border: `1px solid ${COLORS.white}26`,
                    }}
                  >
                    {/* gele top-accent */}
                    <div
                      className="absolute left-0 top-0 h-1.5 w-full rounded-t-2xl"
                      style={{
                        background: `linear-gradient(90deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                      }}
                    />
                    <div
                      className="text-2xl font-semibold mb-1 tabular-nums"
                      style={{ color: COLORS.white, fontFamily: "Kanit, sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: `${COLORS.white}CC` }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {right?.type === "image" && (
              <div className="relative max-w-lg">
                <div
                  className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl"
                  style={{ border: `2px solid ${COLORS.white}26` }}
                >
                  <img
                    src={right.src}
                    alt={right.alt ?? ""}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* hoekaccenten in geel */}
                <div
                  className="pointer-events-none absolute -inset-1 rounded-2xl"
                  style={{
                    mask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: 6,
                    border: `2px dashed ${COLORS.yellow600}55`,
                  }}
                />
              </div>
            )}

            {right?.type === "custom" && <div className="max-w-lg">{right.node}</div>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
