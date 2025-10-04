'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLinkItemProps } from '@/types/header/header.types';

export default function NavLinkItem({ 
  item, 
  variant = 'desktop',
  onClick 
}: NavLinkItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  // Desktop styling - Met !important om globale CSS te overschrijven
  const desktopClasses = `
    relative px-4 py-3 text-base font-semibold transition-all duration-300 rounded-lg
    hover:bg-gray-50/80 hover:shadow-sm
    active:scale-95 active:bg-gray-100/80
    focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2
    group overflow-hidden
    ${isActive 
      ? 'bg-gray-50/60 shadow-sm font-bold' 
      : ''
    }
  `;

  // Mobile styling  
  const mobileClasses = `
    block w-full px-4 py-4 text-left text-base font-semibold transition-all duration-300 rounded-xl
    hover:bg-gray-50 hover:pl-6
    active:bg-gray-100/80 active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-gray-500/30
    border-l-4 border-transparent hover:border-gray-800/50
    ${isActive 
      ? 'bg-gray-50 border-gray-800 font-bold shadow-sm' 
      : ''
    }
  `;

  // Inline styles om globale CSS te overschrijven
  const linkStyles = {
    color: isActive ? '#111827' : '#374151', // gray-900 : gray-700
    textDecoration: 'none'
  };

  const hoverStyles = {
    color: '#111827' // gray-900
  };

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={variant === 'desktop' ? desktopClasses : mobileClasses}
      style={linkStyles}
      onMouseEnter={(e) => {
        const target = e.target as HTMLAnchorElement;
        Object.assign(target.style, hoverStyles);
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLAnchorElement;
        Object.assign(target.style, linkStyles);
      }}
    >
      {/* Desktop version met elegante underline */}
      {variant === 'desktop' ? (
        <>
          <span className="relative z-10">{item.label}</span>
          
          {/* Animated underline effect */}
          <div className={`
            absolute bottom-1 left-4 right-4 h-0.5 rounded-full
            bg-gradient-to-r from-gray-700 to-gray-900
            transform origin-left transition-transform duration-300
            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
          `} />
          
          {/* Subtle glow effect on hover */}
          <div className={`
            absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 pointer-events-none
            bg-gradient-to-r from-gray-500/5 via-gray-400/10 to-gray-500/5
            ${isActive ? 'opacity-40' : ''}
          `} />
        </>
      ) : (
        /* Mobile version met arrow indicator */
        <div className="flex items-center justify-between">
          <span>{item.label}</span>
          
          {/* Arrow indicator voor actieve link */}
          {isActive && (
            <svg 
              className="w-5 h-5 text-gray-800 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          )}
        </div>
      )}
    </Link>
  );
}