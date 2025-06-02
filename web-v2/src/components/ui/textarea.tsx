import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex w-full bg-white border border-[#666666] text-[16px] font-normal placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD43D] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F2F2F2] disabled:border-[#B3B3B3] hover:border-[#000000] transition-colors resize-none',
  {
    variants: {
      size: {
        medium: 'min-h-[80px] px-3 py-2 rounded-[8px]',
        large: 'min-h-[120px] px-4 py-1 rounded-[8px]',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: boolean
  showCounter?: boolean
  maxLength?: number
  label?: string
  supportText?: string
  required?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size,
      error,
      showCounter = false,
      maxLength,
      label,
      supportText,
      required = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentLength, setCurrentLength] = React.useState(
      typeof value === 'string' ? value.length : 0
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length)
      onChange?.(e)
    }

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
        <div className="relative">
          <textarea
            className={cn(
              textareaVariants({ size }),
              error && 'border-[#EC0000] focus-visible:ring-[#EC0000]',
              className
            )}
            ref={ref}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {showCounter && maxLength && (
            <div className="mt-2 flex justify-end">
              <span
                className={cn(
                  'text-sm',
                  currentLength > maxLength ? 'text-[#EC0000]' : 'text-[#666666]'
                )}
              >
                {currentLength}/{maxLength}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
