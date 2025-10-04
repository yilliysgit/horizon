// data/diensten/installaties/installaties.data.ts

import { ServiceCategory } from "@/types/services/services.type";

const installatiesData: ServiceCategory = {
  id: "Installaties",
  title: "Installaties",
  description:
    "Moderne technieken, slimme systemen en duurzame oplossingen: wij verzorgen alle installaties in jouw woning of bedrijfspand.",
  ctaHref: "/diensten/installaties",
  seo: {
    title: "Installaties | Elektriciteit, verwarming en duurzame technieken",
    description:
      "Van elektriciteit en loodgieterij tot ventilatie, airco, zonnepanelen en domotica. Wij installeren en onderhouden alles voor een modern en efficiënt gebouw.",
    image: "/images/services/installaties/seo-cover.jpg",
  },
  items: [
    {
      label: "Elektrotechniek",
      slug: "elektrotechniek",
      ctaHref: "/diensten/installaties/elektrotechniek",
      excerpt: "Veilige en moderne elektrische installaties.",
      description:
        "Wij voorzien woningen en bedrijven van nieuwe elektrische installaties, groepenkasten en bekabeling. Altijd veilig en volgens de geldende normen.",
      thumb: "/images/services/installaties/elektrotechniek.jpg",
      seo: {
        title: "Elektrotechniek | Complete elektrische installaties",
        description:
          "Van meterkast tot stopcontact: elektrotechniek die veilig, betrouwbaar en toekomstbestendig is.",
        image: "/images/services/installaties/elektrotechniek.jpg",
      },
    },
    {
      label: "Loodgieterswerk",
      slug: "loodgieterswerk",
      ctaHref: "/diensten/installaties/loodgieterswerk",
      excerpt: "Water- en gasleidingen vakkundig aangelegd.",
      description:
        "Van nieuwe waterleidingen tot gasinstallaties en riolering: onze loodgieters zorgen voor betrouwbare en duurzame aansluitingen.",
      thumb: "/images/services/installaties/loodgieterswerk.jpg",
    },
    {
      label: "Verwarming & ventilatie",
      slug: "verwarming-ventilatie",
      ctaHref: "/diensten/installaties/verwarming-ventilatie",
      excerpt: "Altijd een aangenaam binnenklimaat.",
      description:
        "Plaatsing en onderhoud van cv-ketels, radiatoren, vloerverwarming en ventilatiesystemen. Efficiënt, energiezuinig en comfortabel.",
      thumb: "/images/services/installaties/verwarming-ventilatie.jpg",
    },
    {
      label: "Airco & warmtepompen",
      slug: "airco-warmtepompen",
      ctaHref: "/diensten/installaties/airco-warmtepompen",
      excerpt: "Koelen en verwarmen met duurzame technieken.",
      description:
        "Wij installeren airco's en warmtepompen die zorgen voor een constant en energiezuinig binnenklimaat, zowel in zomer als winter.",
      thumb: "/images/services/installaties/airco-warmtepompen.jpg",
    },
    {
      label: "Domotica & smart home",
      slug: "domotica-smart-home",
      ctaHref: "/diensten/installaties/domotica-smart-home",
      excerpt: "Slim wonen met geïntegreerde technologie.",
      description:
        "Van verlichting en zonwering tot beveiliging en klimaatregeling: wij integreren smart home oplossingen die jouw leven makkelijker maken.",
      thumb: "/images/services/installaties/domotica-smart-home.jpg",
    },
    {
      label: "Zonnepanelen & duurzame energie",
      slug: "zonnepanelen-duurzame-energie",
      ctaHref: "/diensten/installaties/zonnepanelen-duurzame-energie",
      excerpt: "Investeer in groene energie en lagere kosten.",
      description:
        "Wij installeren zonnepanelen, laadpalen en andere duurzame energieoplossingen. Bespaar direct en draag bij aan een beter milieu.",
      thumb: "/images/services/installaties/zonnepanelen-duurzame-energie.jpg",
    },
  ],
};

export default installatiesData;