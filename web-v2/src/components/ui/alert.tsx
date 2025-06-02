import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-[var(--radius-md)] border p-[var(--spacing-4)] [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-white border-[var(--color-gray-300)] text-[var(--color-gray-900)]",
        info: "bg-[var(--color-blue-50)] border-[var(--color-info)] text-[var(--color-blue-900)] [&>svg]:text-[var(--color-info)]",
        success: "bg-green-50 border-[var(--color-success)] text-green-900 [&>svg]:text-[var(--color-success)]",
        warning: "bg-yellow-50 border-[var(--color-warning)] text-yellow-900 [&>svg]:text-[var(--color-warning)]",
        error: "bg-red-50 border-[var(--color-error)] text-red-900 [&>svg]:text-[var(--color-error)]",
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
    className={cn("mb-1 font-[var(--font-weight-semibold)] leading-none tracking-tight", className)}
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
    className={cn("text-[var(--font-size-sm)] [&_p]:leading-relaxed", className)}
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
        {icon && <Icon className="h-4 w-4" />}
        {children}
      </Alert>
    )
  }
)
AlertWithIcon.displayName = "AlertWithIcon"

export { Alert, AlertTitle, AlertDescription, AlertWithIcon }