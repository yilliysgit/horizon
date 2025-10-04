import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Info } from 'lucide-react';

// TypeScript interfaces
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
      description: 'Van concept tot sleutelklaar: wij transformeren uw woning volledig volgens uw wensen.',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format&fit=crop',
      features: [
        'Complete renovaties',
        'Op- en aanbouwen', 
        'Verbouwingen op maat',
        'Renovatieadvies & ontwerp',
        'Herbestemmingen (bv. zolder → slaapkamer)',
        'Projectcoördinatie'
      ],
      microcopy: 'Gemiddelde projectduur: 8-16 weken',
      primaryButton: 'Plan renovatie',
      secondaryButton: 'Meer informatie'
    },
    {
      id: 'ruwbouw',
      title: 'Ruwbouw',
      subtitle: 'Stevige basis en dragende constructies',
      description: 'Professionele ruwbouw met kwaliteit en precisie voor een solide fundering van uw project.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop',
      features: [
        'Funderingen',
        'Dragende constructies',
        'Metselwerk',
        'Ruwbouw timmerwerk',
        'Betonwerken',
        'Kelderbouw'
      ],
      microcopy: 'Specialist in dragende constructies',
      primaryButton: 'Offerte aanvragen',
      secondaryButton: 'Meer informatie'
    },
    {
      id: 'dakwerken',
      title: 'Dakwerken',
      subtitle: 'Nieuwe daken en renovaties',
      description: 'Complete dakoplossingen: van nieuwe daken tot renovaties en isolatie voor optimale bescherming.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
      features: [
        'Nieuwe daken',
        'Dakrenovaties',
        'Dakisolatie',
        'Dakramen & lichtkoepels',
        'Zink- en koperwerk',
        'Dakgoten & regenwaterafvoer'
      ],
      microcopy: '25+ jaar dakwerkervaring',
      primaryButton: 'Dakinspectie',
      secondaryButton: 'Meer informatie'
    },
    {
      id: 'afwerking',
      title: 'Afwerking',
      subtitle: 'Perfecte finishing van binnen en buiten',
      description: 'Vakkundige afwerking die uw project compleet maakt met oog voor detail en kwaliteit.',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&auto=format&fit=crop',
      features: [
        'Afbouw timmerwerk',
        'Wanden & plafonds',
        'Stuc- en pleisterwerk',
        'Vloeren & tegelwerk',
        'Schilder- en lakwerk',
        'Binnen- & buitendeuren'
      ],
      microcopy: 'Tot in de puntjes afgewerkt',
      primaryButton: 'Bekijk voorbeelden',
      secondaryButton: 'Meer informatie'
    },
    {
      id: 'interieur',
      title: 'Interieur',
      subtitle: 'Maatwerk interieurdoplossingen',
      description: 'Van keukens tot badkamers: complete interieurdoplossingen op maat van uw lifestyle.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
      features: [
        'Keukens',
        'Badkamers',
        'Toiletten',
        'Inbouwkasten & maatwerkmeubilair',
        'Trappen & leuningen',
        'Interieurbekleding (bv. lambrisering)'
      ],
      microcopy: 'Persoonlijke stylingadvies inbegrepen',
      primaryButton: 'Design sessie',
      secondaryButton: 'Meer informatie'
    },
    {
      id: 'installaties',
      title: 'Installaties',
      subtitle: 'Moderne technieken en duurzame energie',
      description: 'Complete technische installaties voor comfort, veiligheid en energiebesparingen.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop',
      features: [
        'Elektrotechniek',
        'Loodgieterswerk',
        'Verwarming & ventilatie',
        'Airco & warmtepompen',
        'Domotica & smart home',
        'Zonnepanelen & duurzame energie'
      ],
      microcopy: 'Gecertificeerde installateurs',
      primaryButton: 'Technisch advies',
      secondaryButton: 'Meer informatie'
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

  // Touch handlers
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-advance slider (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentService = services[currentIndex];

  return (
    <section 
      className="w-full py-16 px-4 md:px-8"
      style={{ backgroundColor: 'var(--gray-50, #f9fafb)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wider mb-6"
            style={{
              backgroundColor: 'var(--white, #ffffff)',
              borderColor: 'var(--primary-blue, #0079C0)',
              color: 'var(--primary-blue, #0079C0)',
              borderWidth: '1px'
            }}
          >
            <div 
              className="h-1.5 w-1.5 rounded-full" 
              style={{ backgroundColor: 'var(--primary-blue, #0079C0)' }}
            />
            ONZE DIENSTEN
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: 'var(--gray-900, #111827)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Totaaloplossingen voor
            <span 
              className="block"
              style={{ 
                background: 'var(--primary-gradient, linear-gradient(90deg, #0079C0 0%, #55b8ff 100%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              uw bouwproject
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--gray-600, #4b5563)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Van ruwbouw tot sleutelklare oplevering - ontdek onze volledige dienstverlening
          </motion.p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div 
            ref={sliderRef}
            className="relative overflow-hidden rounded-3xl"
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
                <div className="grid md:grid-cols-2 min-h-[600px]">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={currentService.image}
                      alt={currentService.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Floating Category Badge */}
                    <motion.div 
                      className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-md border"
                      style={{
                        backgroundColor: 'var(--white, #ffffff)',
                        borderColor: 'var(--primary-blue, #0079C0)',
                        color: 'var(--primary-blue, #0079C0)',
                        borderOpacity: 0.3
                      }}
                      initial={{ opacity: 0, y: -20 }}
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
                    style={{ backgroundColor: 'var(--white, #ffffff)' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 
                        className="text-3xl md:text-4xl font-bold mb-2"
                        style={{ color: 'var(--gray-900, #111827)' }}
                      >
                        {currentService.title}
                      </h3>
                      
                      <p 
                        className="text-lg mb-4"
                        style={{ color: 'var(--primary-blue, #0079C0)' }}
                      >
                        {currentService.subtitle}
                      </p>
                      
                      <p 
                        className="text-lg mb-6 leading-relaxed"
                        style={{ color: 'var(--gray-600, #4b5563)' }}
                      >
                        {currentService.description}
                      </p>

                      {/* Features List */}
                      <div className="mb-8">
                        <h4 
                          className="text-sm font-semibold mb-4 uppercase tracking-wider"
                          style={{ color: 'var(--gray-700, #374151)' }}
                        >
                          Wat wij doen:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                style={{ backgroundColor: 'var(--primary-blue, #0079C0)' }}
                              />
                              <span 
                                className="text-sm"
                                style={{ color: 'var(--gray-700, #374151)' }}
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
                          className="px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
                          style={{ 
                            background: 'var(--primary-gradient, linear-gradient(90deg, #0079C0 0%, #55b8ff 100%))'
                          }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {currentService.primaryButton}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          className="px-6 py-3 rounded-xl font-semibold border-2 flex items-center justify-center gap-2"
                          style={{
                            backgroundColor: 'var(--white, #ffffff)',
                            borderColor: 'var(--gray-300, #d1d5db)',
                            color: 'var(--gray-700, #374151)'
                          }}
                          whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            borderColor: 'var(--primary-blue, #0079C0)'
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Info className="w-4 h-4" />
                          {currentService.secondaryButton}
                        </motion.button>
                      </div>

                      {/* Microcopy */}
                      <motion.p 
                        className="text-sm italic"
                        style={{ color: 'var(--gray-500, #6b7280)' }}
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
              backgroundColor: 'var(--white, #ffffff)',
              borderColor: 'var(--gray-200, #e5e7eb)',
              color: 'var(--gray-700, #374151)'
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-center z-10 transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: 'var(--white, #ffffff)',
              borderColor: 'var(--gray-200, #e5e7eb)',
              color: 'var(--gray-700, #374151)'
            }}
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'scale-125' : 'hover:scale-110'
              }`}
              style={{
                backgroundColor: index === currentIndex 
                  ? 'var(--primary-blue, #0079C0)' 
                  : 'var(--gray-300, #d1d5db)'
              }}
            />
          ))}
        </div>

        {/* Service Navigation Tabs (Desktop) */}
        <div className="hidden lg:flex justify-center mt-12 gap-4 flex-wrap">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                index === currentIndex ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: index === currentIndex 
                  ? 'var(--primary-blue, #0079C0)' 
                  : 'var(--white, #ffffff)',
                color: index === currentIndex 
                  ? 'white' 
                  : 'var(--gray-700, #374151)',
                border: `1px solid ${index === currentIndex 
                  ? 'var(--primary-blue, #0079C0)' 
                  : 'var(--gray-200, #e5e7eb)'}`
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