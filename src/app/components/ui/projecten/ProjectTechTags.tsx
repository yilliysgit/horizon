// src/components/case-study/TechTags.tsx

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

interface TechTagsProps {
  technologies: string[]
  title?: string
}

export function ProjectTechTags({ technologies, title = "Tech & Tags" }: TechTagsProps) {
  return (
    <div 
      className="p-8 rounded-3xl border relative overflow-hidden"
      style={{
        background: HORIZON_COLORS.white,
        border: `1px solid ${HORIZON_COLORS.gray200}`,
        boxShadow: "0 4px 12px rgba(51, 51, 51, 0.08)"
      }}
    >
      {/* Gouden accent */}
      <div 
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: HORIZON_COLORS.gold500 }}
      />

      <h2 
        className="text-xl font-bold mb-6"
        style={{ 
          color: HORIZON_COLORS.ink,
          fontFamily: "Kanit, sans-serif"
        }}
      >
        {title}
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gray50}, ${HORIZON_COLORS.gray100})`,
              color: HORIZON_COLORS.ink,
              border: `1px solid ${HORIZON_COLORS.gray200}`
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: HORIZON_COLORS.gold500 }}
            />
            {tech}
          </span>
        ))}
      </div>

      {/* Tech count badge */}
      <div 
        className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold"
        style={{
          background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
          color: HORIZON_COLORS.navy800
        }}
      >
        {technologies.length} {technologies.length === 1 ? 'technologie' : 'technologieën'}
      </div>
    </div>
  )
}