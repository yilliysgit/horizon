"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

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

// Floating Contact Info Badges
function FloatingContactBadge({ position, contactInfo, index }: {
  position: { top: string; left: string; delay: number };
  contactInfo: Array<{ icon: React.ReactNode; text: string }>;
  index: number;
}) {
  const [currentInfoIndex, setCurrentInfoIndex] = React.useState(index % contactInfo.length);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prev) => (prev + 1) % contactInfo.length);
    }, 4000 + (index * 600));
    return () => clearInterval(interval);
  }, [contactInfo.length, index]);

  const currentInfo = contactInfo[currentInfoIndex];

  return (
    <motion.div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
      }}
      initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
      animate={{
        opacity: [0, 0.8, 1, 0.8],
        scale: [0.8, 1, 1.1, 1],
        x: [-20, 15, -15, 20],
        y: [20, -15, 20, -25],
      }}
      transition={{
        duration: 18 + (index % 3) * 3,
        delay: position.delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <motion.div
        key={currentInfoIndex}
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md"
        style={{
          background: `linear-gradient(135deg, ${HORIZON_COLORS.white}20, ${HORIZON_COLORS.gray50}15)`,
          border: `1px solid ${HORIZON_COLORS.gold500}40`,
          boxShadow: `
            0 8px 24px rgba(253, 197, 0, 0.15),
            0 4px 8px rgba(0, 41, 107, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        }}
      >
        <div className="flex items-center gap-2">
          <div style={{ color: HORIZON_COLORS.gold500 }}>
            {currentInfo.icon}
          </div>
          <span 
            className="text-sm font-medium whitespace-nowrap"
            style={{ 
              color: HORIZON_COLORS.white,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            {currentInfo.text}
          </span>
        </div>
        <div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full opacity-80 animate-pulse"
          style={{ 
            background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
            boxShadow: `0 0 8px ${HORIZON_COLORS.gold500}60`
          }}
        ></div>
      </motion.div>
    </motion.div>
  );
}

// Floating Contact Info Component
const FloatingContactInfo = () => {
  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, text: "085 - 200 3300" },
    { icon: <Mail className="w-4 h-4" />, text: "info@horizontotaalbouw.nl" },
    { icon: <MapPin className="w-4 h-4" />, text: "Snelle service" },
    { icon: <Clock className="w-4 h-4" />, text: "Ma-Vr 8:00-17:00" },
    { icon: <ArrowRight className="w-4 h-4" />, text: "Gratis offerte" },
    { icon: <Phone className="w-4 h-4" />, text: "24/7 Bereikbaar" },
  ];

  const positions = [
    { top: "15%", left: "88%", delay: 0.0 },
    { top: "30%", left: "85%", delay: 2.0 },
    { top: "50%", left: "90%", delay: 4.0 },
    { top: "70%", left: "87%", delay: 6.0 },
    { top: "20%", left: "12%", delay: 8.0 },
    { top: "75%", left: "15%", delay: 10.0 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {positions.map((pos, idx) => (
        <FloatingContactBadge
          key={idx}
          position={pos}
          contactInfo={contactInfo}
          index={idx}
        />
      ))}
    </div>
  );
};

// Main Contact Hero Component
export default function ContactHero() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isBusinessHours = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    return day >= 1 && day <= 5 && hour >= 8 && hour < 17;
  };

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center py-12 px-6 md:px-12 overflow-hidden">
      {/* Background with construction image */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop')`,
          }}
        />
        {/* Horizon gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800}F0 0%, ${HORIZON_COLORS.navy700}E6 25%, ${HORIZON_COLORS.navy600}E6 75%, ${HORIZON_COLORS.navy800}F0 100%)`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, ${HORIZON_COLORS.navy800}80 100%)`
          }}
        />
      </div>

      {/* Grid overlay with gold accent */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-10"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              stroke={HORIZON_COLORS.gold500} 
              strokeOpacity="0.3" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Contact Info */}
      <FloatingContactInfo />

      <div className="max-w-6xl mx-auto text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-medium backdrop-blur-sm mb-8"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500}30, ${HORIZON_COLORS.gold400}20)`,
            border: `1px solid ${HORIZON_COLORS.gold500}60`,
            color: HORIZON_COLORS.white,
            boxShadow: `
              0 4px 12px rgba(253, 197, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            fontFamily: "Kanit, sans-serif"
          }}
        >
          <div 
            className={`w-3 h-3 rounded-full ${isBusinessHours() ? 'animate-pulse' : ''}`}
            style={{
              background: isBusinessHours() 
                ? `linear-gradient(135deg, #10b981, #059669)`
                : `linear-gradient(135deg, #f59e0b, #d97706)`,
              boxShadow: isBusinessHours() 
                ? '0 0 8px #10b98160'
                : '0 0 8px #f59e0b60'
            }}
          ></div>
          {isBusinessHours() ? 'We zijn nu bereikbaar' : 'Laat een bericht achter'}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ 
            color: HORIZON_COLORS.white,
            fontFamily: "Kanit, sans-serif"
          }}
        >
          Bouwbedrijf in Amsterdam{' '}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ color: HORIZON_COLORS.gold500 }}
          >
            Contact opnemen
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-12"
          style={{ 
            color: `${HORIZON_COLORS.white}CC`
          }}
        >
          Vertel ons kort over je project, dan nemen we snel contact op.
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="font-semibold px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
              color: HORIZON_COLORS.navy800,
              border: `1px solid ${HORIZON_COLORS.gold400}`,
              boxShadow: `
                0 8px 24px rgba(253, 197, 0, 0.4),
                0 4px 8px rgba(253, 197, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            <span className="flex items-center gap-2">
              Start je project
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.white}10, ${HORIZON_COLORS.gray50}05)`,
            border: `1px solid ${HORIZON_COLORS.white}20`,
            boxShadow: `
              0 4px 12px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <Clock className="w-5 h-5" style={{ color: HORIZON_COLORS.gold500 }} />
          <span 
            style={{ 
              color: HORIZON_COLORS.white,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            <span className="font-medium">Openingstijden:</span> Ma-Vr 8:00-17:00
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div 
            className="w-8 h-12 border-2 rounded-full flex justify-center pt-2"
            style={{ borderColor: `${HORIZON_COLORS.gold500}60` }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: HORIZON_COLORS.gold500 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}