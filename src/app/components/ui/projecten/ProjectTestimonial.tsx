// src/components/case-study/Testimonial.tsx
import { ProjectCard } from "./ProjectCard"

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

interface TestimonialProps {
  quote: string
  author: string
  role: string
  company?: string
}

export function ProjectTestimonial({ quote, author, role, company }: TestimonialProps) {
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

      {/* Quote decoratie achtergrond */}
      <div 
        className="absolute top-6 right-6 w-24 h-24 opacity-5 transition-all duration-300 group-hover:scale-110 group-hover:opacity-10"
        style={{
          background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
          borderRadius: '50%',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 0% 100%)'
        }}
      />

      <div className="relative flex gap-6 items-start">
        {/* Quote icon container */}
        <div 
          className="flex-shrink-0 p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
            boxShadow: `
              0 4px 12px rgba(253, 197, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `
          }}
        >
          {/* Quote icon */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="transition-all duration-300"
            style={{ color: HORIZON_COLORS.navy800 }}
          >
            <path 
              d="M7 7h5v10H6V9a2 2 0 0 1 1-2Zm9 0h5v10h-6V9a2 2 0 0 1 1-2Z" 
              stroke="currentColor" 
              strokeWidth="2"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>
        </div>
        
        <div className="flex-1 space-y-6">
          {/* Quote text */}
          <blockquote 
            className="relative text-lg leading-relaxed font-medium italic transition-colors duration-300"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Georgia, serif"
            }}
          >
            {/* Opening quote mark */}
            <span 
              className="absolute -left-2 -top-2 text-4xl leading-none opacity-30"
              style={{ 
                color: HORIZON_COLORS.gold500,
                fontFamily: "serif"
              }}
            >
              "
            </span>
            
            <span className="relative z-10">
              {quote}
            </span>
            
            {/* Closing quote mark */}
            <span 
              className="absolute -bottom-4 text-4xl leading-none opacity-30"
              style={{ 
                color: HORIZON_COLORS.gold500,
                fontFamily: "serif",
                right: '0px'
              }}
            >
              "
            </span>
          </blockquote>
          
          {/* Attribution */}
          <footer className="relative">
            <div 
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.gray50} 0%, ${HORIZON_COLORS.gray100} 100%)`,
                border: `1px solid ${HORIZON_COLORS.gray200}`,
                boxShadow: `
                  0 2px 4px rgba(51, 51, 51, 0.06),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8)
                `
              }}
            >
              {/* Attribution bullet */}
              <div 
                className="w-1 h-6 rounded-full flex-shrink-0"
                style={{ 
                  background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                }}
              />
              
              <div className="text-sm">
                <span 
                  className="font-semibold tracking-tight"
                  style={{ 
                    color: HORIZON_COLORS.ink,
                    fontFamily: "Kanit, sans-serif"
                  }}
                >
                  {author}
                </span>
                <span 
                  className="mx-2"
                  style={{ color: HORIZON_COLORS.gray600 }}
                >
                  •
                </span>
                <span 
                  className="font-medium"
                  style={{ color: HORIZON_COLORS.gray600 }}
                >
                  {role}
                </span>
                {company && (
                  <>
                    <span 
                      className="mx-2"
                      style={{ color: HORIZON_COLORS.gray600 }}
                    >
                      •
                    </span>
                    <span 
                      className="font-medium"
                      style={{ color: HORIZON_COLORS.navy700 }}
                    >
                      {company}
                    </span>
                  </>
                )}
              </div>
            </div>
          </footer>
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