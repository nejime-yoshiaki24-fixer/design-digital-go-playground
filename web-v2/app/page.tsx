import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertWithIcon, AlertDescription } from '@/components/ui/alert'

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        {/* ヒーローセクション */}
        <section className="text-center py-spacing-3xl">
          <h1 className="text-font-size-5xl font-font-weight-bold text-foreground mb-spacing-md">
            デジタル庁デザインシステム
          </h1>
          <p className="text-font-size-xl text-muted-foreground mb-spacing-xl">
            Next.js App Router + TypeScript + Tailwind CSS v4 + shadcn/ui
          </p>
          <div className="flex justify-center gap-spacing-md">
            <Button size="lg">
              コンポーネントを見る
            </Button>
            <Button variant="outline" size="lg">
              ドキュメント
            </Button>
          </div>
        </section>

        {/* アラート */}
        <AlertWithIcon variant="info">
          <AlertDescription>
            このサイトは、デジタル庁デザインシステムに準拠した最新のWeb開発環境で構築されています。
          </AlertDescription>
        </AlertWithIcon>

        {/* 特徴カード */}
        <section>
          <h2 className="text-font-size-3xl font-font-weight-bold text-foreground mb-spacing-lg">
            主な特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-lg">
            <Card>
              <CardHeader>
                <CardTitle>最新の技術スタック</CardTitle>
                <CardDescription>
                  Next.js 15、React 19、TypeScript 5を使用した高速な開発環境
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  最新のツールチェインにより、開発効率と実行パフォーマンスを最大化
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>デザイントークン対応</CardTitle>
                <CardDescription>
                  デジタル庁デザインシステムのトークンを完全統合
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  色、スペーシング、タイポグラフィなど、統一されたデザイン言語を実装
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>アクセシビリティ重視</CardTitle>
                <CardDescription>
                  WCAG 2.1 AA準拠を目指した実装
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  すべてのユーザーが使いやすいインターフェースを提供
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ボタンバリエーション */}
        <section>
          <h2 className="text-font-size-2xl font-font-weight-bold text-foreground mb-spacing-md">
            ボタンコンポーネント
          </h2>
          <div className="flex flex-wrap gap-spacing-md">
            <Button>デフォルト</Button>
            <Button variant="secondary">セカンダリ</Button>
            <Button variant="outline">アウトライン</Button>
            <Button variant="ghost">ゴースト</Button>
            <Button variant="destructive">削除</Button>
            <Button disabled>無効</Button>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}