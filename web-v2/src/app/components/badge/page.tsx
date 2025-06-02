import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BadgePage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Badge コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            ステータスやカテゴリを示すためのバッジコンポーネント
          </p>
        </section>

        {/* バリアント */}
        <Card>
          <CardHeader>
            <CardTitle>バリアント</CardTitle>
            <CardDescription>
              用途に応じて選択できる様々なスタイルのバッジ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex flex-wrap gap-spacing-md">
              <Badge>デフォルト</Badge>
              <Badge variant="secondary">セカンダリ</Badge>
              <Badge variant="destructive">重要</Badge>
              <Badge variant="outline">アウトライン</Badge>
            </div>
          </CardContent>
        </Card>

        {/* セマンティックバリアント */}
        <Card>
          <CardHeader>
            <CardTitle>セマンティックバリアント</CardTitle>
            <CardDescription>
              意味を持つカラーバリエーション
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex flex-wrap gap-spacing-md">
              <Badge variant="success">成功</Badge>
              <Badge variant="warning">警告</Badge>
              <Badge variant="info">情報</Badge>
              <Badge variant="destructive">エラー</Badge>
            </div>
          </CardContent>
        </Card>

        {/* ステータス表示 */}
        <Card>
          <CardHeader>
            <CardTitle>ステータス表示</CardTitle>
            <CardDescription>
              システムの状態を表現する際の使用例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">ユーザーステータス</h3>
              <div className="flex flex-wrap gap-spacing-sm">
                <Badge variant="success">アクティブ</Badge>
                <Badge variant="warning">保留中</Badge>
                <Badge variant="secondary">非アクティブ</Badge>
                <Badge variant="destructive">停止中</Badge>
              </div>
            </div>
            
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">プロジェクトステータス</h3>
              <div className="flex flex-wrap gap-spacing-sm">
                <Badge variant="info">計画中</Badge>
                <Badge variant="warning">進行中</Badge>
                <Badge variant="success">完了</Badge>
                <Badge variant="destructive">中止</Badge>
                <Badge variant="outline">保留</Badge>
              </div>
            </div>
            
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">優先度</h3>
              <div className="flex flex-wrap gap-spacing-sm">
                <Badge variant="destructive">緊急</Badge>
                <Badge variant="warning">高</Badge>
                <Badge variant="default">中</Badge>
                <Badge variant="secondary">低</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* カテゴリ分類 */}
        <Card>
          <CardHeader>
            <CardTitle>カテゴリ分類</CardTitle>
            <CardDescription>
              コンテンツのカテゴリやタグを表現する例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">技術カテゴリ</h3>
              <div className="flex flex-wrap gap-spacing-sm">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">Node.js</Badge>
              </div>
            </div>
            
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">記事カテゴリ</h3>
              <div className="flex flex-wrap gap-spacing-sm">
                <Badge variant="info">技術</Badge>
                <Badge variant="success">デザイン</Badge>
                <Badge variant="warning">ビジネス</Badge>
                <Badge variant="secondary">その他</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数値付きバッジ */}
        <Card>
          <CardHeader>
            <CardTitle>数値付きバッジ</CardTitle>
            <CardDescription>
              通知数やカウントを表示する例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">通知</h3>
              <div className="flex flex-wrap gap-spacing-md items-center">
                <div className="flex items-center gap-spacing-sm">
                  <span>新着メッセージ</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center gap-spacing-sm">
                  <span>未読通知</span>
                  <Badge variant="warning">12</Badge>
                </div>
                <div className="flex items-center gap-spacing-sm">
                  <span>お気に入り</span>
                  <Badge variant="secondary">99+</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">在庫管理</h3>
              <div className="flex flex-wrap gap-spacing-md items-center">
                <div className="flex items-center gap-spacing-sm">
                  <span>在庫あり</span>
                  <Badge variant="success">245</Badge>
                </div>
                <div className="flex items-center gap-spacing-sm">
                  <span>残りわずか</span>
                  <Badge variant="warning">12</Badge>
                </div>
                <div className="flex items-center gap-spacing-sm">
                  <span>在庫切れ</span>
                  <Badge variant="destructive">5</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 実用例 */}
        <Card>
          <CardHeader>
            <CardTitle>実用的な使用例</CardTitle>
            <CardDescription>
              実際のアプリケーションでの使用パターン
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-lg">
            {/* ユーザーリスト */}
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">ユーザー管理</h3>
              <div className="space-y-spacing-xs">
                <div className="flex items-center justify-between p-spacing-sm border rounded">
                  <div>
                    <div className="font-medium">山田 太郎</div>
                    <div className="text-sm text-muted-foreground">yamada@example.com</div>
                  </div>
                  <div className="flex gap-spacing-xs">
                    <Badge variant="success">管理者</Badge>
                    <Badge variant="outline">アクティブ</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-spacing-sm border rounded">
                  <div>
                    <div className="font-medium">佐藤 花子</div>
                    <div className="text-sm text-muted-foreground">sato@example.com</div>
                  </div>
                  <div className="flex gap-spacing-xs">
                    <Badge variant="default">編集者</Badge>
                    <Badge variant="warning">保留中</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 商品リスト */}
            <div className="space-y-spacing-sm">
              <h3 className="font-medium">商品管理</h3>
              <div className="space-y-spacing-xs">
                <div className="flex items-center justify-between p-spacing-sm border rounded">
                  <div>
                    <div className="font-medium">ワイヤレスイヤホン</div>
                    <div className="text-sm text-muted-foreground">¥12,800</div>
                  </div>
                  <div className="flex gap-spacing-xs">
                    <Badge variant="success">在庫あり</Badge>
                    <Badge variant="outline">新商品</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-spacing-sm border rounded">
                  <div>
                    <div className="font-medium">スマートウォッチ</div>
                    <div className="text-sm text-muted-foreground">¥35,000</div>
                  </div>
                  <div className="flex gap-spacing-xs">
                    <Badge variant="warning">残りわずか</Badge>
                    <Badge variant="info">人気</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              バッジコンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>色だけでなくテキストでも情報を伝達</li>
              <li>十分なコントラスト比の確保</li>
              <li>適切なセマンティクス（role属性など）</li>
              <li>スクリーンリーダーでの適切な読み上げ</li>
              <li>フォーカス可能な要素での適切なフォーカス管理</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}