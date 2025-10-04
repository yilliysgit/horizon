// data/diensten/dakwerken/dakwerken.data.ts

import { ServiceCategory } from "@/types/services/services.type";

const dakwerkenData: ServiceCategory = {
  id: "dakwerken",
  title: "Dakwerken",
  description:
    "Van nieuwe daken tot renovatie, isolatie en onderhoud: wij leveren vakmanschap voor een duurzaam en waterdicht resultaat.",
  ctaHref: "/diensten/dakwerken",
  seo: {
    title: "Dakwerken | Nieuwe daken, renovaties en onderhoud",
    description:
      "Wij verzorgen dakwerken van A tot Z: nieuwe daken, renovaties, isolatie, dakramen, zinkwerk en regenafvoer. Betrouwbaar, duurzaam en vakkundig.",
    image: "/images/services/dakwerken/seo-cover.jpg",
  },
  items: [
    {
      label: "Nieuwe daken",
      slug: "nieuwe-daken",
      ctaHref: "/diensten/dakwerken/nieuwe-daken",
      excerpt: "Vakkundige plaatsing van nieuwe daken.",
      description:
        "Wij bouwen en plaatsen zowel hellende als platte daken met hoogwaardige materialen en oog voor detail. Een dak dat jarenlang meegaat en voldoet aan de nieuwste normen.",
      thumb: "/images/services/dakwerken/nieuwe-daken.jpg",
      seo: {
        title: "Nieuwe daken | Platte en hellende daken op maat",
        description:
          "Complete plaatsing van platte en hellende daken met kwaliteitsmaterialen en duurzame afwerking.",
        image: "/images/services/dakwerken/nieuwe-daken.jpg",
      },
    },
    {
      label: "Dakrenovaties",
      slug: "dakrenovaties",
      ctaHref: "/diensten/dakwerken/dakrenovaties",
      excerpt: "Geef je oude dak een tweede leven.",
      description:
        "Volledige of gedeeltelijke renovatie van bestaande daken. Wij herstellen, vernieuwen en isoleren zodat je dak weer tientallen jaren meegaat.",
      thumb: "/images/services/dakwerken/dakrenovaties.jpg",
    },
    {
      label: "Dakisolatie",
      slug: "dakisolatie",
      ctaHref: "/diensten/dakwerken/dakisolatie",
      excerpt: "Bespaar energie met een goed geïsoleerd dak.",
      description:
        "Dakisolatie is de snelste weg naar lagere energiekosten en meer wooncomfort. Wij isoleren daken efficiënt en volgens de laatste technieken.",
      thumb: "/images/services/dakwerken/dakisolatie.jpg",
    },
    {
      label: "Dakramen & lichtkoepels",
      slug: "dakramen-lichtkoepels",
      ctaHref: "/diensten/dakwerken/dakramen-lichtkoepels",
      excerpt: "Breng meer licht in je woning.",
      description:
        "Plaatsing van dakramen en lichtkoepels voor extra daglicht en ventilatie. Geschikt voor zolders, badkamers en elke donkere ruimte onder het dak.",
      thumb: "/images/services/dakwerken/dakramen-lichtkoepels.jpg",
    },
    {
      label: "Zink- en koperwerk",
      slug: "zink-koperwerk",
      ctaHref: "/diensten/dakwerken/zink-koperwerk",
      excerpt: "Ambachtelijk vakwerk in zink en koper.",
      description:
        "Wij verzorgen dakgoten, dakkapellen en afwerkingen in zink en koper. Duurzaam materiaal met een stijlvolle uitstraling.",
      thumb: "/images/services/dakwerken/zink-koperwerk.jpg",
    },
    {
      label: "Dakgoten & regenafvoer",
      slug: "dakgoten-regenafvoer",
      ctaHref: "/diensten/dakwerken/dakgoten-regenafvoer",
      excerpt: "Betrouwbare waterafvoer voor elk dak.",
      description:
        "Wij plaatsen, vervangen en onderhouden dakgoten en regenpijpen. Voor een efficiënte en duurzame afvoer van regenwater.",
      thumb: "/images/services/dakwerken/dakgoten-regenafvoer.jpg",
    },
  ],
};

export default dakwerkenData;