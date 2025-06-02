import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-radius-lg border p-spacing-lg [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-5 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-foreground",
        info: "bg-info/10 border-info text-info [&>svg]:text-info",
        success: "bg-success/10 border-success text-success [&>svg]:text-success",
        warning: "bg-warning/10 border-warning text-warning [&>svg]:text-warning",
        error: "bg-error/10 border-error text-error [&>svg]:text-error",
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
    className={cn("mb-1 font-font-weight-semibold leading-none tracking-tight", className)}
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
    className={cn("text-font-size-sm [&_p]:leading-relaxed", className)}
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
        {icon && <Icon className="h-5 w-5" />}
        {children}
      </Alert>
    )
  }
)
AlertWithIcon.displayName = "AlertWithIcon"

export { Alert, AlertTitle, AlertDescription, AlertWithIcon }