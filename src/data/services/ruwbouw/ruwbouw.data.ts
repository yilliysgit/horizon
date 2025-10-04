// data/diensten/ruwbouw/ruwbouw.data.ts

import { ServiceCategory } from "@/types/services/services.type";

const ruwbouwData: ServiceCategory = {
  id: "ruwbouw",
  title: "Ruwbouw",
  description:
    "De stevige basis van ieder bouwproject: funderingen, dragende constructies en ruwbouwafwerking met vakmanschap en precisie.",
  ctaHref: "/diensten/ruwbouw",
  seo: {
    title: "Ruwbouw | Fundamenten, metselwerk en betonconstructies",
    description:
      "Wij verzorgen ruwbouwwerkzaamheden van fundering tot kelder en dragende muren. Betrouwbare basis voor elk project.",
    image: "/images/services/ruwbouw/seo-cover.jpg",
  },
  items: [
    {
      label: "Funderingen",
      slug: "funderingen",
      ctaHref: "/diensten/ruwbouw/funderingen",
      excerpt: "Een stabiel begin voor elk bouwproject.",
      description:
        "Wij leggen sterke en duurzame funderingen die zorgen voor een solide basis, afgestemd op de bodem en constructie van jouw gebouw.",
      thumb: "/images/services/ruwbouw/funderingen.jpg",
      seo: {
        title: "Funderingen | Betrouwbare basis voor je woning",
        description:
          "Professioneel uitgevoerde funderingen, aangepast aan bodem en draagkracht. Duurzaam en toekomstbestendig.",
        image: "/images/services/ruwbouw/funderingen.jpg",
      },
    },
    {
      label: "Dragende constructies",
      slug: "dragende-constructies",
      ctaHref: "/diensten/ruwbouw/dragende-constructies",
      excerpt: "Sterke draagstructuren voor woningen en gebouwen.",
      description:
        "Van muren tot kolommen en balken: wij realiseren dragende constructies die de ruggengraat vormen van jouw project.",
      thumb: "/images/services/ruwbouw/dragende-constructies.jpg",
    },
    {
      label: "Metselwerk",
      slug: "metselwerk",
      ctaHref: "/diensten/ruwbouw/metselwerk",
      excerpt: "Traditioneel en modern metselwerk op maat.",
      description:
        "Wij metselen gevels, scheidingsmuren en siermetselwerk met oog voor detail en duurzaamheid.",
      thumb: "/images/services/ruwbouw/metselwerk.jpg",
    },
    {
      label: "Ruwbouw timmerwerk",
      slug: "ruwbouw-timmerwerk",
      ctaHref: "/diensten/ruwbouw/ruwbouw-timmerwerk",
      excerpt: "Houtconstructies voor de basis van je woning.",
      description:
        "Wij verzorgen ruwbouw timmerwerk zoals vloeren, dakconstructies en tijdelijke ondersteuningen.",
      thumb: "/images/services/ruwbouw/ruwbouw-timmerwerk.jpg",
    },
    {
      label: "Betonwerken",
      slug: "betonwerken",
      ctaHref: "/diensten/ruwbouw/betonwerken",
      excerpt: "Sterk en duurzaam betonwerk.",
      description:
        "Wij voeren betonwerken uit zoals vloeren, funderingen, wanden en constructieve elementen, met de hoogste kwaliteit en precisie.",
      thumb: "/images/services/ruwbouw/betonwerken.jpg",
    },
    {
      label: "Kelderbouw",
      slug: "kelderbouw",
      ctaHref: "/diensten/ruwbouw/kelderbouw",
      excerpt: "Extra ruimte onder je woning.",
      description:
        "Wij realiseren waterdichte en veilige kelders die extra opslag- of woonruimte bieden. Van ontwerp tot oplevering volledig verzorgd.",
      thumb: "/images/services/ruwbouw/kelderbouw.jpg",
    },
  ],
};

export default ruwbouwData;