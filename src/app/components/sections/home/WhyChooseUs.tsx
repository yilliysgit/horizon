"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";

/*
  WhyChooseUs — Horizon-stijl
  - SSR safe (geen randoms in render)
  - Reduced-motion vriendelijk
*/

const COLORS = {
  navy800: "#00296b",
  navy700: "#003f88",
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
};

/* -------------------- CountUp (met inView + reduced motion) -------------------- */

interface CountUpProps {
  end: number;
  duration?: number; // sec
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
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
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

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      aria-label={ariaLabel}
      className={`relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl ${className}`}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      animate={reduce ? undefined : { x: pos.x, y: pos.y, scale: hover ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: `linear-gradient(90deg, ${COLORS.navy600}, ${COLORS.navy700})`,
        color: "#fff",
      }}
    >
      <span className="relative z-10">{children}</span>
      {!reduce && hover && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: COLORS.gold400, opacity: 0.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
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

  /* Client-only blob generatie (voorkomt SSR hydration mismatch) */
  const [blobs, setBlobs] = useState<BlobSpec[]>([]);
  useEffect(() => {
    const n = 7;
    const specs: BlobSpec[] = Array.from({ length: n }).map((_, i) => {
      // Semi-deterministische variatie
      const seed = i + 1;
      const rand = (min: number, max: number) => min + ((Math.sin(seed * 999) + 1) / 2) * (max - min);
      const size = rand(90, 220);
      const left = `${rand(5, 90)}%`;
      const top = `${rand(5, 90)}%`;
      const color = i % 2 === 0 ? COLORS.navy600 : COLORS.gold400;
      const dur = rand(16, 28);
      const delay = rand(0, 4);
      return { w: size, h: size, left, top, color, dur, delay };
    });
    setBlobs(specs);
  }, []);

  const features: Feature[] = [
    {
      title: "Totaaloplossing",
      description: "Van ontwerp tot oplevering — alles onder één dak geregeld.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Eigen vakmensen",
      description: "Geen tussenpersonen — een vast, professioneel team.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Transparante communicatie",
      description: "Heldere planning, vaste contactpersoon en duidelijke updates.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 overflow-hidden relative"
      style={{
        background:
          `radial-gradient(1200px 600px at 0% -20%, ${COLORS.gold400}0d, transparent), linear-gradient(180deg, #f8fafc, #ffffff)`,
      }}
    >
      {/* Achtergrond blobs (client-only) */}
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
              opacity: 0.06,
              filter: "blur(10px)",
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: [0, 30, -20, 10, 0],
                    y: [0, -30, 20, -10, 0],
                    rotate: [0, 5, -5, 3, 0],
                    scale: [1, 1.05, 0.95, 1.02, 1],
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
        <div className="flex flex-col md:flex-row items-center">
          {/* Linker tekst */}
          <div className="w-full md:w-1/2 md:pr-16 mb-12 md:mb-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 backdrop-blur mb-6">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.gold500 }} />
              Waarom Horizon
            </div>

            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, staggerChildren: 0.2 },
                },
              }}
            >
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900"
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              >
                <span className="block">Waarom bouwen met</span>
                <span className="block mt-1" style={{ color: COLORS.navy600 }}>
                  Horizon
                </span>
              </motion.h2>

              <motion.p
                className="mt-8 text-xl mb-10 text-slate-600 leading-relaxed"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } } }}
              >
                Meer dan 25 jaar ervaring in totaalbouw. Wij realiseren uw droomproject van A tot Z, met{" "}
                <strong className="font-semibold" style={{ color: COLORS.navy600 }}>
                  eigen mensen
                </strong>{" "}
                en{" "}
                <strong className="font-semibold" style={{ color: COLORS.navy600 }}>
                  transparante communicatie
                </strong>
                .
              </motion.p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.6 + idx * 0.2 } },
                    }}
                    whileHover={reduce ? undefined : { x: 10, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="flex-shrink-0 rounded-full p-3 mr-5 shadow-lg"
                      style={{ background: `linear-gradient(90deg, ${COLORS.gold500}, ${COLORS.gold400})` }}
                      whileHover={reduce ? undefined : { scale: 1.12, rotate: [0, 8, -8, 0], transition: { duration: 0.4 } }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <MagneticButton className="mt-12 px-10 py-4 font-semibold shadow-xl" ariaLabel="Bekijk onze projecten">
                <span className="flex items-center">
                  Bekijk onze projecten
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Rechter beeld */}
{/* Rechter beeld */}
<motion.div
  className="w-full md:w-1/2 relative"
  initial={{ opacity: 0, x: 100 }}
  animate={controls}
  variants={{
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } },
  }}
>
  {/* Belangrijk: overflow-visible zodat badges nooit worden afgeknipt */}
  <div className="relative h-[600px] rounded-2xl overflow-visible">

    {/* Fotokader met eigen overflow-hidden (alleen de foto is afgerond) */}
    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
      <motion.img
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop"
        alt="Horizon Totaalbouw project"
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.5 }}
      />
      {/* Donkere gradient onderin voor leesbaarheid overlays */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />
    </div>

    {/* Drijvende labels – veilige posities + kleine micro-animaties */}
    {[
      { label: "Ontwerp",   icon: "📐", className: "top-6 left-6" },
      { label: "Uitvoering",icon: "🔨", className: "top-28 right-6" },
      { label: "Oplevering",icon: "✅", className: "bottom-16 left-6" },
    ].map((it, idx) => (
      <motion.div
        key={it.label}
        className={`absolute ${it.className} px-5 py-2.5 rounded-xl shadow-xl border bg-white pointer-events-none`}
        style={{ borderColor: "rgba(253,197,0,0.35)" }} // gold500 @ 35%
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: [0, -3, 0, 2, 0],   // micro-move: heel klein
          x: [0,  2, 0, -2, 0],
        }}
        transition={{
          duration: 8 + idx * 1.5,
          delay: idx * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center text-base font-semibold" style={{ color: COLORS.navy600 }}>
          <span className="mr-3 text-xl">{it.icon}</span>
          {it.label}
        </div>
      </motion.div>
    ))}

    {/* Stats overlay */}
    <motion.div
      className="absolute bottom-8 left-8 right-8 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-slate-200 bg-white/70"
      initial={{ y: 100, opacity: 0 }}
      animate={controls}
      variants={{
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.9, ease: "backOut" } },
      }}
    >
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-sm mb-1 text-slate-600">Jaar ervaring</div>
          <div className="text-3xl font-bold" style={{ color: COLORS.navy600 }}>
            <CountUp end={25} />+
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm mb-1 text-slate-600">Projecten</div>
          <div className="text-3xl font-bold" style={{ color: COLORS.navy600 }}>
            <CountUp end={500} />+
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm mb-1 text-slate-600">Tevredenheid</div>
          <div className="text-3xl font-bold" style={{ color: COLORS.navy600 }}>
            <CountUp end={98} />%
          </div>
        </div>
      </div>
    </motion.div>

    {/* Hoekaccenten */}
    <div
      className="absolute left-4 top-4 h-8 w-8 rounded-tl-2xl border-l-4 border-t-4 pointer-events-none"
      style={{ borderColor: COLORS.gold500 }}
    />
    <div
      className="absolute right-4 bottom-4 h-8 w-8 rounded-br-2xl border-r-4 border-b-4 pointer-events-none"
      style={{ borderColor: COLORS.gold500 }}
    />
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
