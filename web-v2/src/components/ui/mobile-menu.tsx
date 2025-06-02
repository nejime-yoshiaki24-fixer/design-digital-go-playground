'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface MobileMenuItem {
  label: string
  href: string
  children?: MobileMenuItem[]
  level?: number
}

interface MobileMenuProps {
  items: MobileMenuItem[]
  logo?: React.ReactNode
  className?: string
}

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ items, logo, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [currentLevel, setCurrentLevel] = React.useState<{
      parent: MobileMenuItem | null
      items: MobileMenuItem[]
    }>({ parent: null, items: items })

    const toggleMenu = () => {
      setIsOpen(!isOpen)
      if (!isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        // Reset to top level when closing
        setCurrentLevel({ parent: null, items: items })
      }
    }

    const navigateToSubMenu = (item: MobileMenuItem) => {
      if (item.children && item.children.length > 0) {
        setCurrentLevel({ parent: item, items: item.children })
      }
    }

    const navigateBack = () => {
      setCurrentLevel({ parent: null, items: items })
    }

    React.useEffect(() => {
      return () => {
        document.body.style.overflow = ''
      }
    }, [])

    return (
      <div ref={ref} className={cn('relative', className)}>
        {/* ハンバーガーメニューボタン */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isOpen}
          className="h-11 w-11 p-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* メニューオーバーレイ */}
        {isOpen && (
          <div
            className="bg-opacity-50 fixed inset-0 z-40 bg-black md:hidden"
            onClick={toggleMenu}
          />
        )}

        {/* メニューコンテンツ */}
        <div
          className={cn(
            'fixed top-0 left-0 z-50 h-full w-[360px] transform bg-white shadow-xl transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* ヘッダー */}
          <div className="border-border-divider flex items-center justify-between border-b p-4">
            {logo && <div className="flex-1">{logo}</div>}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="メニューを閉じる"
              className="h-11 w-11 p-2"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* 戻るボタン */}
          {currentLevel.parent && (
            <button
              className="text-font-size-base text-text-body hover:bg-bg-secondary hover:text-primary flex w-full items-center gap-2 border-b border-[#949494] px-4 py-3 text-left font-bold transition-colors"
              onClick={navigateBack}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>戻る</span>
            </button>
          )}

          {/* メニューアイテム */}
          <nav className="h-[calc(100%-64px)] overflow-y-auto">
            <ul className="m-0 list-none p-0">
              {currentLevel.items.map((item, index) => (
                <li key={index} className="border-b border-[#949494]">
                  {item.children ? (
                    <button
                      className="text-font-size-base text-text-body hover:bg-bg-secondary hover:text-primary flex w-full items-center justify-between px-4 py-4 text-left font-bold transition-colors"
                      onClick={() => navigateToSubMenu(item)}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="text-text-secondary h-5 w-5" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-font-size-base text-text-body hover:bg-bg-secondary hover:text-primary block px-4 py-4 font-bold transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
)

MobileMenu.displayName = 'MobileMenu'

export { MobileMenu }
export type { MobileMenuItem }
