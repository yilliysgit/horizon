// src/components/ui/projecten/ProjectStat.tsx

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

interface StatProps {
  value: string    // "-78%", "+38%", "1.2s", "95"
  label: string    // "Time-to-Interactive", "Conversie", etc.
  description?: string
}

export function ProjectStat({ value, label, description }: StatProps) {
  return (
    <div 
      className="flex-1 p-6 rounded-2xl border text-center relative overflow-hidden"
      style={{
        background: HORIZON_COLORS.white,
        border: `1px solid ${HORIZON_COLORS.gray200}`,
        boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
      }}
    >
      {/* Gouden accent top */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: HORIZON_COLORS.gold500 }}
      />
      
      <h3 
        className="text-3xl font-black mb-2"
        style={{ 
          color: HORIZON_COLORS.navy600,
          fontFamily: "Kanit, sans-serif"
        }}
      >
        {value}
      </h3>
      
      <p 
        className="text-sm font-semibold m-0"
        style={{ color: HORIZON_COLORS.ink }}
      >
        {label}
      </p>
      
      {description && (
        <p 
          className="text-xs mt-2 leading-relaxed"
          style={{ color: HORIZON_COLORS.gray600 }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

// Container component voor flex layout
interface ProjectStatsProps {
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, index) => (
        <ProjectStat
          key={index}
          value={stat.value}
          label={stat.label}
          description={stat.description}
        />
      ))}
    </div>
  )
}