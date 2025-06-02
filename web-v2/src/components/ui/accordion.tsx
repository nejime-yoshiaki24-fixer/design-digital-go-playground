'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const accordionItemVariants = cva('border border-[#767676] bg-white', {
  variants: {
    variant: {
      default: 'rounded-none first:rounded-t-lg last:rounded-b-lg',
      separated: 'rounded-lg mb-2 last:mb-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between p-4 text-left text-[16px] font-bold text-[#1A1A1C] transition-colors hover:bg-[#F0F0F0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD43D] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      size: {
        sm: 'p-3 text-[14px]',
        md: 'p-4 text-[16px]',
        lg: 'p-6 text-[18px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const accordionContentVariants = cva(
  'overflow-hidden text-[16px] text-[#1A1A1C] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      size: {
        sm: 'text-[14px]',
        md: 'text-[16px]',
        lg: 'text-[18px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

type AccordionContextValue = {
  collapsible?: boolean
  type?: 'single' | 'multiple'
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const AccordionContext = React.createContext<AccordionContextValue>({})

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: 'default' | 'separated'
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = 'single',
      collapsible = true,
      value,
      onValueChange,
      variant = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo(
      () => ({
        collapsible,
        type,
        value,
        onValueChange,
      }),
      [collapsible, type, value, onValueChange]
    )

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement<AccordionItemProps>(child) && child.type === AccordionItem) {
              return React.cloneElement(child, {
                variant,
                className: cn(
                  accordionItemVariants({ variant }),
                  variant === 'default' && index !== 0 && 'border-t-0',
                  child.props.className
                ),
              })
            }
            return child
          })}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  value: string
  disabled?: boolean
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)

    const isOpen = React.useMemo(() => {
      if (context.type === 'multiple' && Array.isArray(context.value)) {
        return context.value.includes(value)
      }
      return context.value === value
    }, [context.value, context.type, value])

    const handleToggle = React.useCallback(() => {
      if (disabled) return

      if (context.type === 'multiple') {
        const currentValue = Array.isArray(context.value) ? context.value : []
        const newValue = isOpen ? currentValue.filter((v) => v !== value) : [...currentValue, value]
        context.onValueChange?.(newValue)
      } else {
        const newValue = isOpen && context.collapsible ? '' : value
        context.onValueChange?.(newValue)
      }
    }, [context, disabled, isOpen, value])

    return (
      <div
        ref={ref}
        className={className}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === AccordionTrigger) {
              const props = child.props as AccordionTriggerProps
              return (
                <AccordionTrigger
                  {...props}
                  onClick={handleToggle}
                  disabled={disabled}
                  data-state={isOpen ? 'open' : 'closed'}
                />
              )
            }
            if (child.type === AccordionContent) {
              const props = child.props as AccordionContentProps
              return <AccordionContent {...props} data-state={isOpen ? 'open' : 'closed'} />
            }
          }
          return child
        })}
      </div>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, size, children, ...props }, ref) => (
    <button ref={ref} className={cn(accordionTriggerVariants({ size }), className)} {...props}>
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  )
)
AccordionTrigger.displayName = 'AccordionTrigger'

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, size, children, ...props }, ref) => (
    <div ref={ref} className={cn(accordionContentVariants({ size }), className)} {...props}>
      <div className="px-4 pt-0 pb-4">{children}</div>
    </div>
  )
)
AccordionContent.displayName = 'AccordionContent'

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
}
