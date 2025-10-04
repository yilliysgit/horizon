import HomeHeroAnimated from "./components/hero/HomeHeroAnimated";
import WhyChooseUs from "./components/sections/home/WhyChooseUs";
import BeautifulFeatureSection from "./components/sections/featured/Featured";
import CustomerLogoSlider from "./components/common/customerSlider/CustomerSlider";
import ReviewsCard from "./components/ui/Reviews";
import Footer from "./components/layout/footer/Footer";
import Pillars, { Pillar } from "@/app/components/pillarSection/Pillartwo";
import { ShieldCheck, Hammer, Users2, Clock3 } from "lucide-react";

import TOTAALBOUW_FAQ from "@/data/faqs/category/totaalBouw.faq";
import { FaqSection } from "@/app/components/faqs/Faqs";
import { HeroNew } from "./components/hero/HeroNew";
import HorizonServicesCardSlider from "./components/sections/home/HorizonServicesCardSlider";

const pillars: Pillar[] = [
  { icon: <ShieldCheck />, title: "Kwaliteit met garantie", description: "Ambacht + moderne techniek. Oplevering mét garantie.", href: "/kwaliteit", accent: "blue" },
  { icon: <Hammer />,      title: "25+ jaar ervaring",      description: "Verbouwingen tot complete nieuwbouw, vakkundig team.", href: "/over-ons", accent: "orange" },
  { icon: <Users2 />,       title: "Persoonlijke aanpak",    description: "Direct contact, korte lijnen, duidelijke afspraken.", href: "/werkwijze", accent: "blue" },
  { icon: <Clock3 />,       title: "Strakke planning",       description: "Heldere deadlines, vaste budgetten, oplevering zonder gedoe.", href: "/werkwijze#planning", accent: "orange" },
];

const testimonials = [
  {
    id: '1',
    name: 'Jan van der Berg',
    company: 'Atelier ND',
    testimonial: 'Highland Logistics zorgt altijd voor betrouwbaar en snel transport.',
    rating: 5
  },
  {
    id: '2',
    name: 'Maria Jansen',
    company: 'Studio 105',
    testimonial: 'Fantastische service! Onze leveringen worden altijd op tijd geleverd.',
    rating: 5
  }
];


export default function Home() {
  return (
    <>
<HomeHeroAnimated
      eyebrow="Horizon Totaalbouw"
      title={
        <>
           Zoekt u een <span className="text-amber-400">betrouwbare aannemer</span> in Amsterdam?<br />
          
        </>
      }
      subtitle="Ja. Horizon Totaalbouw is uw aannemer in Amsterdam voor complete renovaties, op- en aanbouwen, keukens en badkamers. Plan gratis advies of bekijk projecten."
      ctaPrimary={{
        label: "Bekijk Onze Diensten",
        href: "/diensten"
      }}
      ctaSecondary={{
        label: "Onze Projecten", 
        href: "/projecten"
      }}
      stats={[
        { value: "25+", label: "jaar ervaring" },
        { value: "500+", label: "opgeleverde projecten" },
        { value: "9.8", label: "klantwaardering" },
        { value: "100%", label: "tevredenheid" },
      ]}
      variant="blue"
    />
<WhyChooseUs />

<HorizonServicesCardSlider />
<BeautifulFeatureSection />
<CustomerLogoSlider />
<ReviewsCard testimonials={testimonials}/>

<FaqSection
  id="faq-totaalbouw"
  title="Veelgestelde vragen over totaalbouw"
  intro="Transparant over planning, budget en kwaliteit."
  items={TOTAALBOUW_FAQ}
  includeJsonLd
/>

<Footer />
</>

  );
}

       


