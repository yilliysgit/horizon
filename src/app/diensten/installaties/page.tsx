// app/diensten/installaties/page.tsx
"use client";

import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";
import AanpakSectie from "../ui/stepstimeline/AanpakSectie";
import FAQSection from "@/app/components/faqs/Faqs";
import INSTALLATIES_FAQ from "@/data/faqs/category/installaties";

import {
  Zap,
  Droplets,
  Flame,
  Wind,
  ThermometerSun,
  Waves,
  Cable,
  Gauge,
  PipeTwist,
  Fan,
  ShowerHead,
  Lightbulb,
} from "lucide-react";

const COLORS = {
  blue700: "#0066cc",
  blue600: "#1a73e8",
  yellow600: "#f59e0b",
  white: "#ffffff",
};

export default function InstallatiesPage() {
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
            <span>Installaties</span>
          </nav>
        }
        eyebrow="Moderne Technieken"
        title={
          <>
            Installaties in{" "}
            <span style={{ color: COLORS.yellow600 }}>Amsterdam</span>
          </>
        }
        subtitle="Moderne technieken, slimme systemen en duurzame oplossingen voor uw woning of bedrijfspand — vakkundig geïnstalleerd."
        ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0850000000" }}
        microcopy="Elektrotechniek • Loodgieterwerk • CV & Verwarming • Ventilatie • Airco"
        right={{
          type: "image",
          src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80&auto=format&fit=crop",
          alt: "Moderne installatiewerken",
        }}
      />

      {/* Intro-blok met expertise cards */}
      <BouwIntroSectie
        eyebrow="Technische Expertise"
        title={
          <>
            <span>Slimme installaties voor uw comfort in </span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Amsterdam
            </span>
          </>
        }
        paragraphs={[
          "Wij verzorgen alle technische installaties voor woning en bedrijf. Van elektrotechniek tot klimaatbeheersing — moderne technieken, duurzame oplossingen en vakkundige installatie door gecertificeerde installateurs.",
        ]}
        expertiseItems={[
          {
            icon: Zap,
            title: "Elektrotechniek",
            description: "Elektra-installaties, bekabeling en domotica systemen",
            color: COLORS.blue600,
          },
          {
            icon: Droplets,
            title: "Loodgieterwerk",
            description:
              "Sanitair, leidingwerk en riolering vakkundig aangelegd",
            color: COLORS.blue700,
          },
          {
            icon: ThermometerSun,
            title: "Verwarming & ventilatie",
            description: "CV-installaties, vloerverwarming en ventilatiesystemen",
            color: COLORS.blue600,
          },
          {
            icon: Wind,
            title: "Airco & warmtepompen",
            description: "Klimaatbeheersing voor optimaal comfort het hele jaar",
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
        eyebrow="Onze installatiediensten"
        title="Complete technische installaties voor elke ruimte"
        intro="Van basale voorzieningen tot slimme systemen. Kies een dienst voor meer informatie."
        items={[
          {
            title: "Elektrotechniek",
            desc: "Elektra-installaties, groepenkast, bekabeling, stopcontacten en verlichting volgens NEN 1010.",
            href: "/diensten/installaties/elektrotechniek",
            icon: <Zap className="w-5 h-5" />,
            badge: "Populair",
          },
          {
            title: "Loodgieterwerk",
            desc: "Sanitair leidingwerk, waterleiding, riolering en alle loodgieterswerk voor keuken en badkamer.",
            href: "/diensten/installaties/loodgieterwerk",
            icon: <Droplets className="w-5 h-5" />,
          },
          {
            title: "Verwarming & ventilatie",
            desc: "CV-ketels, radiatoren, vloerverwarming en mechanische ventilatiesystemen (WTW).",
            href: "/diensten/installaties/verwarming-ventilatie",
            icon: <Flame className="w-5 h-5" />,
          },
          {
            title: "Airco & warmtepompen",
            desc: "Airconditioning en warmtepompen voor duurzame klimaatbeheersing zomer en winter.",
            href: "/diensten/installaties/airco-warmtepompen",
            icon: <Wind className="w-5 h-5" />,
          },
          {
            title: "Domotica & smart home",
            desc: "Slimme systemen voor verlichting, verwarming, zonwering en beveiliging.",
            href: "/diensten/installaties/domotica-smart-home",
            icon: <Lightbulb className="w-5 h-5" />,
          },
          {
            title: "Onderhoud & service",
            desc: "Periodiek onderhoud, storingsdienst en keuring van al uw technische installaties.",
            href: "/diensten/installaties/onderhoud-service",
            icon: <Gauge className="w-5 h-5" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP's */}
      <USPGrid
        eyebrow="Waarom Horizon voor installaties"
        title="Betrouwbare techniek met garantie"
        intro="Gecertificeerde installateurs, moderne technieken en volledige garantie op materiaal en arbeid."
        items={[
          {
            icon: <Cable className="w-8 h-8" />,
            title: "Gecertificeerde installateurs",
            desc: "Erkend voor gas, elektra en klimaattechniek met alle benodigde certificaten.",
          },
          {
            icon: <ThermometerSun className="w-8 h-8" />,
            title: "Energie-efficiënt",
            desc: "Moderne systemen met laag energieverbruik en hoog comfort.",
          },
          {
            icon: <Gauge className="w-8 h-8" />,
            title: "Service & onderhoud",
            desc: "24/7 storingsdienst en periodiek onderhoudscontracten beschikbaar.",
          },
          {
            icon: <Waves className="w-8 h-8" />,
            title: "Garantie & keuring",
            desc: "Volledige garantie en officiële keuringen voor veilige installaties.",
          },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
      <AanpakSectie
        eyebrow="Onze aanpak"
        title="Van advies tot ingebruikname"
        intro="Stap voor stap naar moderne en betrouwbare installaties in uw pand."
        steps={[
          {
            number: 1,
            title: "Adviesgesprek & inspectie",
            description:
              "Bespreking van uw wensen en inspectie van de huidige situatie.",
          },
          {
            number: 2,
            title: "Ontwerp & berekening",
            description:
              "Technisch ontwerp met berekeningen en materiaalspecificaties.",
          },
          {
            number: 3,
            title: "Offerte & planning",
            description:
              "Transparante offerte met uitvoeringsplanning en levertijden.",
          },
          {
            number: 4,
            title: "Voorbereidende werkzaamheden",
            description:
              "Uitsparingen, leidingwerk en bekabeling conform tekening.",
          },
          {
            number: 5,
            title: "Installatie & montage",
            description:
              "Plaatsing en aansluiting van alle apparatuur door vakspecialisten.",
          },
          {
            number: 6,
            title: "Test & oplevering",
            description:
              "Uitgebreid testen, keuring en instructie bij oplevering.",
          },
        ]}
        cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
      />

      {/* FAQ */}
      <FAQSection
        items={INSTALLATIES_FAQ}
        eyebrow="FAQ Installaties"
        title="Veelgestelde vragen over installaties"
        intro="Antwoorden over certificeringen, garanties, onderhoud en energiebesparing."
        telHref="tel:0850000000"
        contactHref="/contact"
        singleOpen
      />
    </>
  );
}