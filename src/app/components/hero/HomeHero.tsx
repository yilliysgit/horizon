"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

export type HeroHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  variant?: "blue" | "midnight";
  className?: string;
};

const palettes = {
  blue: {
    gradient: "bg-gradient-to-br from-[#4A90E2] via-[#357ABD] to-[#2E5B8A]",
    text: "text-white",
    accent: "bg-[#4A90E2]",
    ring: "ring-blue-300/40",
  },
  midnight: {
    gradient: "bg-gray-50",
    text: "text-gray-900",
    accent: "bg-[#4A90E2]",
    ring: "ring-blue-300/30",
  },
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FloatingServiceBadge({ 
  position, 
  services, 
  index 
}: { 
  position: { top: string; left: string; delay: number };
  services: string[];
  index: number;
}) {
  const [currentServiceIndex, setCurrentServiceIndex] = React.useState(index % services.length);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000 + (index * 500));

    return () => clearInterval(interval);
  }, [services.length, index]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
      }}
      initial={{ 
        opacity: 0,
        scale: 0.8,
        x: -20,
        y: 20
      }}
      animate={{
        opacity: [0, 0.7, 0.9, 0.7],
        scale: [0.8, 1, 1.05, 1],
        x: [-20, 10, -10, 15],
        y: [20, -10, 15, -20],
      }}
      transition={{
        duration: 15 + (index % 3) * 2,
        delay: position.delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <motion.div
        key={currentServiceIndex}
        initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
        transition={{ duration: 0.5 }}
        className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2.5 shadow-lg hover:bg-white/20 transition-colors duration-300"
      >
        <span className="text-white text-sm font-medium whitespace-nowrap">
          {services[currentServiceIndex]}
        </span>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full opacity-80" style={{ backgroundColor: 'var(--primary-blue, #0079C0)' }}></div>
      </motion.div>
    </motion.div>
  );
}

function FloatingServices() {
  const services = [
    "Totaalrenovaties",
    "Ruwbouw", 
    "Dakwerken",
    "Afbouw & Afwerking",
    "Interieurbouw",
    "Installaties",
    "Complete Renovaties",
    "Op- en Aanbouwen",
    "Verbouwingen",
    "Keukens",
    "Badkamers",
    "Schilderwerk"
  ];

  const positions = [
    { top: "15%", left: "85%", delay: 0.0 },
    { top: "25%", left: "92%", delay: 1.5 },
    { top: "35%", left: "88%", delay: 3.0 },
    { top: "45%", left: "90%", delay: 4.5 },
    { top: "55%", left: "85%", delay: 6.0 },
    { top: "65%", left: "92%", delay: 7.5 },
    { top: "75%", left: "88%", delay: 9.0 },
    { top: "85%", left: "90%", delay: 10.5 },
    { top: "20%", left: "8%", delay: 12.0 },
    { top: "80%", left: "10%", delay: 13.5 },
    { top: "10%", left: "60%", delay: 15.0 },
    { top: "90%", left: "65%", delay: 16.5 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {positions.map((pos, idx) => (
        <FloatingServiceBadge
          key={idx}
          position={pos}
          services={services}
          index={idx}
        />
      ))}
    </div>
  );
}

export default function HomeHero({
  eyebrow = "BOUW & RENOVATIE",
  title = "Creatieve concepten die impact maken.",
  subtitle = "Wij helpen merken groeien met sterke campagnes, visuele verhalen en slimme strategie.",
  ctaPrimary = { label: "Plan een Project", href: "#contact" },
  ctaSecondary = { label: "Bekijk ons werk", href: "#portfolio" },
  variant = "blue",
  className,
}: HeroHeaderProps) {
  const theme = palettes[variant];

  return (
    <section
      className={cx(
        "relative isolate overflow-hidden bg-gray-50",
        theme.text,
        "pt-28 pb-16 md:pt-36 md:pb-24",
        className
      )}
      style={{ minHeight: "calc(100vh - 80px)" }}
      aria-label="Hero sectie"
    >
      {/* Subtiele achtergrond patroon */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(74,144,226,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(53,122,189,0.2),transparent_50%)]" />
      </div>

      {/* Grid overlay - subtiel */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.08]"
      >
        <defs>
          <pattern id="modernGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#modernGrid)" />
      </svg>

      {/* Moderne glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-[#4A90E2]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-80 w-80 rounded-full bg-[#357ABD]/15 blur-3xl" />

      <div className="container mx-auto max-w-6xl px-8">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white/90"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#4A90E2]"></div>
              {eyebrow}
            </motion.div>
          )}

          {/* Title - met moderne typografie */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 max-w-4xl text-white
                       text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] 
                       font-bold tracking-tight"
            style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: '700'
            }}
          >
            {title}
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 h-1 w-24 rounded-full bg-[#4A90E2] opacity-80"
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: '400'
              }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {ctaPrimary && (
              <a
                href={ctaPrimary.href}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#4A90E2] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#357ABD] hover:shadow-xl hover:-translate-y-0.5"
              >
                {ctaPrimary.label}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
            {ctaSecondary && (
              <a
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                {ctaSecondary.label}
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Services behouden */}
      <FloatingServices />
    </section>
  );
}