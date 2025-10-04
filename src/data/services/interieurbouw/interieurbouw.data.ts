// data/diensten/interieurbouw/interieurbouw.data.ts

import { ServiceCategory } from "@/types/services/services.type";

const interieurbouwData: ServiceCategory = {
  id: "interieurbouw", // moet exact overeenkomen met CategoryId type
  title: "Interieurbouw",
  description:
    "Maatwerk interieuroplossingen die jouw woning of kantoor een unieke uitstraling geven. Van keukens en badkamers tot meubels en trappen.",
  ctaHref: "/diensten/interieurbouw",
  seo: {
    title: "Interieurbouw | Maatwerk keukens, badkamers en meubels",
    description:
      "Unieke interieurbouw op maat: keukens, badkamers, kasten, trappen en maatwerkmeubels. Hoogwaardige afwerking en duurzaam vakmanschap.",
    image: "/images/services/interieurbouw/seo-cover.jpg",
  },
  items: [
    {
      label: "Keukens",
      slug: "keukens",
      ctaHref: "/diensten/interieurbouw/keukens",
      excerpt: "Keukens op maat, afgestemd op jouw stijl en ruimte.",
      description:
        "Wij ontwerpen en bouwen keukens die perfect aansluiten bij jouw wensen. Functioneel, stijlvol en tot in detail afgewerkt.",
      thumb: "/images/services/interieurbouw/keukens.jpg",
      seo: {
        title: "Keukens op maat | Functioneel en stijlvol design",
        description:
          "Volledig op maat gemaakte keukens met hoogwaardige materialen en slimme indeling.",
        image: "/images/services/interieurbouw/keukens.jpg",
      },
    },
    {
      label: "Badkamers",
      slug: "badkamers",
      ctaHref: "/diensten/interieurbouw/badkamers",
      excerpt: "Complete badkamers met maatwerk en luxe uitstraling.",
      description:
        "Van ontwerp tot realisatie: wij bouwen badkamers met oog voor comfort, indeling en duurzaamheid.",
      thumb: "/images/services/interieurbouw/badkamers.jpg",
    },
    {
      label: "Toiletten",
      slug: "toiletten",
      ctaHref: "/diensten/interieurbouw/toiletten",
      excerpt: "Slim en stijlvol ingerichte toiletruimtes.",
      description:
        "Wij realiseren moderne en onderhoudsvriendelijke toiletruimtes, van betegeling tot sanitair en afwerking.",
      thumb: "/images/services/interieurbouw/toiletten.jpg",
    },
    {
      label: "Inbouwkasten & maatwerkmeubels",
      slug: "inbouwkasten-maatwerkmeubels",
      ctaHref: "/diensten/interieurbouw/inbouwkasten-maatwerkmeubels",
      excerpt: "Efficiënt gebruik van ruimte met maatwerkmeubels.",
      description:
        "Inbouwkasten, dressoirs, wandmeubels en maatwerkoplossingen die naadloos in je interieur passen.",
      thumb: "/images/services/interieurbouw/inbouwkasten-maatwerkmeubels.jpg",
    },
    {
      label: "Trappen & leuningen",
      slug: "trappen-leuningen",
      ctaHref: "/diensten/interieurbouw/trappen-leuningen",
      excerpt: "Stijlvolle trappen en veilige leuningen.",
      description:
        "Wij ontwerpen en bouwen trappen op maat, inclusief balustrades en leuningen, in hout, staal of een combinatie.",
      thumb: "/images/services/interieurbouw/trappen-leuningen.jpg",
    },
    {
      label: "Interieurbekleding",
      slug: "interieurbekleding",
      ctaHref: "/diensten/interieurbouw/interieurbekleding",
      excerpt: "Extra sfeer en comfort met interieurafwerking.",
      description:
        "Denk aan wandbekleding, lambrisering of speciale panelen die je interieur een warme en unieke uitstraling geven.",
      thumb: "/images/services/interieurbouw/interieurbekleding.jpg",
    },
  ],
};

export default interieurbouwData;