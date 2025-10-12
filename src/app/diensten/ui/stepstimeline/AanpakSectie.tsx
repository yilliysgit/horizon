"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  Ruler,
  ClipboardList,
  Package,
  Hammer,
  Sparkles,
  ArrowRight,
  Phone,
  Building2,
} from "lucide-react";

const COLORS = {
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc",
  blue600: "#1a73e8",
  blue500: "#3182ce",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333",
};

interface StapItem {
  nummer: string;
  titel: string;
  beschrijving: string;
  details: string[];
  duur: string;
  icon: React.ReactNode;
}

interface AanpakProps {
  eyebrow: string;
  title: string;
  intro: string;
  steps: StapItem[];
  cta: { label: string; href: string };
  phone?: string;
}

const AanpakSectie: React.FC<AanpakProps> = ({ eyebrow, title, intro, steps, cta, phone }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const stepProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, steps.length - 1]);

  useEffect(() => {
    const unsub = stepProgress.onChange((latest) => {
      const next = Math.round(Math.max(0, Math.min(steps.length - 1, latest)));
      setActiveStep(next);
    });
    return unsub;
  }, [stepProgress, steps.length]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <section
          className="relative h-full flex items-center justify-center px-6"
          style={{
            background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gray50} 50%, ${COLORS.white} 100%)`,
          }}
        >
          {/* Horizon blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div
              className="absolute -top-40 -right-40 w-96 h-96 rounded-3xl"
              style={{ backgroundColor: `${COLORS.blue500}10` }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-2xl"
              style={{ backgroundColor: `${COLORS.yellow600}10` }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Header fades out */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.3], [0, -100]),
              }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm mb-8">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.yellow600 }} />
                <span className="uppercase tracking-wider" style={{ fontFamily: "Kanit, sans-serif", fontWeight: 600 }}>
                  {eyebrow}
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight"
                style={{ color: COLORS.gray900, fontFamily: "Kanit, sans-serif" }}
              >
                {title}
              </h2>

              <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: COLORS.gray600 }}>
                {intro}
              </p>
            </motion.div>

            {/* Steps */}
            <div className="relative h-96 overflow-hidden">
              <motion.div
                className="flex items-center h-full"
                style={{
                  x: useTransform(scrollYProgress, [0.2, 0.8], [0, -(steps.length - 1) * 300]),
                }}
              >
                {steps.map((stap, index) => {
                  const active = activeStep === index;
                  return (
                    <div key={index} className="flex-shrink-0 w-80 mx-6">
                      <motion.div
                        className="relative p-8 rounded-3xl backdrop-blur-sm border h-80 flex flex-col transition-all duration-500"
                        style={{
                          background: active
                            ? `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gray50} 100%)`
                            : `linear-gradient(135deg, ${COLORS.white}80, ${COLORS.gray50}60)`,
                          border: `2px solid ${active ? COLORS.blue700 : COLORS.gray200}`,
                          boxShadow: active
                            ? "0 14px 30px rgba(0,102,204,0.15), 0 6px 14px rgba(0,102,204,0.10)"
                            : "0 4px 12px rgba(17,24,39,0.06)",
                          transform: active ? "scale(1.03)" : "scale(0.97)",
                          opacity: active ? 1 : 0.75,
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-full h-1 rounded-t-3xl transition-all duration-500"
                          style={{
                            background: active
                              ? `linear-gradient(90deg, ${COLORS.blue700}, ${COLORS.blue600})`
                              : "transparent",
                          }}
                        />

                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-lg font-black transition-all duration-500"
                            style={{
                              background: active
                                ? `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`
                                : `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                              color: COLORS.white,
                              boxShadow: "none",
                            }}
                          >
                            <div className="text-xs font-bold">{stap.nummer}</div>
                            <div className="text-sm">{stap.icon}</div>
                          </div>

                          <div>
                            <div
                              className="px-3 py-1 rounded-full text-xs font-semibold mb-2 transition-all duration-500"
                              style={{
                                background: active ? `${COLORS.yellow600}20` : `${COLORS.blue700}15`,
                                color: active ? COLORS.yellow600 : COLORS.blue700,
                                border: `1px solid ${active ? COLORS.yellow600 : COLORS.blue700}40`,
                              }}
                            >
                              {stap.duur}
                            </div>
                          </div>
                        </div>

                        <h3
                          className="text-xl font-semibold mb-4 transition-colors duration-500"
                          style={{ color: active ? COLORS.blue700 : COLORS.ink, fontFamily: "Kanit, sans-serif" }}
                        >
                          {stap.titel}
                        </h3>

                        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: COLORS.gray600 }}>
                          {stap.beschrijving}
                        </p>

                        <div className="space-y-2 mt-auto">
                          {stap.details.slice(0, 3).map((detail, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  background: active
                                    ? `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`
                                    : COLORS.gray300,
                                }}
                              />
                              <span className="text-xs font-medium" style={{ color: COLORS.gray600 }}>
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Progress dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => {
                    const active = activeStep === index;
                    return (
                      <div
                        key={index}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          background: active ? COLORS.blue700 : COLORS.gray300,
                          transform: active ? "scale(1.5)" : "scale(1)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
                y: useTransform(scrollYProgress, [0.7, 1], [100, 0]),
              }}
              className="text-center mt-16"
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a
                  href={cta.href}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
                    color: COLORS.white,
                    fontFamily: "Kanit, sans-serif",
                  }}
                >
                  {cta.label}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                {phone && (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px" style={{ backgroundColor: COLORS.gray200 }} />
                      <span className="text-sm font-medium" style={{ color: COLORS.gray600 }}>
                        of bel direct
                      </span>
                      <div className="w-12 h-px" style={{ backgroundColor: COLORS.gray200 }} />
                    </div>

                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center gap-2 text-xl font-semibold transition-transform"
                      style={{ color: COLORS.blue700, fontFamily: "Kanit, sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <Phone className="w-5 h-5" />
                      {phone}
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Example usage ---
const AanpakSection: React.FC = () => {
  const aanpakData = {
    eyebrow: "Onze aanpak",
    title: "Zo verloopt uw totaalrenovatie",
    intro:
      "Van eerste idee tot oplevering. Wij begeleiden u stap voor stap door het hele proces met volledige transparantie en vakmanschap.",
    steps: [
      { nummer: "01", titel: "Kennismaking & Intake", beschrijving: "Wij luisteren naar uw wensen en bespreken de mogelijkheden voor uw project.", details: ["Gratis intakegesprek", "Locatiebezoek en opname", "Wensen & budget inventarisatie"], duur: "1-2 dagen", icon: <Users className="w-5 h-5" /> },
      { nummer: "02", titel: "Ontwerp & Visualisatie", beschrijving: "Van uw wensen maken wij een concreet ontwerp met 3D visualisaties.", details: ["3D ontwerpen en visualisaties", "Materiaal- en kleurkeuzes", "Technische tekeningen"], duur: "1-2 weken", icon: <Ruler className="w-5 h-5" /> },
      { nummer: "03", titel: "Offerte & Planning", beschrijving: "Transparante offerte met gedetailleerde planning en heldere afspraken.", details: ["Gedetailleerde kostenopbouw", "Tijdsplanning en fases", "Vergunningen aanvragen"], duur: "3-5 dagen", icon: <ClipboardList className="w-5 h-5" /> },
      { nummer: "04", titel: "Voorbereiding & Inkoop", beschrijving: "Alle materialen worden ingekocht en de werkvoorbereiding wordt gestart.", details: ["Materialen bestellen", "Werkplanning opstellen", "Team samenstellen"], duur: "1-3 weken", icon: <Package className="w-5 h-5" /> },
      { nummer: "05", titel: "Uitvoering", beschrijving: "Vakkundige uitvoering met regelmatige updates en kwaliteitscontroles.", details: ["Dagelijkse voortgang updates", "Kwaliteitscontroles per fase", "Flexibiliteit bij wijzigingen"], duur: "Variabel", icon: <Hammer className="w-5 h-5" /> },
      { nummer: "06", titel: "Oplevering & Nazorg", beschrijving: "Eindcontrole, oplevering en garantie op al het uitgevoerde werk.", details: ["Eindcontrole samen met u", "Officiële oplevering", "Garantiedocumentatie"], duur: "1 dag", icon: <Sparkles className="w-5 h-5" /> },
    ],
    cta: { label: "Plan een adviesgesprek", href: "/contact" },
    phone: "06 - 12 34 56 78",
  };

  return <AanpakSectie {...aanpakData} />;
};

export default AanpakSection;
