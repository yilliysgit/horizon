// src/components/case-study/BeforeAfter.tsx
'use client'

import { useState } from 'react'
import { ProjectCard } from '@/app/components/ui/projecten/ProjectCard'
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

interface BeforeAfterProps {
  beforeImage: string
  afterImage: string
  title?: string
}

export function ProjectBeforeAfter({ beforeImage, afterImage, title = "Before / After" }: BeforeAfterProps) {
  const [position, setPosition] = useState(50)

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

      {/* Before/After container */}
      <figure className="relative overflow-hidden rounded-2xl group/slider transition-all duration-300 hover:shadow-lg">
        {/* Container met verbeterde border en shadow */}
        <div 
          className="relative overflow-hidden rounded-2xl"
          style={{
            border: `2px solid ${HORIZON_COLORS.gray200}`,
            boxShadow: `
              0 8px 24px rgba(51, 51, 51, 0.12),
              0 4px 8px rgba(51, 51, 51, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `
          }}
        >
          {/* Before image (base) */}
          <Image 
            src={beforeImage}
            alt="Before"
            width={800}
            height={400}
            className="w-full h-auto block transition-all duration-300"
          />
          
          {/* After image (clipped) met smooth transition */}
          <div 
            className="absolute inset-0 transition-all duration-200 ease-out"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image 
              src={afterImage}
              alt="After"
              width={800}
              height={400}
              className="w-full h-auto block"
            />
          </div>
          
          {/* Verticale scheidingslijn */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 transition-all duration-200 ease-out pointer-events-none"
            style={{ 
              left: `${position}%`,
              background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
              boxShadow: `0 0 12px rgba(253, 197, 0, 0.6), 0 0 24px rgba(253, 197, 0, 0.3)`,
              transform: 'translateX(-50%)'
            }}
          />

          {/* Slider handle */}
          <div 
            className="absolute top-1/2 w-8 h-8 transition-all duration-200 ease-out pointer-events-none group-hover/slider:scale-110"
            style={{ 
              left: `${position}%`,
              transform: 'translate(-50%, -50%)',
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
              borderRadius: '50%',
              border: `3px solid ${HORIZON_COLORS.white}`,
              boxShadow: `
                0 4px 12px rgba(253, 197, 0, 0.4),
                0 2px 4px rgba(51, 51, 51, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `
            }}
          >
            {/* Handle center dot */}
            <div 
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: HORIZON_COLORS.white }}
            />
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wide"
          style={{
            background: `linear-gradient(135deg, rgba(51, 51, 51, 0.9) 0%, rgba(51, 51, 51, 0.8) 100%)`,
            color: HORIZON_COLORS.white,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          VOOR
        </div>
        
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wide"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
            color: HORIZON_COLORS.navy800,
            boxShadow: '0 2px 8px rgba(253, 197, 0, 0.3)'
          }}
        >
          NA
        </div>
        
        {/* Slider control - verbeterde styling */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center px-6">
          <div className="relative w-full max-w-lg">
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(to right, 
                  ${HORIZON_COLORS.gray600} 0%, 
                  ${HORIZON_COLORS.gray600} ${position}%, 
                  ${HORIZON_COLORS.gray200} ${position}%, 
                  ${HORIZON_COLORS.gray100} 100%)`,
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
              }}
              aria-label="Vergelijkingspositie"
            />
            
            {/* Custom slider track styling */}
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%);
                border: 3px solid ${HORIZON_COLORS.white};
                box-shadow: 0 2px 8px rgba(253, 197, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: all 0.2s ease;
              }
              
              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(253, 197, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.2);
              }
              
              input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%);
                border: 3px solid ${HORIZON_COLORS.white};
                box-shadow: 0 2px 8px rgba(253, 197, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: all 0.2s ease;
              }
            `}</style>
          </div>
        </div>
      </figure>

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