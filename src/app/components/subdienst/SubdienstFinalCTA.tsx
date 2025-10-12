import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Clock, CheckCircle } from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  orange600: "#f59e0b",
  orange500: "#fbbf24",
  gray900: "#111827",
  gray600: "#4b5563",
  gray200: "#e5e7eb",
  white: "#ffffff",
};

export type SubdienstFinalCTAProps = {
  title?: string;
  subtitle?: string;
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
  className?: string;
};

export default function SubdienstFinalCTA({
  title = "Klaar om te starten met uw project?",
  subtitle = "Plan een gratis adviesgesprek en ontvang binnen 24 uur een reactie van onze projectleider.",
  trustSignals = ["Gratis en vrijblijvend", "Binnen 24 uur reactie", "Persoonlijk advies"],
  ctaPrimary = {
    label: "Plan adviesgesprek",
    href: "/contact",
  },
  ctaSecondary = {
    label: "085 - 200 3300",
    href: "tel:0852003300",
  },
  className = "",
}: SubdienstFinalCTAProps) {
  const reduce = useReducedMotion();

  return (
    <section className={`relative py-20 md:py-32 px-6 overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${COLORS.blue700} 0%, ${COLORS.blue600} 100%)`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl" />
        
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-white animate-pulse" />
          <div className="absolute top-40 right-40 w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-20 right-1/4 w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Clock className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-4">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {ctaPrimary && (
              <motion.a
                href={ctaPrimary.href}
                onClick={ctaPrimary.onClick}
                whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.orange600}, ${COLORS.orange500})`,
                  color: COLORS.blue700,
                }}
              >
                {ctaPrimary.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            )}

            {ctaSecondary && (
              <motion.a
                href={ctaSecondary.href}
                onClick={ctaSecondary.onClick}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-3 rounded-xl px-8 py-4 font-semibold text-lg border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                style={{ color: COLORS.white }}
              >
                <Phone className="w-5 h-5" />
                {ctaSecondary.label}
              </motion.a>
            )}
          </div>

          {/* Trust signals */}
          {trustSignals && trustSignals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-8"
            >
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white/80" />
                  <span className="text-sm md:text-base font-medium text-white/90">
                    {signal}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-white/20"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">25+</div>
              <div className="text-sm text-white/80">Jaar ervaring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-white/80">Projecten</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80">Tevredenheid</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// VOORBEELD GEBRUIK
export function ExampleUsage() {
  return (
    <SubdienstFinalCTA
      title="Klaar om te starten met uw renovatie?"
      subtitle="Plan een gratis adviesgesprek en ontvang binnen 24 uur een reactie van onze projectleider."
      trustSignals={[
        "Gratis en vrijblijvend",
        "Binnen 24 uur reactie",
        "Persoonlijk advies",
      ]}
      ctaPrimary={{
        label: "Plan adviesgesprek",
        href: "/contact",
      }}
      ctaSecondary={{
        label: "Bel ons: 085 - 200 3300",
        href: "tel:0852003300",
      }}
    />
  );
}