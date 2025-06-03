'use client'

import Link from 'next/link'
import { Home, FileText, Users, Settings } from 'lucide-react'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import type { NavigationMenuItem } from '@/components/ui/navigation-menu'

export default function NavigationMenuShowcasePage() {
  // 基本的なメニュー
  const basicItems: NavigationMenuItem[] = [
    { label: 'ホーム', href: '/' },
    { label: 'サービス', href: '#' },
    { label: 'お問い合わせ', href: '#' },
  ]

  // アイコン付きメニュー
  const withIcons: NavigationMenuItem[] = [
    { label: 'ホーム', href: '/', icon: <Home className="h-6 w-6" />, selected: true },
    { label: 'ドキュメント', href: '#', icon: <FileText className="h-6 w-6" /> },
    { label: 'ユーザー', href: '#', icon: <Users className="h-6 w-6" /> },
    { label: '設定', href: '#', icon: <Settings className="h-6 w-6" /> },
  ]

  // ドロップダウン付きメニュー
  const withDropdown: NavigationMenuItem[] = [
    { label: 'ホーム', href: '/' },
    {
      label: 'サービス',
      children: [
        { label: 'Web開発', href: '#' },
        { label: 'アプリ開発', href: '#' },
        { label: 'コンサルティング', href: '#' },
      ],
    },
    {
      label: '会社情報',
      children: [
        { label: '会社概要', href: '#' },
        { label: '採用情報', href: '#' },
        { label: 'アクセス', href: '#' },
      ],
    },
    { label: 'お問い合わせ', href: '#' },
  ]

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div>
        <h1 className="text-display-lg mb-8 font-bold">グローバルメニュー</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          サイト全体のナビゲーションを提供するメインメニューです。
        </p>
      </div>

      {/* 基本的な水平メニュー */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">基本的な水平メニュー</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <NavigationMenu items={basicItems} />
        </div>
      </section>

      {/* アイコン付きメニュー */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">アイコン付きメニュー</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <NavigationMenu items={withIcons} />
        </div>
      </section>

      {/* ドロップダウン付きメニュー */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">ドロップダウン付きメニュー</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <NavigationMenu items={withDropdown} />
        </div>
      </section>

      {/* 垂直メニュー */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">垂直メニュー</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-xs">
            <NavigationMenu items={withIcons} orientation="vertical" />
          </div>
        </div>
      </section>

      {/* 使用ガイドライン */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">使用ガイドライン</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>主要なナビゲーション項目は7±2個以内に収める</li>
            <li>現在のページは視覚的に強調表示する</li>
            <li>ドロップダウンメニューは必要最小限に留める</li>
            <li>キーボードナビゲーションに対応する</li>
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
