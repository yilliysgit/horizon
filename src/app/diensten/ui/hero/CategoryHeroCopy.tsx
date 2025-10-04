"use client";

import { useState } from "react";
import { Clock, Shield } from "lucide-react";

interface HeroData {
  rating: { stars: number; score: string; text: string };
  title: { main: string; subtitle: string };
  description: string;
  features: { id: string; icon: React.ReactNode; title: string; description: string }[];
  stats: { label: string; value: string }[];
}
interface BookingFormData { pickupLocation: string; destination: string; date: string; time: string }
interface HeroProps { data?: HeroData; onBooking?: (formData: BookingFormData) => void }

const defaultHeroData: HeroData = {
  rating: { stars: 5, score: "9.3", text: "Hoogste waardering" },
  title: { main: "Luxe taxi in Amsterdam —", subtitle: "Altijd op tijd. Altijd in stijl." },
  description:
    "Premium vervoer op maat. Van standaard comfort tot exclusieve luxe — altijd op tijd, altijd stijlvol.",
  features: [
    { id: "24-7-service", icon: <Clock className="h-6 w-6" />, title: "24/7 Service", description: "Altijd bereikbaar" },
    { id: "certified",   icon: <Shield className="h-6 w-6" />, title: "Gecertificeerd", description: "Ervaren chauffeurs" }
  ],
  stats: [
    { label: "SINDS", value: "2015" },
    { label: "RITTEN", value: "50.000+" },
    { label: "RESPONSE", value: "< 2 min" }
  ]
};

export default function HeroSection({ data = defaultHeroData, onBooking }: HeroProps) {
  const [formData, setFormData] = useState<BookingFormData>({ pickupLocation: "", destination: "", date: "", time: "" });

  const handleInputChange = (field: keyof BookingFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onBooking?.(formData); };

  return (
    /* Gebruik je global util class bg-gradient-mercedes-light.
       Als je die (nog) niet hebt, kun je ook style={{ background: 'var(--gradient-mercedes-light)' }} zetten. */
    <section className="relative overflow-hidden py-10 lg:py-16 bg-gradient-mercedes-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT – CONTENT */}
          <div className="lg:col-span-7">
            {/* Rating pill */}
            <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm">
              <div className="flex items-center mr-2">
                {[...Array(data.rating.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              {data.rating.score} • {data.rating.text}
            </div>

            {/* Title */}
            <h1 className="mt-5">
              <span className="block text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                {data.title.main}
              </span>
              <span className="block text-4xl lg:text-5xl font-light leading-tight mt-2 text-gray-600">
                {data.title.subtitle}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed mt-6 text-gray-600 max-w-xl">
              {data.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {data.features.map(f => (
                <div
                  key={f.id}
                  className="flex items-start gap-3 rounded-xl bg-white/75 backdrop-blur-md border border-gray-200/60 px-4 py-3 transition-all duration-300 hover:bg-white/90 hover:shadow-md"
                >
                  <div className="text-gray-700 mt-0.5">{f.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-gray-200">
              {data.stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/60 backdrop-blur-md border border-gray-200/60 px-4 py-3 text-center transition-all hover:bg-white/80"
                >
                  <div className="text-[11px] font-semibold tracking-wide text-gray-500">{s.label}</div>
                  <div className="text-xl font-semibold text-gray-900">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – MORPHEUS FORM */}
          <div className="lg:col-span-5">
            <div
              className="p-6 sm:p-7 rounded-2xl"
              style={{
                /* Morpheus/Neumorphic surface */
                background: "linear-gradient(145deg, #ffffff, #f6f8fb)",
                border: "1px solid rgba(226,232,240,0.8)", // gray-200-ish
                boxShadow:
                  "8px 8px 24px rgba(16,24,40,0.08), -6px -6px 20px rgba(255,255,255,0.75), inset 0 1px 0 rgba(255,255,255,0.6)"
              }}
            >
              {/* Form header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-full grid place-items-center"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #f2f5f9)",
                    border: "1px solid rgba(226,232,240,0.9)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)"
                  }}
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Plan uw rit</h2>
                  <p className="text-sm text-gray-600">Snel en professioneel</p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input utility: morpheus field */}
                {[
                  { label: "Ophaallocatie", ph: "Vul uw adres in", key: "pickupLocation" as const },
                  { label: "Bestemming",    ph: "Waar wilt u heen?", key: "destination" as const }
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      value={formData[f.key]}
                      onChange={handleInputChange(f.key)}
                      placeholder={f.ph}
                      className="w-full rounded-xl px-3 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      style={{
                        background: "linear-gradient(145deg, #ffffff, #f4f6fa)",
                        border: "1px solid rgba(226,232,240,0.9)",
                        boxShadow:
                          "inset 2px 2px 6px rgba(16,24,40,0.06), inset -2px -2px 6px rgba(255,255,255,0.9)"
                      }}
                      required
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Datum</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange("date")}
                      className="w-full rounded-xl px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      style={{
                        background: "linear-gradient(145deg, #ffffff, #f4f6fa)",
                        border: "1px solid rgba(226,232,240,0.9)",
                        boxShadow:
                          "inset 2px 2px 6px rgba(16,24,40,0.06), inset -2px -2px 6px rgba(255,255,255,0.9)"
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tijd</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange("time")}
                      className="w-full rounded-xl px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      style={{
                        background: "linear-gradient(145deg, #ffffff, #f4f6fa)",
                        border: "1px solid rgba(226,232,240,0.9)",
                        boxShadow:
                          "inset 2px 2px 6px rgba(16,24,40,0.06), inset -2px -2px 6px rgba(255,255,255,0.9)"
                      }}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl px-6 py-3.5 font-medium text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(90deg, var(--color-navy-700), var(--color-navy-800))",
                    boxShadow:
                      "0 10px 18px rgba(2,6,23,0.18), inset 0 1px 0 rgba(255,255,255,0.2)"
                  }}
                >
                  Bevestig booking →
                </button>
              </form>
            </div>

            {/* secondary actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href="tel:+3100000000"
                className="flex-1 rounded-xl px-5 py-3 text-center text-gray-800 bg-white/80 border border-gray-200 backdrop-blur-sm hover:bg-white transition-colors"
              >
                📞 Bel direct
              </a>
              <button
                className="flex-1 rounded-xl px-5 py-3 text-center text-white"
                style={{ background: "linear-gradient(90deg, var(--color-navy-700), var(--color-navy-800))" }}
              >
                Direct boeken →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
