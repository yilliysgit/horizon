import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Building2, Wrench, Zap, Users } from "lucide-react";

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

export type ExpertiseItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
};

export type BouwIntroSectieProps = {
  eyebrow?: string;
  title: React.ReactNode;
  paragraphs?: string[];
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  expertiseItems?: ExpertiseItem[];
  cta?: { 
    label: string; 
    href?: string; 
    onClick?: () => void;
  };
  contactBadge?: {
    label: string;
    phone: string;
    show?: boolean;
  };
  className?: string;
};

export default function BouwIntroSectie({
  eyebrow,
  title,
  paragraphs = [],
  leftContent,
  rightContent,
  expertiseItems,
  cta,
  contactBadge,
  className = "",
}: BouwIntroSectieProps) {
  const reduce = useReducedMotion();

  return (
    <section 
      className={`relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-32 px-6 ${className}`}
      aria-labelledby="bouw-intro-title"
    >
      {/* Decoratieve achtergrond elementen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* LINKS */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {leftContent ? (
              leftContent
            ) : (
              <>
                {/* Badge */}
                {eyebrow && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm shadow-sm"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 animate-pulse" />
                    {eyebrow}
                  </motion.div>
                )}

                {/* Title */}
                <h1
                  id="bouw-intro-title"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                  style={{ color: COLORS.gray900 }}
                >
                  {title}
                </h1>

                {/* Paragraphs */}
                {paragraphs.length > 0 && (
                  <div className="space-y-4 max-w-xl">
                    {paragraphs.map((p, i) => (
                      <p key={i} className="text-lg md:text-xl leading-relaxed" style={{ color: COLORS.gray600 }}>
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                {cta && (
                  <motion.a
                    href={cta.href}
                    onClick={cta.onClick}
                    whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.orange600}, ${COLORS.orange500})`,
                    }}
                  >
                    {cta.label}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                )}
              </>
            )}
          </motion.div>

          {/* RECHTS */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Als expertiseItems gegeven zijn, toon die als cards */}
            {expertiseItems ? (
              <>
                <h3 className="text-2xl font-bold mb-6" style={{ color: COLORS.gray900 }}>
                  Onze expertise
                </h3>
                <div className="space-y-4">
                  {expertiseItems.map((item, index) => {
                    const Icon = item.icon;
                    const itemColor = item.color || COLORS.blue600;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={reduce ? undefined : { scale: 1.02, x: 4 }}
                        className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className="flex-shrink-0 rounded-xl p-3 shadow-sm"
                            style={{ backgroundColor: `${itemColor}15` }}
                          >
                            <Icon className="h-6 w-6" style={{ color: itemColor }} />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold text-lg" style={{ color: COLORS.gray900 }}>
                              {item.title}
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Hover effect */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ 
                            background: `linear-gradient(135deg, ${itemColor}05, transparent)`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Anders gewoon rightContent tonen */
              rightContent
            )}
          </motion.div>
        </div>
      </div>

      {/* Contact info floating badge */}
      {contactBadge && contactBadge.show !== false && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 hidden lg:block z-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white text-xl">📞</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">{contactBadge.label}</div>
              <a 
                href={`tel:${contactBadge.phone.replace(/\s/g, '')}`} 
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                {contactBadge.phone}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}