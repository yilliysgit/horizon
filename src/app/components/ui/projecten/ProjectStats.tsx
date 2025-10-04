// src/components/ui/projecten/ProjetenStats.tsx  

import { ProjectStat } from "./ProjectStat"

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

interface StatData {
  value: string
  label: string
  description?: string
}

interface StatsProps {
  stats: StatData[]
}

export function ProjectStats({ stats }: StatsProps) {
  return (
    <section 
      className="flex flex-wrap gap-4" 
      aria-label="Kerncijfers"
    >
      {stats.map((stat, index) => (
        <ProjectStat 
          key={index}
          value={stat.value}
          label={stat.label} 
          description={stat.description}
        />
      ))}
    </section>
  )
}