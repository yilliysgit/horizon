'use client';

import React from 'react';
import { Award } from 'lucide-react';

export type StatItem = {
  icon: React.ReactNode; // je gaf al JSX door in je data
  number: string;
  label: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
};

export default function StatsCard({
  title = 'Horizon Logistics in cijfers',
  subtitle = 'Bewezen resultaten en betrouwbaarheid',
  stats,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 shadow-lg">
            <Award className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-highland-secondary">{title}</h3>
          <p className="text-sm text-gray-700">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl bg-highland-primary/5 p-4 text-center transition-colors duration-300 hover:bg-highland-primary/10"
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 shadow-lg">
              {s.icon}
            </div>
            <div className="mb-1 text-xl font-bold text-highland-secondary">{s.number}</div>
            <div className="text-xs text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
