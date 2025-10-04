"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Phone, 
  FileText, 
  Calculator, 
  Handshake, 
  HardHat, 
  CheckCircle, 
  Calendar,
  ClipboardCheck,
  Users,
  Hammer,
  Building2,
  Award
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

interface TimelineStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  features: string[];
}

const workflowSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Eerste Contact",
    subtitle: "Kennismaking en intake",
    description: "We nemen contact op binnen 4 uur na uw aanvraag voor een uitgebreid gesprek over uw wensen en mogelijkheden.",
    duration: "Dag 1",
    icon: <Phone className="w-6 h-6" />,
    features: [
      "Telefonisch of persoonlijk gesprek",
      "Inventarisatie van uw wensen",
      "Eerste budgetindicatie",
      "Planning van locatiebezoek"
    ]
  },
  {
    id: 2,
    title: "Locatiebezoek",
    subtitle: "Opname en advies ter plaatse",
    description: "Onze expert komt langs voor een grondige opname van de locatie en geeft direct professioneel advies.",
    duration: "Dag 3-5",
    icon: <ClipboardCheck className="w-6 h-6" />,
    features: [
      "Uitgebreide locatie-inspectie",
      "Technische haalbaarheidscheck",
      "Advies over materialen en uitvoering",
      "Fotografische documentatie"
    ]
  },
  {
    id: 3,
    title: "Ontwerp & Planning",
    subtitle: "Uitwerking van uw project",
    description: "We maken een gedetailleerd ontwerp en planning specifiek voor uw project, inclusief 3D visualisaties.",
    duration: "Week 1-2",
    icon: <FileText className="w-6 h-6" />,
    features: [
      "3D visualisaties en tekeningen",
      "Materiaalspecificaties",
      "Gedetailleerde tijdsplanning",
      "Vergunningencheck"
    ]
  },
  {
    id: 4,
    title: "Offerte & Prijzen",
    subtitle: "Transparante kostenopstelling",
    description: "U ontvangt een uitgebreide offerte met alle kosten duidelijk uitgesplitst, zonder verborgen kosten.",
    duration: "Week 2",
    icon: <Calculator className="w-6 h-6" />,
    features: [
      "Gedetailleerde kostenopstelling",
      "Geen verborgen kosten",
      "Verschillende uitvoeringsopties",
      "Flexibele betalingsregelingen"
    ]
  },
  {
    id: 5,
    title: "Contractvorming",
    subtitle: "Formalisering van de opdracht",
    description: "Na akkoord op de offerte tekenen we het contract en plannen we de startdatum van uw project.",
    duration: "Week 3",
    icon: <Handshake className="w-6 h-6" />,
    features: [
      "Duidelijke contractvoorwaarden",
      "Garantieafspraken vastgelegd",
      "Startdatum planning",
      "Contactpersoon toegewezen"
    ]
  },
  {
    id: 6,
    title: "Voorbereiding",
    subtitle: "Materialen en vergunningen",
    description: "We regelen alle benodigde materialen, vergunningen en coördineren met andere partijen.",
    duration: "Week 3-4",
    icon: <Calendar className="w-6 h-6" />,
    features: [
      "Materialen bestellen",
      "Vergunningen aanvragen",
      "Leveranciers coördineren",
      "Werkplanning opstellen"
    ]
  },
  {
    id: 7,
    title: "Uitvoering",
    subtitle: "Realisatie van uw project",
    description: "Ons ervaren team gaat aan de slag met de uitvoering volgens planning, met dagelijkse updates.",
    duration: "Variabel",
    icon: <HardHat className="w-6 h-6" />,
    features: [
      "Professionele uitvoering",
      "Dagelijkse voortgangsrapportage",
      "Kwaliteitscontroles",
      "Minimale overlast voor u"
    ]
  },
  {
    id: 8,
    title: "Oplevering",
    subtitle: "Controle en overdracht",
    description: "Samen controleren we het resultaat en leveren we uw project officieel op met alle garantiebewijzen.",
    duration: "Laatste dag",
    icon: <Award className="w-6 h-6" />,
    features: [
      "Gezamenlijke eindcontrole",
      "Garantiebewijzen overhandigd",
      "Onderhoudsadvies gegeven",
      "5 jaar garantie geactiveerd"
    ]
  }
];

