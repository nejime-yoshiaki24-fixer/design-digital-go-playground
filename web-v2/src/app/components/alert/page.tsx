'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Alert, AlertDescription, AlertTitle, AlertWithIcon } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AlertPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Alert コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            重要な情報やフィードバックを伝えるためのアラートコンポーネント
          </p>
        </section>

        {/* バリアント */}
        <Card>
          <CardHeader>
            <CardTitle>バリアント</CardTitle>
            <CardDescription>
              情報の種類に応じた4つのバリアント
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <AlertWithIcon variant="info">
              <AlertDescription>
                情報：お知らせや追加情報を伝える際に使用します。
              </AlertDescription>
            </AlertWithIcon>

            <AlertWithIcon variant="success">
              <AlertDescription>
                成功：操作が正常に完了したことを伝える際に使用します。
              </AlertDescription>
            </AlertWithIcon>

            <AlertWithIcon variant="warning">
              <AlertDescription>
                警告：注意が必要な情報を伝える際に使用します。
              </AlertDescription>
            </AlertWithIcon>

            <AlertWithIcon variant="error">
              <AlertDescription>
                エラー：エラーや問題が発生したことを伝える際に使用します。
              </AlertDescription>
            </AlertWithIcon>
          </CardContent>
        </Card>

        {/* タイトル付きアラート */}
        <Card>
          <CardHeader>
            <CardTitle>タイトル付きアラート</CardTitle>
            <CardDescription>
              より詳細な情報を含むアラート
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <Alert>
              <AlertTitle>お知らせ</AlertTitle>
              <AlertDescription>
                新しい機能がリリースされました。詳細はドキュメントをご確認ください。
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTitle>注意事項</AlertTitle>
              <AlertDescription>
                このアクションを実行すると、データが永久に削除されます。実行前に必ずバックアップを取ってください。
              </AlertDescription>
            </Alert>
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
          <CardContent className="space-y-spacing-md">
            {/* フォーム送信成功 */}
            <div className="space-y-spacing-sm">
              <h3 className="font-font-weight-semibold">フォーム送信後のフィードバック</h3>
              <AlertWithIcon variant="success">
                <AlertDescription>
                  お問い合わせを受け付けました。2営業日以内にご連絡いたします。
                </AlertDescription>
              </AlertWithIcon>
            </div>

            {/* システムメンテナンス */}
            <div className="space-y-spacing-sm">
              <h3 className="font-font-weight-semibold">システムメンテナンスのお知らせ</h3>
              <Alert variant="warning">
                <AlertTitle>メンテナンス予定</AlertTitle>
                <AlertDescription>
                  12月15日（金）午前2時〜4時の間、システムメンテナンスを実施します。
                  この間、サービスをご利用いただけません。
                </AlertDescription>
              </Alert>
            </div>

            {/* エラーメッセージ */}
            <div className="space-y-spacing-sm">
              <h3 className="font-font-weight-semibold">エラー通知</h3>
              <AlertWithIcon variant="error">
                <AlertDescription>
                  ファイルのアップロードに失敗しました。ファイルサイズが上限（10MB）を超えています。
                </AlertDescription>
              </AlertWithIcon>
            </div>
          </CardContent>
        </Card>

        {/* ベストプラクティス */}
        <Card>
          <CardHeader>
            <CardTitle>使用上のベストプラクティス</CardTitle>
            <CardDescription>
              効果的なアラートの使い方
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-spacing-sm text-muted-foreground">
              <li className="flex items-start gap-spacing-sm">
                <span className="text-primary">•</span>
                <span>重要度に応じて適切なバリアントを選択する</span>
              </li>
              <li className="flex items-start gap-spacing-sm">
                <span className="text-primary">•</span>
                <span>簡潔で明確なメッセージを心がける</span>
              </li>
              <li className="flex items-start gap-spacing-sm">
                <span className="text-primary">•</span>
                <span>必要に応じてアクションボタンを含める</span>
              </li>
              <li className="flex items-start gap-spacing-sm">
                <span className="text-primary">•</span>
                <span>一時的な通知の場合は自動的に非表示にする</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              アラートコンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>role="alert"属性による適切なセマンティクス</li>
              <li>アイコンと色だけでなくテキストでも情報を伝達</li>
              <li>十分なコントラスト比の確保</li>
              <li>スクリーンリーダーでの適切な読み上げ</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}