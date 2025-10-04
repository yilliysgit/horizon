// src/data/projects/project-a.ts
export const projectAData = {
  id: 'villa-sunset',
  // Hero data
  title: "Villa Sunset — Moderne Totaalbouw",
  subtitle: "Van tekening naar <strong>duurzame droomwoning</strong> in 8 maanden.",
  client: "Familie van Bergen",
  year: "2025",
  role: "Architect, Aannemer",
  coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",

  // Statistics
  stats: [
    { value: '285m²', label: 'Woonoppervlakte' },
    { value: '€685k', label: 'Binnen budget' },
    { value: 'A+++', label: 'Energielabel' },
    { value: '8mnd', label: 'Opgeleverd' }
  ],

  // Gallery images - bouw gerelateerd
  galleryImages: [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=900&auto=format&fit=crop", // Construction site
    "https://images.unsplash.com/photo-1590502593747-42a4e0d4aae7?q=80&w=900&auto=format&fit=crop", // House construction
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop", // Modern house exterior
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=900&auto=format&fit=crop", // Construction workers
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=900&auto=format&fit=crop", // House interior
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop"  // Modern kitchen
  ],

  // Timeline data - bouwfases
  timelineData: [
    {
      date: '2024-09-01',
      title: 'Vergunning & Fundering',
      description: 'Bouwvergunning goedgekeurd en fundering gestort volgens planning.'
    },
    {
      date: '2024-11-15', 
      title: 'Ruwbouw & Kap',
      description: 'Dragende constructie opgetrokken en dak compleet afgewerkt.'
    },
    {
      date: '2025-02-01',
      title: 'Afbouw & Oplevering',
      description: 'Installaties, afwerking en landscaping volgens hoogste standaard.'
    }
  ],

  // Technologies -> Bouw specialiteiten
  technologies: [
    'Passief bouwen',
    'Zonnepanelen 45kWp',
    'Warmtepomp systeem',
    'Triple glas',
    'Smart home integratie'
  ],

  // Before/After images
  beforeAfterData: {
    beforeImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop", // Empty lot
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop" // Finished house
  },

  // Results data
  resultsData: {
    description: "We realiseerden een energieneutrale villa die voldoet aan de hoogste duurzaamheidseisen. Het project werd binnen budget en planning opgeleverd met innovatieve bouwmethoden.",
    metrics: [
      "Energielabel: D → A+++",
      "CO₂ uitstoot: -75%",
      "Oplevering: 2 weken eerder"
    ],
    summary: {
      title: "Samenvatting",
      description: "Moderne bouwmethoden + duurzaam ontwerp resulteerde in een toekomstbestendige woning.",
      ctaText: "Bekijk virtuele tour",
      ctaLink: "#"
    }
  },

  // Testimonial
  testimonialData: {
    quote: "De villa overtreft al onze verwachtingen. Prachtig afgewerkt, energiezuinig en precies op tijd opgeleverd.",
    author: "Mark van Bergen",
    role: "Opdrachtgever"
  },

  // Project links
  projectLinks: [
    { label: '3D Visualisaties', url: '#', type: 'demo' as const },
    { label: 'Bouwtekeningen PDF', url: '#', type: 'case' as const },
    { label: 'Duurzaamheidsrapport', url: '#', type: 'blog' as const }
  ],

  // Case navigation
  caseNavigation: {
    previousCase: { title: 'Kantoorpand Rotterdam', url: '/projecten/kantoor-rotterdam' },
    nextCase: { title: 'Business Center Amsterdam', url: '/projecten/business-center-amsterdam' }
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
      description: "Een energieneutrale villa realiseren op een complex terrein binnen een strak budget en tijdsbestek.",
      points: [
        "Hellend terrein met complexe fundering",
        "Strenge energievoorschriften gemeente", 
        "Korte bouwtijd door weersomstandigheden"
      ]
    },
    aanpak: {
      title: "Aanpak", 
      description: "We combineerden moderne bouwmethoden met duurzame materialen en slimme planning.",
      points: [
        "Prefab elementen voor snellere bouw",
        "Geïntegreerde installaties in ontwerp",
        "Weekelijkse voortgangsoverleggen"
      ]
    }
  }
}