'use client'

import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const components = [
  {
    title: 'Button',
    description: 'ボタンコンポーネントのバリエーション',
    href: '/showcase/button',
    category: 'アクション',
  },
  {
    title: 'Input',
    description: 'テキスト入力フィールドのコンポーネント',
    href: '/showcase/input',
    category: 'フォーム',
  },
  {
    title: 'Select',
    description: 'ドロップダウン選択コンポーネント',
    href: '/showcase/select',
    category: 'フォーム',
  },
  {
    title: 'Checkbox',
    description: 'チェックボックス選択コンポーネント',
    href: '/showcase/checkbox',
    category: 'フォーム',
  },
  {
    title: 'Card',
    description: 'カードコンポーネントのバリエーション',
    href: '/showcase/card',
    category: 'レイアウト',
  },
  {
    title: 'Table',
    description: 'データを整理して表示するテーブル',
    href: '/showcase/table',
    category: 'データ表示',
  },
  {
    title: 'Alert',
    description: 'アラートコンポーネントのバリエーション',
    href: '/showcase/alert',
    category: 'フィードバック',
  },
  {
    title: 'Breadcrumb',
    description: 'パンくずリストコンポーネント',
    href: '/showcase/breadcrumb',
    category: 'ナビゲーション',
  },
  {
    title: 'Navigation Menu',
    description: 'グローバルメニューコンポーネント',
    href: '/showcase/navigation-menu',
    category: 'ナビゲーション',
  },
  {
    title: 'Mobile Menu',
    description: 'モバイル向けハンバーガーメニュー',
    href: '/showcase/mobile-menu',
    category: 'ナビゲーション',
  },
  {
    title: 'Language Selector',
    description: '言語選択コンポーネント',
    href: '/showcase/language-selector',
    category: 'ナビゲーション',
  },
  {
    title: 'Menu List',
    description: 'サイドバー用メニューリスト',
    href: '/showcase/menu-list',
    category: 'ナビゲーション',
  },
  {
    title: 'Utility Links',
    description: '補助的なリンク集コンポーネント',
    href: '/showcase/utility-links',
    category: 'ナビゲーション',
  },
]

const getCategoryBadge = (category: string) => {
  switch (category) {
    case 'アクション':
      return <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">{category}</span>
    case 'フォーム':
      return <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">{category}</span>
    case 'レイアウト':
      return (
        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">{category}</span>
      )
    case 'データ表示':
      return (
        <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">{category}</span>
      )
    case 'フィードバック':
      return <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">{category}</span>
    case 'ナビゲーション':
      return (
        <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800">{category}</span>
      )
    default:
      return (
        <span className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-700">
          {category}
        </span>
      )
  }
}

export default function ComponentsPage() {
  const router = useRouter()

  const handleCardClick = (href: string) => {
    router.push(href)
  }

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

        <div className="gap-spacing-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <Card
              key={component.href}
              className="h-full cursor-pointer transition-shadow hover:shadow-lg"
              onClick={() => handleCardClick(component.href)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{component.title}</CardTitle>
                  {getCategoryBadge(component.category)}
                </div>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">クリックして詳細を見る →</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
