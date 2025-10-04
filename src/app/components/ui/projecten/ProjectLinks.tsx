// src/components/case-study/Links.tsx
'use client'

import { ProjectButton } from '@/app/components/ui/projecten/ProjectButton'
import { ProjectCard }   from '@/app/components/ui/projecten/ProjectCard'

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

interface ProjectLink {
  label: string
  url: string
  type: 'repo' | 'demo' | 'case' | 'blog'
}

interface LinksProps {
  links: ProjectLink[]
  navigation?: {
    previousCase?: { title: string; url: string }
    nextCase?: { title: string; url: string }
  }
  title?: string
}

// Link type icons en kleuren
const getLinkIcon = (type: ProjectLink['type']) => {
  switch (type) {
    case 'repo':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'demo':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      );
    case 'case':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      );
    case 'blog':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      );
  }
};

const getLinkColor = (type: ProjectLink['type']) => {
  switch (type) {
    case 'repo': return HORIZON_COLORS.navy700;
    case 'demo': return HORIZON_COLORS.gold500;
    case 'case': return HORIZON_COLORS.navy600;
    case 'blog': return HORIZON_COLORS.gold400;
    default: return HORIZON_COLORS.gray600;
  }
};

export function ProjectLinks({ links, navigation, title = "Links" }: LinksProps) {
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
      
      {/* Project links */}
      <div className="relative space-y-3 mb-8">
        {links.map((link, index) => (
          <div 
            key={index}
            className="group/link"
          >
            <a 
              href={link.url} 
              className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md group-hover/link:translate-x-2"
              style={{
                background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
                border: `1px solid ${HORIZON_COLORS.gray200}`,
                boxShadow: `0 2px 4px rgba(51, 51, 51, 0.06)`,
                color: HORIZON_COLORS.ink
              }}
              onClick={(e) => {
                e.preventDefault()
                alert(`Link naar: ${link.label}`)
              }}
            >
              {/* Link icon */}
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group-hover/link:scale-110"
                style={{
                  backgroundColor: `${getLinkColor(link.type)}15`,
                  color: getLinkColor(link.type)
                }}
              >
                {getLinkIcon(link.type)}
              </div>
              
              {/* Link label */}
              <span className="font-medium transition-colors duration-300 group-hover/link:text-opacity-80">
                {link.label}
              </span>
              
              {/* External link arrow */}
              <div className="ml-auto opacity-50 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      {/* Case navigation */}
      {navigation && (
        <div 
          className="relative pt-6"
          style={{
            borderTop: `1px solid ${HORIZON_COLORS.gray200}`
          }}
        >
          <div className="flex justify-between items-center gap-4">
            {/* Previous case button */}
            {navigation.previousCase ? (
              <div 
                className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group/nav flex-1"
                style={{
                  background: `linear-gradient(135deg, ${HORIZON_COLORS.gray100} 0%, ${HORIZON_COLORS.gray50} 100%)`,
                  color: HORIZON_COLORS.ink,
                  border: `1px solid ${HORIZON_COLORS.gray200}`,
                  boxShadow: `0 2px 4px rgba(51, 51, 51, 0.06)`
                }}
                onClick={() => window.open(navigation.previousCase!.url, '_blank')}
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="transition-transform duration-300 group-hover/nav:-translate-x-1"
                >
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="transition-transform duration-300 group-hover/nav:-translate-x-1">
                  Vorige case
                </span>
              </div>
            ) : <div className="flex-1" />}
            
            {/* Next case button */}
            {navigation.nextCase && (
              <div 
                className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group/nav flex-1 justify-end"
                style={{
                  background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                  color: HORIZON_COLORS.navy800,
                  boxShadow: `
                    0 4px 12px rgba(253, 197, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3)
                  `
                }}
                onClick={() => window.open(navigation.nextCase!.url, '_blank')}
              >
                <span className="transition-transform duration-300 group-hover/nav:translate-x-1">
                  Volgende case
                </span>
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="transition-transform duration-300 group-hover/nav:translate-x-1"
                >
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      )}

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