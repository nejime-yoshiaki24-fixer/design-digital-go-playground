import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-blue-800)] focus-visible:ring-[var(--color-primary)]",
        secondary:
          "bg-[var(--color-gray-200)] text-[var(--color-gray-900)] hover:bg-[var(--color-gray-300)] focus-visible:ring-[var(--color-gray-500)]",
        outline:
          "border-2 border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-blue-50)] focus-visible:ring-[var(--color-primary)]",
        ghost:
          "hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-900)] focus-visible:ring-[var(--color-gray-500)]",
        destructive:
          "bg-[var(--color-error)] text-white hover:bg-red-700 focus-visible:ring-[var(--color-error)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      radius: {
        default: "rounded-[var(--radius-md)]",
        sm: "rounded-[var(--radius-sm)]",
        lg: "rounded-[var(--radius-lg)]",
        full: "rounded-[var(--radius-full)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }