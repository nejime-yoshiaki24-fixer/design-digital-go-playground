'use client'

import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const menuListVariants = cva('list-none m-0', {
  variants: {
    orientation: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row',
    },
    spacing: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
    type: {
      standard: 'p-0',
      boxed: 'py-6',
    },
    width: {
      regular: 'w-60',
      small: 'w-[220px]',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    spacing: 'none',
    type: 'standard',
    width: 'regular',
  },
})

const menuListItemVariants = cva('group relative', {
  variants: {
    variant: {
      default: '',
      bordered: 'border-b border-[#949494] last:border-b-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const menuListLinkVariants = cva('block transition-colors duration-200', {
  variants: {
    size: {
      sm: 'px-3 py-2 text-font-size-sm',
      md: 'px-4 py-3 text-font-size-base',
      lg: 'px-6 py-4 text-font-size-lg',
    },
    state: {
      default: 'text-text-body hover:text-primary hover:bg-bg-secondary',
      active: 'text-primary bg-bg-secondary',
      disabled: 'text-text-disabled cursor-not-allowed',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
})

interface MenuListItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  active?: boolean
  children?: MenuListItem[]
}

export interface MenuListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof menuListVariants> {
  items: MenuListItem[]
  variant?: 'default' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  onItemClick?: (item: MenuListItem) => void
}

const MenuList = React.forwardRef<HTMLUListElement, MenuListProps>(
  (
    {
      className,
      items,
      orientation,
      spacing,
      type,
      width,
      variant = 'default',
      size = 'md',
      onItemClick,
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set())

    const toggleExpanded = (index: number) => {
      const newExpanded = new Set(expandedItems)
      if (newExpanded.has(index)) {
        newExpanded.delete(index)
      } else {
        newExpanded.add(index)
      }
      setExpandedItems(newExpanded)
    }

    const handleItemClick = (item: MenuListItem, index: number) => {
      if (item.children && item.children.length > 0) {
        toggleExpanded(index)
      } else if (item.onClick) {
        item.onClick()
      }
      onItemClick?.(item)
    }

    const renderMenuItem = (item: MenuListItem, index: number, level: number = 0) => {
      const hasChildren = item.children && item.children.length > 0
      const isExpanded = expandedItems.has(index)
      const state = item.disabled ? 'disabled' : item.active ? 'active' : 'default'

      return (
        <li key={index} className={cn(menuListItemVariants({ variant }))}>
          {item.href && !hasChildren && !item.disabled ? (
            <Link
              href={item.href}
              className={cn(menuListLinkVariants({ size, state }), level > 0 && 'pl-8')}
              onClick={() => handleItemClick(item, index)}
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {item.icon && <span className="h-6 w-6">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
                {item.badge && <span>{item.badge}</span>}
              </span>
            </Link>
          ) : (
            <button
              className={cn(
                menuListLinkVariants({ size, state }),
                'w-full text-left',
                level > 0 && 'pl-8'
              )}
              onClick={() => handleItemClick(item, index)}
              disabled={item.disabled}
              aria-expanded={hasChildren ? isExpanded : undefined}
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {item.icon && <span className="h-6 w-6">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
                <span className="flex items-center gap-2">
                  {item.badge && <span>{item.badge}</span>}
                  {hasChildren && (
                    <span className="text-text-secondary">{isExpanded ? '−' : '+'}</span>
                  )}
                </span>
              </span>
            </button>
          )}

          {hasChildren && isExpanded && (
            <ul className="bg-bg-secondary m-0 list-none p-0">
              {item.children!.map((child, childIndex) =>
                renderMenuItem(child, index * 100 + childIndex, level + 1)
              )}
            </ul>
          )}
        </li>
      )
    }

    return (
      <ul
        ref={ref}
        className={cn(menuListVariants({ orientation, spacing, type, width }), className)}
        {...props}
      >
        {items.map((item, index) => renderMenuItem(item, index))}
      </ul>
    )
  }
)

MenuList.displayName = 'MenuList'

export { MenuList }
export type { MenuListItem }
