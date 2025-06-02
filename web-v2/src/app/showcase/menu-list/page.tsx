'use client'

import Link from 'next/link'
import { Home, FileText, Users, Settings, HelpCircle, Bell, Star } from 'lucide-react'
import { MenuList } from '@/components/ui/menu-list'
import type { MenuListItem } from '@/components/ui/menu-list'

export default function MenuListShowcasePage() {
  // 基本的なメニューリスト
  const basicItems: MenuListItem[] = [
    { label: 'ホーム', href: '#' },
    { label: 'プロフィール', href: '#' },
    { label: '設定', href: '#' },
    { label: 'ログアウト', href: '#' },
  ]

  // アイコン付きメニュー
  const withIcons: MenuListItem[] = [
    {
      label: 'ダッシュボード',
      href: '#',
      icon: <Home className="h-6 w-6" />,
      active: true,
    },
    {
      label: 'ドキュメント',
      href: '#',
      icon: <FileText className="h-6 w-6" />,
    },
    {
      label: 'ユーザー管理',
      href: '#',
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: '設定',
      href: '#',
      icon: <Settings className="h-6 w-6" />,
    },
    {
      label: 'ヘルプ',
      href: '#',
      icon: <HelpCircle className="h-6 w-6" />,
      disabled: true,
    },
  ]

  // バッジ付きメニュー
  const withBadges: MenuListItem[] = [
    {
      label: '通知',
      href: '#',
      icon: <Bell className="h-6 w-6" />,
      badge: <span className="bg-error rounded-full px-2 py-0.5 text-xs text-white">3</span>,
    },
    {
      label: 'メッセージ',
      href: '#',
      icon: <FileText className="h-6 w-6" />,
      badge: <span className="bg-primary rounded-full px-2 py-0.5 text-xs text-white">12</span>,
    },
    {
      label: 'お気に入り',
      href: '#',
      icon: <Star className="h-6 w-6" />,
      badge: <span className="text-text-secondary text-xs">新着</span>,
    },
  ]

  // 階層構造のあるメニュー
  const nestedItems: MenuListItem[] = [
    {
      label: 'ホーム',
      href: '#',
      icon: <Home className="h-6 w-6" />,
    },
    {
      label: 'ユーザー管理',
      icon: <Users className="h-6 w-6" />,
      children: [
        { label: 'ユーザー一覧', href: '#' },
        { label: 'ロール管理', href: '#' },
        { label: 'アクセス権限', href: '#' },
      ],
    },
    {
      label: '設定',
      icon: <Settings className="h-6 w-6" />,
      children: [
        { label: '一般設定', href: '#' },
        { label: 'セキュリティ', href: '#' },
        { label: '通知設定', href: '#' },
      ],
    },
  ]

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div>
        <h1 className="text-display-lg mb-8 font-bold">メニューリスト</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          サイドバーやドロワーで使用する垂直メニューリストです。
        </p>
      </div>

      {/* 基本的な使用例 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">基本的な使用例</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-sm">
            <MenuList items={basicItems} />
          </div>
        </div>
      </section>

      {/* アイコン付き */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">アイコン付き</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-sm">
            <MenuList items={withIcons} />
          </div>
        </div>
      </section>

      {/* ボーダー付き */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">ボーダー付き</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-sm">
            <MenuList items={withIcons} variant="bordered" />
          </div>
        </div>
      </section>

      {/* Boxedタイプ */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">Boxedタイプ</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="border-border-divider max-w-sm rounded-lg border">
            <MenuList items={withIcons} variant="bordered" type="boxed" />
          </div>
        </div>
      </section>

      {/* バッジ付き */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">バッジ付き</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-sm">
            <MenuList items={withBadges} variant="bordered" />
          </div>
        </div>
      </section>

      {/* 階層構造 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">階層構造（展開可能）</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-sm">
            <MenuList items={nestedItems} variant="bordered" />
          </div>
        </div>
      </section>

      {/* 小サイズ */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">小サイズ</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <div className="max-w-[220px]">
            <MenuList items={basicItems} size="sm" width="small" />
          </div>
        </div>
      </section>

      {/* 使用ガイドライン */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">使用ガイドライン</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>現在のページは視覚的に強調表示（activeプロパティ）</li>
            <li>無効な項目は明確に区別（disabledプロパティ）</li>
            <li>階層は2レベルまでを推奨</li>
            <li>アイコンを使用して視認性を向上</li>
            <li>重要な通知はバッジで表示</li>
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
