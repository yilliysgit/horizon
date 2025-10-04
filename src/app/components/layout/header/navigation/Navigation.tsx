import { ROUTES } from "@/lib/routes/routes";
import type { NavItem, NavigationProps } from "@/types/header/header.types";
import NavLinkItem from "./NavLinkItem";

export const navigation: NavItem[] = [
  { label: 'Over ons', href: ROUTES.OVER_ONS },
  { label: 'Diensten', href: ROUTES.DIENSTEN },
  { label: 'Projecten', href: ROUTES.PROJECTEN },
  { label: 'Werkwijze', href: ROUTES.WERKWIJZE },
  { label: 'Contact', href: ROUTES.CONTACT },
];

const Navigation = ({ 
  items, 
  className = '', 
  variant = 'desktop',
  onItemClick 
}: NavigationProps) => {
  return (
    <nav className={className}>
      {items.map((item) => (
        <NavLinkItem 
          key={item.href} 
          item={item} 
          variant={variant}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
};

export default Navigation;