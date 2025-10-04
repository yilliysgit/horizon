// src/components/ui/Card.tsx
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  id?: string  // ← Moet hier staan
}

export function ProjectCard({ children, className, id }: CardProps) {
  return (
    <div 
      id={id}  // ← En hier doorgegeven worden
      className={clsx('card section', className)}
    >
      {children}
    </div>
  )
}