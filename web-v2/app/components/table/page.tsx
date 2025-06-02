import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const users = [
  { id: '001', name: '山田 太郎', email: 'yamada@example.com', role: 'admin', status: 'active' },
  { id: '002', name: '佐藤 花子', email: 'sato@example.com', role: 'editor', status: 'active' },
  { id: '003', name: '田中 次郎', email: 'tanaka@example.com', role: 'viewer', status: 'inactive' },
  { id: '004', name: '鈴木 美咲', email: 'suzuki@example.com', role: 'editor', status: 'pending' },
  { id: '005', name: '高橋 健太', email: 'takahashi@example.com', role: 'viewer', status: 'active' },
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
      return <Badge variant="success">アクティブ</Badge>
    case 'inactive':
      return <Badge variant="secondary">非アクティブ</Badge>
    case 'pending':
      return <Badge variant="warning">保留中</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">高</Badge>
    case 'medium':
      return <Badge variant="warning">中</Badge>
    case 'low':
      return <Badge variant="secondary">低</Badge>
    default:
      return <Badge>{priority}</Badge>
  }
}

export default function TablePage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Table コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            データを整理して表示するためのテーブルコンポーネント
          </p>
        </section>

        {/* 基本的なテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>基本的なテーブル</CardTitle>
            <CardDescription>
              シンプルなデータテーブルの例
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* ステータス付きテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>ステータス付きテーブル</CardTitle>
            <CardDescription>
              バッジやアクションボタンを含むテーブル
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      <div className="flex justify-end gap-spacing-xs">
                        <Button variant="outline" size="sm">編集</Button>
                        <Button variant="ghost" size="sm">削除</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* プログレス付きテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>プロジェクト管理テーブル</CardTitle>
            <CardDescription>
              プログレスバーと優先度を含むテーブル
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      <div className="flex items-center gap-spacing-sm">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground min-w-0">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{project.deadline}</TableCell>
                    <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">詳細</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 空のテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>空の状態</CardTitle>
            <CardDescription>
              データがない場合の表示例
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  <TableCell colSpan={4} className="text-center py-spacing-xl text-muted-foreground">
                    データがありません
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* レスポンシブテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>レスポンシブ対応</CardTitle>
            <CardDescription>
              画面サイズに応じて横スクロールが有効になります
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-spacing-sm">
              ※ 画面幅が狭い場合は横スクロールで内容を確認できます
            </div>
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
                  <TableCell><Badge variant="success">在籍</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">編集</Button>
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
                  <TableCell><Badge variant="success">在籍</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">編集</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              テーブルコンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>適切なテーブル構造（thead、tbody、th、td）</li>
              <li>キャプションによるテーブルの説明</li>
              <li>ヘッダーセルの明確な識別</li>
              <li>キーボードナビゲーション対応</li>
              <li>スクリーンリーダー対応</li>
              <li>横スクロール時のアクセシビリティ</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}