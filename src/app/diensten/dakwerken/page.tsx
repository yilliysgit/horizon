// app/diensten/voordakwerken/page.tsx
"use client";

import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";
import AanpakSectie from "../ui/stepstimeline/AanpakSectie";
import FAQSection from "@/app/components/faqs/Faqs";
import DAKWERKEN_FAQ from "@/data/faqs/category/dakWerken";

import {
  Home,
  Hammer,
  HardHat,
  Ruler,
  Building2,
  ClipboardCheck,
  Workflow,
  Shield,
  Droplets,
  Wind,
  Sun,
  Thermometer,
} from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  white: "#ffffff",
};

export default function DakWerkenPage() {
  return (
    <>
      {/* Hero */}
      <ConstructionHero
        breadcrumbs={
          <nav className="flex items-center space-x-2">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span style={{ color: `${COLORS.white}60` }}>›</span>
            <a href="/diensten" className="hover:text-white transition-colors">
              Diensten
            </a>
            <span style={{ color: `${COLORS.white}60` }}>›</span>
            <span>Voordakwerken</span>
          </nav>
        }
        eyebrow="Dakwerken & Isolatie"
        title={
          <>
            Voordakwerken in{" "}
            <span style={{ color: COLORS.yellow600 }}>Amsterdam</span>
          </>
        }
        subtitle="Dakconstructies, isolatie en dakbedekking — vakkundig uitgevoerd door ons ervaren dakdekkersteam."
        ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0850000000" }}
        microcopy="Dakconstructies • Isolatie • Dakbedekking • Zink- & loodwerk • Dakreparaties"
        right={{
          type: "image",
          src: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=1200&q=80&auto=format&fit=crop",
          alt: "Professionele dakwerken in Amsterdam",
        }}
      />

      {/* Intro-blok met expertise cards */}
      <BouwIntroSectie
        eyebrow="Vakkundig Dakwerk"
        title={
          <>
            <span>Uw dak in goede handen in </span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Amsterdam
            </span>
          </>
        }
        paragraphs={[
          "Wij verzorgen complete voordakwerken van dakconstructie tot afwerking. Met 25+ jaar ervaring leveren wij duurzame dakoplossingen die bestand zijn tegen het Amsterdamse weer.",
        ]}
        expertiseItems={[
          {
            icon: Home,
            title: "Dakconstructies & spanten",
            description: "Traditionele en moderne dakconstructies op maat",
            color: COLORS.blue600,
          },
          {
            icon: Shield,
            title: "Isolatie & dampschermen",
            description:
              "Hoogwaardige isolatie voor optimale energie-efficiëntie",
            color: COLORS.blue700,
          },
          {
            icon: Droplets,
            title: "Dakbedekking & afwerking",
            description: "Pannen, bitumen, EPDM en andere dakbedekkingen",
            color: COLORS.blue600,
          },
          {
            icon: Wind,
            title: "Zink- & loodwerk",
            description: "Goten, boeidelen en andere metalen dakdetails",
            color: COLORS.blue700,
          },
        ]}
        cta={{ label: "Vraag offerte aan", href: "#contact" }}
        contactBadge={{
          label: "Direkt Contact",
          phone: "085 - 200 3300",
          show: true,
        }}
      />

      {/* Services-grid */}
      <ServicesGrid
        eyebrow="Onze dakwerkdiensten"
        title="Van constructie tot afwerking — compleet vakwerk"
        intro="Kies een onderdeel voor meer informatie of vraag direct een offerte aan."
        items={[
          {
            title: "Dakconstructies & spanten",
            desc: "Traditionele houten spanten of moderne prefab-dakconstructies. Volgens berekening en bestek.",
            href: "/diensten/voordakwerken/dakconstructies-spanten",
            icon: <Home className="w-5 h-5" />,
            badge: "Populair",
          },
          {
            title: "Dakreparaties & onderhoud",
            desc: "Lekkages verhelpen, pannen vervangen en preventief onderhoud voor lange levensduur.",
            href: "/diensten/voordakwerken/dakreparaties-onderhoud",
            icon: <Hammer className="w-5 h-5" />,
          },
          {
            title: "Dakinspectie & advies",
            desc: "Professionele inspectie van uw dakconstructie met advies over onderhoud en renovatie.",
            href: "/diensten/voordakwerken/dakinspectie-advies",
            icon: <ClipboardCheck className="w-5 h-5" />,
          },
          {
            title: "Dakisolatie",
            desc: "Dak-, spouw- en vloerisolatie voor optimale energie-efficiëntie en comfort.",
            href: "/diensten/voordakwerken/dakisolatie",
            icon: <Thermometer className="w-5 h-5" />,
          },
          {
            title: "Dakbedekking",
            desc: "Pannen, leien, bitumen, EPDM — alle soorten dakbedekking vakkundig aangebracht.",
            href: "/diensten/voordakwerken/dakbedekking",
            icon: <Shield className="w-5 h-5" />,
          },
          {
            title: "Zink- & loodwerk",
            desc: "Goten, boeidelen, dakranden en andere metalen dakdetails op maat gemaakt.",
            href: "/diensten/voordakwerken/zink-loodwerk",
            icon: <Workflow className="w-5 h-5" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP's */}
      <USPGrid
        eyebrow="Waarom Horizon voor uw dak"
        title="Zekerheid boven uw hoofd"
        intro="Van inspectie tot garantie: wij zorgen voor een duurzaam en waterdicht dak."
        items={[
          {
            icon: <HardHat className="w-8 h-8" />,
            title: "Ervaren dakdekkers",
            desc: "Ons vakteam heeft 25+ jaar ervaring met alle soorten daken.",
          },
          {
            icon: <Shield className="w-8 h-8" />,
            title: "Garantie & certificering",
            desc: "Uitgebreide garantie op materiaal en uitvoering met certificaten.",
          },
          {
            icon: <Sun className="w-8 h-8" />,
            title: "Energie-efficiënt",
            desc: "Moderne isolatietechnieken voor een comfortabel en zuinig huis.",
          },
          {
            icon: <Droplets className="w-8 h-8" />,
            title: "Waterdicht & duurzaam",
            desc: "Kwalitatieve materialen die bestand zijn tegen alle weersomstandigheden.",
          },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
      <AanpakSectie
        eyebrow="Onze aanpak"
        title="Zo realiseren we uw dak"
        intro="Van inspectie tot oplevering. Een gestructureerde aanpak voor optimaal resultaat."
        steps={[
          {
            number: 1,
            title: "Inspectie & advies",
            description:
              "Grondige inspectie van de huidige situatie en advies over de beste aanpak.",
          },
          {
            number: 2,
            title: "Offerte & planning",
            description:
              "Transparante offerte met materiaalspecificaties en uitvoeringsplanning.",
          },
          {
            number: 3,
            title: "Voorbereiding & materiaal",
            description:
              "Bestelling van materialen en voorbereidingen voor een vlotte uitvoering.",
          },
          {
            number: 4,
            title: "Dakconstructie",
            description:
              "Plaatsen van spanten, isolatie en onderdakfolie volgens plan.",
          },
          {
            number: 5,
            title: "Dakbedekking & afwerking",
            description:
              "Aanbrengen dakbedekking, zink- en loodwerk en alle details.",
          },
          {
            number: 6,
            title: "Oplevering & garantie",
            description:
              "Eindcontrole, schoonmaak en overdracht met garantiedocumenten.",
          },
        ]}
        cta={{ label: "Plan een dakinspectie", href: "/contact" }}
      />

      {/* FAQ */}
      <FAQSection
        items={DAKWERKEN_FAQ}
        eyebrow="FAQ Voordakwerken"
        title="Veelgestelde vragen over dakwerken"
        intro="Antwoorden over dakconstructies, isolatie, onderhoud en garanties."
        telHref="tel:0850000000"
        contactHref="/contact"
        singleOpen
      />
    </>
  );
}