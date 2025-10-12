// app/diensten/totaalrenovaties/page.tsx
"use client";

import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";
import AanpakSectie from "../ui/stepstimeline/AanpakSectie";
import FAQSection from "@/app/components/faqs/Faqs";
import TOTAALBOUW_FAQ from "@/data/faqs/category/totaalBouw.faq";

import {
  CheckCircle,
  Hammer,
  HardHat,
  Leaf,
  Clock,
  Handshake,
  Ruler,
  Building2,
  ClipboardCheck,
  Workflow,
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

export default function TotaalrenovatiesPage() {
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
            <span>Totaalrenovaties</span>
          </nav>
        }
        eyebrow="Vakmanschap & Kwaliteit"
        title={
          <>
            Totaalrenovaties in{" "}
            <span style={{ color: COLORS.yellow600 }}>Amsterdam</span>
          </>
        }
        subtitle="Van eerste schets tot sleuteloverdracht — wij realiseren uw droomproject met eigen vakteam en 25+ jaar ervaring."
        ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0850000000" }}
        microcopy="Vaste prijsafspraken • Eigen vakteam • Transparante planning • Persoonlijke begeleiding"
        right={{
          type: "image",
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
          alt: "Totaalrenovatie project Amsterdam",
        }}
      />

      {/* Intro-blok met expertise cards */}
      <BouwIntroSectie
        eyebrow="Totaalbouw van A tot Z"
        title={
          <>
            <span>Bouwen met vertrouwen in </span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Amsterdam
            </span>
          </>
        }
        paragraphs={[
          "Wij zijn uw betrouwbare partner voor nieuwbouw, totaalrenovaties en verbouwingen. Van eerste advies tot sleuteloverdracht: één aanspreekpunt, heldere planning en vakmanschap dat generaties meegaat.",
        ]}
        expertiseItems={[
          {
            icon: Building2,
            title: "Complete nieuwbouw en uitbreidingen",
            description: "Van fundering tot dak, wij realiseren uw droomhuis",
            color: COLORS.blue600,
          },
          {
            icon: Wrench,
            title: "Renovaties en verbouwingen",
            description:
              "Transformatie van bestaande ruimtes naar moderne woonoplossingen",
            color: COLORS.blue700,
          },
          {
            icon: Zap,
            title: "Duurzame en energiezuinige oplossingen",
            description: "Milieuvriendelijk bouwen voor de toekomst",
            color: COLORS.blue600,
          },
          {
            icon: Users,
            title: "Persoonlijk advies en begeleiding",
            description: "Van eerste gesprek tot sleuteloverdracht",
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
        eyebrow="Onze Diensten binnen Totaalrenovaties"
        title="Alles onder één dak — direct zichtbaar"
        intro="Van eerste schets tot oplevering. Kies een subdienst voor meer informatie of vraag direct een offerte aan."
        items={[
          {
            title: "Complete renovaties",
            desc: "Volledige transformatie van woning of bedrijfspand — één aanspreekpunt, vaste planning.",
            href: "/diensten/totaalbouw/complete-renovaties",
            icon: <Building2 className="w-5 h-5" />,
            badge: "Populair",
          },
          {
            title: "Op- en aanbouwen",
            desc: "Extra ruimte creëren met een opbouw of aanbouw. Constructie, isolatie en afwerking geregeld.",
            href: "/diensten/totaalrenovaties/op-en-aanbouwen",
            icon: <Hammer className="w-5 h-5" />,
          },
          {
            title: "Verbouwingen op maat",
            desc: "Keuken, badkamer of totaalaanpak. Altijd maatwerk, afgestemd op uw wensen en budget.",
            href: "/diensten/totaalrenovaties/verbouwingen-op-maat",
            icon: <Ruler className="w-5 h-5" />,
          },
          {
            title: "Renovatieadvies & ontwerp",
            desc: "Haalbaarheid, kosteninschatting en ontwerpbegeleiding. Slimme keuzes vóórdat de bouw start.",
            href: "/diensten/totaalrenovaties/renovatieadvies-ontwerp",
            icon: <ClipboardCheck className="w-5 h-5" />,
          },
          {
            title: "Herbestemmingen",
            desc: "Zolder naar slaapkamer, garage naar kantoor — functionele indeling met oog voor comfort.",
            href: "/diensten/totaalrenovaties/herbestemmingen",
            icon: <ClipboardCheck className="w-5 h-5" />,
          },
          {
            title: "Projectcoördinatie",
            desc: "Planning, inkoop en kwaliteitscontrole — wij sturen alle vakdisciplines aan.",
            href: "/diensten/totaalrenovaties/projectcoordinatie",
            icon: <Workflow className="w-5 h-5" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP's */}
      <USPGrid
        eyebrow="Waarom kiezen voor ons"
        title="Uw voordelen bij Horizon Totaalbouw"
        intro="Met ons kiest u voor ervaring, betrouwbaarheid en een bouwpartner die meedenkt."
        items={[
          {
            icon: <HardHat className="w-8 h-8" />,
            title: "25+ jaar ervaring",
            desc: "Vakmanschap en kennis van traditionele én moderne bouwtechnieken.",
          },
          {
            icon: <Leaf className="w-8 h-8" />,
            title: "Duurzame materialen",
            desc: "We bouwen met oog voor energie-efficiëntie en milieuvriendelijke keuzes.",
          },
          {
            icon: <Clock className="w-8 h-8" />,
            title: "Strakke planning",
            desc: "Heldere afspraken en een efficiënte bouwplanning voorkomen verrassingen.",
          },
          {
            icon: <Handshake className="w-8 h-8" />,
            title: "Eén aanspreekpunt",
            desc: "Altijd direct contact met uw projectleider, geen ruis of misverstanden.",
          },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
      <AanpakSectie
        eyebrow="Onze aanpak"
        title="Zo verloopt uw totaalrenovatie"
        intro="Van eerste idee tot oplevering. Wij begeleiden u stap voor stap."
        steps={[
          {
            number: 1,
            title: "Kennismaking & intake",
            description: "Bespreking van uw wensen, budget en planning.",
          },
          {
            number: 2,
            title: "Ontwerp & offerte",
            description:
              "Uitwerking van het plan met transparante kostenbegroting.",
          },
          {
            number: 3,
            title: "Vergunningen & voorbereiding",
            description:
              "Wij regelen alle benodigde vergunningen en voorbereidingen.",
          },
          {
            number: 4,
            title: "Uitvoering",
            description:
              "Ons vakteam start met de realisatie volgens planning.",
          },
          {
            number: 5,
            title: "Oplevering",
            description:
              "Eindcontrole en sleuteloverdracht van uw gerenoveerde pand.",
          },
        ]}
        cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
      />

      {/* FAQ */}
      <FAQSection
        items={TOTAALBOUW_FAQ}
        eyebrow="FAQ Totaalbouw"
        title="Veelgestelde vragen over totaalbouw"
        intro="Alles over planning, kosten, kwaliteit en nazorg."
        telHref="tel:0850000000"
        contactHref="/contact"
        singleOpen
      />
    </>
  );
}