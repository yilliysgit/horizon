"use client";
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Building2, 
  Wrench, 
  Leaf, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Award,
  Clock
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

interface StatItem {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const BouwIntroSectie: React.FC = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredExpertise, setHoveredExpertise] = useState<number | null>(null);

  const expertiseItems = [
    {
      title: 'Complete nieuwbouw en uitbreidingen',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Van fundering tot dak, wij realiseren uw droomhuis'
    },
    {
      title: 'Renovaties en verbouwingen',
      icon: <Wrench className="w-5 h-5" />,
      description: 'Transformatie van bestaande ruimtes naar moderne woonoplossingen'
    },
    {
      title: 'Duurzame en energiezuinige oplossingen',
      icon: <Leaf className="w-5 h-5" />,
      description: 'Milieuvriendelijk bouwen voor de toekomst'
    },
    {
      title: 'Persoonlijk advies en begeleiding',
      icon: <Users className="w-5 h-5" />,
      description: 'Van eerste gesprek tot sleuteloverdracht'
    }
  ];

  const stats: StatItem[] = [
    { 
      number: '20+', 
      label: 'Jaar ervaring',
      icon: <Award className="w-6 h-6" />
    },
    { 
      number: '250+', 
      label: 'Projecten',
      icon: <Building2 className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Clean background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, ${HORIZON_COLORS.gray50} 0%, ${HORIZON_COLORS.white} 50%, ${HORIZON_COLORS.gray50} 100%)`
        }}
      />

      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-5 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${HORIZON_COLORS.gold500} 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, ${HORIZON_COLORS.navy600} 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 80px 80px'
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-10"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${HORIZON_COLORS.gold500} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 opacity-10"
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${HORIZON_COLORS.navy700} 0%, transparent 70%)`
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Links: Tekst kolom */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
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
                className="text-sm font-bold tracking-wide uppercase"
                style={{ 
                  color: HORIZON_COLORS.navy800,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                Totaalbouw van A tot Z
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Bouwen aan{' '}
              <span 
                className="relative"
                style={{ color: HORIZON_COLORS.gold500 }}
              >
                uw dromen
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6 text-lg leading-relaxed"
              style={{ color: HORIZON_COLORS.gray600 }}
            >
              <p>
                Wij zijn uw betrouwbare partner voor alle bouwwerkzaamheden, van nieuwbouw tot renovaties. 
                Met jarenlange ervaring in de bouwsector realiseren wij projecten die perfect aansluiten bij 
                uw wensen en budget. Onze ervaren vakmannen zorgen voor kwaliteit die generaties meegaat.
              </p>
              
              <p>
                Van de eerste schets tot de sleuteloverdracht begeleiden wij u door het hele bouwproces 
                met persoonlijke aandacht en transparante communicatie. Duurzaamheid en vakmanschap 
                staan centraal in alles wat wij doen.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                  color: HORIZON_COLORS.navy800,
                  fontFamily: "Kanit, sans-serif",
                  boxShadow: `0 4px 12px rgba(253, 197, 0, 0.3)`
                }}
              >
                Vraag offerte aan
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Rechts: Visuele kolom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            
            {/* Expertise Cards */}
            <div className="space-y-4">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl font-bold mb-6 text-center"
                style={{ 
                  color: HORIZON_COLORS.ink,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                Onze expertise
              </motion.h3>

              {expertiseItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  onMouseEnter={() => setHoveredExpertise(index)}
                  onMouseLeave={() => setHoveredExpertise(null)}
                  className="group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
                    border: `1px solid ${hoveredExpertise === index ? HORIZON_COLORS.gold500 : HORIZON_COLORS.gray200}`,
                    boxShadow: hoveredExpertise === index 
                      ? `0 8px 24px rgba(253, 197, 0, 0.2)` 
                      : `0 2px 4px rgba(51, 51, 51, 0.06)`
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${HORIZON_COLORS.gold500}10, transparent 70%)`
                    }}
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      animate={hoveredExpertise === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      className="flex-shrink-0 p-3 rounded-xl"
                      style={{
                        background: hoveredExpertise === index 
                          ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                          : `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
                        color: hoveredExpertise === index ? HORIZON_COLORS.navy800 : HORIZON_COLORS.gold500
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 
                        className="font-bold mb-2 transition-colors duration-300"
                        style={{ 
                          color: hoveredExpertise === index ? HORIZON_COLORS.navy800 : HORIZON_COLORS.ink,
                          fontFamily: "Kanit, sans-serif"
                        }}
                      >
                        {item.title}
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: HORIZON_COLORS.gray600 }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className="group relative p-8 rounded-2xl text-center cursor-pointer transition-all duration-300 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`,
                    boxShadow: `
                      0 8px 24px rgba(0, 41, 107, 0.3),
                      0 4px 8px rgba(0, 41, 107, 0.2)
                    `,
                    transform: hoveredStat === index ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0px)'
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${HORIZON_COLORS.gold500}20, transparent 70%)`
                    }}
                    animate={hoveredStat === index ? { scale: 1.5, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      animate={hoveredStat === index ? { scale: 1.1 } : { scale: 1 }}
                      style={{ color: HORIZON_COLORS.gold500 }}
                      className="mb-3 flex justify-center"
                    >
                      {stat.icon}
                    </motion.div>
                    
                    <motion.div
                      animate={hoveredStat === index ? { scale: 1.1 } : { scale: 1 }}
                      className="text-4xl font-black mb-2"
                      style={{ 
                        color: HORIZON_COLORS.white,
                        fontFamily: "Kanit, sans-serif"
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    <div 
                      className="text-sm font-bold uppercase tracking-wide opacity-90"
                      style={{ color: HORIZON_COLORS.white }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BouwIntroSectie;