"use client";
import React from 'react';
import pillarsData from '@/data/pillarData/Pillar.data';
import AppIcon from '../iconRenderer/IconRenderer';
import { IconKey } from '@/types/pillarSection/PillarSection.type';

// Icon color mapping for certifications
const certIconColors: Record<IconKey, string> = {
  ShieldCheck: "text-green-600",
  Hammer: "text-blue-600", 
  Users: "text-blue-600",
  Clock: "text-blue-600",
  House: "text-blue-600",
  Wrench: "text-blue-600",
  PaintBrush: "text-blue-600", 
  HardHat: "text-blue-600",
  Calculator: "text-blue-600",
  Phone: "text-orange-600",
  Star: "text-yellow-600",
  Trophy: "text-green-600"
};

interface PillarsSectionProps {
  pageType: keyof typeof pillarsData;
  className?: string;
  regio?: string; // Voor {{REGIO}} placeholder
}

const PillarsSection: React.FC<PillarsSectionProps> = ({ 
  pageType, 
  className = "",
  regio = "de regio" // Default waarde
}) => {
  const data = pillarsData[pageType];

  if (!data) {
    console.warn(`Pillars data niet gevonden voor pageType: ${pageType}`);
    return null;
  }

  const {
    title,
    companyName,
    subtitle,
    pillars,
    certifications,
    showMicroCopy = false
  } = data;

  // Replace {{REGIO}} placeholder
  const processedSubtitle = subtitle.replace(/\{\{REGIO\}\}/g, regio);

  return (
    <section className={`py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden ${className}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-orange-400 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}{' '}
            <span className="text-blue-600 relative">
              {companyName}
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C20 3 40 1 60 2C80 3 100 5 120 4C140 3 160 1 180 2C185 2 190 3 198 4" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {processedSubtitle}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Number Badge */}
              <div className={`absolute -top-4 -right-4 w-12 h-12 ${pillar.isOrange ? 'bg-orange-500 group-hover:bg-orange-600' : 'bg-blue-600 group-hover:bg-blue-700'} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-colors`}>
                {pillar.number}
              </div>

              {/* Icon */}
              <div className={`${pillar.isOrange ? 'text-orange-500 group-hover:text-orange-600' : 'text-blue-600 group-hover:text-blue-700'} mb-6 transition-colors`}>
                <AppIcon 
                  name={pillar.iconKey} 
                  className="w-12 h-12" 
                  weight="duotone" 
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
                
                {/* Micro Copy */}
                {showMicroCopy && pillar.microCopy && (
                  <div className={`text-sm font-semibold ${pillar.isOrange ? 'text-orange-600' : 'text-blue-600'} mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    {pillar.microCopy}
                  </div>
                )}
              </div>

              {/* Decorative line */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 ${pillar.isOrange ? 'bg-orange-500' : 'bg-blue-600'} group-hover:w-full transition-all duration-500 rounded-b-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {certifications && certifications.length > 0 && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-6 shadow-lg">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${cert.bgColor} rounded-full flex items-center justify-center`}>
                    <AppIcon 
                      name={cert.iconKey}
                      className={`w-6 h-6 ${certIconColors[cert.iconKey]}`}
                      weight="duotone"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{cert.title}</div>
                    <div className="text-sm text-gray-600">{cert.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PillarsSection;

// Gebruik voorbeelden:
/*
// Home pagina
<PillarsSection pageType="pillarsAtHome" regio="Amsterdam" />

// Diensten pagina
<PillarsSection pageType="pillarsAtDiensten" />

// Over Ons pagina  
<PillarsSection pageType="pillarsAtOverOns" regio="Noord-Holland" />

// Contact pagina
<PillarsSection pageType="pillarsAtContact" />
*/