'use client';

import React from 'react';
import AppIcon from '../../iconRenderer/IconRenderer';

const MainCategoriesSlider = () => {
  const categories = [
    {
      title: "Totaalrenovaties",
      description: "Complete transformatie van uw woning",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      services: ["Complete renovaties", "Op- en aanbouwen"],
      slug: "totaalrenovaties"
    },
    {
      title: "Ruwbouw",
      description: "Stevige basis voor elk project",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      services: ["Funderingen", "Dragende constructies", "Metselwerk", "Ruwbouw timmerwerk"],
      slug: "ruwbouw"
    },
    {
      title: "Afwerken",
      description: "Perfecte finishing touch",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      services: ["Afbouw timmerwerk", "Wanden & plafonds", "Keukens", "Badkamers", "Toiletten"],
      slug: "afwerken"
    },
    {
      title: "Installaties",
      description: "Modern & veilig wooncomfort",
      image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      services: ["Elektrotechniek", "Loodgieterswerk"],
      slug: "installaties"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Onze <span className="text-blue-600">Expertises</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Met meer dan 25 jaar ervaring realiseren wij bouwprojecten van A tot Z met{' '}
            <span className="text-blue-600 font-semibold">kwaliteit</span> en{' '}
            <span className="text-orange-500 font-semibold">vakmanschap</span>
          </p>
        </div>

        {/* Masonry-style Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Totaalrenovaties - Large vertical */}
          <div 
            className="lg:col-span-5 group cursor-pointer"
            onClick={() => console.log(`Navigate to /diensten/${categories[0].slug}`)}
          >
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src={categories[0].image}
                alt={categories[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">{categories[0].title}</h3>
                <p className="text-lg opacity-90 mb-6">{categories[0].description}</p>
                <div className="flex items-center gap-2 text-orange-300">
                  <span className="font-medium">Meer informatie</span>
                  <AppIcon name="ArrowRight" size={20} className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - 3 services stacked */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top row - Ruwbouw & Afwerken */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                className="group cursor-pointer"
                onClick={() => console.log(`Navigate to /diensten/${categories[1].slug}`)}
              >
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  <img 
                    src={categories[1].image}
                    alt={categories[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{categories[1].title}</h3>
                    <p className="opacity-90">{categories[1].description}</p>
                  </div>
                </div>
              </div>

              <div 
                className="group cursor-pointer"
                onClick={() => console.log(`Navigate to /diensten/${categories[2].slug}`)}
              >
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  <img 
                    src={categories[2].image}
                    alt={categories[2].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{categories[2].title}</h3>
                    <p className="opacity-90">{categories[2].description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom - Installaties wide */}
            <div 
              className="group cursor-pointer"
              onClick={() => console.log(`Navigate to /diensten/${categories[3].slug}`)}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                <img 
                  src={categories[3].image}
                  alt={categories[3].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-orange-600/60"></div>
                <div className="absolute inset-0 p-8 flex items-center">
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-3">{categories[3].title}</h3>
                    <p className="text-lg opacity-90">{categories[3].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-gray-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Alle diensten in één overzicht</h3>
            <p className="text-lg text-gray-600">Complete expertise voor elk type bouwproject</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={category.slug} className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg border-b-2 border-blue-600 pb-2 inline-block">
                  {category.title}
                </h4>
                <div className="space-y-2">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <AppIcon name="Certificate" size={20} className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">VCA Gecertificeerd</h4>
                <p className="text-gray-600 text-sm">Veilig werken op elk project</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <AppIcon name="Users" size={20} className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Erkend Aannemer</h4>
                <p className="text-gray-600 text-sm">Gekwalificeerd en betrouwbaar</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AppIcon name="Star" size={20} className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">4.8★ Beoordeling</h4>
                <p className="text-gray-600 text-sm">127+ tevreden klanten</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6">
            <span className="text-xl text-gray-600">Niet gevonden wat u zoekt?</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Neem contact op
              <AppIcon name="ArrowRight" size={18} className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategoriesSlider;