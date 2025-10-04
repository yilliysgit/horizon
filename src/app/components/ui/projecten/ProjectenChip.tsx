// @/app/components/ui/projecten/ProjectChip.tsx

import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface ChipProps {
  children: ReactNode
  className?: string
}

export function ProjectChip({ children, className }: ChipProps) {
  return (
    <span className={clsx('chip', className)}>
      {children}
    </span>
  )
}