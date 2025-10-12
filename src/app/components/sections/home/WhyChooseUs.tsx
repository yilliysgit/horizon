"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";

/*
  WhyChooseUs — Horizon Blue + Yellow
  - Consistente kleuren met Hero
  - SEO geoptimaliseerde content
  - Lichtere font-weights
  - Betere hierarchy
*/

const COLORS = {
  // Blue systeem (consistent met global.css)
  blue900: "#003366",
  blue800: "#004499",
  blue700: "#0066cc", // PRIMARY
  blue600: "#1a73e8",
  blue500: "#3182ce",
  
  // Yellow accent (consistent met global.css)
  yellow700: "#d97706",
  yellow600: "#f59e0b", // ACCENT
  yellow500: "#fbbf24",
  yellow400: "#fcd34d",
};

/* -------------------- CountUp (met inView + reduced motion) -------------------- */

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState<number>(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setCount(end);
      return;
    }

    let startTime = 0;
    let raf = 0;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, isInView, reduce]);

  return <span ref={nodeRef}>{count}</span>;
};

/* -------------------------- Magnetic CTA knop -------------------------- */

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  ariaLabel,
  href,
}) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !buttonRef.current) return;
    const r = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / 5;
    const y = (e.clientY - (r.top + r.height / 2)) / 5;
    setPos({ x, y });
  };

  const reset = () => {
    setPos({ x: 0, y: 0 });
    setHover(false);
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { type: "button" as const, onClick };

  return (
    <Component
      ref={buttonRef as any}
      aria-label={ariaLabel}
      className={`relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl inline-flex items-center ${className}`}
      {...props}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      animate={reduce ? undefined : { x: pos.x, y: pos.y, scale: hover ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: `linear-gradient(135deg, ${COLORS.blue700}, ${COLORS.blue600})`,
        color: "#fff",
      }}
    >
      <span className="relative z-10">{children}</span>
      {!reduce && hover && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: COLORS.yellow600, opacity: 0.15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
        />
      )}
    </Component>
  );
};

/* ------------------------------- Types ------------------------------- */

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

type BlobSpec = {
  w: number;
  h: number;
  left: string;
  top: string;
  color: string;
  dur: number;
  delay: number;
};

/* --------------------------- Hoofdcomponent --------------------------- */

