// src/data/projects/project-b.ts
export const projectBData = {
  id: 'business-center-amsterdam',
  // Hero data
  title: "Business Center Amsterdam — Smart Office Complex",
  subtitle: "Van leegstaand pand naar <strong>toekomstbestendig kantoorcomplex</strong> in 12 maanden.",
  client: "Amsterdam Properties BV",
  year: "2024",
  role: "Projectontwikkelaar, Architect",
  coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92157aa?q=80&w=1600&auto=format&fit=crop",

  // Statistics
  stats: [
    { value: '4.500m²', label: 'Kantoorruimte' },
    { value: '€2.8M', label: 'Totale investering' },
    { value: 'BREEAM-NL', label: 'Excellent certificaat' },
    { value: '95%', label: 'Bezettingsgraad' }
  ],

  // Gallery images - kantoor/business gerelateerd
  galleryImages: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop", // Modern office space
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=900&auto=format&fit=crop", // Office interior
    "https://images.unsplash.com/photo-1486406146926-c627a92157aa?q=80&w=900&auto=format&fit=crop", // Office building exterior
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900&auto=format&fit=crop", // Meeting room
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=900&auto=format&fit=crop", // Construction/renovation
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=900&auto=format&fit=crop"  // Modern lobby
  ],

  // Timeline data - ontwikkelingsfases
  timelineData: [
    {
      date: '2023-06-01',
      title: 'Acquisitie & Herbestemming',
      description: 'Aankoop leegstaand pand en herbestemmingsvergunning voor kantoorruimte.'
    },
    {
      date: '2023-10-15', 
      title: 'Renovatie & Verduurzaming',
      description: 'Volledige renovatie met focus op energiezuinige installaties en flexibele indeling.'
    },
    {
      date: '2024-06-01',
      title: 'Oplevering & Verhuur',
      description: 'Complex opgeleverd en binnen 3 maanden volledig verhuurd aan innovatieve bedrijven.'
    }
  ],

  // Technologies -> Kantoor specialiteiten
  technologies: [
    'Smart building systemen',
    'Flexibele werkplekken',
    'LED verlichting + sensoren',
    'Luchtbehandelingssysteem',
    'Laadpalen elektrisch vervoer'
  ],

  // Before/After images
  beforeAfterData: {
    beforeImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1600&auto=format&fit=crop", // Old/empty building
    afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92157aa?q=80&w=1600&auto=format&fit=crop" // Modern office building
  },

  // Results data
  resultsData: {
    description: "We transformeerden een leegstaand pand tot een modern kantoorcomplex dat voldoet aan de hoogste duurzaamheidsstandaarden. Het project werd binnen budget en planning gerealiseerd.",
    metrics: [
      "Energieverbruik: -60%",
      "Huurprijs: +25% boven markt",
      "Bezettingsgraad: 95% binnen 3mnd"
    ],
    summary: {
      title: "Samenvatting",
      description: "Strategische herbestemming + moderne installaties resulteerde in een gewild kantoorcomplex.",
      ctaText: "Plan een bezichtiging",
      ctaLink: "#"
    }
  },

  // Testimonial
  testimonialData: {
    quote: "Het nieuwe Business Center overtreft onze verwachtingen. Moderne faciliteiten, duurzame uitvoering en perfecte locatie.",
    author: "Sarah de Wit",
    role: "Directeur Amsterdam Properties"
  },

  // Project links
  projectLinks: [
    { label: 'Virtuele rondleiding', url: '#', type: 'demo' as const },
    { label: 'Technische specificaties', url: '#', type: 'case' as const },
    { label: 'Duurzaamheidsrapport', url: '#', type: 'blog' as const }
  ],

  // Case navigation
  caseNavigation: {
    previousCase: { title: 'Villa Sunset', url: '/projecten/villa-sunset' },
    nextCase: { title: 'Wooncomplex Utrecht', url: '/projecten/wooncomplex-utrecht' }
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
      description: "Een leegstaand jaren '80 kantoorpand transformeren tot een moderne, duurzame werkplek die aansluit bij hedendaagse behoeften.",
      points: [
        "Verouderde gebouwinstallaties en isolatie",
        "Rigide kantoorindeling uit jaren '80", 
        "Concurrentie van nieuwbouwprojecten"
      ]
    },
    aanpak: {
      title: "Aanpak", 
      description: "We combineerden strategische herbestemming met moderne technologie en flexibele werkplekconcepten.",
      points: [
        "Volledige renovatie gebouwschil en installaties",
        "Flexibele kantoorunits van 50-500m²",
        "Smart building technologie voor energiebesparing"
      ]
    }
  }
}