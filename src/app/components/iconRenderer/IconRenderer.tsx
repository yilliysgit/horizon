import * as Icons from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import React from "react";

// Phosphor icon type: forwardRef component, niet "ComponentType"
type PhosphorIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

// Optioneel: aliassen voor namen die niet bestaan in Phosphor
const ICON_ALIASES: Record<string, string> = {
  Award: "Medal", // Phosphor heeft "Medal" of "Trophy", geen "Award"
  // voeg hier gerust meer aliassen toe
};

type Props = {
  name: string; // laat als string – handig voor data/CMS
  className?: string;
  weight?: IconProps["weight"];
  size?: number;
};

export default function AppIcon({
  name,
  className,
  weight = "duotone",
  size = 24,
}: Props) {
  // alias-resolving
  const resolved = ICON_ALIASES[name] ?? name;

  // Cast het hele Icons object naar een record met het juiste PhosphorIcon-type
  const IconMap = Icons as unknown as Record<string, PhosphorIcon>;
  const Icon = IconMap[resolved] ?? IconMap["Question"];

  return <Icon className={className} weight={weight} size={size} />;
}
