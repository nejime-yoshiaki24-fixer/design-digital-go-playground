'use client'

import * as React from 'react'
import { Globe } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Select } from './select'
import { Button } from './button'

const languageSelectorVariants = cva('inline-flex items-center gap-2', {
  variants: {
    variant: {
      select: '',
      button: '',
    },
  },
  defaultVariants: {
    variant: 'select',
  },
})

interface Language {
  code: string
  label: string
  nativeLabel?: string
}

interface LanguageSelectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof languageSelectorVariants> {
  languages: Language[]
  currentLanguage: string
  onLanguageChange: (language: string) => void
  label?: string
  showIcon?: boolean
}

const LanguageSelector = React.forwardRef<HTMLDivElement, LanguageSelectorProps>(
  (
    {
      className,
      languages,
      currentLanguage,
      onLanguageChange,
      label = '言語を選択',
      showIcon = true,
      variant,
      ...props
    },
    ref
  ) => {
    const currentLang = languages.find((lang) => lang.code === currentLanguage)

    if (variant === 'button') {
      return (
        <div ref={ref} className={cn(languageSelectorVariants({ variant }), className)} {...props}>
          {showIcon && <Globe className="text-text-secondary h-6 w-6" />}
          <Button
            variant="ghost"
            size="sm"
            className="font-normal"
            onClick={() => {
              // 簡易的な言語切り替え（次の言語に切り替え）
              const currentIndex = languages.findIndex((lang) => lang.code === currentLanguage)
              const nextIndex = (currentIndex + 1) % languages.length
              onLanguageChange(languages[nextIndex].code)
            }}
          >
            {currentLang?.label || currentLanguage}
          </Button>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(languageSelectorVariants({ variant }), className)} {...props}>
        {showIcon && <Globe className="text-text-secondary h-6 w-6" />}
        <Select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          aria-label={label}
          className="min-w-[160px]"
        >
          <option value="" disabled hidden>
            {label}
          </option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
              {language.nativeLabel &&
                language.nativeLabel !== language.label &&
                ` (${language.nativeLabel})`}
            </option>
          ))}
        </Select>
      </div>
    )
  }
)

LanguageSelector.displayName = 'LanguageSelector'

export { LanguageSelector }
export type { Language }
