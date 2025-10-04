"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

export type Stat = { value: string | number; suffix?: string; label: string };

export type HeroHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  stats?: Stat[];
  variant?: "blue" | "midnight";
  className?: string;
};

const palettes = {
  blue: {
    gradient: "bg-gradient-to-b from-[#0B1C4F] via-[#0E2F92] to-[#0B1C4F]",
    text: "text-white",
    accent: "bg-amber-400",
    ring: "ring-amber-300/40",
  },
  midnight: {
    gradient: "bg-gradient-to-b from-[#0A0B12] via-[#121426] to-[#0A0B12]",
    text: "text-slate-100",
    accent: "bg-amber-400",
    ring: "ring-amber-300/30",
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
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg"
      >
        <span className="text-white text-xs font-medium whitespace-nowrap">
          {services[currentServiceIndex]}
        </span>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full opacity-60"></div>
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

export default function HomeHeroAnimated({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  variant = "blue",
  className,
}: HeroHeaderProps) {
  const theme = palettes[variant];

  return (
    <section
      className={cx(
        "relative isolate overflow-hidden",
        theme.gradient,
        theme.text,
        "pt-28 pb-16 md:pt-36 md:pb-24",
        className
      )}
      style={{ minHeight: "calc(100svh - var(--header-h, 80px))" }}
      aria-label="Introductiesectie"
    >
      {/* Bouwfoto achtergrond */}
      <div className="absolute inset-0 -z-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C4F]/95 via-[#0E2F92]/90 to-[#0B1C4F]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C4F]/80 via-transparent to-[#0B1C4F]/60" />
      </div>

      {/* Grid overlay */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.12]"
      >
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Zachte glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Links */}
          <div>
            {/* Eyebrow */}
            {eyebrow && (
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                {eyebrow}
              </div>
            )}

            {/* Title */}
           <motion.h1
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="font-display text-white mb-8
             text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]"
>
  {title}
</motion.h1>

            {/* Accent underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cx("h-2 w-36 origin-left rounded-full mb-12", theme.accent)}
            />

            {/* Subtitle */}
{subtitle && (
  <motion.p
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="mb-12 max-w-prose text-white/90 leading-relaxed
               text-lg md:text-xl font-archivo font-black"
  >
    {subtitle}
  </motion.p>
)}

            {/* CTA Buttons */}
            {(ctaPrimary || ctaSecondary) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {ctaPrimary && (
                  <a
                    href={ctaPrimary.href}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-4 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {ctaPrimary.label}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                )}
                {ctaSecondary && (
                  <a
                    href={ctaSecondary.href}
                    className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300"
                    style={{ color: 'white' }}
                  >
                    {ctaSecondary.label}
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Stats Grid Rechts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Stats kaartjes */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + 0.1 * i }}
                    className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-md hover:bg-white/12 transition-colors duration-300"
                  >
                    <div className="flex items-baseline gap-1">
                      <div className="text-3xl font-semibold">{s.value}</div>
                      {s.suffix && (
                        <div className="text-xl text-white/70">{s.suffix}</div>
                      )}
                    </div>
                    <div className="text-sm text-white/70 mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Live Project Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2 text-sm backdrop-blur-sm mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-medium">Live Project</span>
            </div>
            <p className="text-white/80 text-lg">
              <span className="font-semibold">Bouw met vertrouwen</span>
              <br />
              Persoonlijke begeleiding en transparante communicatie bij elk project.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Diensten */}
      <FloatingServices />
    </section>
  );
}
