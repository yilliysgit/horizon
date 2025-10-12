"use client";

import { Home, Building2, Briefcase, HardHat, Building, Users } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  yellow500: "#fbbf24",
  gray900: "#111827",
  gray700: "#374151",
  gray600: "#4b5563",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray50: "#f9fafb",
  white: "#ffffff",
};

type CustomerCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const categories: CustomerCategory[] = [
  {
    id: "particulieren",
    title: "Particulieren",
    subtitle: "Woningrenovaties",
    icon: <Home className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  },
  {
    id: "vve",
    title: "VVE's",
    subtitle: "Appartementencomplexen",
    icon: <Building2 className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  },
  {
    id: "ontwikkelaars",
    title: "Projectontwikkelaars",
    subtitle: "Ontwikkelprojecten",
    icon: <Briefcase className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  },
  {
    id: "bedrijven",
    title: "Bedrijven",
    subtitle: "Commerciële panden",
    icon: <Building className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  },
  {
    id: "woningcorporaties",
    title: "Woningcorporaties",
    subtitle: "Sociale woningbouw",
    icon: <Users className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  },
  {
    id: "aannemers",
    title: "Aannemers",
    subtitle: "Samenwerkingspartners",
    icon: <HardHat className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  },
];

export default function CustomerCategoriesGrid() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-3xl"
          style={{ backgroundColor: `${COLORS.blue600}10` }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-2xl"
          style={{ backgroundColor: `${COLORS.yellow600}10` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.yellow600 }} />
            Voor wie wij werken
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5 tracking-tight"
            style={{ color: COLORS.gray900 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vertrouwd door{" "}
            <span style={{ color: COLORS.blue700 }}>diverse opdrachtgevers</span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: COLORS.gray600 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Van particuliere woningverbouwingen tot grootschalige projectontwikkelingen in Amsterdam
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Background gradient on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ 
                  background: COLORS.gray200
                }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-4 md:mb-6 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                    color: COLORS.white,
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.icon}
                </motion.div>

                {/* Title */}
                <h3 
                  className="text-base md:text-lg lg:text-xl font-semibold mb-2"
                  style={{ color: COLORS.gray900 }}
                >
                  {category.title}
                </h3>

                {/* Subtitle */}
                <p 
                  className="text-xs md:text-sm"
                  style={{ color: COLORS.gray600 }}
                >
                  {category.subtitle}
                </p>

                {/* Decorative line */}
                <motion.div
                  className="mx-auto mt-4 h-1 rounded-full"
                  style={{ 
                    width: '40px',
                    backgroundColor: COLORS.yellow600,
                    opacity: 0.3
                  }}
                  whileHover={{ 
                    width: '60px',
                    opacity: 1,
                    backgroundColor: COLORS.blue700
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats Bar */}
        <motion.div
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div 
                className="text-3xl md:text-4xl font-semibold mb-2 tabular-nums"
                style={{ color: COLORS.blue700 }}
              >
                25+
              </div>
              <div className="text-sm font-medium" style={{ color: COLORS.gray700 }}>
                Jaar ervaring in Amsterdam
              </div>
            </div>

            <div>
              <div 
                className="text-3xl md:text-4xl font-semibold mb-2 tabular-nums"
                style={{ color: COLORS.blue700 }}
              >
                815+
              </div>
              <div className="text-sm font-medium" style={{ color: COLORS.gray700 }}>
                Projecten succesvol opgeleverd
              </div>
            </div>

            <div>
              <div 
                className="text-3xl md:text-4xl font-semibold mb-2 tabular-nums"
                style={{ color: COLORS.blue700 }}
              >
                98%
              </div>
              <div className="text-sm font-medium" style={{ color: COLORS.gray700 }}>
                Klanttevredenheid
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 mx-auto shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
              color: COLORS.white,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <span>Bespreek uw project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}