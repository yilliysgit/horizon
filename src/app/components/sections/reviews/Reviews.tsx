"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

type GoogleReview = {
  id: string;
  name: string;
  date: string;
  rating: number;
  review: string;
  projectType?: string;
  avatar?: string;
};

const reviews: GoogleReview[] = [
  {
    id: "1",
    name: "Jan van der Berg",
    date: "2 weken geleden",
    rating: 5,
    review: "Horizon Totaalbouw heeft onze woning vakkundig gerenoveerd. Van begin tot eind professioneel begeleid. Het team denkt actief mee en levert kwaliteit. Zeer tevreden met het eindresultaat!",
    projectType: "Totaalrenovatie",
    avatar: "JB"
  },
  {
    id: "2",
    name: "Sophie Jansen",
    date: "1 maand geleden",
    rating: 5,
    review: "Onze badkamer en keuken zijn compleet vernieuwd door Horizon. Binnen budget, op tijd en het ziet er fantastisch uit. Communicatie was helder en ze hebben netjes gewerkt.",
    projectType: "Badkamer & Keuken",
    avatar: "SJ"
  },
  {
    id: "3",
    name: "Mark de Vries",
    date: "3 weken geleden",
    rating: 5,
    review: "Als VVE hebben we Horizon ingeschakeld voor onderhoudswerkzaamheden. Ze werkten snel, efficiënt en met respect voor de bewoners. Absolute aanrader voor grotere projecten.",
    projectType: "VVE Onderhoud",
    avatar: "MV"
  },
  {
    id: "4",
    name: "Lisa Bakker",
    date: "2 maanden geleden",
    rating: 5,
    review: "Ons dakkapel project is perfect uitgevoerd. De planning klopte, geen verrassingen en het resultaat overtreft onze verwachtingen. Top vakmanschap!",
    projectType: "Dakkapel",
    avatar: "LB"
  },
  {
    id: "5",
    name: "Thomas Hendriks",
    date: "3 maanden geleden",
    rating: 5,
    review: "Horizon heeft onze zolder verbouwd tot een prachtige extra verdieping. Ze dachten in oplossingen en werkten zeer nauwkeurig. Blij dat we voor hen gekozen hebben.",
    projectType: "Zolderverbouwing",
    avatar: "TH"
  },
];

export default function GoogleReviewsHorizon() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoplay) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setAutoplay(false);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-3xl"
          style={{ backgroundColor: `${COLORS.yellow600}10` }}
        />
        <div 
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-2xl"
          style={{ backgroundColor: `${COLORS.blue700}10` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
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
            <Star className="h-4 w-4" style={{ fill: COLORS.yellow600, color: COLORS.yellow600 }} />
            <span>Google Reviews</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5 tracking-tight"
            style={{ color: COLORS.gray900 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Wat klanten{" "}
            <span style={{ color: COLORS.blue700 }}>over ons zeggen</span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: COLORS.gray600 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ontdek waarom klanten Horizon Totaalbouw waarderen op Google
          </motion.p>
        </motion.div>

        {/* Google Rating Summary & Review Card - Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left: Google Rating Summary - 30% */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg h-full flex flex-col justify-center">
              <div className="text-center mb-6">
                <img 
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                  alt="Google"
                  className="h-8 mx-auto mb-6"
                />
                
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-semibold block mb-2" style={{ color: COLORS.gray900 }}>
                    4.9
                  </span>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6" 
                        style={{ fill: COLORS.yellow600, color: COLORS.yellow600 }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium" style={{ color: COLORS.gray600 }}>
                    Gebaseerd op 150+ reviews
                  </p>
                </div>
              </div>

              <motion.a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 rounded-xl font-medium text-sm border-2 flex items-center justify-center gap-2"
                style={{
                  borderColor: COLORS.blue700,
                  color: COLORS.blue700,
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: COLORS.blue700,
                  color: COLORS.white
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Bekijk alle reviews
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Review Card - 70% */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-6 md:p-10 border-2 shadow-2xl relative h-full"
                style={{ borderColor: COLORS.gray200 }}
              >
                {/* Quote icon */}
                <div 
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center opacity-10"
                  style={{ backgroundColor: COLORS.blue700 }}
                >
                  <Quote className="w-8 h-8 md:w-10 md:h-10" style={{ color: COLORS.blue700 }} />
                </div>

                {/* Header with avatar and info */}
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-lg md:text-xl font-semibold shadow-lg flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`
                    }}
                  >
                    {currentReview.avatar}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-1" style={{ color: COLORS.gray900 }}>
                      {currentReview.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(currentReview.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4" 
                            style={{ fill: COLORS.yellow600, color: COLORS.yellow600 }}
                          />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm" style={{ color: COLORS.gray600 }}>
                        {currentReview.date}
                      </span>
                    </div>
                    {currentReview.projectType && (
                      <span 
                        className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
                        style={{ 
                          backgroundColor: `${COLORS.yellow600}20`,
                          color: COLORS.yellow600
                        }}
                      >
                        {currentReview.projectType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review text */}
                <blockquote className="text-base md:text-lg lg:text-xl leading-relaxed mb-6" style={{ color: COLORS.gray700 }}>
                  "{currentReview.review}"
                </blockquote>

                {/* Google verification badge */}
                <div className="flex items-center gap-2 pt-6 border-t" style={{ borderColor: COLORS.gray200 }}>
                  <svg className="w-4 h-4" style={{ color: COLORS.blue700 }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: COLORS.gray600 }}>
                    Geverifieerde Google review
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons - only on review card */}
            <motion.button
              onClick={goToPrevious}
              className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white border-2 shadow-lg z-10"
              style={{ borderColor: COLORS.gray200 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Vorige review"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: COLORS.gray700 }} />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white border-2 shadow-lg z-10"
              style={{ borderColor: COLORS.gray200 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Volgende review"
            >
              <ChevronRight className="w-5 h-5" style={{ color: COLORS.gray700 }} />
            </motion.button>
          </div>
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex lg:hidden justify-center gap-4 mb-6">
          <motion.button
            onClick={goToPrevious}
            className="p-3 rounded-full bg-white border-2 shadow-lg"
            style={{ borderColor: COLORS.gray200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Vorige review"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: COLORS.gray700 }} />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="p-3 rounded-full bg-white border-2 shadow-lg"
            style={{ borderColor: COLORS.gray200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Volgende review"
          >
            <ChevronRight className="w-5 h-5" style={{ color: COLORS.gray700 }} />
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className="transition-all duration-300"
              style={{
                width: currentIndex === index ? '32px' : '12px',
                height: '12px',
                borderRadius: currentIndex === index ? '12px' : '50%',
                backgroundColor: currentIndex === index ? COLORS.blue700 : COLORS.gray300,
              }}
              aria-label={`Ga naar review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}