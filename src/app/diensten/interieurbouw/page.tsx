// app/diensten/interieurbouw/page.tsx
"use client";

import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";
import AanpakSectie from "../ui/stepstimeline/AanpakSectie";
import FAQSection from "@/app/components/faqs/Faqs";
import INTERIEURBOUW_FAQ from "@/data/faqs/category/interieurBouw";

import {
  Home,
  Armchair,
  Bath,
  ChefHat,
  Bed,
  Sofa,
  Layout,
  Ruler,
  Palette,
  Scissors,
  BookOpen,
  Drill,
} from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  white: "#ffffff",
};

export default function InterieurbouwPage() {
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
            <span>Interieurbouw</span>
          </nav>
        }
        eyebrow="Maatwerk Interieurs"
        title={
          <>
            Interieurbouw in{" "}
            <span style={{ color: COLORS.yellow600 }}>Amsterdam</span>
          </>
        }
        subtitle="Maatwerk interieurs die uw woning of kantoor een unieke uitstraling geven — van keukens tot complete inbouwkasten."
        ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0850000000" }}
        microcopy="Keukens • Badkamers • Inbouwkasten • Maatwerk meubels • Wandbekleding"
        right={{
          type: "image",
          src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
          alt: "Moderne maatwerk interieurbouw",
        }}
      />

      {/* Intro-blok met expertise cards */}
      <BouwIntroSectie
        eyebrow="Maatwerk op Maat"
        title={
          <>
            <span>Unieke interieurs voor uw ruimte in </span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Amsterdam
            </span>
          </>
        }
        paragraphs={[
          "Wij ontwerpen en realiseren interieurs op maat die perfect aansluiten bij uw wensen en levensstijl. Van moderne keukens tot klassieke badkamers — elk project wordt met passie en vakmanschap uitgevoerd.",
        ]}
        expertiseItems={[
          {
            icon: ChefHat,
            title: "Keukens",
            description: "Moderne en klassieke keukens volledig op maat gemaakt",
            color: COLORS.blue600,
          },
          {
            icon: Bath,
            title: "Badkamers",
            description:
              "Complete badkamerconcepten van ontwerp tot realisatie",
            color: COLORS.blue700,
          },
          {
            icon: Bed,
            title: "Toiletten",
            description: "Functionele en stijlvolle toiletruimtes op maat",
            color: COLORS.blue600,
          },
          {
            icon: Sofa,
            title: "Inbouwkasten & maatwerk",
            description: "Kasten, meubels en wandkasten perfect passend",
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

      {/* Services-grid met 6 diensten */}
      <ServicesGrid
        eyebrow="Onze interieurbouwdiensten"
        title="Maatwerk voor elke ruimte in uw woning"
        intro="Van ontwerp tot realisatie. Kies een dienst voor meer informatie of vraag direct een offerte aan."
        items={[
          {
            title: "Keukens",
            desc: "Complete keukens op maat inclusief ontwerp, plaatsing en apparatuur. Modern of klassiek.",
            href: "/diensten/interieurbouw/keukens",
            icon: <ChefHat className="w-5 h-5" />,
            badge: "Populair",
          },
          {
            title: "Badkamers",
            desc: "Van compacte doucheruimte tot luxe wellness badkamer — volledig verzorgd en afgewerkt.",
            href: "/diensten/interieurbouw/badkamers",
            icon: <Bath className="w-5 h-5" />,
          },
          {
            title: "Toiletten",
            desc: "Stijlvolle en functionele toiletruimtes met hoogwaardig sanitair en betegeling.",
            href: "/diensten/interieurbouw/toiletten",
            icon: <Home className="w-5 h-5" />,
          },
          {
            title: "Inbouwkasten & maatwerkmeubilair",
            desc: "Op maat gemaakte kasten, wandmeubels en andere maatwerkmeubilair perfect passend in uw ruimte.",
            href: "/diensten/interieurbouw/inbouwkasten-maatwerkmeubilair",
            icon: <Layout className="w-5 h-5" />,
          },
          {
            title: "Wandbekleding & lambrisering",
            desc: "Houten lambrisering, panelen en decoratieve wandbekleding voor een unieke uitstraling.",
            href: "/diensten/interieurbouw/wandbekleding-lambrisering",
            icon: <BookOpen className="w-5 h-5" />,
          },
          {
            title: "Interieuradvies & ontwerp",
            desc: "Professioneel advies over indeling, materialen en kleuren voor optimaal resultaat.",
            href: "/diensten/interieurbouw/interieuradvies-ontwerp",
            icon: <Palette className="w-5 h-5" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP's */}
      <USPGrid
        eyebrow="Waarom Horizon voor uw interieur"
        title="Maatwerk met oog voor detail"
        intro="Van eerste schets tot montage: wij realiseren interieurs die perfect bij u passen."
        items={[
          {
            icon: <Ruler className="w-8 h-8" />,
            title: "100% maatwerk",
            desc: "Elk project wordt op maat ontworpen en geproduceerd voor perfecte pasvorm.",
          },
          {
            icon: <Palette className="w-8 h-8" />,
            title: "Ontwerpbegeleiding",
            desc: "Professioneel advies over indeling, materialen en kleuren.",
          },
          {
            icon: <Scissors className="w-8 h-8" />,
            title: "Eigen werkplaats",
            desc: "Wij produceren veel in eigen werkplaats voor optimale kwaliteitscontrole.",
          },
          {
            icon: <Drill className="w-8 h-8" />,
            title: "Montage door vakmensen",
            desc: "Professionele montage door ervaren timmerlieden en installateurs.",
          },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
      <AanpakSectie
        eyebrow="Onze aanpak"
        title="Van inspiratie tot realisatie"
        intro="Samen creëren we het interieur van uw dromen in 6 heldere stappen."
        steps={[
          {
            number: 1,
            title: "Kennismaking & wensen",
            description:
              "Intake gesprek over uw wensen, budget en stijlvoorkeur.",
          },
          {
            number: 2,
            title: "Opmeten & ontwerp",
            description:
              "Nauwkeurig opmeten en uitwerken van 3D ontwerptekeningen.",
          },
          {
            number: 3,
            title: "Materiaal- & kleurkeuze",
            description:
              "Samen kiezen we materialen, kleuren en afwerkingen.",
          },
          {
            number: 4,
            title: "Offerte & planning",
            description:
              "Transparante offerte met gedetailleerde planning en levertijd.",
          },
          {
            number: 5,
            title: "Productie & voorbereiding",
            description:
              "Productie van het maatwerk in onze werkplaats of bij leveranciers.",
          },
          {
            number: 6,
            title: "Montage & oplevering",
            description:
              "Professionele montage, afwerking en eindoplevering.",
          },
        ]}
        cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
      />

      {/* FAQ */}
      <FAQSection
        items={INTERIEURBOUW_FAQ}
        eyebrow="FAQ Interieurbouw"
        title="Veelgestelde vragen over interieurbouw"
        intro="Antwoorden over maatwerk, levertijden, materialen en garantie."
        telHref="tel:0850000000"
        contactHref="/contact"
        singleOpen
      />
    </>
  );
}