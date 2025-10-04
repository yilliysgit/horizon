"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Users, 
  Ruler, 
  ClipboardList, 
  Package, 
  Hammer, 
  Sparkles,
  ArrowRight,
  Phone,
  Building2
} from 'lucide-react';

const HORIZON_COLORS = {
  navy800: "#00296b",
  navy700: "#003f88", 
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333"
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

const AanpakSectie: React.FC<AanpakProps> = ({
  eyebrow,
  title,
  intro,
  steps,
  cta,
  phone
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to step progression
  const stepProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, steps.length - 1]);
  
  useEffect(() => {
    const unsubscribe = stepProgress.onChange((latest) => {
      const newStep = Math.round(Math.max(0, Math.min(steps.length - 1, latest)));
      setActiveStep(newStep);
    });
    return unsubscribe;
  }, [stepProgress, steps.length]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '400vh' }} // Extra height for scroll effect
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <section 
          className="relative h-full flex items-center justify-center px-6"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 50%, ${HORIZON_COLORS.white} 100%)`
          }}
        >
          {/* Subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${HORIZON_COLORS.gold500} 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, ${HORIZON_COLORS.navy600} 1px, transparent 1px)`,
              backgroundSize: '60px 60px, 80px 80px'
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            
            {/* Header - fades out as we scroll */}
            <motion.div
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.3], [0, -100])
              }}
              className="text-center mb-16"
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
                style={{
                  background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800}15, ${HORIZON_COLORS.navy700}10)`,
                  border: `1px solid ${HORIZON_COLORS.navy700}30`
                }}
              >
                <Building2 
                  className="w-4 h-4"
                  style={{ color: HORIZON_COLORS.gold500 }}
                />
                <span 
                  className="text-sm font-bold tracking-wider uppercase"
                  style={{ 
                    color: HORIZON_COLORS.navy800,
                    fontFamily: "Kanit, sans-serif"
                  }}
                >
                  {eyebrow}
                </span>
              </div>
              
              {/* Title */}
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ 
                  color: HORIZON_COLORS.ink,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                {title}
              </h2>
              
              {/* Intro */}
              <p
                className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
                style={{ color: HORIZON_COLORS.gray600 }}
              >
                {intro}
              </p>
            </motion.div>

            {/* Horizontal scrolling steps container */}
            <div className="relative h-96 overflow-hidden">
              {/* Steps track */}
              <motion.div 
                className="flex items-center h-full"
                style={{
                  x: useTransform(scrollYProgress, [0.2, 0.8], [0, -(steps.length - 1) * 300])
                }}
              >
                {steps.map((stap, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 mx-6"
                  >
                    <motion.div
                      className="relative p-8 rounded-3xl backdrop-blur-sm border h-80 flex flex-col transition-all duration-500"
                      style={{
                        background: activeStep === index 
                          ? `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`
                          : `linear-gradient(135deg, ${HORIZON_COLORS.white}80, ${HORIZON_COLORS.gray50}60)`,
                        border: `2px solid ${activeStep === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.gray200}`,
                        boxShadow: activeStep === index 
                          ? `0 20px 40px rgba(253, 197, 0, 0.2), 0 8px 16px rgba(51, 51, 51, 0.1)` 
                          : `0 4px 12px rgba(51, 51, 51, 0.06)`,
                        transform: activeStep === index ? 'scale(1.05)' : 'scale(0.95)',
                        opacity: activeStep === index ? 1 : 0.7
                      }}
                    >
                      {/* Gouden accent strip */}
                      <div 
                        className="absolute top-0 left-0 w-full h-1 rounded-t-3xl transition-all duration-500"
                        style={{ 
                          background: activeStep === index 
                            ? `linear-gradient(90deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                            : 'transparent'
                        }}
                      />

                      {/* Step header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-lg font-black transition-all duration-500"
                          style={{
                            background: activeStep === index 
                              ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                              : `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
                            color: activeStep === index ? HORIZON_COLORS.navy800 : HORIZON_COLORS.gold500,
                            boxShadow: activeStep === index 
                              ? `0 8px 24px rgba(253, 197, 0, 0.4)`
                              : `0 4px 12px rgba(0, 41, 107, 0.3)`
                          }}
                        >
                          <div className="text-xs font-bold">{stap.nummer}</div>
                          <div className="text-sm">{stap.icon}</div>
                        </div>

                        <div>
                          {/* Duration badge */}
                          <div 
                            className="px-3 py-1 rounded-full text-xs font-bold mb-2 transition-all duration-500"
                            style={{
                              background: activeStep === index 
                                ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500}30, ${HORIZON_COLORS.gold400}20)`
                                : `linear-gradient(135deg, ${HORIZON_COLORS.navy800}20, ${HORIZON_COLORS.navy700}15)`,
                              color: activeStep === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.navy700,
                              border: `1px solid ${activeStep === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.navy700}40`
                            }}
                          >
                            {stap.duur}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-xl font-bold mb-4 transition-colors duration-500"
                        style={{ 
                          color: activeStep === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.ink,
                          fontFamily: "Kanit, sans-serif"
                        }}
                      >
                        {stap.titel}
                      </h3>

                      {/* Description */}
                      <p 
                        className="text-sm leading-relaxed mb-4 flex-1"
                        style={{ color: HORIZON_COLORS.gray600 }}
                      >
                        {stap.beschrijving}
                      </p>

                      {/* Details */}
                      <div className="space-y-2 mt-auto">
                        {stap.details.slice(0, 3).map((detail, detailIndex) => (
                          <div 
                            key={detailIndex}
                            className="flex items-center gap-2"
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ 
                                background: activeStep === index 
                                  ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                                  : HORIZON_COLORS.gray400
                              }}
                            />
                            <span 
                              className="text-xs font-medium"
                              style={{ color: HORIZON_COLORS.gray600 }}
                            >
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Progress indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        background: activeStep === index 
                          ? HORIZON_COLORS.gold500 
                          : HORIZON_COLORS.gray300,
                        transform: activeStep === index ? 'scale(1.5)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA - appears at the end */}
            <motion.div
              style={{ 
                opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
                y: useTransform(scrollYProgress, [0.7, 1], [100, 0])
              }}
              className="text-center mt-16"
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a 
                  href={cta.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                    color: HORIZON_COLORS.navy800,
                    fontFamily: "Kanit, sans-serif",
                    boxShadow: `0 6px 20px rgba(253, 197, 0, 0.4)`
                  }}
                >
                  {cta.label}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
                
                {phone && (
                  <>
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-[1px]"
                        style={{ backgroundColor: HORIZON_COLORS.gray200 }}
                      />
                      <span 
                        className="text-sm font-medium"
                        style={{ color: HORIZON_COLORS.gray600 }}
                      >
                        of bel direct
                      </span>
                      <div 
                        className="w-12 h-[1px]"
                        style={{ backgroundColor: HORIZON_COLORS.gray200 }}
                      />
                    </div>
                    
                    <a 
                      href={`tel:${phone}`} 
                      className="group flex items-center gap-2 text-xl font-bold transition-all duration-300 hover:scale-105"
                      style={{ 
                        color: HORIZON_COLORS.gold500,
                        fontFamily: "Kanit, sans-serif"
                      }}
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

// Example usage with proper icons
const AanpakSection: React.FC = () => {
  const aanpakData = {
    eyebrow: "Onze aanpak",
    title: "Zo verloopt uw totaalrenovatie", 
    intro: "Van eerste idee tot oplevering. Wij begeleiden u stap voor stap door het hele proces met volledige transparantie en vakmanschap.",
    steps: [
      {
        nummer: "01",
        titel: "Kennismaking & Intake",
        beschrijving: "Wij luisteren naar uw wensen en bespreken de mogelijkheden voor uw project.",
        details: [
          "Gratis intakegesprek",
          "Locatiebezoek en opname",
          "Wensen & budget inventarisatie"
        ],
        duur: "1-2 dagen",
        icon: <Users className="w-5 h-5" />
      },
      {
        nummer: "02", 
        titel: "Ontwerp & Visualisatie",
        beschrijving: "Van uw wensen maken wij een concreet ontwerp met 3D visualisaties.",
        details: [
          "3D ontwerpen en visualisaties",
          "Materiaal- en kleurkeuzes", 
          "Technische tekeningen"
        ],
        duur: "1-2 weken",
        icon: <Ruler className="w-5 h-5" />
      },
      {
        nummer: "03",
        titel: "Offerte & Planning", 
        beschrijving: "Transparante offerte met gedetailleerde planning en heldere afspraken.",
        details: [
          "Gedetailleerde kostenopbouw",
          "Tijdsplanning en fases",
          "Vergunningen aanvragen"
        ],
        duur: "3-5 dagen",
        icon: <ClipboardList className="w-5 h-5" />
      },
      {
        nummer: "04",
        titel: "Voorbereiding & Inkoop",
        beschrijving: "Alle materialen worden ingekocht en de werkvoorbereiding wordt gestart.", 
        details: [
          "Materialen bestellen",
          "Werkplanning opstellen",
          "Team samenstellen"
        ],
        duur: "1-3 weken",
        icon: <Package className="w-5 h-5" />
      },
      {
        nummer: "05",
        titel: "Uitvoering",
        beschrijving: "Vakkundige uitvoering met regelmatige updates en kwaliteitscontroles.",
        details: [
          "Dagelijkse voortgang updates", 
          "Kwaliteitscontroles per fase",
          "Flexibiliteit bij wijzigingen"
        ],
        duur: "Variabel",
        icon: <Hammer className="w-5 h-5" />
      },
      {
        nummer: "06",
        titel: "Oplevering & Nazorg",
        beschrijving: "Eindcontrole, oplevering en garantie op al het uitgevoerde werk.",
        details: [
          "Eindcontrole samen met u",
          "Officiële oplevering", 
          "Garantiedocumentatie"
        ],
        duur: "1 dag",
        icon: <Sparkles className="w-5 h-5" />
      }
    ],
    cta: { label: "Plan een adviesgesprek", href: "/contact" },
    phone: "06 - 12 34 56 78"
  };

  return <AanpakSectie {...aanpakData} />;
};

export default AanpakSection;