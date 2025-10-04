"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Home, 
  Hammer, 
  Sparkles, 
  Ruler,
  RotateCcw,
  Target,
  ArrowRight,
  Phone,
  CheckCircle,
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

interface DienstItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}

const ServiceGrid: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const diensten: DienstItem[] = [
    {
      title: 'Complete renovaties',
      description: 'Van verouderd tot droomhuis: wij transformeren uw woning van A tot Z met vakmanschap en oog voor detail.',
      icon: <Home className="w-6 h-6" />,
      features: ['Totaalconcept', 'Turnkey oplossing', 'Kwaliteitsgarantie'],
      ctaPrimary: 'Meer info',
      ctaSecondary: 'Offerte aanvragen'
    },
    {
      title: 'Op- en aanbouwen',
      description: 'Meer ruimte nodig? Wij realiseren uitbreidingen die naadloos aansluiten bij uw bestaande woning.',
      icon: <Hammer className="w-6 h-6" />,
      features: ['Vergunningen regelen', 'Architectonisch ontwerp', 'Naadloze integratie'],
      ctaPrimary: 'Meer info',
      ctaSecondary: 'Offerte aanvragen'
    },
    {
      title: 'Verbouwingen op maat',
      description: 'Unieke wensen verdienen unieke oplossingen. Wij creëren precies wat u voor ogen heeft.',
      icon: <Sparkles className="w-6 h-6" />,
      features: ['Maatwerk design', 'Persoonlijke begeleiding', 'Unieke oplossingen'],
      ctaPrimary: 'Meer info',
      ctaSecondary: 'Offerte aanvragen'
    },
    {
      title: 'Renovatieadvies & ontwerp',
      description: 'Van eerste idee tot definitief plan: onze experts begeleiden u door het complete ontwerpproces.',
      icon: <Ruler className="w-6 h-6" />,
      features: ['3D visualisaties', 'Budgetadvies', 'Technische tekeningen'],
      ctaPrimary: 'Meer info',
      ctaSecondary: 'Offerte aanvragen'
    },
    {
      title: 'Herbestemmingen',
      description: 'Onbenutte ruimtes omtoveren tot functionele leefgebieden. Van zolder tot slaapkamer, van kelder tot kantoor.',
      icon: <RotateCcw className="w-6 h-6" />,
      features: ['Ruimte optimalisatie', 'Creatieve oplossingen', 'Functioneel design'],
      ctaPrimary: 'Meer info',
      ctaSecondary: 'Offerte aanvragen'
    },
    {
      title: 'Projectcoördinatie',
      description: 'Wij nemen de volledige coördinatie uit handen: van planning tot oplevering, alles perfect georganiseerd.',
      icon: <Target className="w-6 h-6" />,
      features: ['Tijdsplanning', 'Kwaliteitscontrole', 'Communicatie & updates'],
      ctaPrimary: 'Meer info',
      ctaSecondary: 'Offerte aanvragen'
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 px-6 overflow-hidden"
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

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 opacity-10"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full rounded-full blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${HORIZON_COLORS.gold500} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 opacity-10"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full rounded-full blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${HORIZON_COLORS.navy600} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500}20, ${HORIZON_COLORS.gold400}15)`,
              border: `1px solid ${HORIZON_COLORS.gold500}40`
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
              Totaalrenovaties
            </span>
          </motion.div>
          
          {/* Main title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            Onze{' '}
            <span style={{ color: HORIZON_COLORS.gold500 }}>
              Diensten
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: HORIZON_COLORS.gray600 }}
          >
            Van complete renovaties tot maatwerk verbouwingen – wij bieden de volledige service 
            voor het transformeren van uw woonruimte tot het huis van uw dromen.
          </motion.p>
        </motion.div>

        {/* Services Grid - 6 items in responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {diensten.map((dienst, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative p-6 md:p-8 rounded-3xl backdrop-blur-sm border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
              style={{
                background: hoveredCard === index 
                  ? `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`
                  : `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
                border: `1px solid ${hoveredCard === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.gray200}`,
                boxShadow: hoveredCard === index 
                  ? `0 20px 40px rgba(253, 197, 0, 0.15), 0 8px 16px rgba(51, 51, 51, 0.08)` 
                  : `0 4px 12px rgba(51, 51, 51, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
              }}
            >
              {/* Gouden accent strip */}
              <div 
                className="absolute top-0 left-0 w-1 h-full transition-all duration-300"
                style={{ 
                  background: hoveredCard === index 
                    ? `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                    : 'transparent',
                  boxShadow: hoveredCard === index ? `0 0 8px rgba(253, 197, 0, 0.3)` : 'none'
                }}
              />

              {/* Background glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${HORIZON_COLORS.gold500}08, transparent 70%)`
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 space-y-6">
                
                {/* Icon & Title */}
                <div className="space-y-4">
                  <motion.div
                    animate={hoveredCard === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    className="inline-flex items-center justify-center p-4 rounded-2xl"
                    style={{
                      background: hoveredCard === index 
                        ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                        : `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
                      color: hoveredCard === index ? HORIZON_COLORS.navy800 : HORIZON_COLORS.gold500,
                      boxShadow: `0 4px 12px rgba(0, 41, 107, 0.3)`
                    }}
                  >
                    {dienst.icon}
                  </motion.div>
                  
                  <h3 
                    className="text-xl md:text-2xl font-bold transition-colors duration-300"
                    style={{ 
                      color: hoveredCard === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.ink,
                      fontFamily: "Kanit, sans-serif"
                    }}
                  >
                    {dienst.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="leading-relaxed text-sm md:text-base"
                  style={{ color: HORIZON_COLORS.gray600 }}
                >
                  {dienst.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {dienst.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 + featureIndex * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle 
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: HORIZON_COLORS.gold500 }}
                      />
                      <span 
                        className="text-sm font-medium"
                        style={{ color: HORIZON_COLORS.gray600 }}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                      color: HORIZON_COLORS.navy800,
                      fontFamily: "Kanit, sans-serif",
                      boxShadow: `0 4px 12px rgba(253, 197, 0, 0.3)`
                    }}
                  >
                    {dienst.ctaPrimary}
                  </button>
                  <button 
                    className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      border: `2px solid ${HORIZON_COLORS.gray200}`,
                      color: HORIZON_COLORS.ink,
                      fontFamily: "Kanit, sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${HORIZON_COLORS.gold500}10`;
                      e.currentTarget.style.borderColor = HORIZON_COLORS.gold500;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = HORIZON_COLORS.gray200;
                    }}
                  >
                    {dienst.ctaSecondary}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center space-y-8"
        >
          <div className="max-w-2xl mx-auto">
            <h3 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Klaar om te beginnen?
            </h3>
            <p 
              className="text-base md:text-lg mb-8"
              style={{ color: HORIZON_COLORS.gray600 }}
            >
              Laat ons uw droomproject werkelijkheid maken. Neem contact op voor een vrijblijvend adviesgesprek.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button 
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
              Gratis adviesgesprek
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            
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
              href="tel:+31612345678" 
              className="group flex items-center gap-2 text-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ 
                color: HORIZON_COLORS.gold500,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              <Phone className="w-5 h-5" />
              06 - 12 34 56 78
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGrid;