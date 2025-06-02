'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'

export default function CardShowcasePage() {
  const cardProps = [
    {
      name: 'className',
      type: 'string',
      description: 'カードコンテナに適用する追加のCSSクラス',
    },
  ]

  const cardSubcomponentProps = [
    {
      component: 'CardHeader',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'ヘッダー部分に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'CardTitle',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'タイトルに適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'CardDescription',
      props: [
        {
          name: 'className',
          type: 'string',
          description: '説明文に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'CardContent',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'コンテンツ部分に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'CardFooter',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'フッター部分に適用する追加のCSSクラス',
        },
      ],
    },
  ]

  const basicUsageCode = `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 基本的なカード
<Card>
  <CardHeader>
    <CardTitle>カードタイトル</CardTitle>
    <CardDescription>カードの説明文</CardDescription>
  </CardHeader>
  <CardContent>
    <p>カードの本文コンテンツが入ります。</p>
  </CardContent>
</Card>

// アクション付きカード
<Card>
  <CardHeader>
    <CardTitle>お知らせ</CardTitle>
    <CardDescription>新しい機能がリリースされました</CardDescription>
  </CardHeader>
  <CardContent>
    <p>詳細な説明文...</p>
  </CardContent>
  <CardFooter>
    <Button>詳細を見る</Button>
  </CardFooter>
</Card>`

  const complexExampleCode = `// 統計カード
<Card>
  <CardHeader className="pb-2">
    <CardDescription>今月の訪問者数</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">12,345</p>
    <p className="text-sm text-text-secondary">前月比 +12.5%</p>
  </CardContent>
</Card>

// プロファイルカード
<Card>
  <CardHeader>
    <div className="w-12 h-12 rounded-full bg-bg-secondary mb-3"></div>
    <CardTitle className="text-base">山田 太郎</CardTitle>
    <CardDescription>プロダクトマネージャー</CardDescription>
  </CardHeader>
  <CardFooter className="gap-2">
    <Button size="sm">プロフィール</Button>
    <Button size="sm" variant="outline">メッセージ</Button>
  </CardFooter>
</Card>`

  return (
    <ShowcaseLayout
      title="Card"
      description="情報をグループ化して表示するためのカードコンポーネント"
    >
      {/* 基本的なカード */}
      <ShowcaseSection title="基本的な構造" description="カードの基本的な構成要素">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
      </ShowcaseSection>

      {/* 実用的なパターン */}
      <ShowcaseSection title="実用的なパターン" description="よく使われるカードのパターン例">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* 統計カード */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>今月の訪問者数</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12,345</p>
              <p className="text-text-secondary text-sm">前月比 +12.5%</p>
            </CardContent>
          </Card>

          {/* お知らせカード */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">重要なお知らせ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                システムメンテナンスのため、12月1日（金）深夜1時から3時まで...
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                続きを読む
              </Button>
            </CardFooter>
          </Card>

          {/* ユーザープロファイルカード */}
          <Card>
            <CardHeader>
              <div className="bg-bg-secondary mb-3 h-12 w-12 rounded-full"></div>
              <CardTitle className="text-base">山田 太郎</CardTitle>
              <CardDescription>プロダクトマネージャー</CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Button size="sm">プロフィール</Button>
              <Button size="sm" variant="outline">
                メッセージ
              </Button>
            </CardFooter>
          </Card>
        </div>
      </ShowcaseSection>

      {/* カスタマイズ例 */}
      <ShowcaseSection title="カスタマイズ例" description="様々なスタイルのカード">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* ボーダーなし */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>影付きカード</CardTitle>
              <CardDescription>ボーダーなしで影を付けたスタイル</CardDescription>
            </CardHeader>
            <CardContent>
              <p>border-0 と shadow-md クラスを組み合わせて、モダンな見た目に。</p>
            </CardContent>
          </Card>

          {/* 背景色付き */}
          <Card className="bg-bg-secondary border-0">
            <CardHeader>
              <CardTitle>背景色付きカード</CardTitle>
              <CardDescription>背景色でコンテンツを強調</CardDescription>
            </CardHeader>
            <CardContent>
              <p>bg-bg-secondary クラスで背景色を変更できます。</p>
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>

      {/* グリッドレイアウト */}
      <ShowcaseSection title="レイアウトパターン" description="カードを使ったレイアウト例">
        <Card>
          <CardHeader>
            <CardTitle>グリッドレイアウト</CardTitle>
            <CardDescription>レスポンシブなカードグリッド</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              カードはグリッドシステムと組み合わせて、レスポンシブなレイアウトを作成できます。
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p>カード 1</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p>カード 2</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p>カード 3</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </ShowcaseSection>

      {/* コード例 */}
      <ShowcaseSection title="コード例">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">基本的な使用方法</h3>
            <CodeBlock code={basicUsageCode} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">応用例</h3>
            <CodeBlock code={complexExampleCode} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Props */}
      <ShowcaseSection title="Props">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">Card</h3>
            <PropsTable props={cardProps} />
          </div>
          {cardSubcomponentProps.map((subcomponent) => (
            <div key={subcomponent.component}>
              <h3 className="mb-3 text-sm font-medium">{subcomponent.component}</h3>
              <PropsTable props={subcomponent.props} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* 使用ガイドライン */}
      <ShowcaseSection title="使用ガイドライン">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>関連する情報をグループ化して表示する際に使用</li>
            <li>カード間の余白は一貫性を保つ（16px または 24px を推奨）</li>
            <li>カード内のコンテンツは適切な階層構造を維持</li>
            <li>アクションが必要な場合はフッターに配置</li>
            <li>カードの幅は内容に応じて適切に設定</li>
            <li>モバイルでは垂直スタックになるようレスポンシブ対応</li>
          </ul>
        </div>
      </ShowcaseSection>

      {/* アクセシビリティ */}
      <ShowcaseSection title="アクセシビリティ">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>セマンティックなHTML構造（article要素として実装）</li>
            <li>適切な見出しレベルの階層構造を維持</li>
            <li>十分なコントラスト比の確保（WCAG AA準拠）</li>
            <li>フォーカス可能な要素への適切なフォーカス管理</li>
            <li>カード全体をクリック可能にする場合は適切なフォーカス表示</li>
            <li>スクリーンリーダーでの読み上げ順序を考慮した構造</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
