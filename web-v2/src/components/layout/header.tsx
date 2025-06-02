import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-gray-300)] bg-white shadow-[var(--shadow-sm)]">
      <div className="container mx-auto flex h-16 items-center px-[var(--spacing-4)]">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="メニューを開く"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-[var(--spacing-6)]">
            <h1 className="text-[var(--font-size-xl)] font-[var(--font-weight-bold)] text-[var(--color-primary)]">
              デザインシステム v2
            </h1>
            
            <nav className="hidden md:flex items-center space-x-[var(--spacing-6)]">
              <a
                href="#components"
                className="text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors"
              >
                コンポーネント
              </a>
              <a
                href="#tokens"
                className="text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors"
              >
                デザイントークン
              </a>
              <a
                href="#docs"
                className="text-[var(--font-size-sm)] font-[var(--font-weight-medium)] text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors"
              >
                ドキュメント
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-[var(--spacing-4)]">
            <Button variant="outline" size="sm">
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}