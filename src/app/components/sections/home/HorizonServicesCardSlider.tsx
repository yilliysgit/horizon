"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Info, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Services Slider – Pure React (zonder Swiper)
  - WhyChooseUs/Hero stijl (Blauw + Geel)
  - Pixel-perfect uitlijning: translateX in px (incl. gutter), geen % + gap drift
  - Infinite loop (drievoudige lijst) + autoplay
  - Responsive: 1 / 2 / 3 kaarten
*/

const COLORS = {
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc",
  blue600: "#1a73e8",
  blue500: "#3182ce",
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

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  microcopy: string;
  primaryButton: string;
  secondaryButton: string;
  badge?: string;
}

interface Props {
  services?: Service[];
  autoplay?: boolean;
  autoplayDelay?: number; // ms
  onPrimaryClick?: (service: Service) => void;
  onSecondaryClick?: (service: Service) => void;
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "totaalrenovaties",
    title: "Totaalrenovaties",
    subtitle: "Volledige woningtransformatie van A tot Z",
    description:
      "Van concept tot sleutelklaar: wij transformeren uw woning volledig volgens uw wensen.",
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80&auto=format&fit=crop",
    features: [
      "Complete renovaties",
      "Op- en aanbouwen",
      "Verbouwingen op maat",
      "Renovatieadvies & ontwerp",
    ],
    microcopy: "Gemiddelde projectduur: 8–16 weken",
    primaryButton: "Plan renovatie",
    secondaryButton: "Meer info",
    badge: "Meest populair",
  },
  {
    id: "ruwbouw",
    title: "Ruwbouw",
    subtitle: "Stevige basis en dragende constructies",
    description:
      "Professionele ruwbouw met kwaliteit en precisie voor een solide fundering.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    features: ["Funderingen", "Dragende constructies", "Metselwerk", "Betonwerken"],
    microcopy: "Specialist in dragende constructies",
    primaryButton: "Offerte aanvragen",
    secondaryButton: "Meer info",
  },
  {
    id: "dakwerken",
    title: "Dakwerken",
    subtitle: "Nieuwe daken en renovaties",
    description:
      "Complete dakoplossingen voor optimale bescherming van uw woning.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop",
    features: ["Nieuwe daken", "Dakrenovaties", "Dakisolatie", "Zink- en koperwerk"],
    microcopy: "25+ jaar dakwerkervaring",
    primaryButton: "Dakinspectie",
    secondaryButton: "Meer info",
  },
  {
    id: "afwerking",
    title: "Afwerking",
    subtitle: "Perfecte finishing van binnen en buiten",
    description:
      "Vakkundige afwerking die uw project compleet maakt met oog voor detail.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop",
    features: [
      "Afbouw timmerwerk",
      "Stuc- en pleisterwerk",
      "Schilder- en lakwerk",
      "Vloeren & tegelwerk",
    ],
    microcopy: "Tot in de puntjes afgewerkt",
    primaryButton: "Bekijk voorbeelden",
    secondaryButton: "Meer info",
  },
  {
    id: "interieur",
    title: "Interieur",
    subtitle: "Maatwerk interieuroplossingen",
    description: "Complete interieuroplossingen op maat van uw lifestyle.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
    features: ["Keukens", "Badkamers", "Inbouwkasten", "Maatwerkmeubilair"],
    microcopy: "Persoonlijk stylingadvies inbegrepen",
    primaryButton: "Design sessie",
    secondaryButton: "Meer info",
    badge: "Premium service",
  },
  {
    id: "installaties",
    title: "Installaties",
    subtitle: "Moderne technieken en duurzame energie",
    description:
      "Complete technische installaties voor comfort en energiebesparingen.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop",
    features: ["Elektrotechniek", "Verwarming & ventilatie", "Domotica & smart home", "Zonnepanelen"],
    microcopy: "Gecertificeerde installateurs",
    primaryButton: "Technisch advies",
    secondaryButton: "Meer info",
  },
];

const SLIDE_MS = 450; // animatieduur van een stap (moet syncen met CSS transition)

/* ===========================================================
   Card
   =========================================================== */
