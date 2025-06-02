'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const radioVariants = cva(
  'shrink-0 rounded-full border bg-white border-[#D9D9D9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD43D] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 peer-checked:border-[#0017C1] transition-colors relative',
  {
    variants: {
      size: {
        small: 'h-6 w-6',
        medium: 'h-8 w-8',
        large: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
)

const radioGroupVariants = cva('grid gap-2', {
  variants: {
    orientation: {
      vertical: 'grid-cols-1',
      horizontal: 'grid-flow-col auto-cols-max gap-8',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioGroupVariants> {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name: string
  label?: string
  supportText?: string
  required?: boolean
  error?: boolean
  errorText?: string
}

export interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  value: string
  label?: string
  error?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      orientation,
      value,
      onValueChange,
      disabled = false,
      name,
      label,
      supportText,
      required = false,
      error = false,
      errorText,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <div className="flex items-baseline gap-2">
            <label className="text-[17px] leading-[1.7] font-bold text-[#333333]">{label}</label>
            {required && <span className="text-sm text-[#EC0000]">必須</span>}
          </div>
        )}
        {supportText && (
          <p className="text-[16px] leading-[1.7] font-normal text-[#666666]">{supportText}</p>
        )}
        <div
          ref={ref}
          className={cn(radioGroupVariants({ orientation }), className)}
          role="radiogroup"
          aria-required={required}
          aria-invalid={error}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<RadioGroupItemProps>(child) && child.type === RadioGroupItem) {
              return React.cloneElement(child, {
                name,
                checked: value === child.props.value,
                onChange: () => onValueChange?.(child.props.value),
                disabled: disabled || child.props.disabled,
                error,
              })
            }
            return child
          })}
        </div>
        {error && errorText && (
          <p className="mt-2 text-[16px] leading-[1.3] font-normal text-[#EC0000]">{errorText}</p>
        )}
      </div>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, size, value, label, error, ...props }, ref) => {
    const id = React.useId()

    return (
      <div className="flex items-center gap-2">
        <div className="relative inline-flex">
          <input
            type="radio"
            id={id}
            value={value}
            className={cn('peer sr-only', className)}
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              radioVariants({ size }),
              error && 'border-[#EC0000] peer-focus-visible:ring-[#EC0000]'
            )}
          >
            <div
              className={cn(
                'absolute inset-0 rounded-full bg-[#0017C1] opacity-0 transition-opacity peer-checked:opacity-100',
                size === 'small' && 'm-[6px]',
                size === 'medium' && 'm-[8px]',
                size === 'large' && 'm-[10px]'
              )}
            />
          </div>
        </div>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'cursor-pointer leading-[1.3] font-normal text-[#333333]',
              size === 'large' && 'text-[17px]',
              size === 'medium' && 'text-[16px]',
              size === 'small' && 'text-[14px]'
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem, radioVariants, radioGroupVariants }
