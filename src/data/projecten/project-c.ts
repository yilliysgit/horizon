// src/data/projects/project-c.ts
export const projectCData = {
  id: 'tech-campus-rotterdam',
  // Hero data
  title: "Tech Campus Rotterdam — Mixed-Use Innovation Hub",
  subtitle: "Van voormalige loods naar <strong>circulaire innovatiecampus</strong> in 15 maanden.",
  client: "Delta Developments",
  year: "2025",
  role: "Projectontwikkelaar, Architect",
  coverImage: "https://images.unsplash.com/photo-1507207611509-ec012433ff52?q=80&w=1600&auto=format&fit=crop",

  // Statistics
  stats: [
    { value: '8.200m²', label: 'Programma (kantoren + labs)' },
    { value: '€5.1M', label: 'Totale investering' },
    { value: 'BREEAM-NL', label: 'Outstanding certificaat' },
    { value: '98%', label: 'Bezettingsgraad' }
  ],

  // Gallery images - campus/tech gerelateerd
  galleryImages: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop", // Coworking / teams
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=900&auto=format&fit=crop", // Open office
    "https://images.unsplash.com/photo-1529429612779-c8e40ef2f36b?q=80&w=900&auto=format&fit=crop", // Campus exterior
    "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?q=80&w=900&auto=format&fit=crop", // Atrium / lobby
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=900&auto=format&fit=crop", // Makerspace / lab
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop"  // Daktuin / sustainability
  ],

  // Timeline data - ontwikkelingsfases
  timelineData: [
    {
      date: '2024-02-01',
      title: 'Acquisitie & Ontwerp',
      description: 'Aankoop oude loods en masterplan voor mixed-use campus.'
    },
    {
      date: '2024-08-20',
      title: 'Bouw & Installaties',
      description: 'Structurele renovatie, PV-installatie en WKO aangelegd.'
    },
    {
      date: '2025-05-15',
      title: 'Opening & Verhuur',
      description: 'Campus geopend; eerste huurders (scale-ups & labs) trekken in.'
    }
  ],

  // Technologies -> Campus specialiteiten
  technologies: [
    'Zonnepanelen (1.2MWp)',
    'Warmte-Koudeopslag (WKO)',
    'Slim toegangsbeheer',
    'Grijswater-recycling',
    'Groene daken + biodiversiteit'
  ],

  // Before/After images
  beforeAfterData: {
    beforeImage: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=1600&auto=format&fit=crop", // Oude loods
    afterImage: "https://images.unsplash.com/photo-1529429612779-c8e40ef2f36b?q=80&w=1600&auto=format&fit=crop" // Moderne campus
  },

  // Results data
  resultsData: {
    description: "We transformeerden een verouderde loods in een toekomstbestendige innovatiehub met kantoren, labs en community-ruimtes. Het project is binnen planning en met een lagere operationele CO₂-footprint opgeleverd.",
    metrics: [
      "Energieverbruik: -70%",
      "Time-to-lease: 2 maanden",
      "Operationele CO₂: -62%"
    ],
    summary: {
      title: "Samenvatting",
      description: "Herontwikkeling met circulaire principes resulteerde in een levendige campus voor tech & onderzoek.",
      ctaText: "Plan een rondleiding",
      ctaLink: "#"
    }
  },

  // Testimonial
  testimonialData: {
    quote: "De campus is een voorbeeld van slim hergebruik en hoge comfortstandaarden. Onze teams groeien hier razendsnel.",
    author: "Lars van Veen",
    role: "COO Delta Developments"
  },

  // Project links
  projectLinks: [
    { label: 'Virtuele rondleiding', url: '#', type: 'demo' as const },
    { label: 'Technische specificaties', url: '#', type: 'case' as const },
    { label: 'Duurzaamheidsrapport', url: '#', type: 'blog' as const }
  ],

  // Case navigation
  caseNavigation: {
    previousCase: { title: 'Business Center Amsterdam', url: '/projecten/business-center-amsterdam' },
    nextCase: { title: 'Creative Loft Haarlem', url: '/projecten/creative-loft-haarlem' }
  },

  // Table of contents
  tocItems: [
    { id: 'uitdaging', label: 'Uitdaging' },
    { id: 'aanpak', label: 'Aanpak' },
    { id: 'media', label: 'Media' },
    { id: 'proces', label: 'Proces' },
    { id: 'tech', label: 'Specialiteiten' },
    { id: 'resultaat', label: 'Resultaat' },
    { id: 'testimonial', label: 'Testimonial' },
    { id: 'links', label: 'Links' }
  ],

  // Content secties
  content: {
    uitdaging: {
      title: "Uitdaging",
      description: "Een verouderde industriële loods omvormen tot een circulaire, gemengde campus die startups én labs faciliteert.",
      points: [
        "Hoge energielast en beperkte daglichttoetreding",
        "Akoestische eisen nabij havengebied",
        "Flexibele plattegrond voor kantoren, labs en horeca"
      ]
    },
    aanpak: {
      title: "Aanpak",
      description: "Slimme herbestemming met focus op energie, comfort en community.",
      points: [
        "WKO + grootschalige PV, LED en vraaggestuurde ventilatie",
        "Modulaire units (40–600m²) met delers- en groeimogelijkheden",
        "Communityruimtes: atrium, makerspace en daktuin"
      ]
    }
  }
}
