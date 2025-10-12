"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Info } from 'lucide-react';

/*
  HorizonServicesSlider — Consistent Blue + Yellow
  - Grotere tekst voor bullets (text-base md:text-lg)
  - Blue (#0066cc) + Yellow (#f59e0b)
  - Lichtere font-weights (500-600)
  - SEO-optimized content
*/

const COLORS = {
  blue700: '#0066cc',
  blue600: '#1a73e8',
  blue500: '#3182ce',
  yellow600: '#f59e0b',
  yellow500: '#fbbf24',
  gray900: '#111827',
  gray700: '#374151',
  gray600: '#4b5563',
  gray300: '#d1d5db',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  gray50: '#f9fafb',
  white: '#ffffff',
};

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  microcopy: string;
  primaryButton: string;
  secondaryButton: string;
  badge: string;
}

const HorizonServicesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      id: 'totaalrenovaties',
      title: 'Totaalrenovaties',
      subtitle: 'Volledige woningtransformatie van A tot Z',
      description: 'Van concept tot sleutelklaar: complete renovaties in Amsterdam met eigen vakteam en transparante planning.',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format&fit=crop',
      features: [
        'Complete renovaties',
        'Op- en aanbouwen', 
        'Verbouwingen op maat',
        'Renovatieadvies & ontwerp'
      ],
      microcopy: 'Gemiddelde projectduur: 8-16 weken',
      primaryButton: 'Plan renovatie',
      secondaryButton: 'Meer info',
      badge: '⭐ Meest populair'
    },
    {
      id: 'ruwbouw',
      title: 'Ruwbouw',
      subtitle: 'Stevige basis en dragende constructies',
      description: 'Professionele ruwbouw met VCA-gecertificeerd team. Fundaties, metselwerk en draagconstructies vakkundig uitgevoerd.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop',
      features: [
        'Funderingen',
        'Dragende constructies',
        'Metselwerk',
        'Betonwerken'
      ],
      microcopy: 'Specialist in dragende constructies',
      primaryButton: 'Offerte aanvragen',
      secondaryButton: 'Meer info',
      badge: '🏗️ Vakmanschap'
    },
    {
      id: 'dakwerken',
      title: 'Dakwerken',
      subtitle: 'Nieuwe daken en renovaties',
      description: 'Complete dakoplossingen in Amsterdam: nieuwe daken, renovaties en isolatie voor optimale bescherming van uw woning.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
      features: [
        'Nieuwe daken',
        'Dakrenovaties',
        'Dakisolatie',
        'Zink- en koperwerk'
      ],
      microcopy: '25+ jaar dakwerkervaring',
      primaryButton: 'Dakinspectie',
      secondaryButton: 'Meer info',
      badge: '🏠 Duurzaam'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentService = services[currentIndex];

  return (
    <section 
      className="w-full py-16 md:py-20 px-4 md:px-8"
      style={{ backgroundColor: COLORS.white }}
      aria-labelledby="services-slider-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider mb-6 backdrop-blur-sm"
            style={{
              backgroundColor: COLORS.white,
              borderColor: COLORS.gray200,
              color: COLORS.blue700,
            }}
          >
            <div 
              className="h-2 w-2 rounded-full" 
              style={{ backgroundColor: COLORS.yellow600 }}
            />
            Onze Diensten
          </motion.div>
          
          <motion.h2 
            id="services-slider-title"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 tracking-tight leading-tight"
            style={{ color: COLORS.gray900 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Totaaloplossingen voor{' '}
            <span style={{ color: COLORS.blue700 }}>uw bouwproject</span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: COLORS.gray600 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Van ruwbouw tot sleutelklare oplevering in Amsterdam — ontdek onze complete dienstverlening
          </motion.p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="grid md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={currentService.image}
                      alt={`${currentService.title} - Horizon Totaalbouw Amsterdam`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Badge - Yellow accent */}
                    <motion.div 
                      className="absolute top-6 left-6 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})`,
                        color: COLORS.white,
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-sm font-medium">
                        {currentService.badge}
                      </span>
                    </motion.div>

                    {/* Counter */}
                    <motion.div 
                      className="absolute bottom-6 left-6 px-4 py-2 rounded-xl backdrop-blur-md border"
                      style={{
                        backgroundColor: `${COLORS.white}dd`,
                        borderColor: COLORS.gray200,
                        color: COLORS.gray700,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-sm font-semibold">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div 
                    className="p-8 md:p-12 flex flex-col justify-center"
                    style={{ backgroundColor: COLORS.white }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3"
                        style={{ color: COLORS.gray900 }}
                      >
                        {currentService.title}
                      </h3>
                      
                      <p 
                        className="text-base md:text-lg mb-4 font-medium"
                        style={{ color: COLORS.blue700 }}
                      >
                        {currentService.subtitle}
                      </p>
                      
                      <p 
                        className="text-base md:text-lg mb-8 leading-relaxed"
                        style={{ color: COLORS.gray600 }}
                      >
                        {currentService.description}
                      </p>

                      {/* Features List - GROTERE TEKST */}
                      <div className="mb-8">
                        <h4 
                          className="text-sm font-medium mb-4 uppercase tracking-wider"
                          style={{ color: COLORS.gray700 }}
                        >
                          Wat wij doen:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentService.features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <div 
                                className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                                style={{ backgroundColor: COLORS.yellow600 }}
                              />
                              <span 
                                className="text-base md:text-lg font-normal"
                                style={{ color: COLORS.gray700 }}
                              >
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <motion.button
                          className="px-6 py-3.5 rounded-xl font-medium text-white flex items-center justify-center gap-2 shadow-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {currentService.primaryButton}
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                        
                        <motion.button
                          className="px-6 py-3.5 rounded-xl font-medium border-2 flex items-center justify-center gap-2"
                          style={{
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.gray300,
                            color: COLORS.gray700
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            y: -2,
                            borderColor: COLORS.blue700
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Info className="w-5 h-5" />
                          {currentService.secondaryButton}
                        </motion.button>
                      </div>

                      {/* Microcopy */}
                      <motion.p 
                        className="text-sm italic"
                        style={{ color: COLORS.gray600 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentService.microcopy}
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: COLORS.white,
              borderColor: COLORS.gray200,
              color: COLORS.gray700
            }}
            aria-label="Vorige dienst"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: COLORS.white,
              borderColor: COLORS.gray200,
              color: COLORS.gray700
            }}
            aria-label="Volgende dienst"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 scale-125' : 'w-3 hover:scale-110'
              }`}
              style={{
                backgroundColor: index === currentIndex 
                  ? COLORS.blue700
                  : COLORS.gray300
              }}
              aria-label={`Ga naar slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Service Tabs (Desktop) */}
        <div className="hidden lg:flex justify-center mt-12 gap-3 flex-wrap">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => goToSlide(index)}
              className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex 
                  ? COLORS.blue700
                  : COLORS.white,
                color: index === currentIndex 
                  ? COLORS.white
                  : COLORS.gray700,
                border: `2px solid ${index === currentIndex 
                  ? COLORS.blue700
                  : COLORS.gray200}`,
                boxShadow: index === currentIndex ? '0 4px 12px rgba(0,102,204,0.15)' : 'none'
              }}
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizonServicesSlider;