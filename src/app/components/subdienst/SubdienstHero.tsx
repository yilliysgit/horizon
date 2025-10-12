"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";

const COLORS = {
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow700: "#d97706",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  gray900: "#111827",
  gray600: "#4b5563",
  gray200: "#e5e7eb",
  white: "#ffffff",
};

type BlobSpec = {
  w: number;
  h: number;
  left: string;
  top: string;
  color: string;
  dur: number;
  delay: number;
};

export type SubdienstHeroProps = {
  breadcrumbs?: React.ReactNode;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  trustSignals?: string[];
  ctaPrimary?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  ctaSecondary?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  image?: {
    src: string;
    alt: string;
  };
};

export default function SubdienstHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  trustSignals = ["25+ jaar ervaring", "Binnen 24u reactie", "Transparante planning"],
  ctaPrimary,
  ctaSecondary,
  image,
}: SubdienstHeroProps) {
  const reduce = useReducedMotion();

  /* Client-only blob generatie */
  const [blobs, setBlobs] = useState<BlobSpec[]>([]);
  useEffect(() => {
    const n = 4;
    const specs: BlobSpec[] = Array.from({ length: n }).map((_, i) => {
      const seed = i + 1;
      const rand = (min: number, max: number) =>
        min + ((Math.sin(seed * 999) + 1) / 2) * (max - min);
      const size = rand(150, 250);
      const left = `${rand(10, 85)}%`;
      const top = `${rand(10, 85)}%`;
      const color = i % 2 === 0 ? COLORS.blue700 : COLORS.yellow600;
      const dur = rand(20, 35);
      const delay = rand(0, 2);
      return { w: size, h: size, left, top, color, dur, delay };
    });
    setBlobs(specs);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center py-6 md:py-12 px-6 md:px-12 overflow-hidden bg-white">
      {/* Achtergrond blobs - subtiel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.w,
              height: b.h,
              left: b.left,
              top: b.top,
              backgroundColor: b.color,
              opacity: 0.04,
              filter: "blur(40px)",
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: [0, 20, -15, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.1, 0.9, 1],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-sm"
            style={{ color: COLORS.gray600 }}
          >
            {breadcrumbs}
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* LEFT: Content */}
          <div className="w-full lg:w-1/2">
            {/* Eyebrow badge */}
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm mb-6"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: COLORS.yellow600 }}
                />
                {eyebrow}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-gray-900">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                {subtitle}
              </p>

              {/* CTAs */}
              {ctaPrimary && (
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <motion.a
                    href={ctaPrimary.href}
                    onClick={ctaPrimary.onClick}
                    whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="group inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                    }}
                  >
                    {ctaPrimary.label}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  {ctaSecondary && (
                    <motion.a
                      href={ctaSecondary.href}
                      onClick={ctaSecondary.onClick}
                      whileHover={reduce ? undefined : { scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold border-2 bg-white hover:bg-gray-50 transition-all duration-300"
                      style={{
                        borderColor: COLORS.blue600,
                        color: COLORS.blue600,
                      }}
                    >
                      <Phone className="h-5 w-5" />
                      {ctaSecondary.label}
                    </motion.a>
                  )}
                </div>
              )}

              {/* Trust signals */}
              {trustSignals && trustSignals.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-x-6 gap-y-2 pt-4"
                >
                  {trustSignals.map((signal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle
                        className="h-4 w-4 flex-shrink-0"
                        style={{ color: COLORS.blue600 }}
                      />
                      <span className="text-sm font-medium text-gray-600">
                        {signal}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* RIGHT: Image */}
          {image && (
            <motion.div
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-visible">
                {/* Foto container */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    whileHover={reduce ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating badge - 100% tevredenheid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 backdrop-blur-xl p-5 rounded-xl shadow-2xl border border-white/20 bg-white/90"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                      }}
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">100%</div>
                      <div className="text-xs text-gray-600">Tevredenheid</div>
                    </div>
                  </div>
                </motion.div>

                {/* Hoekaccenten - Yellow */}
                <div
                  className="absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l-4 border-t-4 pointer-events-none"
                  style={{ borderColor: COLORS.yellow600 }}
                />
                <div
                  className="absolute right-4 bottom-4 h-10 w-10 rounded-br-2xl border-r-4 border-b-4 pointer-events-none"
                  style={{ borderColor: COLORS.yellow600 }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// VOORBEELD GEBRUIK
export function ExampleUsage() {
  return (
    <SubdienstHero
      breadcrumbs={
        <nav className="flex items-center space-x-2 text-sm">
          <a href="/" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <span>›</span>
          <a href="/diensten" className="hover:text-blue-600 transition-colors">
            Diensten
          </a>
          <span>›</span>
          <a
            href="/diensten/totaalrenovaties"
            className="hover:text-blue-600 transition-colors"
          >
            Totaalrenovaties
          </a>
          <span>›</span>
          <span className="font-medium">Complete renovaties</span>
        </nav>
      }
      eyebrow="Totaalrenovaties"
      title={
        <>
          <span>Complete renovaties in </span>
          <span style={{ color: "#0066cc" }}>Amsterdam</span>
        </>
      }
      subtitle="Volledige transformatie van woning of bedrijfspand — één aanspreekpunt, vaste planning en open begroting."
      trustSignals={[
        "25+ jaar ervaring",
        "Binnen 24u reactie",
        "Transparante planning",
      ]}
      ctaPrimary={{
        label: "Vraag offerte aan",
        href: "#offerte",
      }}
      ctaSecondary={{
        label: "Bel ons direct",
        href: "tel:0852003300",
      }}
      image={{
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
        alt: "Complete renovatie Amsterdam",
      }}
    />
  );
};