const ServiceCard: React.FC<{
  service: Service;
  index: number;
  onPrimaryClick?: (service: Service) => void;
  onSecondaryClick?: (service: Service) => void;
}> = ({ service, index, onPrimaryClick, onSecondaryClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Badge */}
      {service.badge && (
        <motion.div
          className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
            color: COLORS.white,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-3 h-3 inline mr-1" />
          {service.badge}
        </motion.div>
      )}

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered
              ? `linear-gradient(135deg, ${COLORS.blue700}60, ${COLORS.yellow600}40)`
              : "linear-gradient(to-t, rgba(0,0,0,0.4), transparent)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Number */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
          }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Corner accent */}
        <div
          className="absolute right-4 bottom-4 h-8 w-8 rounded-br-2xl border-r-2 border-b-2"
          style={{ borderColor: COLORS.yellow600 }}
        />

        {/* Hover chips */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 flex justify-between gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                {service.features.length} diensten
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                Direct beschikbaar
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <motion.h3
          className="text-xl md:text-2xl font-semibold mb-2"
          style={{ color: isHovered ? COLORS.blue700 : COLORS.gray900 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        <p className="text-sm md:text-base mb-3 font-medium" style={{ color: COLORS.blue700 }}>
          {service.subtitle}
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-600">{service.description}</p>

        <motion.div className="mb-6">
          <div className="space-y-2.5">
            {service.features.map((feature, featureIndex) => (
              <motion.div
                key={feature}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: featureIndex * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: COLORS.yellow600 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-sm md:text-base font-normal text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-3 mb-4">
          <motion.button
            onClick={() => onPrimaryClick?.(service)}
            className="w-full px-5 py-3 rounded-xl text-white font-medium text-sm md:text-base flex items-center justify-center gap-2 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})` }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span>{service.primaryButton}</span>
            <motion.div animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <motion.button
            onClick={() => onSecondaryClick?.(service)}
            className="w-full px-5 py-3 rounded-xl font-medium text-sm md:text-base border-2 flex items-center justify-center gap-2"
            style={{ backgroundColor: "transparent", borderColor: COLORS.gray300, color: COLORS.gray700 }}
            whileHover={{ scale: 1.03, y: -2, borderColor: COLORS.blue700, color: COLORS.blue700 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Info className="w-4 h-4" />
            {service.secondaryButton}
          </motion.button>
        </div>

        <motion.p
          className="text-xs md:text-sm text-center px-4 py-2 rounded-xl bg-gray-50 text-gray-600"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {service.microcopy}
        </motion.p>
      </div>
    </motion.article>
  );
};

/* ===========================================================
   Slider
   =========================================================== */
const HorizonCardServicesSlider: React.FC<Props> = ({
  services = DEFAULT_SERVICES,
  autoplay = true,
  autoplayDelay = 6000,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  // Triple list voor infinite loop
  const extendedServices = [...services, ...services, ...services];

  // Start in het middenblok
  const [currentIndex, setCurrentIndex] = useState<number>(services.length);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

  // Layout state
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const [gutter, setGutter] = useState<number>(32); // px (xl)
  const [slideWidth, setSlideWidth] = useState<number>(0);

  // Responsive breakpoints (1/2/3) + gutter
  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setSlidesPerView(1);
        setGutter(16);
      } else if (w < 1280) {
        setSlidesPerView(2);
        setGutter(24);
      } else {
        setSlidesPerView(3);
        setGutter(32);
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Meet container en bereken exacte kaartbreedte
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const calc = () => {
      const total = el.clientWidth;
      const totalGutter = gutter * (slidesPerView - 1);
      const width = (total - totalGutter) / slidesPerView;
      setSlideWidth(width);
    };

    calc();

    // ResizeObserver voor containerbreedte
    const ro = new (window as any).ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (!entries.length) return;
      calc();
    });

    if (ro) ro.observe(el);
    return () => ro && ro.disconnect();
  }, [slidesPerView, gutter]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay]);

  // Boundaries voor infinite loop (na animatie terugjumpen zonder transition)
  useEffect(() => {
    if (!isTransitioning) return;

    const max = services.length * 2; // laatste index van het midden->einde blok
    const min = services.length - 1; // eerste index van het middenblok (1 stap vóór start)

    const timeout = setTimeout(() => {
      if (currentIndex >= max) {
        setIsTransitioning(false);
        setCurrentIndex(services.length); // terug naar start van middenblok
      } else if (currentIndex <= min) {
        setIsTransitioning(false);
        setCurrentIndex(services.length * 2 - 1); // naar einde van middenblok
      }
    }, SLIDE_MS + 20); // iets langer dan de animatie

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning, services.length]);

  // Na instant jump: transition weer aanzetten voor de volgende user step
  useEffect(() => {
    if (isTransitioning) return;
    // volgende tick weer aanzetten
    const id = requestAnimationFrame(() => setIsTransitioning(true));
    return () => cancelAnimationFrame(id);
  }, [isTransitioning]);

  // Helpers
  const step = slideWidth + gutter; // px
  const displayIndex = ((currentIndex % services.length) + services.length) % services.length;

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(services.length + idx);
  };

  return (
    <section
      className="w-full py-16 md:py-20 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: COLORS.white }}
      aria-labelledby="services-cards-title"
    >
      {/* Decorative bg */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
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
            Onze Diensten
          </motion.div>

          <motion.h2
            id="services-cards-title"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5 tracking-tight"
            style={{ color: COLORS.gray900 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Totaaloplossingen voor <span style={{ color: COLORS.blue700 }}>uw bouwproject</span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: COLORS.gray600 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Van ruwbouw tot sleutelklare oplevering in Amsterdam – 25+ jaar ervaring
          </motion.p>
        </motion.div>

        {/* Top controls bar */}
        <div
          className="flex items-center justify-between mb-8 px-4 py-3 rounded-xl"
          style={{ backgroundColor: COLORS.gray50 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: COLORS.gray600 }}>
              {displayIndex + 1} van {services.length} diensten
            </span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-sm"
              style={{ color: COLORS.gray700 }}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Vorige dienst"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-sm"
              style={{ color: COLORS.gray700 }}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Volgende dienst"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Slider viewport */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <div
            className="flex will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * step}px)`,
              transition: isTransitioning ? `transform ${SLIDE_MS}ms cubic-bezier(.2,.8,.2,1)` : "none",
              paddingBottom: "28px", // extra ruimte voor bullets
            }}
          >
            {extendedServices.map((service, i) => (
              <div
                key={`${service.id}-${i}`}
                className="flex-shrink-0"
                style={{
                  width: `${slideWidth}px`,
                  marginRight: `${gutter}px`,
                }}
              >
                <ServiceCard
                  service={service}
                  index={i % services.length}
                  onPrimaryClick={onPrimaryClick}
                  onSecondaryClick={onSecondaryClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bullets */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {services.map((_, index) => {
            const active = displayIndex === index;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: active ? "32px" : "12px",
                  height: "12px",
                  borderRadius: active ? "12px" : "50%",
                  backgroundColor: active ? COLORS.blue700 : COLORS.gray300,
                }}
                aria-label={`Ga naar dienst ${index + 1}`}
              />
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-3 mx-auto shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
              color: COLORS.white,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <span>Bekijk alle diensten</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizonCardServicesSlider;
