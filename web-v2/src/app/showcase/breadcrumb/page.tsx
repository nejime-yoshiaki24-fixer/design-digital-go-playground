'use client'

import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function BreadcrumbShowcasePage() {
  // 基本的なパンくずリスト
  const basicItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ショーケース', href: '/showcase' },
    { label: 'パンくずリスト', current: true },
  ]

  // ホームアイコン付き
  const withHomeIcon = [
    { label: 'ホーム', href: '/', isHome: true },
    { label: 'サービス', href: '#' },
    { label: '詳細', current: true },
  ]

  // 長い階層
  const longHierarchy = [
    { label: 'ホーム', href: '/', isHome: true },
    { label: 'カテゴリー', href: '#' },
    { label: 'サブカテゴリー', href: '#' },
    { label: '製品一覧', href: '#' },
    { label: '製品詳細', current: true },
  ]

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div>
        <h1 className="text-display-lg mb-8 font-bold">パンくずリスト</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          現在のページ位置を示すナビゲーション要素です。
        </p>
      </div>

      {/* 基本的な使用例 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">基本的な使用例</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <Breadcrumb items={basicItems} />
        </div>
      </section>

      {/* ホームアイコン付き */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">ホームアイコン付き</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <Breadcrumb items={withHomeIcon} />
        </div>
      </section>

      {/* 長い階層 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">長い階層の例</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <Breadcrumb items={longHierarchy} />
        </div>
      </section>

      {/* 使用ガイドライン */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">使用ガイドライン</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>常に現在のページまでの階層構造を正確に表現する</li>
            <li>最後の項目は現在のページを示し、リンクにしない</li>
            <li>ホームページへのリンクは必ず含める</li>
            <li>モバイルでは省略表示を検討する</li>
          </ul>
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <Link
          href="/showcase"
          className="text-primary inline-flex items-center gap-2 hover:underline"
        >
          ← ショーケース一覧に戻る
        </Link>
      </div>
    </div>
  )
}
