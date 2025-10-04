// src/components/case-study/Results.tsx
'use client'

import { ProjectCard } from "./ProjectCard";
import { ProjectButton } from "./ProjectButton";

const HORIZON_COLORS = {
  navy800: "#00296b",
  navy700: "#003f88", 
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333"
};

interface ResultsProps {
  title?: string
  description: string
  metrics: string[]
  summary: {
    title: string
    description: string
    ctaText: string
    ctaLink: string
  }
}

export function ProjectResult({ 
  title = "Resultaat", 
  description, 
  metrics, 
  summary 
}: ResultsProps) {
  return (
    <div 
      className="relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl group overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
        border: `1px solid ${HORIZON_COLORS.gray200}`,
        boxShadow: `
          0 4px 12px rgba(51, 51, 51, 0.08),
          0 2px 4px rgba(51, 51, 51, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `
      }}
    >
      {/* Gouden accent */}
      <div 
        className="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-1.5"
        style={{ 
          background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 50%, ${HORIZON_COLORS.gold500} 100%)`,
          boxShadow: `0 0 8px rgba(253, 197, 0, 0.3)`
        }}
      />

      {/* Subtiele achtergrond pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${HORIZON_COLORS.gold500} 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Title */}
      <h2 
        className="relative text-2xl font-bold mb-6 tracking-tight"
        style={{ 
          color: HORIZON_COLORS.ink,
          fontFamily: "Kanit, sans-serif",
          textShadow: "0 1px 2px rgba(51, 51, 51, 0.1)"
        }}
      >
        {title}
      </h2>

      <div className="relative grid md:grid-cols-2 gap-8">
        {/* Left column: Description & metrics */}
        <div className="space-y-6">
          {/* Description */}
          <p 
            className="text-base leading-relaxed"
            style={{ color: HORIZON_COLORS.gray600 }}
          >
            {description}
          </p>
          
          {/* Metrics list */}
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-start gap-3 group/metric">
                {/* Metric bullet */}
                <div 
                  className="relative mt-2 flex-shrink-0 transition-all duration-300 group-hover/metric:scale-125"
                  style={{ 
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                    boxShadow: `0 0 8px rgba(253, 197, 0, 0.4)`
                  }}
                >
                  {/* Inner glow */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-60"
                    style={{
                      background: `radial-gradient(circle, ${HORIZON_COLORS.gold400} 0%, transparent 70%)`
                    }}
                  />
                </div>
                
                {/* Metric text */}
                <span 
                  className="text-sm font-medium leading-relaxed transition-colors duration-300 group-hover/metric:text-opacity-80"
                  style={{ color: HORIZON_COLORS.ink }}
                >
                  {metric}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column: Summary card */}
        <div 
          className="relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group/card overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 50%, ${HORIZON_COLORS.navy600} 100%)`,
            border: `1px solid ${HORIZON_COLORS.navy700}`,
            boxShadow: `
              0 8px 24px rgba(0, 41, 107, 0.25),
              0 4px 8px rgba(0, 41, 107, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        >
          {/* Card background pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, ${HORIZON_COLORS.gold500} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Gouden accent hoek */}
          <div 
            className="absolute top-0 right-0 w-16 h-16 transition-all duration-300 group-hover/card:w-20 group-hover/card:h-20"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
              opacity: 0.15
            }}
          />

          {/* Summary title */}
          <h3 
            className="relative text-lg font-bold mb-3 tracking-tight"
            style={{ 
              color: HORIZON_COLORS.white,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            {summary.title}
          </h3>
          
          {/* Summary description */}
          <p 
            className="relative text-sm leading-relaxed mb-6"
            style={{ color: `${HORIZON_COLORS.white}CC` }}
          >
            {summary.description}
          </p>
          
          {/* CTA Button container */}
          <div className="relative">
            <div 
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group/btn"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                color: HORIZON_COLORS.navy800,
                boxShadow: `
                  0 4px 12px rgba(253, 197, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `
              }}
              onClick={() => window.open(summary.ctaLink, '_blank')}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">
                {summary.ctaText}
              </span>
              
              {/* Arrow icon */}
              <svg 
                className="relative z-10 ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              
              {/* Button shine effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtiele shine effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(253, 197, 0, 0.05) 50%, transparent 100%)`,
        }}
      />
    </div>
  )
}