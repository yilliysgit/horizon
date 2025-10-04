// src/app/projecten/[slug]/page.tsx

'use client'

import { use } from 'react'
import Link from 'next/link'

import { ProjectHero } from '@/app/components/hero/ProjectenHero'
import { ProjectStats } from '@/app/components/ui/projecten/ProjectStats'
import { ProjectTimeline } from '@/app/components/ui/projecten/ProjectTimeLine'
import { ProjectBeforeAfter } from '@/app/components/ui/projecten/ProjectBeforeAfter'
import { ProjectTechTags } from '@/app/components/ui/projecten/ProjectTechTags'
import { ProjectResult } from '@/app/components/ui/projecten/ProjectResult'
import { ProjectTestimonial } from '@/app/components/ui/projecten/ProjectTestimonial'
import { ProjectLinks } from '@/app/components/ui/projecten/ProjectLinks'
import { ProjectGallery } from '@/app/components/ui/projecten/ProjectGallery'
import { ProjectTableOfContents } from '@/app/components/ui/projecten/ProjectTableOfContents'
import { ProjectCard } from '@/app/components/ui/projecten/ProjectCard'

// Data
import { projectAData } from '@/data/projecten/project-a'
import { projectBData } from '@/data/projecten/project-b'
import { projectCData } from '@/data/projecten/project-c'

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

const projects = {
  'villa-sunset': projectAData,           // ← wijzig deze
  'business-center-amsterdam': projectBData,  // ← en deze
  'tech-campus-rotterdam': projectCData     // ← en deze
} as const

type RouteParams = Promise<{ slug: string }>

interface ProjectDetailProps {
  params: RouteParams
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  // ✅ Unwrap de Promise volgens de nieuwe Next.js conventie
  const { slug } = use(params)

  // Haal het project op
  const project = projects[slug as keyof typeof projects]

