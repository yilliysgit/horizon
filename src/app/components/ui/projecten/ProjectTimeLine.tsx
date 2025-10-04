// src/components/case-study/Timeline.tsx

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

interface TimelineItem {
  date: string
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
  title?: string
}

export function ProjectTimeline({ items, title = "Proces" }: TimelineProps) {
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
      
      <div className="timeline relative pl-8">
        {/* Gouden verticale lijn */}
        <div 
          className="absolute left-3 top-1.5 bottom-1.5 w-0.5"
          style={{ backgroundColor: HORIZON_COLORS.gold500 }}
        />
        
        {items.map((item, index) => (
          <div 
            key={index} 
            className="relative mb-6 p-6 border rounded-2xl transition-all duration-300 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.white}, ${HORIZON_COLORS.gray50})`,
              border: `1px solid ${HORIZON_COLORS.gray200}`,
              borderLeft: `3px solid ${HORIZON_COLORS.gold500}`
            }}
          >
            {/* Gouden dot op timeline */}
            <div 
              className="absolute -left-6 top-6 w-3 h-3 rounded-full border-2"
              style={{ 
                backgroundColor: HORIZON_COLORS.gold500,
                border: `2px solid ${HORIZON_COLORS.white}`,
                boxShadow: `0 0 0 2px ${HORIZON_COLORS.gold500}`
              }}
            />
            
            <time 
              className="text-xs font-semibold uppercase tracking-wider mb-2 block"
              style={{ color: HORIZON_COLORS.navy600 }}
              dateTime={item.date}
            >
              {new Date(item.date).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
            </time>
            
            <h3 
              className="text-lg font-bold mt-1 mb-3"
              style={{ 
                color: HORIZON_COLORS.ink,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              {item.title}
            </h3>
            
            <p 
              className="text-sm leading-relaxed m-0"
              style={{ color: HORIZON_COLORS.gray600 }}
            >
              {item.description}
            </p>

            {/* Timeline item number */}
            <div 
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: `linear-gradient(90deg, ${HORIZON_COLORS.gold500}, ${HORIZON_COLORS.gold400})`,
                color: HORIZON_COLORS.navy800,
                fontFamily: "Kanit, sans-serif"
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}