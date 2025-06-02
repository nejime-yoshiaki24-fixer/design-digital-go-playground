'use client'

import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const utilityLinksVariants = cva('flex gap-4', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-start',
    },
    size: {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

const utilityLinkVariants = cva(
  'text-font-size-sm font-normal transition-colors duration-200 inline-flex items-center gap-1',
  {
    variants: {
      variant: {
        default: 'text-text-body hover:text-primary hover:underline',
        primary: 'text-primary hover:text-[#0017C1] hover:underline',
        muted: 'text-text-secondary hover:text-text-body hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface UtilityLink {
  label: string
  href: string
  icon?: React.ReactNode
  variant?: 'default' | 'primary' | 'muted'
  external?: boolean
}

interface UtilityLinksProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof utilityLinksVariants> {
  links: UtilityLink[]
}

const UtilityLinks = React.forwardRef<HTMLElement, UtilityLinksProps>(
  ({ className, links, orientation, size, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="ユーティリティリンク"
        className={cn(utilityLinksVariants({ orientation, size }), className)}
        {...props}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(utilityLinkVariants({ variant: link.variant }))}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
          >
            {link.icon && <span className="h-4 w-4">{link.icon}</span>}
            <span>{link.label}</span>
            {link.external && <span className="sr-only">（新しいウィンドウで開きます）</span>}
          </Link>
        ))}
      </nav>
    )
  }
)

UtilityLinks.displayName = 'UtilityLinks'

export { UtilityLinks }
export type { UtilityLink }
