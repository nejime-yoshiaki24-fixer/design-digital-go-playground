import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva('relative h-1 w-full overflow-hidden rounded-sm bg-[#0017C1]', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-1',
      lg: 'h-2',
    },
    length: {
      short: 'w-20', // 80px
      medium: 'w-40', // 160px
      long: 'w-60', // 240px
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'md',
    length: 'full',
  },
})

const progressIndicatorVariants = cva(
  'h-full bg-[#0017C1] transition-all duration-300 ease-in-out rounded-sm',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-1',
        lg: 'h-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-[#0017C1] border-t-[#0017C1]',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  showValue?: boolean
  label?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, size, length, showValue = false, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div className="w-full space-y-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm text-[#1A1A1C]">
            {label && <span className="font-medium">{label}</span>}
            {showValue && <span>{Math.round(percentage)}%</span>}
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ size, length }), className)}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
          aria-label={label}
          {...props}
        >
          <div
            className={cn(progressIndicatorVariants({ size }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label, ...props }, ref) => {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          ref={ref}
          className={cn(spinnerVariants({ size }), className)}
          role="status"
          aria-label={label || '読み込み中'}
          {...props}
        />
        {label && <span className="text-sm font-medium text-[#1A1A1C]">{label}</span>}
      </div>
    )
  }
)
Spinner.displayName = 'Spinner'

export interface ProgressIndicatorProps {
  variant?: 'linear' | 'spinner'
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  length?: 'short' | 'medium' | 'long' | 'full'
  showValue?: boolean
  label?: string
  className?: string
}

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  (
    {
      variant = 'linear',
      value,
      max = 100,
      size = 'md',
      length = 'full',
      showValue = false,
      label,
      className,
      ...props
    },
    ref
  ) => {
    if (variant === 'spinner') {
      return (
        <Spinner
          ref={ref}
          size={size as 'sm' | 'md' | 'lg' | 'xl'}
          label={label}
          className={className}
          {...props}
        />
      )
    }

    return (
      <Progress
        ref={ref}
        value={value}
        max={max}
        size={size as 'sm' | 'md' | 'lg'}
        length={length}
        showValue={showValue}
        label={label}
        className={className}
        {...props}
      />
    )
  }
)
ProgressIndicator.displayName = 'ProgressIndicator'

export {
  Progress,
  Spinner,
  ProgressIndicator,
  progressVariants,
  progressIndicatorVariants,
  spinnerVariants,
}
