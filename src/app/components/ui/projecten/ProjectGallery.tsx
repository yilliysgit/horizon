// src/components/case-study/Gallery.tsx
'use client'

import Image from 'next/image'
import { ProjectCard }   from '@/app/components/ui/projecten/ProjectCard'
import { useState } from 'react'

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

interface GalleryProps {
  images: string[]
  title?: string
}

export function ProjectGallery({ images, title = "Galerij" }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

      {/* Header met counter */}
      <div className="relative flex items-center justify-between mb-6">
        <h2 
          className="text-2xl font-bold tracking-tight"
          style={{ 
            color: HORIZON_COLORS.ink,
            fontFamily: "Kanit, sans-serif",
            textShadow: "0 1px 2px rgba(51, 51, 51, 0.1)"
          }}
        >
          {title}
        </h2>
        
        {/* Image counter */}
        <div 
          className="px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
            color: HORIZON_COLORS.navy800,
            boxShadow: `
              0 2px 8px rgba(253, 197, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `
          }}
        >
          {images.length} {images.length === 1 ? 'afbeelding' : 'afbeeldingen'}
        </div>
      </div>

      {/* Gallery grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group/image relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              border: `2px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: `0 4px 8px rgba(51, 51, 51, 0.08)`
            }}
            onClick={() => setSelectedImage(image)}
          >
            {/* Image container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image 
                src={image}
                alt={`Gallery afbeelding ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
              />
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, rgba(253, 197, 0, 0.2) 100%)`
                }}
              />
              
              {/* Hover icon */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300"
              >
                <div 
                  className="p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  style={{
                    background: `rgba(${HORIZON_COLORS.white.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.9)`,
                    boxShadow: `0 4px 12px rgba(51, 51, 51, 0.2)`
                  }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{ color: HORIZON_COLORS.navy700 }}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Image number badge */}
            <div 
              className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm"
              style={{
                background: `rgba(${HORIZON_COLORS.ink.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.8)`,
                color: HORIZON_COLORS.white
              }}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{
            background: `rgba(${HORIZON_COLORS.ink.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.9)`
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-full overflow-hidden rounded-2xl"
            style={{
              boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              style={{
                background: `rgba(${HORIZON_COLORS.white.slice(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ')}, 0.9)`,
                color: HORIZON_COLORS.ink
              }}
              onClick={() => setSelectedImage(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Full size image */}
            <Image 
              src={selectedImage}
              alt="Gallery afbeelding - volledig"
              width={1200}
              height={800}
              className="w-full h-auto max-h-screen object-contain"
              style={{
                background: HORIZON_COLORS.white
              }}
            />
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