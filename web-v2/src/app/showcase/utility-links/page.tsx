'use client'

import Link from 'next/link'
import { UtilityLinks } from '@/components/ui/utility-links'
import type { UtilityLink } from '@/components/ui/utility-links'

export default function UtilityLinksShowcasePage() {
  // 基本的なリンク
  const basicLinks: UtilityLink[] = [
    { label: 'サイトマップ', href: '#' },
    { label: 'プライバシーポリシー', href: '#' },
    { label: '利用規約', href: '#' },
    { label: 'お問い合わせ', href: '#' },
  ]

  // バリエーション付きリンク
  const variedLinks: UtilityLink[] = [
    { label: 'ヘルプ', href: '#' },
    { label: 'お問い合わせ', href: '#', variant: 'primary' },
    { label: 'アクセシビリティ', href: '#' },
    { label: '外部サイト', href: 'https://example.com', external: true },
  ]

  // フッター用リンク
  const footerLinks: UtilityLink[] = [
    { label: 'サイトマップ', href: '#' },
    { label: 'プライバシーポリシー', href: '#' },
    { label: '利用規約', href: '#' },
    { label: 'クッキーポリシー', href: '#' },
    { label: 'アクセシビリティ', href: '#' },
    { label: '運営会社', href: '#', external: true },
  ]

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div>
        <h1 className="text-display-lg mb-8 font-bold">ユーティリティリンク</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          サイト全体で使用される補助的なリンク集です。
        </p>
      </div>

      {/* 基本的な使用例（水平） */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">基本的な使用例（水平配置）</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <UtilityLinks links={basicLinks} />
        </div>
      </section>

      {/* 垂直配置 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">垂直配置</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <UtilityLinks links={basicLinks} orientation="vertical" />
        </div>
      </section>

      {/* バリエーション付き */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">バリエーション付き</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <UtilityLinks links={variedLinks} />
          <div className="text-text-secondary mt-4 text-sm">
            <p>• primaryバリアント: より目立つリンク（お問い合わせなど）</p>
            <p>• external: 外部リンクアイコン付き</p>
          </div>
        </div>
      </section>

      {/* フッター用（多数のリンク） */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">フッター用（多数のリンク）</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <UtilityLinks links={footerLinks} />
        </div>
      </section>

      {/* スペーシングのバリエーション */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">スペーシングのバリエーション</h2>
        <div className="space-y-6">
          <div className="bg-bg-secondary rounded-lg p-6">
            <h3 className="text-heading-lg mb-4">通常のスペーシング</h3>
            <UtilityLinks links={basicLinks} spacing="md" />
          </div>
          <div className="bg-bg-secondary rounded-lg p-6">
            <h3 className="text-heading-lg mb-4">広めのスペーシング</h3>
            <UtilityLinks links={basicLinks} spacing="lg" />
          </div>
        </div>
      </section>

      {/* レスポンシブ対応 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">レスポンシブ対応の例</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <p className="text-text-secondary mb-4 text-sm">画面幅に応じて自動的に折り返されます</p>
          <div className="border-border-divider mx-auto max-w-md border-2 border-dashed p-4">
            <UtilityLinks links={footerLinks} />
          </div>
        </div>
      </section>

      {/* 使用ガイドライン */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">使用ガイドライン</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>ヘッダーやフッターに配置して補助的なナビゲーションを提供</li>
            <li>重要度の低い、しかし必要なリンクを配置</li>
            <li>外部リンクには必ずexternalプロパティを設定</li>
            <li>お問い合わせなど、アクションを促すリンクはprimaryバリアントを使用</li>
            <li>リンク数が多い場合は適切にグループ分けする</li>
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