interface TimelineItemProps {
  step: TimelineStep;
  index: number;
  isLast: boolean;
}

function TimelineItem({ step, index, isLast }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline line */}
      {!isLast && (
        <div 
          className="absolute left-8 top-20 w-0.5 h-32 -z-10"
          style={{ 
            background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
            opacity: isInView ? 1 : 0.3,
            transition: 'opacity 0.6s ease'
          }}
        />
      )}

      <div className="flex gap-6">
        {/* Icon badge */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : { scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="relative flex-shrink-0"
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
              boxShadow: `
                0 8px 24px rgba(0, 41, 107, 0.3),
                0 4px 8px rgba(0, 41, 107, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Icon */}
            <div style={{ color: HORIZON_COLORS.gold500 }}>
              {step.icon}
            </div>
            
            {/* Step number badge */}
            <div 
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                color: HORIZON_COLORS.navy800,
                boxShadow: `0 2px 8px rgba(253, 197, 0, 0.4)`
              }}
            >
              {step.id}
            </div>

            {/* Shine effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, transparent 0%, rgba(253, 197, 0, 0.1) 50%, transparent 100%)`
              }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 pb-12">
          {/* Duration badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="inline-block mb-3"
          >
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500}20, ${HORIZON_COLORS.gold400}10)`,
                color: HORIZON_COLORS.navy800,
                border: `1px solid ${HORIZON_COLORS.gold500}40`
              }}
            >
              {step.duration}
            </span>
          </motion.div>

          {/* Title and subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            <h3 
              className="text-xl font-bold mb-1"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              {step.title}
            </h3>
            <h4 
              className="text-sm font-medium mb-3"
              style={{ color: HORIZON_COLORS.navy700 }}
            >
              {step.subtitle}
            </h4>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
            className="mb-4 leading-relaxed"
            style={{ color: HORIZON_COLORS.gray600 }}
          >
            {step.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {step.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.7 + featureIndex * 0.1 }}
                className="flex items-center gap-2"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                  }}
                />
                <span 
                  className="text-sm"
                  style={{ color: HORIZON_COLORS.ink }}
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkflowTimeline() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`
        }}
      />

      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${HORIZON_COLORS.gold500} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 
              className="w-8 h-8"
              style={{ color: HORIZON_COLORS.gold500 }}
            />
            <span 
              className="text-sm font-bold tracking-wide uppercase"
              style={{ 
                color: HORIZON_COLORS.navy700,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Onze Werkwijze
            </span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            Van Idee tot Realisatie
          </h2>
          
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: HORIZON_COLORS.gray600 }}
          >
            Ontdek hoe wij uw bouwproject van begin tot eind begeleiden met 
            professionele ondersteuning en transparante communicatie.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {workflowSteps.map((step, index) => (
            <TimelineItem 
              key={step.id} 
              step={step} 
              index={index}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div 
            className="inline-block p-8 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
              boxShadow: `
                0 8px 24px rgba(0, 41, 107, 0.3),
                0 4px 8px rgba(0, 41, 107, 0.2)
              `
            }}
          >
            <h3 
              className="text-xl font-bold mb-2"
              style={{ 
                color: HORIZON_COLORS.white,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Klaar om te beginnen?
            </h3>
            <p 
              className="mb-6"
              style={{ color: `${HORIZON_COLORS.white}CC` }}
            >
              Neem contact op en start vandaag nog met stap 1 van uw droomproject.
            </p>
            
            <button
              className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                color: HORIZON_COLORS.navy800,
                fontFamily: "Kanit, sans-serif",
                boxShadow: `0 4px 12px rgba(253, 197, 0, 0.4)`
              }}
            >
              Start uw project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}