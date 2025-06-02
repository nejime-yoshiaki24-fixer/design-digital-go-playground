'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const breadcrumbVariants = cva('flex items-center gap-2 text-font-size-sm', {
  variants: {
    separator: {
      default: 'gap-2',
      chevron: 'gap-2',
    },
  },
  defaultVariants: {
    separator: 'chevron',
  },
})

const breadcrumbItemVariants = cva(
  'transition-colors duration-200 inline-flex items-center gap-1',
  {
    variants: {
      state: {
        default: 'text-[#00118F] hover:text-[#0017C1] hover:underline',
        active: 'text-[#E25100] hover:underline',
        current: 'text-[#333333]',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
)

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
  isHome?: boolean
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[]
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="パンくずリスト"
        className={cn(breadcrumbVariants({ separator }), className)}
        {...props}
      >
        <ol className="flex list-none items-center gap-2">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <li aria-hidden="true">
                  <ChevronRight
                    className="h-3 w-3 text-[#1A1A1A]"
                    style={{ width: '12px', height: '12px' }}
                  />
                </li>
              )}
              <li>
                {item.current || !item.href ? (
                  <span
                    className={cn(breadcrumbItemVariants({ state: 'current' }))}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.isHome ? <Home className="h-4 w-4" aria-label="ホーム" /> : item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(breadcrumbItemVariants({ state: 'default' }))}
                  >
                    {item.isHome ? <Home className="h-4 w-4" aria-label="ホーム" /> : item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'

export { Breadcrumb }
