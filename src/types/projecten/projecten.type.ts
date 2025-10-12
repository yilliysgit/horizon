// src/types/projecten.type.ts

export interface CaseStudy {
  // Basis info (zoals je HTML had)
  id: string
  title: string
  subtitle: string
  client: string
  year: string
  role: string
  industry: string
  category?: string
  status: 'afgerond' | 'lopend' | 'concept'
  duration: string
  heroImage: string
  
  // Arrays voor herhalende content
  stats: CaseStat[]
  technologies: string[]
  gallery?: string[]  // ? = optioneel
  timeline?: TimelineItem[]
  links?: ProjectLink[]
  
  // Content secties
  challenge: string
  approach: string
  result: string
  testimonial?: Testimonial
}

// Statistieken (je -78%, +38%, etc.)
export interface CaseStat {
  value: string      // "-78%"
  label: string      // "Time-to-Interactive"
  description?: string
}

// Testimonial (je quote)
export interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
}

// Timeline items (je proces)
export interface TimelineItem {
  date: string       // "2025-03-01"
  title: string      // "Audit & KPI-definitie"
  description: string
}

// Project links
export interface ProjectLink {
  label: string      // "GitHub repo"
  url: string
  type: 'repo' | 'demo' | 'case' | 'blog'
}