// @/app/components/ui/projectButton/ProjectButton.tsx


"use client";

import { clsx } from 'clsx'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: 'default' | 'outline'
}

export function ProjectButton({ 
  children, 
  onClick, 
  href, 
  className,
  variant = 'default' 
}: ButtonProps) {
  const baseClasses = 'btn' // Je CSS class uit globals.css
  
  if (href) {
    return (
      <a 
        href={href} 
        className={clsx(baseClasses, className)}
      >
        {children}
      </a>
    )
  }
  
  return (
    <button 
      onClick={onClick}
      className={clsx(baseClasses, className)}
    >
      {children}
    </button>
  )
}