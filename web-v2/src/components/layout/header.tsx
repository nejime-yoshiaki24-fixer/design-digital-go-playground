import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-spacing-md">
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
          <div className="flex items-center space-x-spacing-lg">
            <h1 className="text-font-size-xl font-font-weight-bold text-primary">
              デザインシステム v2
            </h1>
            
            <nav className="hidden md:flex items-center space-x-spacing-lg">
              <a
                href="#components"
                className="text-font-size-sm font-font-weight-medium text-muted-foreground hover:text-primary transition-colors"
              >
                コンポーネント
              </a>
              <a
                href="#tokens"
                className="text-font-size-sm font-font-weight-medium text-muted-foreground hover:text-primary transition-colors"
              >
                デザイントークン
              </a>
              <a
                href="#docs"
                className="text-font-size-sm font-font-weight-medium text-muted-foreground hover:text-primary transition-colors"
              >
                ドキュメント
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-spacing-md">
            <Button variant="outline" size="sm">
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}