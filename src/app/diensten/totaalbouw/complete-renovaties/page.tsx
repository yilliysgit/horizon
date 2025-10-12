"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import SubdienstHero from "@/app/components/subdienst/SubdienstHero";
import SubdienstIntro from "@/app/components/subdienst/SubdienstIntro";
import SubdienstScope from "@/app/components/subdienst/SubdienstScope";
import SubdienstPricing from "@/app/components/subdienst/SubdienstPricing";
import SubdienstCasesSection from "@/app/components/subdienst/SubdienstCasesSection";
import SubdienstFinalCTA from "@/app/components/subdienst/SubdienstFinalCTA";
import OfferteSlideOver from "@/app/components/ui/OfferteSlideOver";
import OfferteFormulier from "@/app/components/forms/offerteFormulier/OfferteFormulier";
import { allProjects } from "@/data/projecten";

// ---------- Wrapper met andere naam om naming conflict te vermijden ----------
function OfferteSlideOverWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const open = Boolean(searchParams.get("offerte"));

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("offerte");
    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(next, { scroll: false });
  };

  return (
    <OfferteSlideOver
      open={open}
      onClose={handleClose}
      title="Vraag een offerte aan"
      widthClass="max-w-2xl"
    >
      <OfferteFormulier />
    </OfferteSlideOver>
  );
}

