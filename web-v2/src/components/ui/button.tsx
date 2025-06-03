import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD43D] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#B3B3B3] disabled:text-[#F2F2F2]",
  {
    variants: {
      variant: {
        default: 
          "bg-[#0017C1] text-white hover:bg-[#00118F] active:bg-[#000060]",
        secondary:
          "bg-[#00118F] text-white hover:bg-[#000071] active:bg-[#000060]",
        outline:
          "border border-[#0017C1] bg-white text-[#0017C1] hover:bg-[#C5D7FB] hover:border-[#00118F] hover:text-[#00118F] active:bg-[#9DB7F9] active:border-[#000060] active:text-[#000060]",
        ghost:
          "text-[#0017C1] hover:bg-[#E8F1FE] hover:text-[#00118F] active:bg-[#D9E6FF] active:text-[#000060]",
        destructive:
          "bg-[#EC0000] text-white hover:bg-[#CE0000] active:bg-[#A90000]",
      },
      size: {
        default: "h-12 px-4 py-3 text-[16px] rounded-[8px]",
        sm: "h-9 px-3 py-1.5 text-[16px] rounded-[6px]",
        lg: "h-14 px-4 py-4 text-[16px] rounded-[8px]",
        xs: "h-[30px] px-2 py-[7px] text-[16px] rounded-[4px]",
        icon: "h-10 w-10 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }