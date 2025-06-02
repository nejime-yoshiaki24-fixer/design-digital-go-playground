'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Code2,
  Palette,
  Zap,
  Shield,
  Users,
  Github,
  BookOpen,
  Sparkles,
} from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: <Code2 className="text-primary h-8 w-8" />,
      title: '最新の技術スタック',
      description: 'Next.js 15、React 19、TypeScript 5を使用した高速な開発環境',
      details: 'App Router、Server Components、最新のWeb標準に対応',
    },
    {
      icon: <Palette className="text-primary h-8 w-8" />,
      title: 'デザイントークン対応',
      description: 'デジタル庁デザインシステムv2.4.0のトークンを完全統合',
      details: '色、スペーシング、タイポグラフィなど、統一されたデザイン言語',
    },
    {
      icon: <Shield className="text-primary h-8 w-8" />,
      title: 'アクセシビリティ重視',
      description: 'WCAG 2.1 AA準拠を目指した実装',
      details: 'キーボードナビゲーション、スクリーンリーダー対応',
    },
    {
      icon: <Zap className="text-primary h-8 w-8" />,
      title: '高パフォーマンス',
      description: 'Tailwind CSS v4による最適化されたスタイリング',
      details: 'Tree-shaking、動的インポート、コード分割',
    },
  ]

  const stats = [
    { label: 'コンポーネント', value: '15+', description: '実装済み' },
    { label: 'デザイントークン', value: '100+', description: '統合済み' },
    { label: 'アクセシビリティ', value: 'AA', description: 'WCAG 2.1' },
    { label: '型安全性', value: '100%', description: 'TypeScript' },
  ]

  const showcaseComponents = [
    { name: 'Button', href: '/showcase/button' },
    { name: 'Card', href: '/showcase/card' },
    { name: 'Alert', href: '/showcase/alert' },
    { name: 'Navigation', href: '/showcase/navigation-menu' },
    { name: 'Table', href: '/showcase/table' },
    { name: 'Form', href: '/showcase/input' },
  ]

  return (
    <MainLayout>
      <div className="space-y-spacing-3xl">
        {/* ヒーローセクション */}
        <section className="relative overflow-hidden">
          <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
          <div className="py-spacing-4xl relative px-4 text-center">
            <div className="bg-primary/10 text-primary mb-spacing-lg inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              デジタル庁デザインシステム準拠
            </div>
            <h1 className="text-font-size-6xl font-font-weight-bold text-foreground mb-spacing-md mx-auto max-w-4xl leading-tight">
              次世代の
              <span className="text-primary">デザインシステム</span>
              コンポーネント
            </h1>
            <p className="text-font-size-xl text-muted-foreground mb-spacing-xl mx-auto max-w-2xl">
              Next.js 15 + React 19 + TypeScript 5 + Tailwind CSS v4で構築された、
              モダンで高速、アクセシブルなUIコンポーネントライブラリ
            </p>
            <div className="gap-spacing-md flex flex-col justify-center sm:flex-row">
              <Button size="lg" onClick={() => router.push('/showcase')}>
                コンポーネントを見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://github.com/your-repo', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHubで見る
              </Button>
            </div>
          </div>
        </section>

        {/* 統計情報 */}
        <section className="py-spacing-2xl">
          <div className="gap-spacing-lg grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-font-size-4xl font-font-weight-bold text-primary mb-spacing-xs">
                  {stat.value}
                </div>
                <div className="text-font-size-lg font-font-weight-medium text-foreground">
                  {stat.label}
                </div>
                <div className="text-font-size-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* アラート */}
        <Alert variant="info" className="mx-auto max-w-4xl">
          <AlertDescription className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            このプロジェクトはオープンソースです。コントリビューションを歓迎します！
          </AlertDescription>
        </Alert>

        {/* 特徴カード */}
        <section>
          <div className="mb-spacing-xl text-center">
            <h2 className="text-font-size-3xl font-font-weight-bold text-foreground mb-spacing-sm">
              なぜこのデザインシステムを選ぶのか
            </h2>
            <p className="text-font-size-lg text-muted-foreground mx-auto max-w-2xl">
              デジタル庁の厳格な基準に準拠しながら、最新の技術で実装
            </p>
          </div>
          <div className="gap-spacing-lg grid grid-cols-1 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="gap-spacing-md flex items-start">
                    <div className="bg-primary/10 rounded-lg p-2">{feature.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="mb-2">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* コンポーネントプレビュー */}
        <section className="bg-bg-secondary p-spacing-xl rounded-2xl">
          <div className="mb-spacing-lg text-center">
            <h2 className="text-font-size-2xl font-font-weight-bold text-foreground mb-spacing-sm">
              人気のコンポーネント
            </h2>
            <p className="text-muted-foreground">よく使われるコンポーネントをすぐに確認</p>
          </div>
          <div className="gap-spacing-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {showcaseComponents.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="group p-spacing-md flex flex-col items-center justify-center rounded-lg bg-white transition-all hover:shadow-md"
              >
                <div className="bg-primary/10 mb-spacing-xs group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                  <Code2 className="text-primary h-6 w-6" />
                </div>
                <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                  {component.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-spacing-lg text-center">
            <Button variant="outline" onClick={() => router.push('/showcase')}>
              すべてのコンポーネントを見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="from-primary to-primary/80 p-spacing-2xl rounded-2xl bg-gradient-to-r text-center text-white">
          <h2 className="text-font-size-3xl font-font-weight-bold mb-spacing-md">
            今すぐ始めましょう
          </h2>
          <p className="text-font-size-lg mb-spacing-lg mx-auto max-w-2xl opacity-90">
            デジタル庁デザインシステムに準拠した、美しく機能的なUIを簡単に構築
          </p>
          <div className="gap-spacing-md flex flex-col justify-center sm:flex-row">
            <Button size="lg" variant="secondary" onClick={() => router.push('/showcase')}>
              <Users className="mr-2 h-4 w-4" />
              ショーケースを見る
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              ドキュメントを読む
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
