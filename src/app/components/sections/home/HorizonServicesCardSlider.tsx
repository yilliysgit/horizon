"use client";
import React, { useMemo, useRef, useState } from "react";
import { ArrowRight, Info, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/*
  ---------------------------------------------------------------------------
  Services Slider - Hero Style voor Horizon Totaalbouw
  - Consistent met hero kleuren en styling
  - Zelfde design language als andere components
  - Horizon color palette en typography
  ---------------------------------------------------------------------------
*/

const COLORS = {
  navy800: "#00296b",
  navy700: "#003f88", 
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
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
  autoplayDelay?: number;
  onPrimaryClick?: (service: Service) => void;
  onSecondaryClick?: (service: Service) => void;
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "totaalrenovaties",
    title: "Totaalrenovaties",
    subtitle: "Volledige woningtransformatie van A tot Z",
    description: "Van concept tot sleutelklaar: wij transformeren uw woning volledig volgens uw wensen.",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80&auto=format&fit=crop",
    features: ["Complete renovaties", "Op- en aanbouwen", "Verbouwingen op maat", "Renovatieadvies & ontwerp"],
    microcopy: "Gemiddelde projectduur: 8–16 weken",
    primaryButton: "Plan renovatie",
    secondaryButton: "Meer info",
    badge: "Meest populair"
  },
  {
    id: "ruwbouw",
    title: "Ruwbouw",
    subtitle: "Stevige basis en dragende constructies",
    description: "Professionele ruwbouw met kwaliteit en precisie voor een solide fundering.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    features: ["Funderingen", "Dragende constructies", "Metselwerk", "Betonwerken"],
    microcopy: "Specialist in dragende constructies",
    primaryButton: "Offerte aanvragen",
    secondaryButton: "Meer info"
  },
  {
    id: "dakwerken",
    title: "Dakwerken",
    subtitle: "Nieuwe daken en renovaties",
    description: "Complete dakoplossingen voor optimale bescherming van uw woning.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop",
    features: ["Nieuwe daken", "Dakrenovaties", "Dakisolatie", "Zink- en koperwerk"],
    microcopy: "25+ jaar dakwerkervaring",
    primaryButton: "Dakinspectie",
    secondaryButton: "Meer info"
  },
  {
    id: "afwerking",
    title: "Afwerking",
    subtitle: "Perfecte finishing van binnen en buiten",
    description: "Vakkundige afwerking die uw project compleet maakt met oog voor detail.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop",
    features: ["Afbouw timmerwerk", "Stuc- en pleisterwerk", "Schilder- en lakwerk", "Vloeren & tegelwerk"],
    microcopy: "Tot in de puntjes afgewerkt",
    primaryButton: "Bekijk voorbeelden",
    secondaryButton: "Meer info"
  },
  {
    id: "interieur",
    title: "Interieur",
    subtitle: "Maatwerk interieuroplossingen",
    description: "Complete interieuroplossingen op maat van uw lifestyle.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
    features: ["Keukens", "Badkamers", "Inbouwkasten", "Maatwerkmeubilair"],
    microcopy: "Persoonlijk stylingadvies inbegrepen",
    primaryButton: "Design sessie",
    secondaryButton: "Meer info",
    badge: "Premium service"
  },
  {
    id: "installaties",
    title: "Installaties",
    subtitle: "Moderne technieken en duurzame energie",
    description: "Complete technische installaties voor comfort en energiebesparingen.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80&auto=format&fit=crop",
    features: ["Elektrotechniek", "Verwarming & ventilatie", "Domotica & smart home", "Zonnepanelen"],
    microcopy: "Gecertificeerde installateurs",
    primaryButton: "Technisch advies",
    secondaryButton: "Meer info"
  },
];

