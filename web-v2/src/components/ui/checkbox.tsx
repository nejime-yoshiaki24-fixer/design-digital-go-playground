'use client'

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative inline-flex">
        <input
          type="checkbox"
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border border-input bg-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            error && "border-destructive focus-visible:ring-destructive",
            "sr-only",
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 shrink-0 rounded border border-input bg-background",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            "peer-checked:bg-primary peer-checked:border-primary",
            error && "border-destructive peer-focus-visible:ring-destructive"
          )}
        >
          <Check className={cn(
            "h-full w-full text-primary-foreground",
            "opacity-0 peer-checked:opacity-100"
          )} />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }