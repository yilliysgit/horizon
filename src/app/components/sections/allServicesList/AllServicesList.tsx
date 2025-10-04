import React from "react";

// Type definitions
export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  accent: "blue" | "orange" | "violet" | "green" | "red" | "purple";
  iconName: string;
  services: string[];
  imageUrl?: string;
};

export type ServicesOverviewProps = {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  categories?: ServiceCategory[];
  className?: string;
};

// Mock icon component (replace with your actual icon renderer)
const AppIcon = ({ name, className, weight, size }: any) => (
  <div className={`${className} bg-current opacity-20 rounded`} style={{width: size, height: size}} />
);

const accentMap: Record<ServiceCategory["accent"], { ring: string; text: string; bgSoft: string; bar: string; border: string }> = {
  blue: { ring: "ring-blue-500/30", text: "text-blue-700", bgSoft: "bg-blue-50", bar: "bg-blue-500", border: "border-blue-200" },
  orange: { ring: "ring-orange-500/30", text: "text-orange-700", bgSoft: "bg-orange-50", bar: "bg-orange-500", border: "border-orange-200" },
  violet: { ring: "ring-violet-500/30", text: "text-violet-700", bgSoft: "bg-violet-50", bar: "bg-violet-500", border: "border-violet-200" },
  green: { ring: "ring-green-500/30", text: "text-green-700", bgSoft: "bg-green-50", bar: "bg-green-500", border: "border-green-200" },
  red: { ring: "ring-red-500/30", text: "text-red-700", bgSoft: "bg-red-50", bar: "bg-red-500", border: "border-red-200" },
  purple: { ring: "ring-purple-500/30", text: "text-purple-700", bgSoft: "bg-purple-50", bar: "bg-purple-500", border: "border-purple-200" }
};

const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

// Service Category Card
function CategoryCard({ category }: { category: ServiceCategory }) {
  const a = accentMap[category.accent];

  return (
    <div className={cn(
      "rounded-2xl border bg-white p-6 shadow-md transition hover:shadow-lg",
      a.border
    )}>
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", a.bgSoft)}>
          <AppIcon name={category.iconName} className="h-6 w-6" weight="duotone" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      </div>

      {/* Services List */}
      <ul className="space-y-2">
        {category.services.map((service, index) => (
          <li key={index} className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
            <div className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0", a.bar)} />
            {service}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <a
          href={`#${category.id}`}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium transition-colors",
            a.text, "hover:underline"
          )}
        >
          Meer informatie
          <AppIcon name="ArrowRight" className="h-4 w-4" size={16} />
        </a>
      </div>
    </div>
  );
}

// Main Component
export default function ServicesOverview({
  heading,
  subheading,
  categories = defaultServiceCategories,
  className,
}: ServicesOverviewProps) {
  return (
    <section className={cn("py-16 bg-gray-50", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {heading ?? (
              <>
                Onze <span className="text-blue-600">Diensten</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {subheading ?? (
              <>
                Van totaalrenovaties tot specifieke vakdisciplines - wij bieden een compleet pakket 
                aan bouwdiensten voor particulieren en bedrijven.
              </>
            )}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Niet gevonden wat u zoekt?
            </h3>
            <p className="text-gray-600 mb-6">
              Neem vrijblijvend contact op voor een persoonlijk adviesgesprek
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact opnemen
              <AppIcon name="ArrowRight" className="h-4 w-4" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Data with all services
export const defaultServiceCategories: ServiceCategory[] = [
  {
    id: "totaalrenovaties",
    title: "Totaalrenovaties",
    description: "Volledige woningtransformatie van A tot Z",
    accent: "blue",
    iconName: "Buildings",
    services: [
      "Complete renovaties",
      "Op- en aanbouwen", 
      "Verbouwingen op maat",
      "Renovatieadvies & ontwerp",
      "Herbestemmingen (bv. zolder → slaapkamer)",
      "Projectcoördinatie"
    ]
  },
  {
    id: "ruwbouw",
    title: "Ruwbouw",
    description: "Stevige basis en dragende constructies",
    accent: "orange",
    iconName: "Hammer",
    services: [
      "Funderingen",
      "Dragende constructies",
      "Metselwerk", 
      "Ruwbouw timmerwerk",
      "Betonwerken",
      "Kelderbouw"
    ]
  },
  {
    id: "dakwerken", 
    title: "Dakwerken",
    description: "Nieuwe daken en renovaties",
    accent: "green",
    iconName: "House",
    services: [
      "Nieuwe daken",
      "Dakrenovaties",
      "Dakisolatie",
      "Dakramen & lichtkoepels", 
      "Zink- en koperwerk",
      "Dakgoten & regenafvoer"
    ]
  },
  {
    id: "afwerking",
    title: "Afwerking", 
    description: "Perfecte finishing van binnen en buiten",
    accent: "violet",
    iconName: "PaintBrush",
    services: [
      "Afbouw timmerwerk",
      "Wanden & plafonds",
      "Stuc- en pleisterwerk",
      "Vloeren & tegelwerk",
      "Schilder- en lakwerk", 
      "Binnen- & buitendeuren"
    ]
  },
  {
    id: "interieur",
    title: "Interieur",
    description: "Maatwerk interieuroplossingen",
    accent: "purple", 
    iconName: "Armchair",
    services: [
      "Keukens",
      "Badkamers", 
      "Toiletten",
      "Inbouwkasten & maatwerkmeubels",
      "Trappen & leuningen",
      "Interieurbekleding (bv. lambrisering)"
    ]
  },
  {
    id: "installaties",
    title: "Installaties",
    description: "Moderne technieken en duurzame energie", 
    accent: "red",
    iconName: "Toolbox",
    services: [
      "Elektrotechniek",
      "Loodgieterswerk",
      "Verwarming & ventilatie",
      "Airco & warmtepompen",
      "Domotica & smart home",
      "Zonnepanelen & duurzame energie"
    ]
  }
];