const WhyChooseUs: React.FC = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  /* Client-only blob generatie */
  const [blobs, setBlobs] = useState<BlobSpec[]>([]);
  useEffect(() => {
    const n = 6;
    const specs: BlobSpec[] = Array.from({ length: n }).map((_, i) => {
      const seed = i + 1;
      const rand = (min: number, max: number) => min + ((Math.sin(seed * 999) + 1) / 2) * (max - min);
      const size = rand(100, 200);
      const left = `${rand(5, 90)}%`;
      const top = `${rand(5, 90)}%`;
      const color = i % 2 === 0 ? COLORS.blue700 : COLORS.yellow600;
      const dur = rand(18, 30);
      const delay = rand(0, 3);
      return { w: size, h: size, left, top, color, dur, delay };
    });
    setBlobs(specs);
  }, []);

  // SEO-optimized features met LSI keywords
  const features: Feature[] = [
    {
      title: "Totaaloplossing van A tot Z",
      description: "Complete begeleiding van eerste schets tot sleuteloverdracht. Eén aanspreekpunt voor alle bouwfasen.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Eigen vakteam in dienst",
      description: "Geen onderaannemers. Uw project wordt uitgevoerd door ons ervaren vaste team met 25+ jaar expertise.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Transparante planning & budget",
      description: "Vaste prijsafspraken, realistische deadlines en wekelijkse voortgangsupdates. Geen verrassingen achteraf.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-6 md:px-12 overflow-hidden relative bg-white"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Achtergrond blobs - subtiel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.w,
              height: b.h,
              left: b.left,
              top: b.top,
              backgroundColor: b.color,
              opacity: 0.04,
              filter: "blur(40px)",
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: [0, 20, -15, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.1, 0.9, 1],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Linker tekst */}
          <div className="w-full lg:w-1/2">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm mb-6">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.yellow600 }} />
              Waarom Horizon Totaalbouw
            </div>

            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, staggerChildren: 0.15 },
                },
              }}
            >
              {/* H2 - SEO optimized, lighter weight */}
              <motion.h2
                id="why-choose-us-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-gray-900 mb-6"
                variants={{ 
                  hidden: { opacity: 0, y: 30 }, 
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
                }}
              >
                <span className="block">Bouwen met vertrouwen</span>
                <span className="block mt-2" style={{ color: COLORS.blue700 }}>
                  in Amsterdam
                </span>
              </motion.h2>

              {/* Intro tekst - SEO keywords natuurlijk verwerkt */}
              <motion.p
                className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mb-8"
                variants={{ 
                  hidden: { opacity: 0, y: 20 }, 
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } 
                }}
              >
                Al meer dan 25 jaar specialist in{" "}
                <strong className="font-medium text-gray-900">totaalrenovaties</strong>,{" "}
                <strong className="font-medium text-gray-900">verbouwingen</strong> en{" "}
                <strong className="font-medium text-gray-900">nieuwbouwprojecten</strong> in Amsterdam. 
                Van eerste adviesgesprek tot oplevering, wij regelen alles onder één dak.
              </motion.p>

              {/* Features lijst */}
              <div className="space-y-5 mb-10">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4"
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 + idx * 0.15 } },
                    }}
                    whileHover={reduce ? undefined : { x: 8, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="flex-shrink-0 rounded-xl p-3 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${COLORS.yellow600}, ${COLORS.yellow500})` }}
                      whileHover={reduce ? undefined : { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <MagneticButton 
                href="/projecten"
                className="px-8 py-4 font-medium shadow-lg text-base" 
                ariaLabel="Bekijk gerealiseerde projecten in Amsterdam"
              >
                <span className="flex items-center gap-2">
                  Bekijk onze projecten
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Rechter beeld */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 60 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 60 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
            }}
          >
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-visible">
              
              {/* Foto container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop"
                  alt="Horizon Totaalbouw bouwproject in Amsterdam - totaalrenovatie en verbouwing"
                  className="w-full h-full object-cover"
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating badges - Process steps */}
              {[
                { label: "Advies & Ontwerp", icon: "📐", className: "top-8 left-8" },
                { label: "Uitvoering", icon: "🔨", className: "top-32 right-8" },
                { label: "Oplevering", icon: "✅", className: "bottom-24 left-8" },
              ].map((it, idx) => (
                <motion.div
                  key={it.label}
                  className={`absolute ${it.className} px-4 py-2.5 rounded-xl shadow-xl border bg-white/95 backdrop-blur-sm pointer-events-none`}
                  style={{ borderColor: COLORS.yellow600 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: [0, -4, 0, 3, 0],
                    x: [0, 3, 0, -2, 0],
                  }}
                  transition={{
                    duration: 7 + idx * 1.5,
                    delay: idx * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center text-sm font-medium" style={{ color: COLORS.blue700 }}>
                    <span className="mr-2 text-lg">{it.icon}</span>
                    {it.label}
                  </div>
                </motion.div>
              ))}

              {/* Stats overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 backdrop-blur-xl p-5 rounded-xl shadow-2xl border border-white/20 bg-white/90"
                initial={{ y: 80, opacity: 0 }}
                animate={controls}
                variants={{
                  hidden: { y: 80, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.8, ease: "backOut" } },
                }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Jaar ervaring</div>
                    <div className="text-2xl md:text-3xl font-semibold tabular-nums" style={{ color: COLORS.blue700 }}>
                      <CountUp end={25} />+
                    </div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Projecten</div>
                    <div className="text-2xl md:text-3xl font-semibold tabular-nums" style={{ color: COLORS.blue700 }}>
                      <CountUp end={500} />+
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Tevredenheid</div>
                    <div className="text-2xl md:text-3xl font-semibold tabular-nums" style={{ color: COLORS.blue700 }}>
                      <CountUp end={98} />%
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hoekaccenten - Yellow */}
              <div
                className="absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l-4 border-t-4 pointer-events-none"
                style={{ borderColor: COLORS.yellow600 }}
              />
              <div
                className="absolute right-4 bottom-4 h-10 w-10 rounded-br-2xl border-r-4 border-b-4 pointer-events-none"
                style={{ borderColor: COLORS.yellow600 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;