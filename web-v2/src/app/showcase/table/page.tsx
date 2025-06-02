'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'

const users = [
  { id: '001', name: '山田 太郎', email: 'yamada@example.com', role: 'admin', status: 'active' },
  { id: '002', name: '佐藤 花子', email: 'sato@example.com', role: 'editor', status: 'active' },
  { id: '003', name: '田中 次郎', email: 'tanaka@example.com', role: 'viewer', status: 'inactive' },
  { id: '004', name: '鈴木 美咲', email: 'suzuki@example.com', role: 'editor', status: 'pending' },
  {
    id: '005',
    name: '高橋 健太',
    email: 'takahashi@example.com',
    role: 'viewer',
    status: 'active',
  },
]

const projects = [
  { name: 'ウェブサイトリニューアル', progress: 85, deadline: '2024-03-15', priority: 'high' },
  { name: 'モバイルアプリ開発', progress: 42, deadline: '2024-04-30', priority: 'medium' },
  { name: 'デザインシステム構築', progress: 90, deadline: '2024-02-28', priority: 'high' },
  { name: 'マーケティング戦略立案', progress: 15, deadline: '2024-05-15', priority: 'low' },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">アクティブ</span>
      )
    case 'inactive':
      return (
        <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">非アクティブ</span>
      )
    case 'pending':
      return <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">保留中</span>
    default:
      return <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">{status}</span>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">高</span>
    case 'medium':
      return <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">中</span>
    case 'low':
      return <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">低</span>
    default:
      return <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">{priority}</span>
  }
}

export default function TableShowcasePage() {
  const tableProps = [
    {
      name: 'className',
      type: 'string',
      description: 'テーブルに適用する追加のCSSクラス',
    },
  ]

  const tableSubcomponentProps = [
    {
      component: 'TableHeader',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'ヘッダー部分に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'TableBody',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'ボディ部分に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'TableRow',
      props: [
        {
          name: 'className',
          type: 'string',
          description: '行に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'TableHead',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'ヘッダーセルに適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'TableCell',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'セルに適用する追加のCSSクラス',
        },
        {
          name: 'colSpan',
          type: 'number',
          description: '列の結合数',
        },
      ],
    },
    {
      component: 'TableCaption',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'キャプションに適用する追加のCSSクラス',
        },
      ],
    },
  ]

  const basicUsageCode = `import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

// 基本的なテーブル
<Table>
  <TableCaption>社員一覧</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>名前</TableHead>
      <TableHead>メールアドレス</TableHead>
      <TableHead>ロール</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">001</TableCell>
      <TableCell>山田 太郎</TableCell>
      <TableCell>yamada@example.com</TableCell>
      <TableCell>admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">002</TableCell>
      <TableCell>佐藤 花子</TableCell>
      <TableCell>sato@example.com</TableCell>
      <TableCell>editor</TableCell>
    </TableRow>
  </TableBody>
</Table>`

  const actionTableCode = `// アクション付きテーブル
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>名前</TableHead>
      <TableHead>ステータス</TableHead>
      <TableHead className="text-right">アクション</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>山田 太郎</TableCell>
      <TableCell>
        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
          アクティブ
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">編集</Button>
          <Button variant="ghost" size="sm">削除</Button>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`

  const emptyStateCode = `// 空の状態
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>名前</TableHead>
      <TableHead>作成日</TableHead>
      <TableHead>ステータス</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell colSpan={4} className="text-center py-8 text-text-secondary">
        データがありません
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`

  return (
    <ShowcaseLayout
      title="Table"
      description="データを整理して表示するためのテーブルコンポーネント"
    >
      {/* 基本的なテーブル */}
      <ShowcaseSection title="基本的なテーブル" description="シンプルなデータテーブル">
        <Table>
          <TableCaption>社員一覧</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>ロール</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      {/* ステータス付きテーブル */}
      <ShowcaseSection
        title="ステータス付きテーブル"
        description="バッジやアクションボタンを含むテーブル"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                    <Button variant="ghost" size="sm">
                      削除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      {/* プログレス付きテーブル */}
      <ShowcaseSection
        title="プロジェクト管理テーブル"
        description="プログレスバーと優先度を含むテーブル"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>プロジェクト名</TableHead>
              <TableHead>進捗</TableHead>
              <TableHead>期限</TableHead>
              <TableHead>優先度</TableHead>
              <TableHead className="text-right">アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.name}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-bg-secondary h-2 w-full rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-text-secondary min-w-0 text-sm">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{project.deadline}</TableCell>
                <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ShowcaseSection>

      {/* 空の状態 */}
      <ShowcaseSection title="空の状態" description="データがない場合の表示例">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>作成日</TableHead>
              <TableHead>ステータス</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-text-secondary py-8 text-center">
                データがありません
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ShowcaseSection>

      {/* レスポンシブテーブル */}
      <ShowcaseSection title="レスポンシブ対応" description="画面サイズに応じて横スクロールが有効">
        <div className="text-text-secondary mb-2 text-sm">
          ※ 画面幅が狭い場合は横スクロールで内容を確認できます
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>電話番号</TableHead>
                <TableHead>部署</TableHead>
                <TableHead>役職</TableHead>
                <TableHead>入社日</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>001</TableCell>
                <TableCell>山田 太郎</TableCell>
                <TableCell>yamada@example.com</TableCell>
                <TableCell>090-1234-5678</TableCell>
                <TableCell>開発部</TableCell>
                <TableCell>エンジニア</TableCell>
                <TableCell>2023-04-01</TableCell>
                <TableCell>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                    在籍
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>002</TableCell>
                <TableCell>佐藤 花子</TableCell>
                <TableCell>sato@example.com</TableCell>
                <TableCell>090-9876-5432</TableCell>
                <TableCell>デザイン部</TableCell>
                <TableCell>デザイナー</TableCell>
                <TableCell>2023-05-15</TableCell>
                <TableCell>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                    在籍
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ShowcaseSection>

      {/* コード例 */}
      <ShowcaseSection title="コード例">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">基本的な使用方法</h3>
            <CodeBlock code={basicUsageCode} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">アクション付きテーブル</h3>
            <CodeBlock code={actionTableCode} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">空の状態</h3>
            <CodeBlock code={emptyStateCode} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Props */}
      <ShowcaseSection title="Props">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">Table</h3>
            <PropsTable props={tableProps} />
          </div>
          {tableSubcomponentProps.map((subcomponent) => (
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
            <li>データの比較や一覧表示に使用</li>
            <li>列数が多い場合は横スクロールで対応</li>
            <li>重要な列（ID、名前など）は固定幅を避けて内容に応じた幅に</li>
            <li>アクションボタンは右端に配置</li>
            <li>数値データは右寄せ、テキストは左寄せ</li>
            <li>ヘッダーは内容を明確に表現</li>
            <li>空の状態は適切なメッセージを表示</li>
            <li>ソート機能が必要な場合は視覚的にわかりやすく表示</li>
          </ul>
        </div>
      </ShowcaseSection>

      {/* アクセシビリティ */}
      <ShowcaseSection title="アクセシビリティ">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>適切なテーブル構造（thead、tbody、th、td）を使用</li>
            <li>TableCaption でテーブルの説明を提供</li>
            <li>ヘッダーセル（th）でカラムの意味を明確に</li>
            <li>キーボードナビゲーション（Tab、矢印キー）に対応</li>
            <li>フォーカス可能な要素には適切なフォーカス表示</li>
            <li>横スクロール時もキーボード操作可能</li>
            <li>スクリーンリーダーでの読み上げ順序を考慮</li>
            <li>ソート状態は aria-sort で伝達</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
