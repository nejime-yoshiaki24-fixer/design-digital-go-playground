'use client'

import Link from 'next/link'
import { MobileMenu } from '@/components/ui/mobile-menu'
import type { MobileMenuItem } from '@/components/ui/mobile-menu'

export default function MobileMenuShowcasePage() {
  // 基本的なメニュー項目
  const basicItems: MobileMenuItem[] = [
    { label: 'ホーム', href: '/' },
    { label: 'サービス', href: '#' },
    { label: '会社情報', href: '#' },
    { label: 'お問い合わせ', href: '#' },
  ]

  // 階層構造のあるメニュー
  const nestedItems: MobileMenuItem[] = [
    { label: 'ホーム', href: '/' },
    {
      label: '防災・救急',
      href: '#',
      children: [
        { label: '避難所情報', href: '#' },
        { label: '防災マップ', href: '#' },
        { label: '緊急連絡先', href: '#' },
      ],
    },
    {
      label: 'くらし・手続き',
      href: '#',
      children: [
        { label: '各種証明書', href: '#' },
        { label: '住民票・戸籍', href: '#' },
        { label: '税金・保険', href: '#' },
      ],
    },
    { label: '観光・イベント', href: '#' },
    { label: '産業・ビジネス', href: '#' },
  ]

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div>
        <h1 className="text-display-lg mb-8 font-bold">モバイルメニュー</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          モバイルデバイス向けのハンバーガーメニューです。
        </p>
      </div>

      {/* 基本的な使用例 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">基本的な使用例</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <MobileMenu items={basicItems} />
            <span className="text-text-secondary">← クリックして開く</span>
          </div>
        </div>
      </section>

      {/* ロゴ付きメニュー */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">ロゴ付きメニュー</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <MobileMenu
              items={basicItems}
              logo={<span className="text-lg font-bold">サイトロゴ</span>}
            />
            <span className="text-text-secondary">← クリックして開く</span>
          </div>
        </div>
      </section>

      {/* 階層構造のあるメニュー */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">階層構造のあるメニュー</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <MobileMenu
              items={nestedItems}
              logo={<span className="text-lg font-bold">デジタル庁</span>}
            />
            <span className="text-text-secondary">← クリックして開く</span>
          </div>
        </div>
      </section>

      {/* 実装のポイント */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">実装のポイント</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>メニューが開いている間は背景のスクロールを無効化</li>
            <li>階層構造がある場合は「戻る」ボタンを提供</li>
            <li>アニメーションで開閉の動きを滑らかに</li>
            <li>フォーカストラップを実装してアクセシビリティを確保</li>
            <li>ESCキーでメニューを閉じられるように</li>
          </ul>
        </div>
      </section>

      {/* 使用ガイドライン */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">使用ガイドライン</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>タップターゲットは最低44×44pxを確保</li>
            <li>メニュー項目間に十分な余白を設ける</li>
            <li>重要な項目は上部に配置</li>
            <li>階層は3レベルまでに制限</li>
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
