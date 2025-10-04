// src/app/projecten/page.tsx
'use client'

import Link from 'next/link'
import { ProjectCard } from '../components/ui/projecten/ProjectCard'
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

const cases = [
  {
    id: 'villa-sunset',  // ← wijzig dit
    title: 'Villa Sunset — Moderne Totaalbouw',
    client: 'Familie van Bergen',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
    excerpt: 'Van tekening naar duurzame droomwoning in 8 maanden.'
  },
  {
    id: 'business-center-amsterdam', 
    title: 'Business Center Amsterdam — Smart Office Complex',
    client: 'Amsterdam Properties BV',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92157aa?q=80&w=600&auto=format&fit=crop',
    excerpt: 'Van leegstaand pand naar toekomstbestendig kantoorcomplex.'
  },
  {
  id: 'tech-campus-rotterdam',
  title: 'Tech Campus Rotterdam — Mixed-Use Innovation Hub',
  client: 'Delta Developments',
  year: '2025',
  coverImage: 'https://images.unsplash.com/photo-1507207611509-ec012433ff52?q=80&w=600&auto=format&fit=crop',
  excerpt: 'Van voormalige loods naar circulaire innovatiecampus.'
}

]

// Rest van je component blijft hetzelfde
export default function ProjectenOverzicht() {
  return (
    <main 
      className="mx-auto max-w-7xl px-6 py-20 md:px-12"
      style={{ background: HORIZON_COLORS.white }}
    >
      <header className="mb-16">
        {/* Horizon-style badge */}
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
          Portfolio Cases
        </div>

        <h1 
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ 
            color: HORIZON_COLORS.ink,
            fontFamily: "Kanit, sans-serif"
          }}
        >
          Gerealiseerde
          <br />
          <span style={{ color: HORIZON_COLORS.navy600 }}>projecten</span>
        </h1>
        <p 
          className="text-xl leading-relaxed"
          style={{ color: HORIZON_COLORS.gray600 }}
        >
          Een overzicht van gerealiseerde projecten waar vakmanschap centraal staat
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((caseItem, index) => (
          <Link key={caseItem.id} href={`/projecten/${caseItem.id}`} className="block group">
            {/* Aangepaste div in plaats van ProjectCard om TypeScript errors te voorkomen */}
            <div 
              className="relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl cursor-pointer"
              style={{
                background: HORIZON_COLORS.white,
                border: `1px solid ${HORIZON_COLORS.gray200}`,
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
              }}
            >
              <div className="relative">
                <Image 
                  src={caseItem.coverImage}
                  alt={caseItem.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ borderRadius: "20px 20px 0 0" }}
                />
                
                {/* Gouden volgnummer - nu op de afbeelding */}
                <div 
                  className="absolute left-4 top-4 h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
                    color: HORIZON_COLORS.navy800,
                    fontFamily: "Kanit, sans-serif"
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Gouden corner accent */}
                <div 
                  className="absolute right-4 bottom-4 h-6 w-6 border-r-2 border-b-2" 
                  style={{ 
                    borderColor: HORIZON_COLORS.gold500,
                    borderTopLeftRadius: "8px"
                  }} 
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              <div className="p-6">
                <h2 
                  className="text-lg font-bold mb-2"
                  style={{ 
                    color: HORIZON_COLORS.ink,
                    fontFamily: "Kanit, sans-serif"
                  }}
                >
                  {caseItem.title}
                </h2>
                <p 
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: HORIZON_COLORS.gray600 }}
                >
                  {caseItem.excerpt}
                </p>

                {/* CTA Button */}
                <div className="mb-4">
                  <span 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 group-hover:scale-105"
                    style={{ 
                      background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
                      color: HORIZON_COLORS.navy800,
                      borderRadius: "12px"
                    }}
                  >
                    Bekijk case
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                <div 
                  className="flex justify-between text-sm pt-3 border-t"
                  style={{ 
                    color: HORIZON_COLORS.gray600,
                    borderColor: HORIZON_COLORS.gray200
                  }}
                >
                  <span className="font-medium">{caseItem.client}</span>
                  <span 
                    className="font-bold"
                    style={{ color: HORIZON_COLORS.navy600 }}
                  >
                    {caseItem.year}
                  </span>
                </div>
              </div>

              {/* Gouden progress underline */}
              <span 
                className="absolute bottom-0 left-0 block h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: HORIZON_COLORS.gold500 }}
              />
            </div>
          </Link>
        ))}

        {/* Debug logs behouden */}
        {cases.map(caseItem => {
          console.log('Case ID:', caseItem.id)
          console.log('Generated URL:', `/projecten/${caseItem.id}`)
          return null; // Geen visual output
        })}
      </div>
    </main>
  )
}