  // 404 als project niet bestaat - Horizon styled
  if (!project) {
    return (
      <main 
        className="mx-auto max-w-7xl px-6 py-20 md:px-12"
        style={{ background: HORIZON_COLORS.white }}
      >
        <div className="text-center py-20">
          {/* 404 Badge */}
          <div 
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
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
            404 Error
          </div>

          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            Project niet gevonden
          </h1>
          <p 
            className="text-lg mb-8"
            style={{ color: HORIZON_COLORS.gray600 }}
          >
            Het project &quot;{slug}&quot; bestaat niet.
          </p>
          <Link 
            href="/projecten"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ 
              background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
              color: HORIZON_COLORS.navy800,
              borderRadius: "16px",
              textDecoration: "none"
            }}
          >
            ← Terug naar overzicht
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main 
      className="mx-auto max-w-7xl px-6 py-12 md:px-12"
      style={{ background: HORIZON_COLORS.white }}
    >
      {/* Hero section full width - Horizon styled container */}
      <div className="space-y-8 mb-12">
        <ProjectHero
          title={project.title}
          subtitle={project.subtitle}
          client={project.client}
          year={project.year}
          role={project.role}
          coverImage={project.coverImage}
          onCtaClick={() =>
            document
              .getElementById('resultaat')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        />

        <ProjectStats stats={project.stats} />
      </div>

      {/* Two column layout - Horizon styled */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        {/* Left sidebar: TOC - Horizon styled */}
        <aside>
          <div 
            className="sticky top-8 p-6 rounded-3xl border"
            style={{
              background: HORIZON_COLORS.gray50,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Inhoudsopgave
            </h3>
            <ProjectTableOfContents items={project.tocItems} />
          </div>
        </aside>

        {/* Right content - Horizon styled cards */}
        <article className="space-y-8">
          {/* Uitdaging sectie - Horizon styled */}
          <div 
            id="uitdaging"
            className="p-8 rounded-3xl border relative overflow-hidden"
            style={{
              background: HORIZON_COLORS.white,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            {/* Gouden accent */}
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              {project.content.uitdaging.title}
            </h2>
            <p 
              className="mb-6 text-lg leading-relaxed"
              style={{ color: HORIZON_COLORS.gray600 }}
            >
              {project.content.uitdaging.description}
            </p>
            <ul className="space-y-3">
              {project.content.uitdaging.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span 
                    className="h-2 w-2 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: HORIZON_COLORS.gold500 }}
                  />
                  <span style={{ color: HORIZON_COLORS.gray600 }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aanpak sectie - Horizon styled */}
          <div 
            id="aanpak"
            className="p-8 rounded-3xl border relative overflow-hidden"
            style={{
              background: HORIZON_COLORS.white,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            {/* Gouden accent */}
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              {project.content.aanpak.title}
            </h2>
            <p 
              className="mb-6 text-lg leading-relaxed"
              style={{ color: HORIZON_COLORS.gray600 }}
            >
              {project.content.aanpak.description}
            </p>
            <ol className="space-y-3">
              {project.content.aanpak.points.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
                      color: HORIZON_COLORS.navy800,
                      fontFamily: "Kanit, sans-serif"
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ color: HORIZON_COLORS.gray600 }}>
                    {point}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Media sectie - Horizon styled container */}
          <div 
            id="media"
            className="space-y-6"
          >
            <div 
              className="p-8 rounded-3xl border"
              style={{
                background: HORIZON_COLORS.white,
                border: `1px solid ${HORIZON_COLORS.gray200}`,
                boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ 
                  color: HORIZON_COLORS.ink,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                Project Galerij
              </h2>
              <ProjectGallery images={project.galleryImages} />
            </div>
            
            <div 
              className="p-8 rounded-3xl border"
              style={{
                background: HORIZON_COLORS.white,
                border: `1px solid ${HORIZON_COLORS.gray200}`,
                boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
              }}
            >
              <h2 
                className="text-2xl font-bold mb-6"
                style={{ 
                  color: HORIZON_COLORS.ink,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                Voor & Na
              </h2>
              <ProjectBeforeAfter
                beforeImage={project.beforeAfterData.beforeImage}
                afterImage={project.beforeAfterData.afterImage}
              />
            </div>
          </div>

          {/* Proces sectie - Horizon styled */}
          <div 
            id="proces"
            className="p-8 rounded-3xl border"
            style={{
              background: HORIZON_COLORS.white,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Project Timeline
            </h2>
            <ProjectTimeline items={project.timelineData} />
          </div>

          {/* Tech/Specialiteiten sectie - Horizon styled */}
          <div 
            id="tech"
            className="p-8 rounded-3xl border"
            style={{
              background: HORIZON_COLORS.white,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Toegepaste Technieken
            </h2>
            <ProjectTechTags technologies={project.technologies} />
          </div>

          {/* Resultaat sectie - Horizon styled */}
          <div 
            id="resultaat"
            className="p-8 rounded-3xl border relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800}05, ${HORIZON_COLORS.gold500}05)`,
              border: `1px solid ${HORIZON_COLORS.gold500}30`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            {/* Gouden accent */}
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Project Resultaat
            </h2>
            <ProjectResult
              description={project.resultsData.description}
              metrics={project.resultsData.metrics}
              summary={project.resultsData.summary}
            />
          </div>

          {/* Testimonial sectie - Horizon styled */}
          <div 
            id="testimonial"
            className="p-8 rounded-3xl border"
            style={{
              background: HORIZON_COLORS.gray50,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Klant Ervaring
            </h2>
            <ProjectTestimonial
              quote={project.testimonialData.quote}
              author={project.testimonialData.author}
              role={project.testimonialData.role}
            />
          </div>

          {/* Links sectie - Horizon styled */}
          <div 
            id="links"
            className="p-8 rounded-3xl border"
            style={{
              background: HORIZON_COLORS.white,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              Gerelateerde Links
            </h2>
            <ProjectLinks
              links={project.projectLinks}
              navigation={project.caseNavigation}
            />
          </div>
        </article>
      </div>
    </main>
  )
}