const ServiceCard: React.FC<{ 
  service: Service; 
  index: number; 
  onPrimaryClick?: (service: Service) => void; 
  onSecondaryClick?: (service: Service) => void 
}> = ({ service, index, onPrimaryClick, onSecondaryClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Hero-style Premium Badge */}
      {service.badge && (
        <motion.div
          className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold500}, ${COLORS.gold400})`,
            color: COLORS.navy800
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-3 h-3 inline mr-1" />
          {service.badge}
        </motion.div>
      )}

      {/* Enhanced Image Section */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Hero-style gradient overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: isHovered 
              ? `linear-gradient(135deg, ${COLORS.navy600}60, ${COLORS.gold500}40)`
              : "linear-gradient(to-t, rgba(0,0,0,0.4), transparent)"
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hero-style category number */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{ 
            background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`
          }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Corner accents zoals hero */}
        <div className="absolute right-4 bottom-4 h-6 w-6 rounded-br-2xl border-r-2 border-b-2" style={{ borderColor: COLORS.gold500 }} />

        {/* Floating elements on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                {service.features.length} diensten
              </div>
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                Direct beschikbaar
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Content Section - Hero styling */}
      <div className="p-6 relative">
        <motion.h3 
          className="text-xl font-bold mb-2 text-slate-900"
          animate={{ color: isHovered ? COLORS.navy600 : "#1f2937" }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
        
        <p 
          className="text-sm mb-3 font-semibold"
          style={{ color: COLORS.navy600 }}
        >
          {service.subtitle}
        </p>
        
        <p className="text-sm mb-6 leading-relaxed text-slate-600">
          {service.description}
        </p>

        {/* Hero-style Features met bolletjes */}
        <motion.div className="mb-6">
          <div className="space-y-2">
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
                  className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: COLORS.gold500 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-xs text-slate-700">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero-style Buttons */}
        <div className="flex flex-col gap-3 mb-4">
          <motion.button
            onClick={() => onPrimaryClick?.(service)}
            className="w-full px-4 py-3 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})`,
              color: COLORS.navy800
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">{service.primaryButton}</span>
            <motion.div
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <motion.button
            onClick={() => onSecondaryClick?.(service)}
            className="w-full px-4 py-3 rounded-2xl font-semibold text-sm border-2 flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              backgroundColor: "transparent",
              borderColor: COLORS.navy600,
              color: COLORS.navy600,
            }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: COLORS.navy600,
              color: "white"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Info className="w-4 h-4" />
            {service.secondaryButton}
          </motion.button>
        </div>

        {/* Hero-style Microcopy */}
        <motion.p 
          className="text-xs text-center px-4 py-2 rounded-xl bg-slate-50 text-slate-500"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {service.microcopy}
        </motion.p>
      </div>
    </motion.article>
  );
};

const HorizonCardServicesSlider: React.FC<Props> = ({
  services = DEFAULT_SERVICES,
  autoplay = true,
  autoplayDelay = 6000,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(() => services, [services]);

  return (
    <section
      className="w-full py-20 px-6 md:px-12 relative overflow-hidden"
      style={{
        background: `radial-gradient(1200px 600px at 100% -20%, ${COLORS.gold400}0d, transparent), linear-gradient(180deg, #ffffff, #f8fafc)`
      }}
    >
      {/* Hero-style decorative background elements - vierkanten */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 opacity-5"
          style={{ 
            backgroundColor: COLORS.navy600,
            borderRadius: '24px'
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 opacity-5"
          style={{ 
            backgroundColor: COLORS.gold400,
            borderRadius: '20px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero-style Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero-style badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 backdrop-blur mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: COLORS.gold500 }}
            />
            Onze diensten
          </motion.div>

          {/* Hero-style title */}
          <motion.h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Totaaloplossingen voor
            <span
              className="block mt-2"
              style={{ color: COLORS.navy600 }}
            >
              uw bouwproject
            </span>
          </motion.h2>

          <motion.p
            className="text-xl max-w-3xl mx-auto leading-relaxed text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Van ruwbouw tot sleutelklare oplevering – ontdek onze volledige dienstverlening met 25+ jaar ervaring
          </motion.p>
        </motion.div>

        {/* Hero-style Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">
              {activeIndex + 1} van {slides.length} diensten
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              ref={prevRef}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              ref={nextRef}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Swiper */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y, Keyboard]}
          spaceBetween={32}
          slidesPerView={1}
          slidesPerGroup={1}
          breakpoints={{
            768: { 
              slidesPerView: 2, 
              slidesPerGroup: 1,
              spaceBetween: 24 
            },
            1280: { 
              slidesPerView: 3, 
              slidesPerGroup: 1,
              spaceBetween: 32 
            },
          }}
          autoplay={autoplay ? { 
            delay: autoplayDelay, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true 
          } : false}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{ 
            clickable: true, 
            bulletClass: "swiper-pagination-bullet custom-bullet", 
            bulletActiveClass: "custom-bullet-active" 
          }}
          loop={true}
          speed={600}
          className="!pb-16"
        >
          {slides.map((service, i) => (
            <SwiperSlide key={service.id}>
              <ServiceCard
                service={service}
                index={i}
                onPrimaryClick={onPrimaryClick}
                onSecondaryClick={onSecondaryClick}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-pagination !static mt-8" />
        </Swiper>

        {/* Hero-style CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            className="px-10 py-4 rounded-2xl font-semibold border-2 flex items-center justify-center gap-3 mx-auto relative overflow-hidden"
            style={{
              backgroundColor: "transparent",
              borderColor: COLORS.navy600,
              color: COLORS.navy600,
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: COLORS.navy600,
              color: "white"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">Bekijk alle diensten</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        :global(.custom-bullet) {
          width: 16px !important;
          height: 16px !important;
          background: #d1d5db !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
          margin: 0 8px !important;
        }
        :global(.custom-bullet-active) {
          background: ${COLORS.gold500} !important;
          width: 40px !important;
          border-radius: 20px !important;
          transform: scale(1.2) !important;
        }
        :global(.swiper-pagination) {
          position: static !important;
        }
      `}</style>
    </section>
  );
};

export default HorizonCardServicesSlider;