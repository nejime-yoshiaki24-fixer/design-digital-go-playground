import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function CardPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Card コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            情報をグループ化して表示するためのカードコンポーネント
          </p>
        </section>

        {/* 基本的なカード */}
        <section>
          <h2 className="text-font-size-2xl font-font-weight-semibold text-foreground mb-spacing-md">
            基本的なカード
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-lg">
            <Card>
              <CardHeader>
                <CardTitle>シンプルなカード</CardTitle>
                <CardDescription>基本的なカードの構造</CardDescription>
              </CardHeader>
              <CardContent>
                <p>カードの本文コンテンツが入ります。情報を整理して表示するのに適しています。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>フッター付きカード</CardTitle>
                <CardDescription>アクションボタンを含むカード</CardDescription>
              </CardHeader>
              <CardContent>
                <p>カードにはフッターを追加して、アクションボタンを配置できます。</p>
              </CardContent>
              <CardFooter>
                <Button>詳細を見る</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 実用的なカードパターン */}
        <section>
          <h2 className="text-font-size-2xl font-font-weight-semibold text-foreground mb-spacing-md">
            実用的なパターン
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-lg">
            {/* 統計カード */}
            <Card>
              <CardHeader className="pb-spacing-sm">
                <CardDescription>今月の訪問者数</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-font-size-3xl font-font-weight-bold">12,345</p>
                <p className="text-sm text-muted-foreground">前月比 +12.5%</p>
              </CardContent>
            </Card>

            {/* お知らせカード */}
            <Card>
              <CardHeader className="pb-spacing-sm">
                <CardTitle className="text-font-size-base">重要なお知らせ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">システムメンテナンスのため、12月1日（金）深夜1時から3時まで...</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">続きを読む</Button>
              </CardFooter>
            </Card>

            {/* ユーザープロファイルカード */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-muted mb-spacing-sm"></div>
                <CardTitle className="text-font-size-base">山田 太郎</CardTitle>
                <CardDescription>プロダクトマネージャー</CardDescription>
              </CardHeader>
              <CardFooter className="gap-spacing-sm">
                <Button size="sm">プロフィール</Button>
                <Button size="sm" variant="outline">メッセージ</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* カードのグループ化 */}
        <section>
          <h2 className="text-font-size-2xl font-font-weight-semibold text-foreground mb-spacing-md">
            カードのグループ化
          </h2>
          <div className="space-y-spacing-md">
            <Card>
              <CardHeader>
                <CardTitle>グリッドレイアウト</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-spacing-md">カードはグリッドシステムと組み合わせて、レスポンシブなレイアウトを作成できます。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-spacing-sm">
                  <div className="p-spacing-md bg-muted rounded-lg text-center">Item 1</div>
                  <div className="p-spacing-md bg-muted rounded-lg text-center">Item 2</div>
                  <div className="p-spacing-md bg-muted rounded-lg text-center">Item 3</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              カードコンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>セマンティックなHTML構造（article要素）</li>
              <li>適切な見出しレベルの階層構造</li>
              <li>十分なコントラスト比の確保</li>
              <li>フォーカス可能な要素への適切なフォーカス管理</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}