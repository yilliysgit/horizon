"use client";
import React from 'react'
import SubdienstHero from '@/app/components/subdienst/SubdienstHero'
import SubdienstIntro from '@/app/components/subdienst/SubdienstIntro';
import SubdienstScope from '@/app/components/subdienst/SubdienstScope';
import SubdienstPricing from '@/app/components/subdienst/SubdienstPricing';
import SubdienstCasesSection from '@/app/components/subdienst/SubdienstCasesSection';
import SubdienstFinalCTA from '@/app/components/subdienst/SubdienstFinalCTA';
import { allProjects } from '@/data/projecten';

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
            <a href="/diensten/herbestemmingen" className="hover:text-blue-600 transition-colors">Herbestemmingen</a>
            <span>›</span>
            <span className="font-medium">Herbestemmen van panden</span>
          </nav>
        }
        eyebrow="Herbestemmingen"
        title={
          <>
            <span>Herbestemmen van panden in </span>
            <span style={{ color: "#0066cc" }}>Amsterdam</span>
          </>
        }
        subtitle="Van leegstaand gebouw naar nieuwe functie: we verzorgen het volledige traject — van haalbaarheid en vergunningen tot uitvoering en oplevering."
        trustSignals={[
          "25+ jaar ervaring",
          "Binnen 24u reactie",
          "Vergunningstraject-begeleiding",
        ]}
        ctaPrimary={{ label: "Vraag een intake aan", href: "#offerte" }}
        ctaSecondary={{ label: "Bel ons direct", href: "tel:0852003300" }}
        image={{
          src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80&auto=format&fit=crop",
          alt: "Herbestemd industrieel pand met moderne afwerking",
        }}
      />

      <SubdienstIntro
        eyebrow="Onze aanpak"
        title="Herbestemmen met respect voor het bestaande"
        content="We begeleiden de volledige herbestemming: van eerste haalbaarheidsstudie en toets aan regelgeving tot ontwerp, uitvoering en nazorg. Met één aanspreekpunt en een transparante planning sturen we op kwaliteit, vergunningen en risico’s. We combineren bouwkundig vakmanschap met slimme installatietechniek en duurzame keuzes zodat uw pand toekomstbestendig én comfortabel wordt."
        bullets={[
          { text: "Haalbaarheid & vergunningscheck: snelle toets op kansen en risico’s" },
          { text: "Eén aanspreekpunt: projectleider voor ontwerp t/m oplevering" },
          { text: "Duurzaam & circulair: focus op energie, comfort en hergebruik" },
        ]}
        highlightStats={[
          { value: "25+", label: "Jaar ervaring" },
          { value: "100+", label: "Herbestemmingsprojecten" },
        ]}
      />

      <SubdienstScope
        eyebrow="Wat zit erin"
        title="Wat hoort bij een herbestemming?"
        intro="Overzicht van vaste onderdelen, uitbreidingen op aanvraag en zaken die niet standaard zijn inbegrepen."
        included={[
          { title: "Haalbaarheidsstudie op locatie", description: "Opname, risico’s en kansen in beeld; globale raming & planning." },
          { title: "Toetsing aan regels", description: "Controle bestemmingsplan/omgevingsplan en bouwkundige randvoorwaarden." },
          { title: "Ontwerp & tekenwerk", description: "Indelingsvoorstellen, maatvoering en technisch tekenwerk voor uitvoering." },
          { title: "Constructieve beoordeling", description: "Afstemming met constructeur voor doorbraken, vloeren en draagstructuur." },
          { title: "Brandveiligheid & bouwfysica", description: "Vluchtroutes, compartimentering, isolatie, akoestiek en ventilatie." },
          { title: "E- & W-installaties", description: "Nieuwe elektra, data, verlichting, klimaat en sanitair volgens de nieuwe functie." },
          { title: "Casco-aanpassingen", description: "Openingen, trapopgangen, gevelopeningen en daglichtoptimalisatie." },
          { title: "Afbouw & afwerking", description: "Wanden, plafonds, vloeren en interieurafwerking voor gebruiksklaar opleveren." },
          { title: "Projectleiding & oplevering", description: "Strakke coördinatie, keuringen en overdracht met documentatie." },
        ]}
        optional={[
          { title: "Monumenten- & erfgoedadvies", description: "Afstemming met monumentenzorg en behoud van karakteristieke elementen." },
          { title: "Vergunningstraject begeleiding", description: "Opstellen stukken, indiening en communicatie met gemeente." },
          { title: "Energieconcept & verduurzaming", description: "Warmtepomp, PV, isolatieplan en BENG-verbetering." },
          { title: "Circulaire demontage & hergebruik", description: "Selectieve sloop en hergebruik van materialen." },
          { title: "Maatwerk interieur", description: "Vaste kasten, balies en specials passend bij de nieuwe functie." },
          { title: "Fasering in gebruik", description: "Uitvoeren terwijl (delen van) het pand in gebruik blijven." },
        ]}
        excluded={[
          { title: "Volledige nieuwbouw", description: "Totale sloop/nieuwbouw valt buiten een herbestemmingsopdracht." },
          { title: "Asbestsanering", description: "Alleen na separate inventarisatie en saneringsopdracht." },
        ]}
      />

      <SubdienstPricing
        eyebrow="Transparante indicaties"
        title="Indicatieve kosten & planning"
        intro="Elke herbestemming is maatwerk. Onderstaande pakketten geven richting; we werken altijd een voorstel op maat uit na opname."
        priceRange="vanaf €1.100 – €1.950 per m²"
        priceNote="Exacte prijs en doorlooptijd na opname en planvorming"
        packages={[
          {
            name: "Studie & Ontwerp",
            description: "Haalbaarheid, schetsontwerp en basisontwerp voor besluitvorming",
            features: [
              "Locatie-opname & haalbaarheidsrapport",
              "Conceptindeling & schetsontwerp",
              "Basis ramingsniveau & globale planning",
              "Toets aan regels (indicatief)",
            ],
          },
          {
            name: "Realisatie Basis",
            description: "Uitvoering met degelijke afwerking en nieuwe installaties",
            badge: "Populair",
            highlighted: true,
            features: [
              "Technisch ontwerp & werkvoorbereiding",
              "Casco-aanpassingen + basis E/W-installaties",
              "Brandveiligheidsmaatregelen & bouwfysica",
              "Afwerking wanden/vloeren/plafonds",
              "Projectleiding & oplevering",
            ],
          },
          {
            name: "Realisatie Plus",
            description: "Hoogwaardige afwerking en verduurzaming",
            features: [
              "Energieconcept (warmtepomp/PV) waar passend",
              "Akoestische & comfortverbeteringen",
              "Maatwerk interieuronderdelen",
              "Uitgebreide nazorg & documentatie",
            ],
          },
        ]}
      />

      <SubdienstCasesSection
        eyebrow="Gerealiseerde projecten"
        title="Herbestemmingen in actie"
        cases={allProjects}
        limit={3}
      />

      <SubdienstFinalCTA
        title="Klaar om uw pand te herbestemmen?"
        subtitle="Plan een gratis adviesgesprek. We toetsen haalbaarheid, planning en budget — u krijgt binnen 24 uur reactie."
        trustSignals={["Gratis en vrijblijvend", "Binnen 24 uur reactie", "Projectleider als aanspreekpunt"]}
        ctaPrimary={{ label: "Plan adviesgesprek", href: "/contact" }}
        ctaSecondary={{ label: "Bel ons: 085 - 200 3300", href: "tel:0852003300" }}
      />
    </main>
  );
}
