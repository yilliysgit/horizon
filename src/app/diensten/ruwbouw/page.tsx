// app/diensten/ruwbouw/page.tsx
"use client";

import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";
import AanpakSectie from "../ui/stepstimeline/AanpakSectie";
import FAQSection from "@/app/components/faqs/Faqs";
import RUWBOUW_FAQ from "@/data/faqs/category/ruwBouw";

import {
  CheckCircle,
  Hammer,
  HardHat,
  Ruler,
  Building2,
  ClipboardCheck,
  Workflow,
  Package,
  Wrench,
  Zap,
  Users,
} from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  white: "#ffffff",
};

export default function RuwbouwPage() {
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
            <span>Ruwbouw</span>
          </nav>
        }
        eyebrow="Constructief sterk"
        title={
          <>
            Ruwbouw &amp; casco in{" "}
            <span style={{ color: COLORS.yellow600 }}>Amsterdam</span>
          </>
        }
        subtitle="Funderingen, beton en dragend metselwerk — uitgevoerd door ons eigen team met 25+ jaar ervaring."
        ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0850000000" }}
        microcopy="Funderingen • Betonwerken • Dragende wanden & vloeren • Ruw dak"
        right={{
          type: "image",
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
          alt: "Ruwbouw en funderingswerk in Amsterdam",
        }}
      />

      {/* Intro-blok met expertise cards */}
      <BouwIntroSectie
        eyebrow="Ruwbouw & Constructie"
        title={
          <>
            <span>Stevige fundering voor uw project in </span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Amsterdam
            </span>
          </>
        }
        paragraphs={[
          "Wij leveren hoogwaardige ruwbouw en constructiewerken voor nieuwbouw, uitbreidingen en renovaties. Van fundering tot casco: één aanspreekpunt, vakmanschap en precisie in elke fase.",
        ]}
        expertiseItems={[
          {
            icon: Building2,
            title: "Funderingen & grondwerk",
            description: "Strook-, poer- en plaatfunderingen volgens berekening en bestek",
            color: COLORS.blue600,
          },
          {
            icon: Hammer,
            title: "Betonwerken & bekisting",
            description:
              "Wanden, vloeren en balken met professionele bekisting en bewapening",
            color: COLORS.blue700,
          },
          {
            icon: Ruler,
            title: "Dragende constructies",
            description: "Metselwerk, staalconstructies en kanaalplaatvloeren",
            color: COLORS.blue600,
          },
          {
            icon: Package,
            title: "Casco wind- & waterdicht",
            description: "Oplevering klaar voor afbouwfase met alle sparingen",
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
        eyebrow="Onze ruwbouwdiensten"
        title="Constructie en casco — alles onder één dak"
        intro="Kies een onderdeel voor meer informatie of vraag direct een offerte aan."
        items={[
          {
            title: "Funderingen & grondwerk",
            desc: "Uitgraven, bekisting, bewapening en storten van stroken-, poer- of plaatfunderingen. Incl. sparingen & ankers.",
            href: "/diensten/ruwbouw/funderingen-grondwerk",
            icon: <Building2 className="w-5 h-5" />,
            badge: "Veelgevraagd",
          },
          {
            title: "Betonwerken",
            desc: "Bekisting, wapening en betonstort voor wanden, vloeren en balken. Met stort- en nabehandelingsplan.",
            href: "/diensten/ruwbouw/betonwerken",
            icon: <Hammer className="w-5 h-5" />,
          },
          {
            title: "Dragende wanden & vloeren",
            desc: "Kalkzandsteen/lijmwerk, kanaalplaat- of breedplaatvloeren, opleggingen en verankeringen.",
            href: "/diensten/ruwbouw/dragende-wanden-vloeren",
            icon: <Ruler className="w-5 h-5" />,
          },
          {
            title: "Metselwerk (constructief)",
            desc: "Constructief metselwerk, dilataties, lateien en detaillering volgens bestek en norm.",
            href: "/diensten/ruwbouw/metselwerk-constructief",
            icon: <ClipboardCheck className="w-5 h-5" />,
          },
          {
            title: "Stalen constructies & doorbraken",
            desc: "Plaatsen van HEA/HEB-liggers, kolommen en lateien; constructieve sparingen en doorbraken.",
            href: "/diensten/ruwbouw/stalen-constructies-doorbraken",
            icon: <Workflow className="w-5 h-5" />,
          },
          {
            title: "Casco wind- & waterdicht",
            desc: "Ruw dak, kozijnsparingen en voorbereidingen voor afbouw. Klaarzetten voor volgende fase.",
            href: "/diensten/ruwbouw/casco-wind-waterdicht",
            icon: <Package className="w-5 h-5" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP's */}
      <USPGrid
        eyebrow="Waarom Horizon bij ruwbouw"
        title="Zekerheid in iedere constructieve fase"
        intro="Van maatvoering tot stortregistratie: wij borgen kwaliteit en planning in elke stap."
        items={[
          {
            icon: <HardHat className="w-8 h-8" />,
            title: "Eigen ruwbouwploegen",
            desc: "Beton, metselwerk en casco door ons vaste team met 25+ jaar ervaring.",
          },
          {
            icon: <Ruler className="w-8 h-8" />,
            title: "Strakke maatvoering",
            desc: "Laser/total station, controlelijsten en tolerantiechecks per fase.",
          },
          {
            icon: <Hammer className="w-8 h-8" />,
            title: "Werk- & stortplannen",
            desc: "Bekisting, bewapening en curing uitgewerkt en gedocumenteerd.",
          },
          {
            icon: <ClipboardCheck className="w-8 h-8" />,
            title: "Kwaliteitsrapportage",
            desc: "Fotolog en registraties per bouwdeel voor aantoonbare kwaliteit.",
          },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
      <AanpakSectie
        eyebrow="Onze aanpak"
        title="Zo zetten we uw casco neer"
        intro="Transparant proces met kritieke paden en heldere beslismomenten."
        steps={[
          {
            number: 1,
            title: "Voorbereiding & maatvoering",
            description: "Uitzetten, werk- en stortplannen, logistiek.",
          },
          {
            number: 2,
            title: "Fundering & grondwerk",
            description: "Uitgraven, bekisten, bewapenen en storten.",
          },
          {
            number: 3,
            title: "Beton & nabehandeling",
            description: "Stort, tril- en afwerkplan, curing & ontkisten.",
          },
          {
            number: 4,
            title: "Dragende wanden & vloeren",
            description:
              "Lijmwerk, opleggingen en kanaal-/breedplaatvloeren.",
          },
          {
            number: 5,
            title: "Ruw dak & casco",
            description: "Wind- en waterdicht maken, sparingen en ankers.",
          },
          {
            number: 6,
            title: "Keuring & overdracht",
            description:
              "Eindcontrole, rapportage en overdracht aan afbouw.",
          },
        ]}
        cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
      />

      {/* FAQ */}
      <FAQSection
        items={RUWBOUW_FAQ}
        eyebrow="FAQ Ruwbouw"
        title="Veelgestelde vragen over ruwbouw"
        intro="Antwoorden over planning, toleranties, kwaliteit en verantwoordelijkheden."
        telHref="tel:0850000000"
        contactHref="/contact"
        singleOpen
      />
    </>
  );
}