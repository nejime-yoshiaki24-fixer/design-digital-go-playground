import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const components = [
  {
    title: 'Button',
    description: 'ボタンコンポーネントのバリエーション',
    href: '/components/button',
  },
  {
    title: 'Card',
    description: 'カードコンポーネントのバリエーション',
    href: '/components/card',
  },
  {
    title: 'Alert',
    description: 'アラートコンポーネントのバリエーション',
    href: '/components/alert',
  },
]

export default function ComponentsPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            コンポーネント一覧
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            デジタル庁デザインシステムに準拠したReactコンポーネント
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-spacing-lg">
          {components.map((component) => (
            <Link key={component.href} href={component.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{component.title}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    クリックして詳細を見る →
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}