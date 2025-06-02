'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ButtonPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Button コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            様々な用途に対応するボタンコンポーネントのバリエーション
          </p>
        </section>

        {/* バリアント */}
        <Card>
          <CardHeader>
            <CardTitle>バリアント</CardTitle>
            <CardDescription>
              用途に応じて選択できる様々なスタイルのボタン
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex flex-wrap gap-spacing-md">
              <Button>デフォルト</Button>
              <Button variant="secondary">セカンダリ</Button>
              <Button variant="outline">アウトライン</Button>
              <Button variant="ghost">ゴースト</Button>
              <Button variant="destructive">破壊的アクション</Button>
            </div>
          </CardContent>
        </Card>

        {/* サイズ */}
        <Card>
          <CardHeader>
            <CardTitle>サイズ</CardTitle>
            <CardDescription>
              コンテキストに応じて選択できる3つのサイズ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex flex-wrap items-center gap-spacing-md">
              <Button size="sm">小サイズ</Button>
              <Button>標準サイズ</Button>
              <Button size="lg">大サイズ</Button>
            </div>
          </CardContent>
        </Card>

        {/* 状態 */}
        <Card>
          <CardHeader>
            <CardTitle>状態</CardTitle>
            <CardDescription>
              インタラクションやアクセシビリティのための状態表現
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex flex-wrap gap-spacing-md">
              <Button>通常状態</Button>
              <Button disabled>無効状態</Button>
            </div>
            <div className="text-sm text-muted-foreground">
              ※ ホバー、フォーカス、アクティブ状態は実際に操作してご確認ください
            </div>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              WCAG 2.1 AA準拠のアクセシビリティ機能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>キーボードナビゲーション対応（Tab、Enter、Space）</li>
              <li>フォーカスリングの表示</li>
              <li>適切なコントラスト比の確保</li>
              <li>スクリーンリーダー対応</li>
            </ul>
          </CardContent>
        </Card>

        {/* 使用例 */}
        <Card>
          <CardHeader>
            <CardTitle>使用例</CardTitle>
            <CardDescription>
              実際のユースケースでの使用例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-lg">
            <div>
              <h3 className="font-font-weight-semibold mb-spacing-sm">フォームアクション</h3>
              <div className="flex gap-spacing-sm">
                <Button type="submit">送信</Button>
                <Button type="button" variant="outline">キャンセル</Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-font-weight-semibold mb-spacing-sm">確認ダイアログ</h3>
              <div className="flex gap-spacing-sm">
                <Button variant="destructive">削除する</Button>
                <Button variant="ghost">キャンセル</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}