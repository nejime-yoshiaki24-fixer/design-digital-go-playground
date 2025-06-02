import { ReactNode } from 'react'

interface ShowcaseSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-text-body text-xl font-semibold">{title}</h2>
        {description && <p className="text-text-secondary mt-1 text-sm">{description}</p>}
      </div>
      <div className="bg-bg-secondary border-border-divider rounded-lg border p-6">{children}</div>
    </section>
  )
}
