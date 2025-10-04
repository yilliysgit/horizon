// src/components/case-study/Hero.tsx
'use client'

import { ProjectButton } from '@/app/components/ui/projecten/ProjectButton'
import { ProjectCard }   from '@/app/components/ui/projecten/ProjectCard'
import { ProjectChip } from '@/app/components/ui/projecten/ProjectenChip'

import Image from 'next/image'

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

interface HeroProps {
  title: string
  subtitle: string
  client: string
  year: string
  role: string
  coverImage: string
  onCtaClick?: () => void
}

export function ProjectHero({ 
  title, 
  subtitle, 
  client, 
  year, 
  role, 
  coverImage,
  onCtaClick 
}: HeroProps) {
  return (
    <div 
      className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-3xl border relative overflow-hidden"
      style={{
        background: HORIZON_COLORS.white,
        border: `1px solid ${HORIZON_COLORS.gray200}`,
        boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
      }}
    >
      {/* Gouden accent stripe */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: HORIZON_COLORS.gold500 }}
      />

      <div>
        {/* Project Badge */}
        <div 
          className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          style={{
            background: `rgba(${parseInt(HORIZON_COLORS.gold500.slice(1,3), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(3,5), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(5,7), 16)}, 0.1)`,
            color: HORIZON_COLORS.navy800,
            border: `1px solid rgba(${parseInt(HORIZON_COLORS.gold500.slice(1,3), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(3,5), 16)}, ${parseInt(HORIZON_COLORS.gold500.slice(5,7), 16)}, 0.3)`
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: HORIZON_COLORS.gold500 }}
          />
          Case Study
        </div>

        {/* Kleinere titel */}
        <h1 
          className="text-2xl md:text-3xl font-bold leading-tight mb-3"
          style={{ 
            color: HORIZON_COLORS.ink,
            fontFamily: "Kanit, sans-serif"
          }}
        >
          {title}
        </h1>
        
        <p 
          className="text-lg leading-relaxed mb-6" 
          style={{ color: HORIZON_COLORS.gray600 }}
          dangerouslySetInnerHTML={{ __html: subtitle }} 
        />
        
        {/* Project Info Chips - Horizon styled */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: HORIZON_COLORS.gray50,
              color: HORIZON_COLORS.ink,
              border: `1px solid ${HORIZON_COLORS.gray200}`
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            Klant: {client}
          </span>
          
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: HORIZON_COLORS.gray50,
              color: HORIZON_COLORS.ink,
              border: `1px solid ${HORIZON_COLORS.gray200}`
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            Jaar: {year}
          </span>
          
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: HORIZON_COLORS.gray50,
              color: HORIZON_COLORS.ink,
              border: `1px solid ${HORIZON_COLORS.gray200}`
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            Rol: {role}
          </span>
        </div>

        {/* CTA Button - Horizon styled */}
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ 
            background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
            color: HORIZON_COLORS.navy800,
            borderRadius: "12px"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zie resultaat
        </button>
      </div>
      
      {/* Image Section - Horizon styled */}
      <figure className="relative overflow-hidden rounded-2xl border group">
        <div 
          style={{ 
            border: `1px solid ${HORIZON_COLORS.gray200}`,
            borderRadius: "16px"
          }}
        >
          <Image 
            src={coverImage}
            alt="Hero visueel van het project"
            width={600}
            height={400}
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Gouden corner accent */}
        <div 
          className="absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2" 
          style={{ 
            borderColor: HORIZON_COLORS.gold500,
            borderTopLeftRadius: "8px"
          }} 
        />
      </figure>
    </div>
  )
}