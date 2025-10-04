import React from "react";

// Type definitions
export type ExpertiseItem = {
  id: string;
  title: string;
  kicker?: string;
  blurb: string;
  description: string;
  ctaLabel: string;
  href?: string;
  accent: "blue" | "orange" | "violet";
  iconName: string;
  imageUrl?: string;
};

export type BouwExpertisesProps = {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  items?: ExpertiseItem[];
  className?: string;
};

// Mock icon component (replace with your actual icon renderer)
const AppIcon = ({ name, className, weight, size }: any) => (
  <div className={`${className} bg-current opacity-20 rounded`} style={{width: size, height: size}} />
);

const accentMap: Record<ExpertiseItem["accent"], { ring: string; text: string; bgSoft: string; bar: string }> = {
  blue: { ring: "ring-blue-500/30", text: "text-blue-700", bgSoft: "bg-blue-50", bar: "bg-blue-500" },
  orange: { ring: "ring-orange-500/30", text: "text-orange-700", bgSoft: "bg-orange-50", bar: "bg-orange-500" },
  violet: { ring: "ring-violet-500/30", text: "text-violet-700", bgSoft: "bg-violet-50", bar: "bg-violet-500" },
};

const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

// Simple Card Component
function ExpertiseCard({ item }: { item: ExpertiseItem }) {
  const a = accentMap[item.accent];

  return (
    <article className={cn(
      "group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg",
      a.ring
    )}>
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.imageUrl ?? "/api/placeholder/400/300"}
          alt={item.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", a.bgSoft)}>
            <AppIcon name={item.iconName} className="h-5 w-5" weight="duotone" size={20} />
          </span>
          <div>
            {item.kicker && (
              <div className="text-xs font-semibold uppercase text-gray-500">
                {item.kicker}
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900">
              {item.title}
            </h3>
          </div>
        </div>

        <p className={cn("text-sm font-semibold mb-2", a.text)}>{item.blurb}</p>
        <div className={cn("h-1 w-12 rounded mb-3", a.bar)} />
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>

        <a
          href={item.href ?? "#"}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-gray-50 text-gray-900 hover:bg-gray-100 transition"
        >
          {item.ctaLabel}
          <AppIcon name="ArrowRight" className="h-4 w-4" weight="regular" size={16} />
        </a>
      </div>
    </article>
  );
}

// Main Component
export default function BouwExpertises({
  heading,
  subheading,
  items = defaultBouwExpertises,
  className,
}: BouwExpertisesProps) {
  return (
    <section className={cn("py-16 bg-gray-50", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {heading ?? (
              <>
                Onze <span className="text-blue-600">Expertises</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {subheading ?? (
              <>
                Met meer dan 25 jaar ervaring realiseren wij bouwprojecten van A tot Z met{" "}
                <span className="font-semibold text-blue-700">kwaliteit</span> en{" "}
                <span className="font-semibold text-orange-700">vakmanschap</span>.
              </>
            )}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ExpertiseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Data
export const defaultBouwExpertises: ExpertiseItem[] = [
  {
    id: "totaal",
    title: "Totaalrenovaties",
    kicker: "Van A tot Z",
    blurb: "Complete transformatie van uw woning",
    description: "We nemen het volledige traject uit handen: ontwerp, coördinatie en uitvoering. Eén aanspreekpunt, nul gedoe.",
    ctaLabel: "Meer info",
    href: "#totaalrenovaties",
    accent: "blue",
    iconName: "Buildings",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "ruwbouw",
    title: "Ruwbouw",
    kicker: "Stevige basis",
    blurb: "Kernstructuur en casco van elk project",
    description: "Van fundering tot dragende muren en vloeren. Degelijk, strak gepland en volgens normering.",
    ctaLabel: "Meer info",
    href: "#ruwbouw",
    accent: "orange",
    iconName: "Hammer",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "afwerken",
    title: "Afwerken",
    kicker: "Finishing touch",
    blurb: "Perfecte afwerking binnen & buiten",
    description: "Schilder-, vloer- en schrijnwerk op maat. Wij zorgen voor een naadloze, duurzame afwerking.",
    ctaLabel: "Meer info",
    href: "#afwerken",
    accent: "violet",
    iconName: "PaintBrush",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "installaties",
    title: "Installaties",
    kicker: "Comfort & veiligheid",
    blurb: "Moderne technieken vakkundig geplaatst",
    description: "Elektriciteit, sanitair, HVAC en domotica — volgens norm, energiezuinig en netjes afgewerkt.",
    ctaLabel: "Meer info",
    href: "#installaties",
    accent: "orange",
    iconName: "Toolbox",
    imageUrl: "/api/placeholder/400/300",
  },
];
