// src/components/case-study/TableOfContents.tsx
'use client'

import { ProjectCard } from "./ProjectCard"
import { useState, useEffect } from 'react'

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

interface TocItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
  title?: string
}

export function ProjectTableOfContents({ items, title = "Inhoud" }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState('')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }

  // Simulate active section detection for demo
  useEffect(() => {
    if (items.length > 0) {
      setActiveSection(items[0].id)
    }
  }, [items])

  return (
    <div className="sticky top-5">
      <div 
        className="relative p-6 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl group overflow-hidden"
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
            backgroundSize: '20px 20px'
          }}
        />

        {/* Header met icoon */}
        <div className="relative flex items-center gap-3 mb-5">
          <div 
            className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
              boxShadow: `0 2px 8px rgba(253, 197, 0, 0.3)`
            }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ color: HORIZON_COLORS.navy800 }}
            >
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </div>
          
          <h3 
            className="font-bold text-lg tracking-tight"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            {title}
          </h3>
        </div>
        
        {/* Navigation items */}
        <nav className="relative space-y-2 mb-6">
          {items.map((item, index) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group/item relative w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md"
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 100%)`
                    : `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
                  border: `1px solid ${isActive ? HORIZON_COLORS.navy700 : HORIZON_COLORS.gray200}`,
                  color: isActive ? HORIZON_COLORS.white : HORIZON_COLORS.ink,
                  boxShadow: isActive 
                    ? `0 4px 12px rgba(0, 41, 107, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                    : `0 2px 4px rgba(51, 51, 51, 0.06)`
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{ 
                      background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                    }}
                  />
                )}
                
                {/* Item number */}
                <div className="flex items-center gap-3">
                  <span 
                    className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all duration-300"
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`
                        : `${HORIZON_COLORS.gray200}`,
                      color: isActive ? HORIZON_COLORS.navy800 : HORIZON_COLORS.gray600
                    }}
                  >
                    {index + 1}
                  </span>
                  
                  <span className="text-sm font-medium transition-all duration-300 group-hover/item:translate-x-1">
                    {item.label}
                  </span>
                </div>

                {/* Hover arrow */}
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:translate-x-1"
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </button>
            )
          })}
        </nav>
        
        {/* Download button */}
        <button 
          className="relative w-full flex items-center justify-center gap-3 p-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg group/download overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
            color: HORIZON_COLORS.navy800,
            border: `1px solid ${HORIZON_COLORS.gold400}`,
            boxShadow: `
              0 4px 12px rgba(253, 197, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `
          }}
          onClick={() => alert('Download PDF')}
        >
          {/* Download icon */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="transition-transform duration-300 group-hover/download:translate-y-1"
          >
            <path 
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          
          <span className="transition-transform duration-300 group-hover/download:translate-y-1">
            Download PDF
          </span>

          {/* Button shine effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/download:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`
            }}
          />
        </button>

        {/* Progress indicator */}
        <div className="relative mt-4 pt-4" style={{ borderTop: `1px solid ${HORIZON_COLORS.gray200}` }}>
          <div className="flex items-center justify-between text-xs" style={{ color: HORIZON_COLORS.gray600 }}>
            <span>Voortgang</span>
            <span>
              {items.findIndex(item => item.id === activeSection) + 1} / {items.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div 
            className="mt-2 h-2 rounded-full overflow-hidden"
            style={{ background: HORIZON_COLORS.gray200 }}
          >
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((items.findIndex(item => item.id === activeSection) + 1) / items.length) * 100}%`,
                background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                boxShadow: `0 0 8px rgba(253, 197, 0, 0.4)`
              }}
            />
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
    </div>
  )
}