import React from 'react';
import AppIcon from '../../iconRenderer/IconRenderer'; // jouw echte component


type WhyChooseIconBlockType = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

const WhyChooseIconBlockData: WhyChooseIconBlockType[] = [
  {
    id: 1,
    icon: "Clock",
    title: "Altijd volgens planning. Gegarandeerd.",
    description: "Uw project wordt op tijd opgeleverd. Geen vertragingen, geen excuses."
  },
  {
    id: 2,
    icon: "ShieldCheck",
    title: "VCA gecertificeerd. Veilig werken.",
    description: "Volledig verzekerd en gecertificeerd. Uw project in veilige handen."
  },
  {
    id: 3,
    icon: "Phone",
    title: "Direct bereikbaar. Persoonlijk contact.",
    description: "Geen callcenters. U spreekt direct met uw projectleider."
  },
  {
    id: 4,
    icon: "Award",
    title: "25+ jaar ervaring. Bewezen kwaliteit.",
    description: "Vakmanschap dat generaties meegaat. 250+ succesvolle projecten."
  }
];

const WhyChooseHorizon: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Horizon achtergrond */}
      <div className="absolute inset-0 bg-gray-900 opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-2xl" />
      <div className="absolute top-1/4 left-8 w-32 h-32 bg-blue-600/6 rounded-full blur-2xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Waarom kiezen voor Horizon Totaalbouw?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Betrouwbare bouwpartner met 25+ jaar ervaring in kwaliteit en vakmanschap
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {WhyChooseIconBlockData.map(({ id, icon, title, description }) => (
            <div 
              key={id} 
              className="bg-white/95 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <AppIcon 
                      name={icon} 
                      className="w-8 h-8 text-white" 
                      weight="duotone" 
                      size={32} 
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-white/90 text-lg mb-6">
            Klaar om uw droomproject te realiseren? Laat ons u helpen.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 space-x-2"
          >
            <span>Gratis offerte aanvragen</span>
            <AppIcon 
              name="ArrowRight" 
              className="w-5 h-5" 
              weight="regular" 
              size={20}
            />
          </a>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
    </section>
  );
};

export default WhyChooseHorizon;
