import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReactNode } from 'react'

interface ShowcaseLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export function ShowcaseLayout({ title, description, children }: ShowcaseLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* ヘッダー */}
        <header className="mb-8">
          <Link
            href="/showcase"
            className="text-text-secondary hover:text-primary mb-6 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">ショーケースに戻る</span>
          </Link>
          <h1 className="text-text-body mb-3 text-3xl font-bold">{title}</h1>
          <p className="text-text-secondary text-lg">{description}</p>
        </header>

        {/* コンテンツ */}
        <div className="space-y-12">{children}</div>
      </div>
    </div>
  )
}
