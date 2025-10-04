// File: src/types/pillarSection/PillarSection.ts

export type IconKey =
  | "ShieldCheck" | "Hammer" | "Users" | "Clock" | "House" | "Wrench"
  | "PaintBrush" | "HardHat" | "Calculator" | "Phone" | "Star" | "Trophy";

// Eventueel type voor Tailwind kleuren
export type BgColor = 
  | "bg-green-100" | "bg-blue-100" | "bg-orange-100" | "bg-yellow-100";

export type Pillar = {
  iconKey: IconKey;
  title: string;
  description: string;
  number: string;
  isOrange: boolean;
  microCopy?: string; // Optioneel maken met ?
};

export type Certification = {
  iconKey: IconKey;
  title: string;
  subtitle: string;
  bgColor: BgColor; // Type safe kleuren
};

export type PillarSection = {
  title: string;
  companyName: string;
  subtitle: string;
  showMicroCopy: boolean;
  pillars: Pillar[];
  certifications: Certification[];
};

export type PillarsData = {
  pillarsAtHome: PillarSection;
  pillarsAtDiensten: PillarSection;
  pillarsAtOverOns: PillarSection;
  pillarsAtContact: PillarSection;
};
