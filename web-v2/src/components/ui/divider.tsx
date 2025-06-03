import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const dividerVariants = cva('w-full border-0', {
  variants: {
    color: {
      'gray-420': 'bg-[#767676]',
      'gray-536': 'bg-[#767676]',
      black: 'bg-[#1A1A1C]',
    },
    weight: {
      1: 'h-px',
      2: 'h-0.5',
      3: 'h-[3px]',
      4: 'h-1',
    },
    variant: {
      solid: '',
      dashed: 'bg-transparent border-t-current',
    },
  },
  compoundVariants: [
    // Dashed variants with different weights
    {
      variant: 'dashed',
      weight: 1,
      className: 'border-t h-0',
    },
    {
      variant: 'dashed',
      weight: 2,
      className: 'border-t-2 h-0',
    },
    {
      variant: 'dashed',
      weight: 3,
      className: 'border-t-[3px] h-0',
    },
    {
      variant: 'dashed',
      weight: 4,
      className: 'border-t-4 h-0',
    },
    // Dashed colors
    {
      variant: 'dashed',
      color: 'gray-420',
      className: 'border-[#767676]',
    },
    {
      variant: 'dashed',
      color: 'gray-536',
      className: 'border-[#767676]',
    },
    {
      variant: 'dashed',
      color: 'black',
      className: 'border-[#1A1A1C]',
    },
  ],
  defaultVariants: {
    color: 'gray-420',
    weight: 1,
    variant: 'solid',
  },
})

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, 'color'>,
    VariantProps<typeof dividerVariants> {
  orientation?: 'horizontal' | 'vertical'
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, color, weight, variant, orientation = 'horizontal', ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <hr
          ref={ref}
          className={cn(
            'h-full w-px border-0',
            variant === 'solid' && [
              color === 'gray-420' && 'bg-[#767676]',
              color === 'gray-536' && 'bg-[#767676]',
              color === 'black' && 'bg-[#1A1A1C]',
              weight === 1 && 'w-px',
              weight === 2 && 'w-0.5',
              weight === 3 && 'w-[3px]',
              weight === 4 && 'w-1',
            ],
            variant === 'dashed' && [
              'border-l-current bg-transparent',
              color === 'gray-420' && 'border-[#767676]',
              color === 'gray-536' && 'border-[#767676]',
              color === 'black' && 'border-[#1A1A1C]',
              weight === 1 && 'w-0 border-l',
              weight === 2 && 'w-0 border-l-2',
              weight === 3 && 'w-0 border-l-[3px]',
              weight === 4 && 'w-0 border-l-4',
            ],
            variant === 'dashed' && 'border-dashed',
            className
          )}
          {...props}
        />
      )
    }

    return (
      <hr
        ref={ref}
        className={cn(
          dividerVariants({ color, weight, variant }),
          variant === 'dashed' && 'border-dashed',
          className
        )}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'

export { Divider, dividerVariants }
