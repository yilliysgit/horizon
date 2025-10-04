'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

export type CustomerTestimonial = {
  id: string;
  name: string;
  company: string;
  testimonial: string;
  rating: number;
};

type Props = {
  testimonials: CustomerTestimonial[];
};

export default function ReviewsCard({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % testimonials.length),
      5000
    );
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [auto, testimonials.length]);

  return (
    <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 shadow-lg">
            <Quote className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-highland-secondary">Wat onze klanten zeggen</h3>
          <p className="text-sm text-gray-700">Echte ervaringen van tevreden klanten</p>
        </div>
      </div>

      <div
        className="relative min-h-[200px]"
        onMouseEnter={() => setAuto(false)}
        onMouseLeave={() => setAuto(true)}
      >
        {testimonials.map((t, idx) => (
          <div
            key={t.id}
            className={`absolute inset-0 transition-all duration-500 ${
              idx === current
                ? 'translate-x-0 opacity-100'
                : idx < current
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
            }`}
          >
            <div className="mb-4 flex items-center space-x-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <blockquote className="mb-6 italic leading-relaxed text-gray-700">
              “{t.testimonial}”
            </blockquote>
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-highland-primary to-highland-secondary text-white shadow-lg">
                <span className="font-bold">{t.name.charAt(0)}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-highland-secondary">{t.name}</div>
                <div className="text-xs text-gray-600">{t.company}</div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === current ? 'bg-highland-primary' : 'bg-highland-primary/30 hover:bg-highland-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
