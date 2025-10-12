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
    gradient: "bg-gradient-to-br from-[#0066cc] via-[#1a73e8] to-[#3182ce]",
    text: "text-white",
    accent: "bg-[#f59e0b]", // GEEL - goede contrast met blauw
    ring: "ring-blue-300/40",
  },
  midnight: {
    gradient: "bg-gradient-to-br from-[#004499] via-[#0066cc] to-[#1a73e8]",
    text: "text-white",
    accent: "bg-[#f59e0b]",
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
      className="absolute hidden lg:block" // Verberg op mobile voor betere performance
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
        opacity: [0, 0.6, 0.8, 0.6],
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
        {/* ORANJE accent ipv geel */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#ff6b35] rounded-full opacity-70"></div>
      </motion.div>
    </motion.div>
  );
}

function FloatingServices() {
  // SEO: LSI keywords voor aannemer Amsterdam
  const services = [
    "Totaalrenovaties Amsterdam",
    "Ruwbouw & Nieuwbouw", 
    "Dakwerken & Dakisolatie",
    "Afbouw & Afwerking",
    "Interieurbouw op Maat",
    "Installaties & Leidingwerk",
    "Complete Woningrenovatie",
    "Op- en Aanbouwen",
    "Verbouwingen Amsterdam",
    "Keukenrenovatie",
    "Badkamerrenovatie",
    "Schilderwerk Binnen & Buiten"
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

// Schema.org JSON-LD voor SEO
function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://horizontotaalbouw.nl/#organization",
    "name": "Horizon Totaalbouw",
    "description": "Betrouwbare aannemer in Amsterdam voor totaalrenovaties, verbouwingen, op- en aanbouwen. 25+ jaar ervaring, 500+ projecten, 9.8 klantwaardering.",
    "url": "https://horizontotaalbouw.nl",
    "logo": "https://horizontotaalbouw.nl/logo.png",
    "image": "https://horizontotaalbouw.nl/og-image.jpg",
    "telephone": "+31-20-XXX-XXXX",
    "email": "info@horizontotaalbouw.nl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Straatnaam 123",
      "addressLocality": "Amsterdam",
      "addressRegion": "Noord-Holland",
      "postalCode": "1012 AB",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.3676",
      "longitude": "4.9041"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "52.3676",
        "longitude": "4.9041"
      },
      "geoRadius": "50000"
    },
    "priceRange": "€€-€€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "9.8",
      "reviewCount": "500",
      "bestRating": "10",
      "worstRating": "1"
    },
    "foundingDate": "1999",
    "slogan": "Bouw met vertrouwen - Persoonlijke begeleiding bij elk project",
    "knowsAbout": [
      "Totaalrenovaties",
      "Verbouwingen",
      "Op- en aanbouwen",
      "Nieuwbouw",
      "Ruwbouw",
      "Afbouw",
      "Dakwerken",
      "Interieurbouw",
      "Keukenrenovatie",
      "Badkamerrenovatie"
    ],
    "sameAs": [
      "https://www.facebook.com/horizontotaalbouw",
      "https://www.instagram.com/horizontotaalbouw",
      "https://www.linkedin.com/company/horizontotaalbouw"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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
    <>
      {/* Schema.org markup voor SEO */}
      <OrganizationSchema />
      
      <section
        className={cx(
          "relative isolate overflow-hidden",
          theme.gradient,
          theme.text,
          "pt-16 pb-12 md:pt-20 md:pb-16",
          className
        )}
        style={{ minHeight: "calc(100vh - 72px)" }}
        aria-label="Horizon Totaalbouw - Betrouwbare aannemer in Amsterdam"
      >
        {/* DONKERDER overlay - betere leesbaarheid */}
        <div className="absolute inset-0 -z-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/images/serkantest.jpg")' }}
          />
          {/* Donkerder: 80% opacity voor betere contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0066cc]/80 via-[#1a73e8]/75 to-[#0066cc]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/60 via-transparent to-[#0066cc]/50" />
        </div>

        {/* Grid overlay - zachter */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.08]"
        >
          <defs>
            <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Zachte glows - geel accent */}
        <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-3xl" />

        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Links */}
            <div className="order-2 lg:order-1">
              {/* Eyebrow - SEO: Lokale targeting */}
              {eyebrow && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                >
                  <div className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium tracking-wide text-white/90">
                    {eyebrow}
                  </span>
                </motion.div>
              )}

              {/* H1 - SEO OPTIMIZED - KLEINER */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-white mb-5
                          text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15]
                          font-semibold tracking-tight" // VEEL KLEINER
              >
                {title}
              </motion.h1>

              {/* Accent underline - GEEL */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-1 w-24 origin-left rounded-full mb-6 bg-[#f59e0b]"
              />

              {/* Subtitle - SEO: Value proposition met LSI keywords */}
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-8 max-w-xl text-sm md:text-base leading-relaxed text-white/90 font-normal" // Smaller text, smaller margin
                >
                  {subtitle}
                </motion.p>
              )}

              {/* CTA Buttons - Accessibility verbeterd */}
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
                      className="inline-flex items-center justify-center gap-2 
                                bg-white text-[#0066cc] 
                                px-5 py-3 rounded-xl 
                                font-medium text-sm md:text-base
                                hover:shadow-lg hover:shadow-white/25
                                transition-all duration-300 
                                transform hover:-translate-y-0.5
                                focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                      aria-label={`${ctaPrimary.label} - Bekijk onze diensten`}
                    >
                      {ctaPrimary.label}
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                    </a>
                  )}
                  {ctaSecondary && (
                    <a
                      href={ctaSecondary.href}
                      className="inline-flex items-center justify-center gap-2 
                                border-2 border-white/30 text-white 
                                px-5 py-3 rounded-xl 
                                font-medium text-sm md:text-base
                                backdrop-blur-sm 
                                hover:bg-white/15 hover:border-white/50 
                                transition-all duration-300
                                focus:outline-none focus:ring-2 focus:ring-white/50"
                      aria-label={`${ctaSecondary.label} - Zie onze gerealiseerde projecten`}
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
              className="relative order-1 lg:order-2"
            >
              {/* Stats kaartjes - Schema markup voor rich snippets */}
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6" role="list" aria-label="Bedrijfsstatistieken">
                  {stats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + 0.1 * i }}
                      className="rounded-xl border border-white/20 bg-white/10 p-4 md:p-5 
                                backdrop-blur-md hover:bg-white/15 
                                transition-colors duration-300
                                focus-within:ring-2 focus-within:ring-white/30"
                      role="listitem"
                    >
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl md:text-3xl font-semibold" aria-label={`${s.value}${s.suffix || ''}`}>
                          {s.value}
                        </div>
                        {s.suffix && (
                          <div className="text-lg md:text-xl text-white/70">{s.suffix}</div>
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-white/80 mt-1 font-normal">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Trust Badge - SEO: E-A-T signals */}
              <div className="space-y-3 md:space-y-4">
                <div className="inline-flex items-center gap-2 
                              bg-green-500/20 border border-green-400/30 
                              rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
                  <span className="text-green-300 font-medium">Live Projects in Amsterdam</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-5">
                  <h2 className="text-white font-semibold text-base md:text-lg mb-2">
                    Bouw met vertrouwen
                  </h2>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed font-normal">
                    Persoonlijke begeleiding en transparante communicatie bij elk project. 
                    Van eerste schets tot sleuteloverdracht.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Diensten - Hidden on mobile for performance */}
        <FloatingServices />
      </section>
    </>
  );
}