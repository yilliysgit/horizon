// src/app/components/layout/header/navigation/actions/PhoneAction.tsx
'use client';

import { Phone } from '@phosphor-icons/react';

const PhoneAction = () => {
  return (
    <div className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
      {/* Phone Icon - Ronde blauwe achtergrond met wit icon */}
      <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full shadow-sm">
        <Phone 
          size={20} 
          weight="regular" 
          className="text-white" 
        />
      </div>
      
      {/* Contact Text - Stacked */}
      <div className="flex flex-col">
        {/* Kleine tekst bovenaan */}
        <span className="text-xs text-gray-500 font-medium leading-tight">
          Direkt Contact —
        </span>
        {/* Grote telefoonnummer onderaan */}
        <a 
          href="tel:0852003300"
          className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 leading-tight"
        >
          085 - 200 3300
        </a>
      </div>
    </div>
  );
};

export default PhoneAction;