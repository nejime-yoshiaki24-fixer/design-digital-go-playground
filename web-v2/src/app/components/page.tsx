import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const components = [
  {
    title: 'Button',
    description: 'ボタンコンポーネントのバリエーション',
    href: '/components/button',
    category: 'アクション',
  },
  {
    title: 'Input',
    description: 'テキスト入力フィールドのコンポーネント',
    href: '/components/input',
    category: 'フォーム',
  },
  {
    title: 'Select',
    description: 'ドロップダウン選択コンポーネント',
    href: '/components/select',
    category: 'フォーム',
  },
  {
    title: 'Checkbox',
    description: 'チェックボックス選択コンポーネント',
    href: '/components/checkbox',
    category: 'フォーム',
  },
  {
    title: 'Card',
    description: 'カードコンポーネントのバリエーション',
    href: '/components/card',
    category: 'レイアウト',
  },
  {
    title: 'Table',
    description: 'データを整理して表示するテーブル',
    href: '/components/table',
    category: 'データ表示',
  },
  {
    title: 'Badge',
    description: 'ステータスやカテゴリを示すバッジ',
    href: '/components/badge',
    category: 'データ表示',
  },
  {
    title: 'Alert',
    description: 'アラートコンポーネントのバリエーション',
    href: '/components/alert',
    category: 'フィードバック',
  },
]

const getCategoryBadge = (category: string) => {
  switch (category) {
    case 'アクション':
      return <Badge variant="default">{category}</Badge>
    case 'フォーム':
      return <Badge variant="info">{category}</Badge>
    case 'レイアウト':
      return <Badge variant="success">{category}</Badge>
    case 'データ表示':
      return <Badge variant="warning">{category}</Badge>
    case 'フィードバック':
      return <Badge variant="destructive">{category}</Badge>
    default:
      return <Badge variant="outline">{category}</Badge>
  }
}

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
                  <div className="flex items-center justify-between">
                    <CardTitle>{component.title}</CardTitle>
                    {getCategoryBadge(component.category)}
                  </div>
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