// File: src/data/pillarsData.ts

import { PillarsData } from "@/types/pillarSection/PillarSection.type";

const pillarsData: PillarsData = {
  // Home pagina pillars
  pillarsAtHome: {
    title: "Waarom kiezen voor",
    companyName: "Horizon Totaalbouw",
    subtitle:
      "Wij bouwen niet alleen huizen, wij bouwen vertrouwen. Met meer dan 25 jaar vakervaring, een hecht team en duidelijke afspraken zijn wij dé aannemer in {{REGIO}} waarop u kunt rekenen.",
    showMicroCopy: false,
    pillars: [
      {
        iconKey: "ShieldCheck",
        title: "Kwaliteit met garantie",
        description:
          "Wij combineren ambachtelijk vakwerk met moderne technieken. Elk project wordt opgeleverd met garantie, zodat u zeker weet dat het resultaat jarenlang meegaat.",
        number: "01",
        isOrange: false,
        microCopy: "→ Bekijk onze garantievoorwaarden",
      },
      {
        iconKey: "Hammer",
        title: "Ruim 25 jaar ervaring",
        description:
          "Van kleinschalige verbouwingen tot complete nieuwbouwprojecten: wij hebben de kennis, de ervaring én de partners om elk bouwplan succesvol te realiseren.",
        number: "02",
        isOrange: true,
        microCopy: "→ Bekijk onze projecten",
      },
      {
        iconKey: "Users",
        title: "Persoonlijke aanpak",
        description:
          "Bij ons bent u geen nummer. U heeft direct contact met onze mensen, zonder tussenlagen. Korte lijnen, duidelijke antwoorden en een betrokken team.",
        number: "03",
        isOrange: false,
        microCopy: "→ Neem direct contact op",
      },
      {
        iconKey: "Clock",
        title: "Strakke planning",
        description:
          "Wij staan bekend om onze betrouwbaarheid: heldere deadlines, vaste budgetten en oplevering zonder gedoe. Afspraak is bij ons ook echt afspraak.",
        number: "04",
        isOrange: true,
        microCopy: "→ Vraag een offerte aan",
      },
    ],
    certifications: [
      {
        iconKey: "ShieldCheck",
        title: "VCA gecertificeerd",
        subtitle: "Veilig werken op elk project",
        bgColor: "bg-green-100",
      },
      {
        iconKey: "Trophy",
        title: "Erkend aannemer",
        subtitle: "Gekeurd en vertrouwd",
        bgColor: "bg-blue-100",
      },
      {
        iconKey: "Star",
        title: "Beoordeeld met 4.8★",
        subtitle: "127+ tevreden klanten",
        bgColor: "bg-yellow-100",
      },
    ],
  },

  // Diensten pagina pillars
  pillarsAtDiensten: {
    title: "Onze",
    companyName: "Dienstverlening",
    subtitle:
      "Of het nu gaat om nieuwbouw, renovatie of onderhoud: wij begeleiden elk traject met een vast aanspreekpunt, een doordacht plan en zichtbare kwaliteit.",
    showMicroCopy: true,
    pillars: [
      {
        iconKey: "House",
        title: "Nieuwbouw",
        description:
          "Een woning of bedrijfspand volledig naar wens. Wij verzorgen alles: van fundering tot afwerking, energiezuinig en toekomstbestendig.",
        number: "01",
        isOrange: false,
        microCopy: "→ Bekijk onze nieuwbouwprojecten",
      },
      {
        iconKey: "Wrench",
        title: "Renovatie & verbouwing",
        description:
          "Uw woning vernieuwen of uitbreiden? Wij transformeren bestaande gebouwen tot moderne, comfortabele leefruimtes.",
        number: "02",
        isOrange: true,
        microCopy: "→ Ontdek renovatiemogelijkheden",
      },
      {
        iconKey: "PaintBrush",
        title: "Afbouw & afwerking",
        description:
          "Perfecte afwerking bepaalt het eindresultaat. Van stucwerk tot schilderwerk: wij leveren strakke details en een duurzaam eindproduct.",
        number: "03",
        isOrange: false,
        microCopy: "→ Bekijk afbouwprojecten",
      },
      {
        iconKey: "HardHat",
        title: "Onderhoud & reparatie",
        description:
          "Voorkom grotere problemen met tijdig onderhoud. Voor kleine en grote reparaties zijn wij snel inzetbaar.",
        number: "04",
        isOrange: true,
        microCopy: "→ Plan onderhoud in",
      },
    ],
    certifications: [
      {
        iconKey: "Calculator",
        title: "Gratis advies",
        subtitle: "Binnen 24 uur reactie",
        bgColor: "bg-blue-100",
      },
      {
        iconKey: "Trophy",
        title: "Heldere garantie",
        subtitle: "Zekerheid vooraf geregeld",
        bgColor: "bg-green-100",
      },
    ],
  },

  // Over ons pagina pillars
  pillarsAtOverOns: {
    title: "Waarom",
    companyName: "Horizon Totaalbouw",
    subtitle:
      "Wij zijn een hecht team vakmensen uit {{REGIO}}. Onze kracht zit in persoonlijk contact, heldere afspraken en het leveren van kwaliteit waar u trots op kunt zijn.",
    showMicroCopy: false,
    pillars: [
      {
        iconKey: "Users",
        title: "Lokaal team",
        description:
          "Onze mensen wonen en werken in de regio. Daardoor kennen we de markt, de regels en de leveranciers als geen ander.",
        number: "01",
        isOrange: false,
        microCopy: "→ Maak kennis met ons team",
      },
      {
        iconKey: "Trophy",
        title: "Vakmanschap",
        description:
          "Wij combineren traditionele bouwkunde met moderne technieken. Elk detail telt en dat ziet u terug in het eindresultaat.",
        number: "02",
        isOrange: true,
        microCopy: "→ Bekijk onze certificeringen",
      },
      {
        iconKey: "ShieldCheck",
        title: "Betrouwbaarheid",
        description:
          "Wij zeggen wat we doen en doen wat we zeggen. Transparant, eerlijk en zonder verrassingen.",
        number: "03",
        isOrange: false,
        microCopy: "→ Lees onze reviews",
      },
      {
        iconKey: "Star",
        title: "Klanttevredenheid",
        description:
          "Ons succes meten we aan tevreden klanten. Daarom zetten wij altijd die extra stap voor een resultaat waar u blij van wordt.",
        number: "04",
        isOrange: true,
        microCopy: "→ Onze referenties",
      },
    ],
    certifications: [
      {
        iconKey: "Phone",
        title: "Direct contact",
        subtitle: "Altijd bereikbaar",
        bgColor: "bg-orange-100",
      },
    ],
  },

  // Contact pagina pillars
  pillarsAtContact: {
    title: "Hoe wij",
    companyName: "u helpen",
    subtitle:
      "Een bouwproject begint met een goed gesprek. Wij luisteren, adviseren en vertalen uw wensen naar een concreet plan met een transparante offerte.",
    showMicroCopy: true,
    pillars: [
      {
        iconKey: "Phone",
        title: "Vrijblijvend adviesgesprek",
        description:
          "We nemen de tijd om uw plannen te bespreken en denken direct mee over haalbaarheid, planning en budget.",
        number: "01",
        isOrange: false,
        microCopy: "→ Plan een gesprek",
      },
      {
        iconKey: "Calculator",
        title: "Transparante offerte",
        description:
          "U ontvangt een offerte met duidelijke specificaties. Geen kleine lettertjes, wel heldere afspraken.",
        number: "02",
        isOrange: true,
        microCopy: "→ Vraag een offerte aan",
      },
      {
        iconKey: "HardHat",
        title: "Begeleiding van A tot Z",
        description:
          "Wij regelen het hele proces: van vergunning en uitvoering tot oplevering en nazorg.",
        number: "03",
        isOrange: false,
        microCopy: "→ Bekijk ons werkproces",
      },
      {
        iconKey: "ShieldCheck",
        title: "Nazorg & garantie",
        description:
          "Ook na oplevering blijft u op ons rekenen. Service en garantie zijn vanzelfsprekend.",
        number: "04",
        isOrange: true,
        microCopy: "→ Onze garanties",
      },
    ],
    certifications: [
      {
        iconKey: "Clock",
        title: "Binnen 24 uur reactie",
        subtitle: "Snel duidelijkheid",
        bgColor: "bg-blue-100",
      },
      {
        iconKey: "Star",
        title: "Tevredenheidsgarantie",
        subtitle: "Uw belang voorop",
        bgColor: "bg-yellow-100",
      },
    ],
  },
};

export default pillarsData;
