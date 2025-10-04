'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Users, Award, Heart } from 'lucide-react';

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  testimonial: string;
  rating: number;
  avatar?: string;       // initialen
  role?: string;
  gradient?: string;     // tailwind gradient classes, bv. 'from-blue-500 to-purple-600'
};

export type Stat = { icon: React.ComponentType<{ className?: string }>; value: string; label: string };

type Props = {
  testimonials?: Testimonial[];
  stats?: Stat[];
  autoPlayMs?: number;
  className?: string;
};

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Jan van der Berg', company: 'Atelier ND', testimonial: 'Betrouwbaar en snel. Communicatie is duidelijk en vriendelijk.', rating: 5, avatar: 'JB', role: 'CEO', gradient: 'from-blue-500 to-purple-600' },
  { id: '2', name: 'Maria Jansen', company: 'Studio 105', testimonial: 'Altijd op tijd, alles in perfecte staat. Professionele partner!', rating: 5, avatar: 'MJ', role: 'Operations', gradient: 'from-pink-500 to-rose-500' },
  { id: '3', name: 'Peter de Wit', company: 'MedSupply', testimonial: 'Flexibel en oplossingsgericht. Echt een aanrader.', rating: 5, avatar: 'PW', role: 'Logistics', gradient: 'from-green-500 to-teal-500' },
];

const FALLBACK_STATS: Stat[] = [
  { icon: Users, value: '500+', label: 'Tevreden klanten' },
  { icon: Award, value: '99.8%', label: 'Betrouwbaarheid' },
  { icon: Heart, value: '4.9/5', label: 'Gem. rating' },
];

export default function ReviewsCarousel({
  testimonials = FALLBACK_TESTIMONIALS,
  stats = FALLBACK_STATS,
  autoPlayMs = 4000,
  className = '',
}: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // autoplay
 useEffect(() => {
  if (!playing) return;

  timerRef.current = setInterval(
    () => setIndex((p) => (p + 1) % testimonials.length),
    autoPlayMs
  );

  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
}, [playing, autoPlayMs, testimonials.length]);


  const prev = () => {
    setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
    setPlaying(false);
  };
  const next = () => {
    setIndex((p) => (p + 1) % testimonials.length);
    setPlaying(false);
  };

  // 3 zichtbare kaarten (midden groter)
  const visible = Array.from({ length: 3 }).map((_, i) => testimonials[(index + i) % testimonials.length]);

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 ${className}`}>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header + stats */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-sm font-semibold text-gray-700">Klantbeoordelingen</span>
          </div>
          <h2 className="mb-6 text-5xl font-bold lg:text-6xl">
            <span className="text-gray-900">Wat klanten</span><br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">over ons zeggen</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Ontdek waarom bedrijven en particulieren vertrouwen op onze service
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="rounded-2xl border border-white/50 bg-white/90 p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="mb-2 text-3xl font-bold text-gray-900">{value}</div>
              <div className="font-medium text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* nav */}
        <button onClick={prev} aria-label="Vorige" className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-4 rounded-full border border-white/50 bg-white/90 p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button onClick={next} aria-label="Volgende" className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-4 rounded-full border border-white/50 bg-white/90 p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl backdrop-blur-sm">
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>

        {/* kaarten */}
        <div className="grid grid-cols-1 gap-8 px-8 lg:grid-cols-3">
          {visible.map((t, i) => (
            <div
              key={`${t.id}-${index}-${i}`}
              className={`group relative transition-all duration-700 ${i === 1 ? 'lg:z-10 lg:scale-110' : 'lg:scale-95 lg:opacity-75'}`}
              style={{ transform: `translateY(${i === 1 ? '-10px' : '0'})` }}
              onMouseEnter={() => setPlaying(false)}
              onMouseLeave={() => setPlaying(true)}
            >
              {i === 1 && (
                <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    ⭐ Featured Review
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/95 p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl backdrop-blur-lg">
                <div className="absolute right-6 top-6 opacity-20">
                  <Quote className="h-12 w-12 text-gray-400" />
                </div>

                <div className="mb-6 flex items-center">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="relative z-10 mb-8 text-lg leading-relaxed text-gray-700">“{t.testimonial}”</blockquote>

                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient ?? 'from-blue-500 to-purple-600'} text-lg font-bold text-white shadow-lg`}>
                    {t.avatar ?? t.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{t.name}</div>
                    {t.role && <div className="font-medium text-gray-600">{t.role}</div>}
                    <div className="text-sm text-gray-500">{t.company}</div>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.gradient ?? 'from-blue-500 to-purple-600'} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
              </div>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); setPlaying(false); }}
              aria-label={`Ga naar review ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === index ? 'h-3 w-12 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' : 'h-3 w-3 bg-white/60 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
