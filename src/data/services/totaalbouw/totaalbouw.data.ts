// data/diensten/totaalbouw/totaalbouw.data.ts

import { ServiceCategory } from "@/types/services/services.type";

const totaalbouwData: ServiceCategory = {
  id: "totaalbouw",
  title: "Totaalbouw",
  description:
    "Van casco tot sleutelklare oplevering: wij realiseren complete verbouwingen die technisch kloppen, esthetisch sterk zijn en volledig aansluiten bij jouw wensen.",
  ctaHref: "/diensten/totaalbouw",
  seo: {
    title: "Totaalbouw | Complete woningrenovaties en verbouwingen",
    description:
      "Wij verzorgen totaalbouwprojecten van A tot Z. Eén aanspreekpunt, strakke planning en vakmanschap in ruwbouw, afbouw en installaties.",
    image: "/images/services/totaalbouw/seo-cover.jpg",
  },
  items: [
    {
      label: "Complete renovaties",
      slug: "complete-renovaties",
      ctaHref: "/diensten/totaalbouw/complete-renovaties",
      excerpt: "Volledige renovaties van bestaande woningen en panden.",
      description:
        "Wij transformeren je woning of pand volledig, van ruwbouw tot afwerking. Eén aanspreekpunt en een perfect eindresultaat.",
      thumb: "/images/services/totaalbouw/complete-renovaties.jpg",
      seo: {
        title: "Complete renovaties | Van casco tot instapklaar",
        description:
          "Complete renovaties met oog voor detail, kwaliteit en duurzaamheid. Alles geregeld onder één dak.",
        image: "/images/services/totaalbouw/complete-renovaties.jpg",
      },
    },
    {
      label: "Op- en aanbouwen",
      slug: "op-en-aanbouwen",
      ctaHref: "/diensten/totaalbouw/op-en-aanbouwen",
      excerpt: "Creëer extra ruimte zonder te verhuizen.",
      description:
        "Wij realiseren opbouwen, uitbouwen en aanbouwen die naadloos aansluiten bij de stijl van je woning.",
      thumb: "/images/services/totaalbouw/op-en-aanbouwen.jpg",
    },
    {
      label: "Verbouwingen op maat",
      slug: "verbouwingen-op-maat",
      ctaHref: "/diensten/totaalbouw/verbouwingen-op-maat",
      excerpt: "Elke verbouwing afgestemd op jouw wensen.",
      description:
        "Van indelingswijzigingen tot volledige metamorfoses: wij maken een plan dat past bij jouw stijl en budget.",
      thumb: "/images/services/totaalbouw/verbouwingen-op-maat.jpg",
    },
    {
      label: "Renovatieadvies & ontwerp",
      slug: "renovatieadvies-ontwerp",
      ctaHref: "/diensten/totaalbouw/renovatieadvies-ontwerp",
      excerpt: "Een sterk plan is de basis voor succes.",
      description:
        "Wij adviseren en ontwerpen renovatieplannen met aandacht voor indeling, licht, materialen en duurzaamheid.",
      thumb: "/images/services/totaalbouw/renovatieadvies-ontwerp.jpg",
    },
    {
      label: "Herbestemmingen",
      slug: "herbestemmingen",
      ctaHref: "/diensten/totaalbouw/herbestemmingen",
      excerpt: "Geef ruimtes een compleet nieuwe functie.",
      description:
        "Van zolder tot slaapkamer of van loods naar loft: wij transformeren bestaande ruimtes slim en stijlvol.",
      thumb: "/images/services/totaalbouw/herbestemmingen.jpg",
    },
    {
      label: "Projectcoördinatie",
      slug: "projectcoordinatie",
      ctaHref: "/diensten/totaalbouw/projectcoordinatie",
      excerpt: "Geen stress, wel overzicht en duidelijkheid.",
      description:
        "Wij coördineren alle fases van jouw totaalbouwproject: planning, uitvoering en kwaliteitscontrole.",
      thumb: "/images/services/totaalbouw/projectcoordinatie.jpg",
    },
  ],
};

export default totaalbouwData;