// 📍 src/types/header/header.types.ts

export type Language = {
  code: 'nl' | 'en';
  name: string;
};

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

export interface NavLinkItemProps {
  item: NavItem;
  variant?: 'desktop' | 'mobile';
  onClick?: () => void;
}

export interface HeaderProps {
  logoSrc: string;
  nav: NavItem[];
  phone: string;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}