// ---------- Hoofdpagina ----------
export default function Page() {
  return (
    <main>
      <SubdienstHero
        breadcrumbs={
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>›</span>
            <a href="/diensten" className="hover:text-blue-600 transition-colors">Diensten</a>
            <span>›</span>
            <a href="/diensten/totaalrenovaties" className="hover:text-blue-600 transition-colors">
              Totaalrenovaties
            </a>
            <span>›</span>
            <span className="font-medium">Complete renovaties</span>
          </nav>
        }
        eyebrow="Totaalrenovaties"
        title={
          <>
            <span>Complete renovaties in </span>
            <span style={{ color: "#0066cc" }}>Amsterdam</span>
          </>
        }
        subtitle="Volledige transformatie van woning of bedrijfspand — één aanspreekpunt, vaste planning en open begroting."
        trustSignals={[
          "25+ jaar ervaring",
          "Binnen 24u reactie",
          "Transparante planning",
        ]}
        ctaPrimary={{
          label: "Vraag offerte aan",
          href: "?offerte=1",
        }}
        ctaSecondary={{
          label: "Bel ons direct",
          href: "tel:0852003300",
        }}
        image={{
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
          alt: "Complete renovatie Amsterdam",
        }}
      />

      <SubdienstIntro
        eyebrow="Onze aanpak"
        title="Uw totaalrenovatie in goede handen"
        content="We begeleiden uw renovatie van eerste schets tot oplevering. Met één aanspreekpunt, een transparante planning en ons eigen vakteam blijft u altijd in control. We combineren traditioneel vakmanschap met moderne technieken en duurzame materialen, zodat uw woning klaar is voor de toekomst. Elk project wordt uitgevoerd volgens de hoogste kwaliteitsnormen."
        bullets={[
          { text: "Strakke planning: vaste afspraken en heldere mijlpalen per fase" },
          { text: "Eén aanspreekpunt: directe communicatie met uw projectleider" },
          { text: "Duurzaam materiaalgebruik: energie-efficiënt en toekomstbestendig" },
        ]}
        highlightStats={[
          { value: "25+", label: "Jaar ervaring" },
          { value: "500+", label: "Projecten" },
        ]}
      />

      <SubdienstScope
        eyebrow="Wat zit erin"
        title="Wat zit er in een complete renovatie?"
        intro="Overzicht van alle werkzaamheden, opties en wat niet in het standaardpakket zit."
        included={[
          { title: "Sloop & voorbereiding", description: "Verwijderen oude materialen en voorbereiden van de ruimte." },
          { title: "Constructieve aanpassingen", description: "Doorbraken, nieuwe dragende wanden en constructief werk." },
          { title: "Elektra & loodgieterwerk", description: "Nieuwe groepenkast, leidingwerk en sanitair." },
          { title: "Isolatie & ventilatie", description: "Hoogwaardige isolatie en mechanische ventilatie." },
          { title: "Stucwerk & afwerking", description: "Gladde wanden en plafonds, spuitwerk of handwerk." },
          { title: "Vloeren", description: "Parket, laminaat, tegels of andere vloerbedekking." },
          { title: "Keuken & badkamer", description: "Complete nieuwe keuken en badkamer inclusief tegels." },
          { title: "Schilderwerk", description: "Binnen- en buitenschilderwerk in gewenste kleur." },
          { title: "Oplevering & nazorg", description: "Eindschoonmaak, inspectie en garantiedocumenten." },
        ]}
        optional={[
          { title: "Vergunningsaanvragen", description: "Aanvragen van bouw- en omgevingsvergunningen." },
          { title: "Maatwerk interieurbouw", description: "Op maat gemaakte kasten, deuren en interieurelementen." },
          { title: "PV & warmtepomp", description: "Zonnepanelen en warmtepompinstallatie voor energiebesparing." },
          { title: "Domotica", description: "Smart home systemen voor verlichting, verwarming en beveiliging." },
        ]}
        excluded={[
          { title: "Monumentale restauratie", description: "Specialistisch herstelwerk aan monumentale panden." },
          { title: "Spoed binnen 48u", description: "Acute reparaties zonder intake en planning." },
        ]}
      />

      <SubdienstPricing
        eyebrow="Transparante prijzen"
        title="Indicatieve kosten & planning"
        intro="Kies het pakket dat bij uw wensen en budget past. Alle pakketten zijn volledig aanpasbaar."
        priceRange="€800 - €1.500 per m²"
        priceNote="Exacte prijs na opname en uitwerking"
        packages={[
          {
            name: "Starter",
            description: "Basis renovatie met kwalitatieve materialen",
            features: [
              "Basisafwerking stuc en schilder",
              "Standaard elektra & loodgieter",
              "Bestaande installaties hergebruiken",
              "Laminaat of PVC vloer",
              "Standaard sanitair",
            ],
          },
          {
            name: "Comfort",
            description: "Complete renovatie met hoogwaardige afwerking",
            badge: "Populair",
            highlighted: true,
            features: [
              "Hoogwaardige afwerking",
              "Nieuwe keuken & badkamer",
              "Verbeterde isolatie",
              "Nieuwe elektra & loodgieter",
              "Parket of tegelvloer",
              "Mid-range sanitair",
              "LED verlichting",
            ],
          },
          {
            name: "Premium",
            description: "Luxe totaalrenovatie met maatwerk",
            features: [
              "Luxe maatwerk afwerking",
              "Designer keuken & badkamer",
              "A++++ isolatie & ventilatie",
              "Smart home domotica",
              "Vloerverwarming",
              "High-end sanitair & apparatuur",
              "Op maat gemaakte kasten",
            ],
          },
        ]}
      />

      <SubdienstCasesSection
        eyebrow="Gerealiseerde projecten"
        title="Complete renovaties in actie"
        cases={allProjects}
        filterCategory="complete-renovaties"
        limit={3}
      />

      <SubdienstFinalCTA
        title="Klaar om te starten met uw renovatie?"
        subtitle="Plan een gratis adviesgesprek en ontvang binnen 24 uur een reactie van onze projectleider."
        trustSignals={[
          "Gratis en vrijblijvend",
          "Binnen 24 uur reactie",
          "Persoonlijk advies",
        ]}
        ctaPrimary={{
          label: "Plan adviesgesprek",
          href: "?offerte=1",
        }}
        ctaSecondary={{
          label: "Bel ons: 085 - 200 3300",
          href: "tel:0852003300",
        }}
      />

      {/* Slide-over onderaan renderen */}
      <Suspense>
        <OfferteSlideOverWrapper />
      </Suspense>
    </main>
  );
}