import { ReactNode } from "react"
import { Header } from "./header"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <Header />
      <main className="container mx-auto px-[var(--spacing-4)] py-[var(--spacing-8)]">
        {children}
      </main>
    </div>
  )
}