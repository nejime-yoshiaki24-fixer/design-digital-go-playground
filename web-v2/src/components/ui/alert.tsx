import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-[12px] border-[3px] p-spacing-lg",
  {
    variants: {
      variant: {
        default: "bg-white border-[#767676] text-[#333333]",
        info: "bg-white border-[#0017C1] text-[#333333]",
        success: "bg-white border-[#197A4B] text-[#333333]",
        warning: "bg-white border-[#927200] text-[#333333]",
        error: "bg-white border-[#EC0000] text-[#333333]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-spacing-sm font-font-weight-bold text-[20px] leading-[1.5em]", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-[16px] leading-[1.7em] [&_p]:leading-[1.7em]", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
}

interface AlertWithIconProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  icon?: boolean
}

const AlertWithIcon = React.forwardRef<HTMLDivElement, AlertWithIconProps>(
  ({ className, variant = "default", icon = true, children, ...props }, ref) => {
    const Icon = iconMap[variant as keyof typeof iconMap] || Info
    
    return (
      <Alert ref={ref} variant={variant} className={className} {...props}>
        <div className="flex gap-spacing-lg">
          {icon && <Icon className="h-9 w-9 flex-shrink-0" />}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </Alert>
    )
  }
)
AlertWithIcon.displayName = "AlertWithIcon"

export { Alert, AlertTitle, AlertDescription, AlertWithIcon }