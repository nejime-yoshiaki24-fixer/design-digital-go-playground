'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const navigationMenuVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row gap-0',
      vertical: 'flex-col gap-0',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

const navigationMenuItemVariants = cva(
  'relative flex items-center gap-1 font-bold text-font-size-base transition-all duration-200 cursor-pointer',
  {
    variants: {
      state: {
        default: 'text-[#1A1A1A] shadow-[0px_0px_0px_transparent]',
        hover: 'text-[#000000] bg-[#F2F2F2] shadow-[0px_2px_0px_#000000]',
        selected: 'text-[#00118F] shadow-[0px_4px_0px_#0017C1]',
        'selected-hover': 'text-[#0017C1] bg-[#F2F2F2] shadow-[0px_4px_0px_#0017C1]',
        focus: 'text-[#333333] bg-[#FFD43D] border-4 border-black rounded-[2px]',
      },
      hasIcon: {
        true: 'gap-2',
        false: 'gap-0',
      },
      size: {
        default: 'px-5 h-16',
      },
    },
    defaultVariants: {
      state: 'default',
      hasIcon: false,
      size: 'default',
    },
  }
)

interface NavigationMenuItem {
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavigationMenuItem[]
  selected?: boolean
}

interface NavigationMenuProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationMenuVariants> {
  items: NavigationMenuItem[]
  activeItem?: string
  onItemClick?: (item: NavigationMenuItem) => void
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, items, orientation, activeItem, onItemClick, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)

    const handleItemClick = (item: NavigationMenuItem, index: number) => {
      if (item.children && item.children.length > 0) {
        setExpandedIndex(expandedIndex === index ? null : index)
      } else if (item.href) {
        onItemClick?.(item)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleItemClick(items[index], index)
      }
    }

    return (
      <nav ref={ref} className={cn(navigationMenuVariants({ orientation }), className)} {...props}>
        <ul
          className={cn(
            'm-0 list-none p-0',
            orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col'
          )}
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index
            const isExpanded = expandedIndex === index
            const isFocused = focusedIndex === index
            const isSelected = item.selected || item.label === activeItem
            const hasChildren = item.children && item.children.length > 0

            let state: 'default' | 'hover' | 'selected' | 'selected-hover' | 'focus' = 'default'
            if (isFocused) {
              state = 'focus'
            } else if (isSelected && isHovered) {
              state = 'selected-hover'
            } else if (isSelected) {
              state = 'selected'
            } else if (isHovered) {
              state = 'hover'
            }

            return (
              <li key={index} className="relative">
                {item.href && !hasChildren ? (
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuItemVariants({
                        state,
                        hasIcon: !!item.icon,
                        size: 'default',
                      })
                    )}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item.icon && (
                      <span className="h-6 w-6" style={{ width: '24px', height: '24px' }}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className={cn(
                      navigationMenuItemVariants({
                        state,
                        hasIcon: !!item.icon,
                        size: 'default',
                      }),
                      'w-full justify-start'
                    )}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    onClick={() => handleItemClick(item, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={hasChildren ? isExpanded : undefined}
                    aria-haspopup={hasChildren ? 'menu' : undefined}
                  >
                    {item.icon && (
                      <span className="h-6 w-6" style={{ width: '24px', height: '24px' }}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                    {hasChildren && (
                      <span className="ml-1 pt-1">
                        {isExpanded ? (
                          <ChevronUp
                            className="h-4 w-4"
                            style={{ width: '16px', height: '16px' }}
                          />
                        ) : (
                          <ChevronDown
                            className="h-4 w-4"
                            style={{ width: '16px', height: '16px' }}
                          />
                        )}
                      </span>
                    )}
                  </button>
                )}

                {/* サブメニュー */}
                {hasChildren && isExpanded && (
                  <ul className="border-border-divider absolute top-full left-0 z-50 mt-0 min-w-[200px] rounded-sm border bg-white shadow-lg">
                    {item.children!.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          href={child.href || '#'}
                          className="text-font-size-base text-text-body hover:bg-bg-secondary hover:text-primary block px-5 py-3 transition-colors"
                          onClick={() => {
                            setExpandedIndex(null)
                            onItemClick?.(child)
                          }}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
)

NavigationMenu.displayName = 'NavigationMenu'

export { NavigationMenu }
export type { NavigationMenuItem }
