'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function InputPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Input コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            テキスト入力フィールドのコンポーネント
          </p>
        </section>

        {/* 基本的な入力フィールド */}
        <Card>
          <CardHeader>
            <CardTitle>基本的な入力フィールド</CardTitle>
            <CardDescription>
              様々なタイプの入力フィールド
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">テキスト入力</label>
              <Input type="text" placeholder="テキストを入力してください" />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">メールアドレス</label>
              <Input type="email" placeholder="example@email.com" />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">パスワード</label>
              <Input type="password" placeholder="パスワードを入力" />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">数値入力</label>
              <Input type="number" placeholder="0" />
            </div>
          </CardContent>
        </Card>

        {/* 状態 */}
        <Card>
          <CardHeader>
            <CardTitle>状態</CardTitle>
            <CardDescription>
              入力フィールドの様々な状態
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">通常状態</label>
              <Input placeholder="通常の入力フィールド" />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">無効状態</label>
              <Input placeholder="無効な入力フィールド" disabled />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">読み取り専用</label>
              <Input value="読み取り専用のテキスト" readOnly />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium text-destructive">エラー状態</label>
              <Input placeholder="エラーのある入力" error />
              <p className="text-sm text-destructive">入力内容に誤りがあります</p>
            </div>
          </CardContent>
        </Card>

        {/* サイズバリエーション */}
        <Card>
          <CardHeader>
            <CardTitle>カスタマイズ例</CardTitle>
            <CardDescription>
              様々なカスタマイズ方法
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">フルサイズ</label>
              <Input placeholder="横幅いっぱいの入力フィールド" className="w-full" />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">中サイズ</label>
              <Input placeholder="中サイズ" className="w-64" />
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">小サイズ</label>
              <Input placeholder="小" className="w-32" />
            </div>
          </CardContent>
        </Card>

        {/* 実用例 */}
        <Card>
          <CardHeader>
            <CardTitle>実用的な使用例</CardTitle>
            <CardDescription>
              実際のフォームでの使用例
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-spacing-md max-w-md">
              <div className="space-y-spacing-sm">
                <label htmlFor="name" className="text-sm font-medium">
                  お名前 <span className="text-destructive">*</span>
                </label>
                <Input id="name" required placeholder="山田 太郎" />
              </div>
              
              <div className="space-y-spacing-sm">
                <label htmlFor="email" className="text-sm font-medium">
                  メールアドレス <span className="text-destructive">*</span>
                </label>
                <Input id="email" type="email" required placeholder="taro@example.com" />
              </div>
              
              <div className="space-y-spacing-sm">
                <label htmlFor="tel" className="text-sm font-medium">
                  電話番号
                </label>
                <Input id="tel" type="tel" placeholder="090-1234-5678" />
              </div>
              
              <div className="space-y-spacing-sm">
                <label htmlFor="message" className="text-sm font-medium">
                  備考
                </label>
                <Input id="message" placeholder="ご要望などあれば記入してください" />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              入力コンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>適切なラベルの関連付け（label要素またはaria-label）</li>
              <li>キーボードナビゲーション対応</li>
              <li>フォーカス時の視覚的フィードバック</li>
              <li>エラー状態の明確な表示</li>
              <li>スクリーンリーダー対応</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}