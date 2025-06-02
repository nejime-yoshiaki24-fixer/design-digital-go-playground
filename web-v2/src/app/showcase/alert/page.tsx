'use client'

import { Alert, AlertDescription, AlertTitle, AlertWithIcon } from '@/components/ui/alert'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'

export default function AlertShowcasePage() {
  const alertProps = [
    {
      name: 'variant',
      type: '"default" | "success" | "warning" | "error"',
      defaultValue: '"default"',
      description: 'アラートの種類とスタイル',
    },
    {
      name: 'className',
      type: 'string',
      description: 'アラートに適用する追加のCSSクラス',
    },
  ]

  const alertSubcomponentProps = [
    {
      component: 'AlertTitle',
      props: [
        {
          name: 'className',
          type: 'string',
          description: 'タイトルに適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'AlertDescription',
      props: [
        {
          name: 'className',
          type: 'string',
          description: '説明文に適用する追加のCSSクラス',
        },
      ],
    },
    {
      component: 'AlertWithIcon',
      props: [
        {
          name: 'variant',
          type: '"info" | "success" | "warning" | "error"',
          defaultValue: '"info"',
          description: 'アラートの種類（アイコン付き）',
        },
        {
          name: 'className',
          type: 'string',
          description: 'アラートに適用する追加のCSSクラス',
        },
      ],
    },
  ]

  const basicUsageCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// 基本的なアラート
<Alert>
  <AlertDescription>
    基本的なお知らせメッセージです。
  </AlertDescription>
</Alert>

// タイトル付きアラート
<Alert>
  <AlertTitle>重要なお知らせ</AlertTitle>
  <AlertDescription>
    タイトルと説明文を含むアラートです。
  </AlertDescription>
</Alert>

// バリアント付きアラート
<Alert variant="warning">
  <AlertTitle>注意事項</AlertTitle>
  <AlertDescription>
    注意が必要な情報をお伝えします。
  </AlertDescription>
</Alert>`

  const iconAlertCode = `import { AlertWithIcon, AlertDescription } from '@/components/ui/alert'

// アイコン付きアラート
<AlertWithIcon variant="success">
  <AlertDescription>
    操作が正常に完了しました。
  </AlertDescription>
</AlertWithIcon>

<AlertWithIcon variant="error">
  <AlertDescription>
    エラーが発生しました。しばらく経ってから再度お試しください。
  </AlertDescription>
</AlertWithIcon>

<AlertWithIcon variant="warning">
  <AlertDescription>
    この操作は元に戻すことができません。
  </AlertDescription>
</AlertWithIcon>

<AlertWithIcon variant="info">
  <AlertDescription>
    新しい機能がリリースされました。
  </AlertDescription>
</AlertWithIcon>`

  return (
    <ShowcaseLayout
      title="Alert"
      description="重要な情報やフィードバックを伝えるためのアラートコンポーネント"
    >
      {/* バリアント */}
      <ShowcaseSection title="バリアント" description="情報の種類に応じた4つのバリアント">
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              デフォルト：一般的な情報やお知らせを伝える際に使用します。
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <AlertDescription>
              成功：操作が正常に完了したことを伝える際に使用します。
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertDescription>警告：注意が必要な情報を伝える際に使用します。</AlertDescription>
          </Alert>

          <Alert variant="error">
            <AlertDescription>
              エラー：エラーや問題が発生したことを伝える際に使用します。
            </AlertDescription>
          </Alert>
        </div>
      </ShowcaseSection>

      {/* アイコン付きアラート */}
      <ShowcaseSection
        title="アイコン付きアラート"
        description="視覚的にわかりやすいアイコン付きバージョン"
      >
        <div className="space-y-4">
          <AlertWithIcon variant="info">
            <AlertDescription>情報：お知らせや追加情報を伝える際に使用します。</AlertDescription>
          </AlertWithIcon>

          <AlertWithIcon variant="success">
            <AlertDescription>
              成功：操作が正常に完了したことを伝える際に使用します。
            </AlertDescription>
          </AlertWithIcon>

          <AlertWithIcon variant="warning">
            <AlertDescription>警告：注意が必要な情報を伝える際に使用します。</AlertDescription>
          </AlertWithIcon>

          <AlertWithIcon variant="error">
            <AlertDescription>
              エラー：エラーや問題が発生したことを伝える際に使用します。
            </AlertDescription>
          </AlertWithIcon>
        </div>
      </ShowcaseSection>

      {/* タイトル付きアラート */}
      <ShowcaseSection title="タイトル付きアラート" description="より詳細な情報を含むアラート">
        <div className="space-y-4">
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

          <Alert variant="error">
            <AlertTitle>システムエラー</AlertTitle>
            <AlertDescription>
              現在システムに問題が発生しています。復旧まで今しばらくお待ちください。詳細は
              <a href="#" className="underline">
                サポートページ
              </a>
              をご確認ください。
            </AlertDescription>
          </Alert>
        </div>
      </ShowcaseSection>

      {/* 実用例 */}
      <ShowcaseSection title="実用的な使用例" description="実際のアプリケーションでの使用パターン">
        <div className="space-y-6">
          {/* フォーム送信成功 */}
          <div className="space-y-2">
            <h3 className="font-semibold">フォーム送信後のフィードバック</h3>
            <AlertWithIcon variant="success">
              <AlertDescription>
                お問い合わせを受け付けました。2営業日以内にご連絡いたします。
              </AlertDescription>
            </AlertWithIcon>
          </div>

          {/* システムメンテナンス */}
          <div className="space-y-2">
            <h3 className="font-semibold">システムメンテナンスのお知らせ</h3>
            <Alert variant="warning">
              <AlertTitle>メンテナンス予定</AlertTitle>
              <AlertDescription>
                12月15日（金）午前2時〜4時の間、システムメンテナンスを実施します。
                この間、サービスをご利用いただけません。
              </AlertDescription>
            </Alert>
          </div>

          {/* エラーメッセージ */}
          <div className="space-y-2">
            <h3 className="font-semibold">エラー通知</h3>
            <AlertWithIcon variant="error">
              <AlertDescription>
                ファイルのアップロードに失敗しました。ファイルサイズが上限（10MB）を超えています。
              </AlertDescription>
            </AlertWithIcon>
          </div>

          {/* セキュリティ通知 */}
          <div className="space-y-2">
            <h3 className="font-semibold">セキュリティ通知</h3>
            <AlertWithIcon variant="info">
              <AlertDescription>
                お客様のアカウントに新しいデバイスからのログインを検出しました。
                心当たりがない場合は、パスワードの変更をお願いします。
              </AlertDescription>
            </AlertWithIcon>
          </div>
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
            <h3 className="mb-3 text-sm font-medium">アイコン付きアラート</h3>
            <CodeBlock code={iconAlertCode} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Props */}
      <ShowcaseSection title="Props">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">Alert</h3>
            <PropsTable props={alertProps} />
          </div>
          {alertSubcomponentProps.map((subcomponent) => (
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
            <li>重要度に応じて適切なバリアントを選択する</li>
            <li>簡潔で明確なメッセージを心がける</li>
            <li>緊急性の高い情報には error バリアントを使用</li>
            <li>成功フィードバックには success バリアントを使用</li>
            <li>必要に応じてアクションボタンやリンクを含める</li>
            <li>一時的な通知の場合は自動的に非表示にする機能を検討</li>
            <li>同時に表示するアラートの数は最小限に抑える</li>
            <li>長いメッセージの場合は適切な改行を入れる</li>
          </ul>
        </div>
      </ShowcaseSection>

      {/* ベストプラクティス */}
      <ShowcaseSection title="ベストプラクティス">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-text-body mb-2 font-medium">推奨事項</h4>
              <ul className="space-y-1">
                <li>• 明確で具体的なメッセージ</li>
                <li>• 適切なバリアントの選択</li>
                <li>• ユーザーが取るべき行動の明示</li>
                <li>• 一貫性のある表現</li>
              </ul>
            </div>
            <div>
              <h4 className="text-text-body mb-2 font-medium">避けるべき事項</h4>
              <ul className="space-y-1">
                <li>• 曖昧で不明確なメッセージ</li>
                <li>• 過度に技術的な専門用語</li>
                <li>• 複数の異なる情報を一つに混在</li>
                <li>• 不必要に長いメッセージ</li>
              </ul>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* アクセシビリティ */}
      <ShowcaseSection title="アクセシビリティ">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>role="alert" 属性による適切なセマンティクス</li>
            <li>アイコンと色だけでなくテキストでも情報を伝達</li>
            <li>十分なコントラスト比の確保（WCAG AA準拠）</li>
            <li>スクリーンリーダーでの適切な読み上げ</li>
            <li>フォーカス可能な要素（リンク、ボタン）の適切な管理</li>
            <li>ライブリージョンを活用した動的な通知</li>
            <li>高コントラストモードでの視認性確保</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
