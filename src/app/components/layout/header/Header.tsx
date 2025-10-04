'use client';

import { useState } from "react";
import HorizonLogo from "@/assets/Logo";
import Navigation from "./navigation/Navigation";
import PhoneAction from "./actions/PhoneAction";
import CtaAction from "./actions/CtaAction";
import LanguageSwitcher from "./actions/LanguageSwitcher";
import { navigation } from "./navigation/Navigation";
import type { Language } from "@/types/header/header.types";

const languages: Language[] = [
  { code: 'nl', name: 'Nederlands' },
  { code: 'en', name: 'English' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-100 shadow-lg shadow-gray-200/20 sticky top-0 z-50 backdrop-blur-sm">
      {/* Top accent line */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
      
      {/* Much wider container */}
      <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between py-2 lg:py-3">
          
          {/* Logo Section - More space */}
          <div className="flex-shrink-0 group mr-8 lg:mr-12">
            <div className="transform transition-all duration-300 hover:scale-105">
              <HorizonLogo 
                className="w-52 lg:w-56 xl:w-60 h-auto drop-shadow-sm" 
                primaryColor="#0066cc"
                secondaryColor="#2d3748"
              />
            </div>
          </div>

          {/* Desktop Navigation - Met desktop variant */}
          <nav className="hidden lg:block flex-1">
            <Navigation 
              items={navigation} 
              className="flex items-center justify-center gap-1" 
              variant="desktop"
            />
          </nav>

          {/* Desktop Actions - Compact spacing */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Phone Action */}
            <PhoneAction />

            {/* CTA Button */}
            <CtaAction />

            {/* Language Switcher */}
            <LanguageSwitcher
              languages={languages}
              current="nl"
              onChange={(code) => console.log('Language changed to:', code)}
              className="flex-shrink-0"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel - Wider on larger mobile screens */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md sm:max-w-lg bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <HorizonLogo 
                  className="w-36 h-auto" 
                  primaryColor="#0066cc"
                  secondaryColor="#2d3748"
                />
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation - Met mobile variant */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                <Navigation 
                  items={navigation} 
                  className="flex flex-col space-y-1" 
                  variant="mobile"
                  onItemClick={() => setMobileOpen(false)}
                />
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="space-y-3">
                  <PhoneAction />
                  <CtaAction />
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <LanguageSwitcher
                    languages={languages}
                    current="nl"
                    onChange={(code) => {
                      console.log("Mobile language changed to:", code);
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}