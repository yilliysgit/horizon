"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CustomerLogo = {
  id: string;
  name: string;
  logo: string;
  website?: string;
};

const customerLogos: CustomerLogo[] = [
  { id: "1", name: "Atelier ND", logo: "/customerLogos/Atelier ND.svg", website: "https://ateliernd.com" },
  { id: "2", name: "Keuken Sale", logo: "/customerLogos/keukensale.com.svg", website: "https://keukensale.com" },
  { id: "3", name: "Studio 105", logo: "/customerLogos/Studio 105.svg", website: "https://studio105.nl" },
  { id: "4", name: "Verisure", logo: "/customerLogos/Verisure.svg", website: "https://verisure.nl" },
  { id: "5", name: "Villa Arena", logo: "/customerLogos/Villa Arena.svg", website: "https://villa-arena.nl" },
  { id: "6", name: "WeAreLabels", logo: "/customerLogos/wearelabels.svg", website: "https://wearelabels.nl" },
  { id: "7", name: "X2O Badkamers", logo: "/customerLogos/x2o-badkamers.svg", website: "https://x2o.nl" },
];

export default function CustomerLogoSlider() {
  const [currentLogoSlide, setCurrentLogoSlide] = useState(0);

  const maxSlide = Math.max(0, customerLogos.length - 4);

  const nextLogoSlide = () => setCurrentLogoSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevLogoSlide = () => setCurrentLogoSlide((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-highland-bg-primary via-highland-bg-secondary to-highland-bg-tertiary opacity-95" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-highland-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-highland-secondary/6 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-highland-secondary mb-4">
            Vertrouwd door{" "}
            <span className="text-gradient-highland bg-gradient-to-r from-highland-primary via-highland-primary-light to-highland-primary bg-clip-text text-transparent">
              topbedrijven
            </span>
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Ontdek waarom deze bedrijven kiezen voor Highland Logistics
          </p>
        </div>

        {/* Logo Slider */}
        <div className="bg-white/95 rounded-2xl p-4 lg:p-8 shadow-lg border border-white/20 relative overflow-hidden">
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-between">
            <button
              onClick={prevLogoSlide}
              aria-label="Vorige logos"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-highland-secondary/10 hover:bg-highland-secondary/20 transition-colors disabled:opacity-30"
              disabled={currentLogoSlide === 0}
            >
              <ChevronLeft className="w-6 h-6 text-highland-secondary" />
            </button>

            <div className="flex-1 overflow-hidden mx-4">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentLogoSlide * 25}%)` }}
              >
                {customerLogos.map((logo) => (
                  <div key={logo.id} className="flex-[0_0_25%] flex items-center justify-center px-4">
                    {logo.website ? (
                      <a
                        href={logo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Bezoek ${logo.name} website`}
                        className="w-full max-w-52 h-28 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-8 group hover:scale-105"
                      >
                        <Image
                          src={logo.logo}
                          alt={`${logo.name} logo`}
                          width={200}
                          height={80}
                          className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : (
                      <div className="w-full max-w-52 h-28 bg-white rounded-lg shadow-lg flex items-center justify-center p-8">
                        <Image
                          src={logo.logo}
                          alt={`${logo.name} logo`}
                          width={200}
                          height={80}
                          className="w-full h-full object-contain opacity-90"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextLogoSlide}
              aria-label="Volgende logos"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-highland-secondary/10 hover:bg-highland-secondary/20 transition-colors disabled:opacity-30"
              disabled={currentLogoSlide >= maxSlide}
            >
              <ChevronRight className="w-6 h-6 text-highland-secondary" />
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4 w-max">
                {customerLogos.map((logo) => (
                  <div key={logo.id} className="flex-shrink-0">
                    {logo.website ? (
                      <a
                        href={logo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Bezoek ${logo.name} website`}
                        className="block w-40 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center p-4"
                      >
                        <Image
                          src={logo.logo}
                          alt={`${logo.name} logo`}
                          width={160}
                          height={80}
                          className="w-full h-full object-contain opacity-95"
                        />
                      </a>
                    ) : (
                      <div className="w-40 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                        <Image
                          src={logo.logo}
                          alt={`${logo.name} logo`}
                          width={160}
                          height={80}
                          className="w-full h-full object-contain opacity-95"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">← Swipe om meer klanten te zien →</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
