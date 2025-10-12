import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  orange600: "#f59e0b",
  orange500: "#fbbf24",
  gray900: "#111827",
  gray600: "#4b5563",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  white: "#ffffff",
};

export type PricingPackage = {
  name: string;
  price?: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export type SubdienstPricingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  priceRange?: string;
  priceNote?: string;
  packages: PricingPackage[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
};

export default function SubdienstPricing({
  eyebrow,
  title,
  intro,
  priceRange,
  priceNote,
  packages,
  ctaLabel = "Vraag offerte aan",
  ctaHref = "#offerte",
  onCtaClick,
  className = "",
}: SubdienstPricingProps) {
  const reduce = useReducedMotion();

  return (
    <section className={`relative py-16 md:py-24 px-6 bg-white ${className}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          {eyebrow && (
            <div
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium mb-4"
              style={{ color: COLORS.blue700 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: COLORS.blue600 }} />
              {eyebrow}
            </div>
          )}

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: COLORS.gray900 }}>
            {title}
          </h2>

          {intro && (
            <p className="text-lg leading-relaxed mb-6" style={{ color: COLORS.gray600 }}>
              {intro}
            </p>
          )}

          {/* Price range indicator */}
          {priceRange && (
            <div className="inline-flex flex-col items-center gap-2 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl px-8 py-4 border border-blue-100">
              <div className="text-sm font-medium" style={{ color: COLORS.gray600 }}>
                Indicatieve prijs
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {priceRange}
              </div>
              {priceNote && (
                <div className="text-xs" style={{ color: COLORS.gray600 }}>
                  {priceNote}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={reduce ? undefined : { y: -8 }}
              className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
                pkg.highlighted
                  ? "bg-gradient-to-br from-blue-50 to-white shadow-xl"
                  : "bg-white hover:shadow-lg"
              }`}
              style={{
                borderColor: pkg.highlighted ? COLORS.blue600 : COLORS.gray200,
              }}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div
                    className="inline-flex items-center gap-1 rounded-full px-4 py-1 text-xs font-semibold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.orange600}, ${COLORS.orange500})`,
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {pkg.badge}
                  </div>
                </div>
              )}

              {/* Package name */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.gray900 }}>
                  {pkg.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>
                  {pkg.description}
                </p>
              </div>

              {/* Price */}
              {pkg.price && (
                <div className="mb-6 pb-6 border-b" style={{ borderColor: COLORS.gray200 }}>
                  <div className="text-3xl font-bold" style={{ color: COLORS.gray900 }}>
                    {pkg.price}
                  </div>
                  {pkg.priceNote && (
                    <div className="text-sm mt-1" style={{ color: COLORS.gray600 }}>
                      {pkg.priceNote}
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: pkg.highlighted ? COLORS.blue600 : COLORS.blue600 }}
                    />
                    <span className="text-sm leading-relaxed" style={{ color: COLORS.gray600 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={ctaHref}
                onClick={onCtaClick}
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full text-center rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                  pkg.highlighted
                    ? "text-white shadow-lg hover:shadow-xl"
                    : "border-2 hover:border-blue-600"
                }`}
                style={
                  pkg.highlighted
                    ? {
                        background: `linear-gradient(135deg, ${COLORS.blue600}, ${COLORS.blue700})`,
                      }
                    : {
                        borderColor: COLORS.gray200,
                        color: COLORS.blue600,
                        backgroundColor: COLORS.white,
                      }
                }
              >
                {ctaLabel}
              </motion.a>

              {/* Highlight glow effect */}
              {pkg.highlighted && (
                <div
                  className="absolute inset-0 -z-10 rounded-2xl opacity-30 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.blue600}, ${COLORS.blue700})`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm mb-4" style={{ color: COLORS.gray600 }}>
            Niet zeker welk pakket bij u past? We helpen u graag met een persoonlijk advies.
          </p>
          <motion.a
            href={ctaHref}
            onClick={onCtaClick}
            whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${COLORS.orange600}, ${COLORS.orange500})`,
            }}
          >
            Gratis adviesgesprek
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// VOORBEELD GEBRUIK
export function ExampleUsage() {
  return (
    <SubdienstPricing
      eyebrow="Transparante prijzen"
      title="Indicatieve kosten & planning"
      intro="Kies het pakket dat bij uw wensen en budget past. Alle pakketten zijn volledig aanpasbaar."
      priceRange="€800 - €1.500 per m²"
      priceNote="Exacte prijs na opname en uitwerking"
      packages={[
        {
          name: "Starter",
          description: "Basis renovatie met kwalitatieve materialen",
          features: [
            "Basisafwerking stuc en schilder",
            "Standaard elektra & loodgieter",
            "Bestaande installaties hergebruiken",
            "Laminaat of PVC vloer",
            "Standaard sanitair",
          ],
        },
        {
          name: "Comfort",
          description: "Complete renovatie met hoogwaardige afwerking",
          badge: "Populair",
          highlighted: true,
          features: [
            "Hoogwaardige afwerking",
            "Nieuwe keuken & badkamer",
            "Verbeterde isolatie",
            "Nieuwe elektra & loodgieter",
            "Parket of tegelvloer",
            "Mid-range sanitair",
            "LED verlichting",
          ],
        },
        {
          name: "Premium",
          description: "Luxe totaalrenovatie met maatwerk",
          features: [
            "Luxe maatwerk afwerking",
            "Designer keuken & badkamer",
            "A++++ isolatie & ventilatie",
            "Smart home domotica",
            "Vloerverwarming",
            "High-end sanitair & apparatuur",
            "Op maat gemaakte kasten",
          ],
        },
      ]}
    />
  );
}