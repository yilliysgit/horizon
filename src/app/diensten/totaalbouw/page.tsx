// app/diensten/totaalrenovaties/page.tsx
import ConstructionHero from "../ui/hero/CategoryHero";
import BouwIntroSectie from "../ui/introblock/BouwIntroSectie";
import ServicesGrid from "../ui/servicegrid/ServiceGrid";
import USPGrid from "../ui/uspgrid/USPGrid";

import {
  CheckCircle,
  PencilRuler,
  CheckCircle2,
  Hammer,
  HardHat,
  Leaf,
  Clock,
  Handshake,
  Ruler,
  Building2,
  ClipboardCheck,
  Workflow,
} from "lucide-react";

interface AanpakProps {
  eyebrow: string;
  title: string;
  intro: string;
  steps: StapItem[];
  cta: { label: string; href: string };
  phone?: string;
}

import AanpakSectie from "../ui/stepstimeline/AanpakSectie";

import ServiceGrid from "../ui/servicegrid/ServiceGrid";

export default function TotaalrenovatiesPage() {
  return (
    <>
      {/* Hero */}
      <ConstructionHero
        breadcrumbs={
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm">
              <li><a href="/" className="hover:underline">Home</a><span className="px-1">/</span></li>
              <li><a href="/diensten" className="hover:underline">Diensten</a><span className="px-1">/</span></li>
              <li aria-current="page" className="opacity-70">Totaalrenovaties</li>
            </ol>
          </nav>
        }
        eyebrow="Horizon Totaalbouw"
        title="Totaalrenovaties"
        subtitle="Van plan tot oplevering. Eén aanspreekpunt, transparant budget en bewezen kwaliteit."
        ctaPrimary={{ label: "Gratis adviesgesprek", href: "/contact" }}
        ctaSecondary={{ label: "Bekijk projecten", href: "/projecten" }}
        microcopy="Reactie binnen 24u. Vrijblijvend."
        right={{
          type: "image", // Tip: oogt bouw-achtiger dan stats
          src: "https://images.unsplash.com/photo-1581092580495-871021f8f850?q=80&w=1200&auto=format&fit=crop",
          alt: "Totaalrenovatie in uitvoering",
        }}
        // variant="blue" grid  // (optioneel, afhankelijk van jouw ConstructionHero props)
      />

      {/* Intro-blok */}
      <BouwIntroSectie
        eyebrow="Totaalbouw van A tot Z"
        title="Uw verbouwing in één hand"
        paragraphs={[
          "Bij totaalbouwprojecten nemen wij het volledige traject uit handen. Van fundering tot dak en van ruwbouw tot afwerking hebt u één aannemer als aanspreekpunt.",
          "Wij combineren traditioneel vakmanschap met moderne technieken en duurzame materialen. Zo bouwen we woningen en bedrijfsruimtes die vandaag comfortabel zijn én klaar voor de toekomst.",
        ]}
        rightContent={
          <ul className="space-y-3">
            {["20+ jaar ervaring", "Strakke planning", "Duurzame materialen"].map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        }
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
            href: "/diensten/totaalrenovaties/complete-renovaties",
            icon: <Building2 className="w-5 h-5 text-blue-700" />,
            badge: "Populair",
          },
          {
            title: "Op- en aanbouwen",
            desc: "Extra ruimte creëren met een opbouw of aanbouw. Constructie, isolatie en afwerking geregeld.",
            href: "/diensten/totaalrenovaties/op-en-aanbouwen",
            icon: <Hammer className="w-5 h-5 text-blue-700" />,
          },
          {
            title: "Verbouwingen op maat",
            desc: "Keuken, badkamer of totaalaanpak. Altijd maatwerk, afgestemd op uw wensen en budget.",
            href: "/diensten/totaalrenovaties/verbouwingen-op-maat",
            icon: <Ruler className="w-5 h-5 text-blue-700" />,
          },
          {
            title: "Renovatieadvies & ontwerp",
            desc: "Haalbaarheid, kosteninschatting en ontwerpbegeleiding. Slimme keuzes vóórdat de bouw start.",
            href: "/diensten/totaalrenovaties/renovatieadvies-ontwerp",
            icon: <ClipboardCheck className="w-5 h-5 text-blue-700" />,
          },
          {
            title: "Herbestemmingen",
            desc: "Zolder naar slaapkamer, garage naar kantoor — functionele indeling met oog voor comfort.",
            href: "/diensten/totaalrenovaties/herbestemmingen",
          },
          {
            title: "Projectcoördinatie",
            desc: "Planning, inkoop en kwaliteitscontrole — wij sturen alle vakdisciplines aan.",
            href: "/diensten/totaalrenovaties/projectcoordinatie",
            icon: <Workflow className="w-5 h-5 text-blue-700" />,
          },
        ]}
        ctaLabel="Meer info"
        columns={3}
      />

      {/* USP’s */}
      <USPGrid
        eyebrow="Waarom kiezen voor ons"
        title="Uw voordelen bij Horizon Totaalbouw"
        intro="Met ons kiest u voor ervaring, betrouwbaarheid en een bouwpartner die meedenkt."
        items={[
          { icon: <HardHat className="w-8 h-8" />, title: "20+ jaar ervaring", desc: "Vakmanschap en kennis van traditionele én moderne bouwtechnieken." },
          { icon: <Leaf className="w-8 h-8" />, title: "Duurzame materialen", desc: "We bouwen met oog voor energie-efficiëntie en milieuvriendelijke keuzes." },
          { icon: <Clock className="w-8 h-8" />, title: "Strakke planning", desc: "Heldere afspraken en een efficiënte bouwplanning voorkomen verrassingen." },
          { icon: <Handshake className="w-8 h-8" />, title: "Eén aanspreekpunt", desc: "Altijd direct contact met uw projectleider, geen ruis of misverstanden." },
        ]}
        columns={4}
      />

      {/* Stappenplan */}
<AanpakSectie
  eyebrow="Onze aanpak"
  title="Zo verloopt uw totaalrenovatie"
  intro="Van eerste idee tot oplevering. Wij begeleiden u stap voor stap."
  steps={[/* ... */]}
  cta={{ label: "Plan een adviesgesprek", href: "/contact" }}
/>
    </>
  );
}
