// data/diensten/afbouw/afbouw.data.ts

import { ServiceCategory } from "@/types/services/services.type";

const afbouwData: ServiceCategory = {
  id: "afbouw", // moet exact overeenkomen met CategoryId
  title: "Afbouw & Afwerking",
  description: "Perfecte finishing touch voor binnen en buiten.",
  ctaHref: "/diensten/afbouw",
  seo: {
    title: "Afbouw & Afwerking | Strakke afwerking van binnen- en buitenruimtes",
    description:
      "Van timmerwerk en stucwerk tot vloeren, plafonds en schilderwerk. Onze afbouwspecialisten zorgen voor de perfecte finishing touch.",
    image: "/images/services/afbouw/seo-cover.jpg",
  },
  items: [
    {
      label: "Afbouw timmerwerk",
      slug: "afbouw-timmerwerk",
      ctaHref: "/diensten/afbouw/afbouw-timmerwerk",
      excerpt: "Maatwerk timmerwerk voor de perfecte afwerking.",
      description:
        "Wij verzorgen al het afbouw timmerwerk zoals plinten, kozijnen en maatwerk betimmeringen. Tot in de kleinste details strak afgewerkt.",
      thumb: "/images/services/afbouw/afbouw-timmerwerk.jpg",
      seo: {
        title: "Afbouw timmerwerk | Plinten, kozijnen en maatwerk",
        description:
          "Van plinten en kozijnen tot maatwerk betimmeringen. Afbouw timmerwerk dat naadloos aansluit bij je interieur.",
        image: "/images/services/afbouw/afbouw-timmerwerk.jpg",
      },
    },
    {
      label: "Wanden & plafonds",
      slug: "wanden-plafonds",
      ctaHref: "/diensten/afbouw/wanden-plafonds",
      excerpt: "Strakke scheidingswanden en plafonds.",
      description:
        "Plaatsen van gipswanden, systeemwanden en verlaagde plafonds voor zowel renovatie als nieuwbouw.",
      thumb: "/images/services/afbouw/wanden-plafonds.jpg",
    },
    {
      label: "Stuc- en pleisterwerk",
      slug: "stuc-pleisterwerk",
      ctaHref: "/diensten/afbouw/stuc-pleisterwerk",
      excerpt: "Glad en strak stucwerk voor een moderne uitstraling.",
      description:
        "Vakkundig stuc- en pleisterwerk, van glad pleisterwerk tot sierpleisters. Perfecte basis voor schilderwerk of behang.",
      thumb: "/images/services/afbouw/stuc-pleisterwerk.jpg",
    },
    {
      label: "Vloeren & tegelwerk",
      slug: "vloeren-tegelwerk",
      ctaHref: "/diensten/afbouw/vloeren-tegelwerk",
      excerpt: "Duurzame vloeren en stijlvol tegelwerk.",
      description:
        "Wij leggen keramische tegels, natuursteen en houten vloeren met oog voor detail en kwaliteit.",
      thumb: "/images/services/afbouw/vloeren-tegelwerk.jpg",
    },
    {
      label: "Schilder- en lakwerk",
      slug: "schilder-lakwerk",
      ctaHref: "/diensten/afbouw/schilder-lakwerk",
      excerpt: "Professioneel schilderwerk voor binnen en buiten.",
      description:
        "Kleurenadvies en hoogwaardig schilder- en lakwerk, met duurzame verfsoorten en strakke afwerking.",
      thumb: "/images/services/afbouw/schilder-lakwerk.jpg",
    },
    {
      label: "Binnen- & buitendeuren",
      slug: "binnen-buitendeuren",
      ctaHref: "/diensten/afbouw/binnen-buitendeuren",
      excerpt: "Stijlvolle deuren die passen bij uw interieur.",
      description:
        "Plaatsing van binnendeuren, buitendeuren en kozijnen, inclusief afwerking en beslag.",
      thumb: "/images/services/afbouw/binnen-buitendeuren.jpg",
    },
  ],
};

export default afbouwData;