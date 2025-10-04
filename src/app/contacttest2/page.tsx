"use client";
import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const HomepageHero = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0B1C4F] via-[#0E2F92] to-[#0B1C4F] text-white py-24 overflow-hidden">
      {/* Decorative grid overlay */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.14]"
      >
        <defs>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Soft radial glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Links */}
          <div>
            {/* Eyebrow */}
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Horizon Totaalbouw
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Van <span className="text-orange-400">droom</span> naar 
              <br />
              werkelijkheid
            </h1>

            {/* Accent line */}
            <div className="h-1 w-24 bg-orange-400 rounded-full mb-6"></div>

            {/* Subtitle */}
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Wij realiseren bouwprojecten van A tot Z met <span className="text-orange-300 font-semibold">kwaliteit</span> en 
              <span className="text-orange-300 font-semibold"> vakmanschap</span> die uw verwachtingen overtreffen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="/diensten"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-4 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Bekijk Onze Diensten
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/projecten"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-4 rounded-2xl font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                Onze Projecten
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white/70">Direct contact</div>
                  <a href="tel:020-123-4567" className="text-white font-semibold hover:text-orange-300 transition-colors">
                    085 - 203 3300
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white/70">Email ons</div>
                  <a href="mailto:info@horizon-totaalbouw.nl" className="text-white font-semibold hover:text-orange-300 transition-colors">
                    info@horizon-totaalbouw.nl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Rechts */}
          <div className="relative">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-semibold">25+</div>
                </div>
                <div className="text-sm text-white/70 mt-1">jaar ervaring</div>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-semibold">500+</div>
                </div>
                <div className="text-sm text-white/70 mt-1">projecten</div>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-semibold">9.8</div>
                </div>
                <div className="text-sm text-white/70 mt-1">klantwaardering</div>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-semibold">100%</div>
                </div>
                <div className="text-sm text-white/70 mt-1">tevredenheid</div>
              </div>
            </div>

            {/* Live Project Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-medium">Live Project</span>
            </div>
            <p className="text-white/80 mt-2 text-lg">
              <span className="font-semibold">Bouw met vertrouwen</span>
              <br />
              Persoonlijke begeleiding en transparante communicatie bij elk project.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Square Pattern - rechtsboven */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] right-[5%] -z-10 w-[40vw] max-w-[600px] h-[40vh] max-h-[400px]"
      >
        {/* Background squares pattern */}
        <div className="relative w-full h-full opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          
          {/* Animated floating squares */}
          {[...Array(12)].map((_, idx) => {
            const size = 8 + (idx % 3) * 4; // Verschillende groottes: 8, 12, 16px
            const delay = idx * 0.5;
            const duration = 8 + (idx % 3) * 2; // Verschillende snelheden
            const startX = (idx % 4) * 25; // Verdeling over breedte
            const startY = (Math.floor(idx / 4) % 3) * 33; // Verdeling over hoogte
            
            return (
              <div
                key={idx}
                className="absolute animate-pulse"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              >
                <div 
                  className="w-full h-full bg-orange-400/60 rounded-sm shadow-[0_0_20px_rgba(251,146,60,0.4)] transform rotate-45 hover:rotate-90 transition-transform duration-1000"
                  style={{
                    animation: `float ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS voor square animatie */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(45deg) scale(1); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg) scale(1.1); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) rotate(135deg) scale(0.9); 
            opacity: 1;
          }
          75% { 
            transform: translateY(-15px) rotate(180deg) scale(1.05); 
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
};

export default HomepageHero;