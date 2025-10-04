"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AppIcon from "@/app/components/iconRenderer/IconRenderer";

/*
  ---------------------------------------------------------------------------
  Elegant, performant Hero for Horizon Totaalbouw - IMPROVED VERSION
  - Bredere layout voor meer ruimte
  - Kleinere, leesbaarder H1 
  - Stats vervangen door elegante microcopy lijst
  - Kleuren gebaseerd op je palet: #00296b, #003f88, #00509d, #fdc500, #ffd500
  ---------------------------------------------------------------------------
*/

const COLORS = {
  navy800: "#00296b",
  navy700: "#003f88",
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
};

/* ----------------------- CTA Button (clean & accessible) ------------------ */

type CTAProps = {
  href?: string;
  label: string;
  iconName?: string;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
};

function CTAButton({
  href,
  label,
  iconName,
  className = "",
  onClick,
  variant = "primary",
  ariaLabel,
}: CTAProps) {
  const content = (
    <motion.span
      className={`relative inline-flex items-center gap-3 rounded-2xl px-7 py-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        variant === "primary"
          ? "text-[" + COLORS.navy800 + "]"
          : "text-white"
      }`}
      initial={false}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background:
          variant === "primary"
            ? `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`
            : COLORS.navy800,
        boxShadow:
          variant === "primary"
            ? `0 10px 30px -10px ${COLORS.gold500}66`
            : `0 10px 30px -10px ${COLORS.navy800}66`,
      }}
    >
      {iconName && <AppIcon name={iconName} className="h-5 w-5" weight="duotone" />}
      <span className="tracking-wide">{label}</span>
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel ?? label}
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className={className}
    >
      {content}
    </motion.button>
  );
}

/* --------------------------- Animated title words ------------------------- */

const Title = ({ words }: { words: string[] }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.h1
      className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900"
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={shouldReduce ? false : { opacity: 0, y: "100%" }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
        >
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
};

/* ---------------------------- Microcopy Features List ------------------------------ */

const FeaturesList = () => {
  const shouldReduce = useReducedMotion();
  
  // Optie 1: Eén microcopy tekst
  const microcopy = "25+ jaar ervaring • 240+ tevreden klanten • 96% klanttevredenheid";
  
  // Optie 2: Drie compacte items inline
  const features = [
    { text: "25+ jaar ervaring" },
    { text: "240+ klanten" },
    { text: "96% tevredenheid" }
  ];

  return (
    <div className="mt-8">
      {/* Optie 1: Simpele microcopy */}
      <motion.p
        className="text-sm text-slate-500 leading-relaxed"
        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {microcopy}
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center gap-4 text-sm text-slate-600"
        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2"
            initial={shouldReduce ? false : { opacity: 0, x: -10 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#fdc500]"
              initial={shouldReduce ? false : { scale: 0 }}
              animate={shouldReduce ? { scale: 1 } : { scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.3 }}
            />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

/* ----------------------------- Hero Artwork ------------------------------- */

const HeroArt = () => {
  const shouldReduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-none md:w-[520px]">
      {/* Optie 1: Abstract gradient artwork met floating cards */}
      <div className="relative">
        {/* Soft background glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[2.25rem] blur-2xl opacity-60"
          style={{
            background: `radial-gradient(60% 60% at 30% 20%, ${COLORS.gold400}33 0%, transparent 60%), radial-gradient(60% 60% at 80% 80%, ${COLORS.navy600}22 0%, transparent 60%)`,
          }}
        />

        {/* Main gradient background */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24, rotate: -1 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[500px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.navy800} 0%, ${COLORS.navy600} 50%, ${COLORS.navy700} 100%)`
          }}
        >
          {/* Floating service cards */}
          <motion.div
            className="absolute left-6 top-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 min-w-[140px]"
            animate={shouldReduce ? {} : { y: [0, -8, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-xs font-semibold text-white/90 mb-1">Ruwbouw</div>
            <div className="text-lg font-bold text-white">✓</div>
          </motion.div>

          <motion.div
            className="absolute right-8 top-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 min-w-[140px]"
            animate={shouldReduce ? {} : { y: [0, 8, 0], rotate: [0, -1, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <div className="text-xs font-semibold text-white/90 mb-1">Afbouw</div>
            <div className="text-lg font-bold text-white">✓</div>
          </motion.div>

          <motion.div
            className="absolute left-12 bottom-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 min-w-[140px]"
            animate={shouldReduce ? {} : { y: [0, -6, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          >
            <div className="text-xs font-semibold text-white/90 mb-1">Installaties</div>
            <div className="text-lg font-bold text-white">✓</div>
          </motion.div>

          {/* Corner accents */}
          <div className="absolute left-4 top-4 h-8 w-8 rounded-tl-2xl border-l-4 border-t-4" style={{ borderColor: COLORS.gold500 }} />
          <div className="absolute right-4 bottom-4 h-8 w-8 rounded-br-2xl border-r-4 border-b-4" style={{ borderColor: COLORS.gold500 }} />

          {/* Central decorative element */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={shouldReduce ? {} : { rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ background: `linear-gradient(45deg, ${COLORS.gold500}, ${COLORS.gold400})` }} />
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`, color: COLORS.navy800 }}
            animate={shouldReduce ? {} : { y: [0, -1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Vakmanschap
          </motion.div>

          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${20 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 25}%`,
                }}
                animate={shouldReduce ? {} : { opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ------------------------------- Main Hero -------------------------------- */

function HeroNew({ city = "Amsterdam" }: { city?: string }) {
  const title = useMemo(() => ["Bouwbedrijf", `in ${city}:`, "verbouw,", "renovatie", "& aanbouw"], [city]);

  return (
    <section
      aria-labelledby="hero-title"
      aria-describedby="hero-sub"
      className="relative isolate overflow-hidden"
      style={{
        background: `radial-gradient(1200px 600px at 0% -20%, ${COLORS.gold400}0d, transparent), linear-gradient(180deg, #f8fafc, #ffffff)`
      }}
    >
      {/* Bredere container */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-12 lg:grid-cols-2 lg:gap-16">
        {/* Tekstkolom */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.gold500 }} />
            Horizon Totaalbouw
          </div>

          <div className="mt-6">
            <Title words={title} />
          </div>

          <motion.p
            id="hero-sub"
            className="mt-6 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Van ontwerp en vergunning tot <strong className="font-semibold" style={{ color: COLORS.navy600 }}>ruwbouw</strong>, {" "}
            <strong className="font-semibold" style={{ color: COLORS.navy600 }}>afbouw</strong> en {" "}
            <strong className="font-semibold" style={{ color: COLORS.navy600 }}>installaties</strong>. Vraag een offerte aan of bekijk recente projecten.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            
            <CTAButton
              href="/offerte"
              label="Offerte aanvragen"
              iconName="FileText"
              ariaLabel="Offerte aanvragen bij Horizon totaalbouw"
              variant="primary"
            />
         
            <CTAButton
              href="/projecten"
              label="Bekijk projecten"
              iconName="ImagesSquare"
              ariaLabel="Bekijk recente projecten"
              variant="secondary"
            />
            
          </motion.div>

          {/* Nieuwe microcopy features lijst */}
          <FeaturesList />
        </div>

        <HeroArt />
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-12 w-8 justify-center rounded-full border-2 border-slate-300 pt-2">
          <motion.div className="h-2 w-1 rounded-full"
            style={{ background: COLORS.navy600 ?? "#94a3b8" }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}

export { HeroNew, CTAButton };