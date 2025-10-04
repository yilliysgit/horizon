"use client";
import React from "react";

const HORIZON_COLORS = {
  navy800: "#00296b",
  navy700: "#003f88", 
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333"
};

type Stat = { value: string; label: string };
type CTA = { label: string; href: string };

export type ConstructionHeroProps = {
  breadcrumbs?: React.ReactNode;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  microcopy?: string;
  right?: 
    | { type: "stats"; items: Stat[] }
    | { type: "image"; src: string; alt?: string }
    | { type: "custom"; node: React.ReactNode };
  className?: string;
};

export default function ConstructionHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  microcopy,
  right,
  className,
}: ConstructionHeroProps) {
  return (
    <section
      className={[
        "relative overflow-hidden text-white",
        "pt-24 md:pt-32 pb-16 md:pb-20",
        className ?? "",
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, ${HORIZON_COLORS.navy800} 0%, ${HORIZON_COLORS.navy700} 25%, ${HORIZON_COLORS.navy600} 75%, ${HORIZON_COLORS.navy800} 100%)`
      }}
    >
      {/* Horizon-specifieke achtergrond textuur */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${HORIZON_COLORS.gold500} 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Decoratieve gouden elementen */}
      <div className="absolute top-8 right-8 w-32 h-32 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill={HORIZON_COLORS.gold500}>
          <path d="M20 80h60v-8H20v8zm0-16h60v-8H20v8zm0-16h60v-8H20v8zm0-16h60v-8H20v8zm-8-16h76v-8H12v8z"/>
          <circle cx="85" cy="15" r="3"/>
          <circle cx="85" cy="25" r="3"/>
          <circle cx="85" cy="35" r="3"/>
        </svg>
      </div>

      {/* Gouden gradient overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${HORIZON_COLORS.gold500} 0%, transparent 70%)`
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LINKS */}
          <div>
            {/* breadcrumbs */}
            {breadcrumbs && (
              <div 
                className="mb-4 text-sm font-medium"
                style={{ 
                  color: `${HORIZON_COLORS.white}CC`,
                  fontFamily: "Kanit, sans-serif"
                }}
              >
                {breadcrumbs}
              </div>
            )}

            {/* eyebrow - Horizon styling */}
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: HORIZON_COLORS.gold500 }}
                  />
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: HORIZON_COLORS.gold400 }}
                  />
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: `${HORIZON_COLORS.white}60` }}
                  />
                </div>
                <span 
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ 
                    color: HORIZON_COLORS.gold500,
                    fontFamily: "Kanit, sans-serif"
                  }}
                >
                  {eyebrow}
                </span>
              </div>
            )}

            {/* H1 - Horizon styling */}
            <h1 
              className="text-4xl font-black leading-[1.1] md:text-6xl lg:text-7xl"
              style={{ 
                color: HORIZON_COLORS.white,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              {title}
            </h1>

            {/* subtitle */}
            {subtitle && (
              <p 
                className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
                style={{ color: `${HORIZON_COLORS.white}E6` }}
              >
                {subtitle}
              </p>
            )}

            {/* CTA's - Horizon styling */}
            {(ctaPrimary || ctaSecondary) && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {ctaPrimary && (
                  <a
                    href={ctaPrimary.href}
                    className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                      color: HORIZON_COLORS.navy800,
                      fontFamily: "Kanit, sans-serif",
                      boxShadow: `0 8px 24px rgba(253, 197, 0, 0.4)`
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {ctaPrimary.label}
                  </a>
                )}
                {ctaSecondary && (
                  <a
                    href={ctaSecondary.href}
                    className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      border: `2px solid ${HORIZON_COLORS.white}40`,
                      color: HORIZON_COLORS.white,
                      fontFamily: "Kanit, sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${HORIZON_COLORS.white}10`;
                      e.currentTarget.style.borderColor = `${HORIZON_COLORS.gold500}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = `${HORIZON_COLORS.white}40`;
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {ctaSecondary.label}
                  </a>
                )}
              </div>
            )}

            {/* microcopy - met Horizon styling */}
            {microcopy && (
              <div className="mt-6 flex items-start gap-3">
                <div 
                  className="flex-shrink-0 mt-0.5 p-1 rounded-full"
                  style={{ backgroundColor: `${HORIZON_COLORS.gold500}20` }}
                >
                  <svg 
                    className="w-3 h-3" 
                    fill={HORIZON_COLORS.gold500} 
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <p 
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: `${HORIZON_COLORS.white}CC` }}
                >
                  {microcopy}
                </p>
              </div>
            )}
          </div>

          {/* RECHTS */}
          <div className="lg:justify-self-end">
            {right?.type === "stats" && (
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {right.items.map((s, index) => (
                  <div
                    key={s.label}
                    className="group relative rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${HORIZON_COLORS.white}15, ${HORIZON_COLORS.gray50}10)`,
                      border: `1px solid ${HORIZON_COLORS.white}20`,
                      boxShadow: `
                        0 4px 12px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `
                    }}
                  >
                    {/* Gouden accent per stat */}
                    <div className="absolute top-3 right-3">
                      {index === 0 && (
                        <svg className="w-4 h-4" fill={HORIZON_COLORS.gold500} viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-4 h-4" fill={HORIZON_COLORS.gold400} viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-4 h-4" fill={HORIZON_COLORS.gold500} viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className="w-4 h-4" fill={HORIZON_COLORS.gold400} viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      )}
                    </div>
                    <div 
                      className="text-3xl font-black mb-2"
                      style={{ 
                        color: HORIZON_COLORS.white,
                        fontFamily: "Kanit, sans-serif"
                      }}
                    >
                      {s.value}
                    </div>
                    <div 
                      className="text-sm font-medium uppercase tracking-wide"
                      style={{ color: `${HORIZON_COLORS.white}CC` }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {right?.type === "image" && (
              <div className="relative">
                <div 
                  className="aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
                  style={{
                    border: `2px solid ${HORIZON_COLORS.gold500}40`,
                    boxShadow: `
                      0 20px 40px rgba(0, 0, 0, 0.3),
                      0 8px 16px rgba(253, 197, 0, 0.1)
                    `
                  }}
                >
                  <img
                    src={right.src}
                    alt={right.alt ?? ""}
                    className="h-full w-full object-cover"
                  />
                  {/* Horizon gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${HORIZON_COLORS.navy800}20 100%)`
                    }}
                  />
                </div>
                
                {/* Decoratieve gouden elementen */}
                <div 
                  className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full blur-xl opacity-60"
                  style={{ backgroundColor: HORIZON_COLORS.gold500 }}
                />
                <div 
                  className="absolute -top-3 -left-3 w-12 h-12 rounded-full blur-lg opacity-40"
                  style={{ backgroundColor: HORIZON_COLORS.gold400 }}
                />
                
                {/* Gouden accent strip */}
                <div 
                  className="absolute top-4 left-0 w-1 h-16 rounded-r-full"
                  style={{ 
                    background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
                    boxShadow: `0 0 12px rgba(253, 197, 0, 0.6)`
                  }}
                />
              </div>
            )}

            {right?.type === "custom" && (
              <div className="max-w-lg">
                {right.node}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Voorbeeld implementatie voor een bouwbedrijf met Horizon styling
function ExampleUsage() {
  return (
    <ConstructionHero
      breadcrumbs={
        <nav className="flex items-center space-x-2">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span style={{ color: `${HORIZON_COLORS.white}60` }}>›</span>
          <a href="/projecten" className="hover:text-white transition-colors">Projecten</a>
          <span style={{ color: `${HORIZON_COLORS.white}60` }}>›</span>
          <span>Nieuwbouw</span>
        </nav>
      }
      eyebrow="Vakmanschap & Kwaliteit"
      title={
        <>
          Solide <span style={{ color: HORIZON_COLORS.gold500 }}>nieuwbouw</span><br/>
          voor generaties
        </>
      }
      subtitle="Wij bouwen duurzame woningen en bedrijfspanden met oog voor detail. Van traditionele bouwmethoden tot moderne technieken - altijd met respect voor mens en milieu."
      ctaPrimary={{ label: "Bekijk onze projecten", href: "/projecten" }}
      ctaSecondary={{ label: "Bel voor advies", href: "tel:+31123456789" }}
      microcopy="Ervaren vaklieden • Duurzame materialen • Lokaal bouwbedrijf sinds 1995 • Persoonlijk contact"
      right={{
        type: "image",
        src: "https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Moderne nieuwbouw woning in aanbouw met steigers"
      }}
    />
  );
}

// Alternatief met statistieken
function ExampleWithStats() {
  return (
    <ConstructionHero
      breadcrumbs={
        <nav className="flex items-center space-x-2">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span style={{ color: `${HORIZON_COLORS.white}60` }}>›</span>
          <span>Over ons</span>
        </nav>
      }
      eyebrow="Vertrouwd Bouwbedrijf"
      title={
        <>
          <span style={{ color: HORIZON_COLORS.gold500 }}>Ruim 25 jaar</span><br/>
          bouwen in de regio
        </>
      }
      subtitle="Van fundering tot dakkapel, van verbouwing tot nieuwbouw. Wij staan voor eerlijke prijzen, degelijk vakwerk en klantgerichte service."
      ctaPrimary={{ label: "Vraag offerte aan", href: "/offerte" }}
      ctaSecondary={{ label: "Bekijk referenties", href: "/referenties" }}
      microcopy="Altijd eerst vrijblijvend advies • Vaste contactpersoon • Geen verrassingen achteraf"
      right={{
        type: "stats",
        items: [
          { value: "400+", label: "Gerealiseerde projecten" },
          { value: "25+", label: "Jaar ervaring" },
          { value: "15", label: "Vaste vakmensen" },
          { value: "100%", label: "In eigen beheer" }
        ]
      }}
    />
  );
}