// app/diensten/afbouw-afwerking/page.tsx
"use client";

import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";
import AanpakSectie from "../ui/stepstimeline/AanpakSectie";
import FAQSection from "@/app/components/faqs/Faqs";
import AFBOUW_FAQ from "@/data/faqs/category/afBouw";

import {
  Paintbrush,
  Hammer,
  HardHat,
  Ruler,
  Layers,
  Sparkles,
  Wrench,
  PaintBucket,
  Grid3x3,
  Boxes,
  Drill,
  Wallpaper,
} from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  white: "#ffffff",
};

export default function AfbouwAfwerkingPage() {
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
            <span>Afbouw & Afwerking</span>
          </nav>
        }
        eyebrow="Perfecte Finishing Touch"
        title={
          <>
            Afbouw &amp; Afwerking in{" "}
            <span style={{ color: COLORS.yellow600 }}>Amsterdam</span>
          </>
        }
        subtitle="Van stuc tot schilderwerk — wij verzorgen de finishing touch voor binnen en buiten met oog voor detail en kwaliteit."
        ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0850000000" }}
        microcopy="Stucwerk • Schilderwerk • Tegelwerk • Timmerwerk • Vloeren • Plafonds"
        right={{
          type: "image",
          src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80&auto=format&fit=crop",
          alt: "Professioneel afbouw- en afwerkingswerk",
        }}
      />

      {/* Intro-blok met expertise cards */}
      <BouwIntroSectie
        eyebrow="Vakmanschap in Detail"
        title={
          <>
            <span>Perfecte afwerking voor uw project in </span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Amsterdam
            </span>
          </>
        }
        paragraphs={[
          "Wij verzorgen alle afbouw- en afwerkingswerkzaamheden van stuc- tot schilderwerk. Met 25+ jaar ervaring en een scherp oog voor detail leveren wij hoogwaardige afwerking die uw ruimte compleet maakt.",
        ]}
        expertiseItems={[
          {
            icon: Paintbrush,
            title: "Afbouw timmerwerk",
            description: "Plinten, kozijnen, deuren en maatwerk timmerwerkzaamheden",
            color: COLORS.blue600,
          },
          {
            icon: Layers,
            title: "Wanden & plafonds",
            description:
              "Stucwerk, gipsplaten en spuitpleister voor gladde afwerking",
            color: COLORS.blue700,
          },
          {
            icon: Grid3x3,
            title: "Stuc- en pleisterwerk",
            description: "Traditioneel en modern stucwerk voor binnen en buiten",
            color: COLORS.blue600,
          },
          {
            icon: PaintBucket,
            title: "Vloeren & tegelwerk",
            description: "Parket, laminaat, tegels en alle soorten vloerwerk",
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
        eyebrow="Onze afbouwdiensten"
        title="Van ruwe muren tot perfecte afwerking"
        intro="Kies een onderdeel voor meer informatie of vraag direct een offerte aan."
        items={[
          {
            title: "Afbouw timmerwerk",
            desc: "Plinten, kozijnen, deuren, kasten en andere maatwerk timmerwerkzaamheden voor de perfecte afwerking.",
            href: "/diensten/afbouw-afwerking/afbouw-timmerwerk",
            icon: <Hammer className="w-5 h-5" />,
            badge: "Populair",
          },
          {
            title: "Wanden & plafonds",
            desc: "Gipsplaten, stucwerk en systeemplafonds voor een strakke en moderne uitstraling.",
            href: "/diensten/afbouw-afwerking/wanden-plafonds",
            icon: <Layers className="w-5 h-5" />,
          },
          {
            title: "Stuc- en pleisterwerk",
            desc: "Traditioneel handwerk en modern spuitpleister voor binnen- en buitenwanden.",
            href: "/diensten/afbouw-afwerking/stuc-pleisterwerk",
            icon: <Wallpaper className="w-5 h-5" />,
          },
          {
            title: "Vloeren & tegelwerk",
            desc: "Parket, laminaat, PVC, tegels — alle soorten vloeren vakkundig geplaatst.",
            href: "/diensten/afbouw-afwerking/vloeren-tegelwerk",
            icon: <Grid3x3 className="w-5 h-5" />,
          },
          {
            title: "Schilderwerk",
            desc: "Binnen- en buitenschilderwerk met hoogwaardige verfproducten en kleuradvies.",
            href: "/diensten/afbouw-afwerking/schilderwerk",
            icon: <Paintbrush className="w-5 h-5" />,
          },
          {
            title: "Sanitair & tegels",
            desc: "Badkamers en toiletten compleet betegeld en afgewerkt inclusief sanitair.",
            href: "/diensten/afbouw-afwerking/sanitair-tegels",
            icon: <Sparkles className="w-5 h-5" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP's */}
      <USPGrid
        eyebrow="Waarom Horizon voor afwerking"
        title="Perfectie in elk detail"
        intro="Van materiaaladvies tot eindafwerking: wij zorgen voor een resultaat waar u trots op bent."
        items={[
          {
            icon: <HardHat className="w-8 h-8" />,
            title: "Vakbekwame vakmensen",
            desc: "Gespecialiseerde stukadoors, schilders en timmerlieden met jarenlange ervaring.",
          },
          {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Oog voor detail",
            desc: "Strakke naden, rechte lijnen en perfecte afwerking in elk project.",
          },
          {
            icon: <PaintBucket className="w-8 h-8" />,
            title: "Kwalitatieve materialen",
            desc: "We werken alleen met A-merken en duurzame producten.",
          },
          {
            icon: <Ruler className="w-8 h-8" />,
            title: "Kleur- & materiaaladvies",
            desc: "Persoonlijk advies bij kleur- en materiaalkeuze passend bij uw stijl.",
          },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
      <AanpakSectie
        eyebrow="Onze aanpak"
        title="Zo werken we naar perfecte afwerking"
        intro="Van materiaaladvies tot eindschoonmaak. Stap voor stap naar het gewenste resultaat."
        steps={[
          {
            number: 1,
            title: "Intake & advies",
            description:
              "Bespreking van uw wensen, stijlvoorkeur en materiaaladvies.",
          },
          {
            number: 2,
            title: "Offerte & bemonstering",
            description:
              "Transparante offerte met kleurstalen en materiaalsamples.",
          },
          {
            number: 3,
            title: "Voorbereiding",
            description:
              "Voorbereidende werkzaamheden zoals schuren, plamuren en afplakken.",
          },
          {
            number: 4,
            title: "Basiswerk",
            description:
              "Stucwerk, gipsplaten, primer en andere basiswerkzaamheden.",
          },
          {
            number: 5,
            title: "Eindafwerking",
            description:
              "Schilderwerk, vloeren leggen, timmerwerk en alle details.",
          },
          {
            number: 6,
            title: "Oplevering",
            description:
              "Eindschoonmaak, inspectie en overdracht met garantie.",
          },
        ]}
        cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
      />

      {/* FAQ */}
      <FAQSection
        items={AFBOUW_FAQ}
        eyebrow="FAQ Afbouw & Afwerking"
        title="Veelgestelde vragen over afbouw"
        intro="Antwoorden over materialen, kleuren, planning en onderhoud."
        telHref="tel:0850000000"
        contactHref="/contact"
        singleOpen
      />
    </>
  );
}