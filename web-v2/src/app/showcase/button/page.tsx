'use client'

import { Button } from '@/components/ui/button'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'
import { ArrowRight, Download, Heart, Trash2 } from 'lucide-react'

export default function ButtonShowcasePage() {
  const buttonProps = [
    {
      name: 'variant',
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive"',
      defaultValue: '"default"',
      description: 'ボタンの外観バリエーション',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg" | "icon"',
      defaultValue: '"md"',
      description: 'ボタンのサイズ',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'ボタンの無効化状態',
    },
    {
      name: 'className',
      type: 'string',
      description: '追加のCSSクラス',
    },
    {
      name: 'onClick',
      type: '() => void',
      description: 'クリック時のイベントハンドラー',
    },
  ]

  const basicUsageCode = `import { Button } from '@/components/ui/button'

// 基本的な使用方法
<Button>デフォルトボタン</Button>

// バリエーション
<Button variant="secondary">セカンダリ</Button>
<Button variant="outline">アウトライン</Button>

// サイズ
<Button size="sm">小サイズ</Button>
<Button size="lg">大サイズ</Button>

// アイコン付き
<Button>
  次へ <ArrowRight className="ml-2 h-4 w-4" />
</Button>`

  return (
    <ShowcaseLayout title="Button" description="様々な用途に対応するボタンコンポーネント">
      {/* 基本的なバリエーション */}
      <ShowcaseSection title="バリエーション">
        <div className="flex flex-wrap gap-4">
          <Button>デフォルト</Button>
          <Button variant="secondary">セカンダリ</Button>
          <Button variant="outline">アウトライン</Button>
          <Button variant="ghost">ゴースト</Button>
          <Button variant="destructive">削除</Button>
        </div>
      </ShowcaseSection>

      {/* サイズ */}
      <ShowcaseSection title="サイズ">
        <div className="flex items-center gap-4">
          <Button size="sm">小サイズ</Button>
          <Button size="md">中サイズ（デフォルト）</Button>
          <Button size="lg">大サイズ</Button>
        </div>
      </ShowcaseSection>

      {/* アイコン付き */}
      <ShowcaseSection title="アイコン付きボタン" description="アイコンと組み合わせて使用できます">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              ダウンロード
            </Button>
            <Button variant="secondary">
              続きを読む
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              お気に入り
            </Button>
          </div>
          <div className="flex gap-4">
            <Button size="icon" variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ShowcaseSection>

      {/* 状態 */}
      <ShowcaseSection title="状態">
        <div className="space-y-4">
          <div>
            <h3 className="text-text-secondary mb-2 text-sm font-medium">無効状態</h3>
            <div className="flex gap-4">
              <Button disabled>無効（デフォルト）</Button>
              <Button variant="secondary" disabled>
                無効（セカンダリ）
              </Button>
              <Button variant="outline" disabled>
                無効（アウトライン）
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-text-secondary mb-2 text-sm font-medium">読み込み中</h3>
            <div className="flex gap-4">
              <Button disabled>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                処理中...
              </Button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* 幅の調整 */}
      <ShowcaseSection title="幅の調整" description="必要に応じて幅を調整できます">
        <div className="max-w-sm space-y-2">
          <Button className="w-full">幅100%のボタン</Button>
          <Button className="w-full" variant="outline">
            幅100%のアウトライン
          </Button>
        </div>
      </ShowcaseSection>

      {/* コード例 */}
      <ShowcaseSection title="コード例">
        <CodeBlock code={basicUsageCode} />
      </ShowcaseSection>

      {/* Props */}
      <ShowcaseSection title="Props">
        <PropsTable props={buttonProps} />
      </ShowcaseSection>

      {/* 使用ガイドライン */}
      <ShowcaseSection title="使用ガイドライン">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>主要なアクションにはデフォルトバリアントを使用</li>
            <li>破壊的なアクション（削除など）にはdestructiveバリアントを使用</li>
            <li>最小タップ領域は44×44pxを確保（アクセシビリティ）</li>
            <li>ボタンテキストは動詞で始める（例：「保存する」「キャンセル」）</li>
            <li>処理中はローディング状態を表示してフィードバックを提供</li>
            <li>同じ階層のボタンは同じサイズで統一</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
