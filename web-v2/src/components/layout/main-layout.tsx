import { ReactNode } from "react"
import { Header } from "./header"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-spacing-md py-spacing-xl">
        {children}
      </main>
    </div>
  )
}