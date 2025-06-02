'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'

export default function CheckboxShowcasePage() {
  const checkboxProps = [
    {
      name: 'id',
      type: 'string',
      description: 'チェックボックスのID（ラベルとの関連付けに必須）',
      required: true,
    },
    {
      name: 'checked',
      type: 'boolean',
      description: 'チェック状態（制御コンポーネント用）',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      defaultValue: 'false',
      description: 'デフォルトのチェック状態（非制御コンポーネント用）',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '無効化状態',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'エラー状態の表示',
    },
    {
      name: 'onChange',
      type: '(checked: boolean) => void',
      description: 'チェック状態変更時のイベントハンドラー',
    },
    {
      name: 'className',
      type: 'string',
      description: '追加のCSSクラス',
    },
  ]

  const basicUsageCode = `import { Checkbox } from '@/components/ui/checkbox'

// 基本的な使用方法
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
    利用規約に同意する
  </label>
</div>

// デフォルトでチェック済み
<div className="flex items-center space-x-2">
  <Checkbox id="newsletter" defaultChecked />
  <label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">
    ニュースレターを受け取る
  </label>
</div>

// エラー状態
<div className="flex items-center space-x-2">
  <Checkbox id="required" error />
  <label htmlFor="required" className="text-sm font-medium cursor-pointer">
    必須項目
  </label>
  <span className="text-sm text-error">選択してください</span>
</div>`

  const groupExampleCode = `// チェックボックスグループ
<fieldset className="space-y-3">
  <legend className="text-sm font-medium mb-3">
    興味のある分野を選択してください
  </legend>
  
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox id="tech" />
      <label htmlFor="tech" className="text-sm cursor-pointer">
        テクノロジー
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <Checkbox id="design" />
      <label htmlFor="design" className="text-sm cursor-pointer">
        デザイン
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <Checkbox id="business" />
      <label htmlFor="business" className="text-sm cursor-pointer">
        ビジネス
      </label>
    </div>
  </div>
</fieldset>`

  const formExampleCode = `// フォーム例
<form className="space-y-6 max-w-md">
  <fieldset className="space-y-3">
    <legend className="text-sm font-medium">
      アカウント設定
    </legend>
    
    <div className="flex items-center space-x-2">
      <Checkbox id="email-notifications" defaultChecked />
      <label htmlFor="email-notifications" className="text-sm cursor-pointer">
        メール通知を有効にする
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <Checkbox id="sms-notifications" />
      <label htmlFor="sms-notifications" className="text-sm cursor-pointer">
        SMS通知を有効にする
      </label>
    </div>
  </fieldset>
  
  <div className="border-t pt-4">
    <div className="flex items-start space-x-2">
      <Checkbox id="terms-agree" className="mt-1" />
      <label htmlFor="terms-agree" className="text-sm cursor-pointer">
        <span className="text-error">*</span> 
        <a href="#" className="text-primary hover:underline">利用規約</a>
        および
        <a href="#" className="text-primary hover:underline">プライバシーポリシー</a>
        に同意する
      </label>
    </div>
  </div>
</form>`

  return (
    <ShowcaseLayout
      title="Checkbox"
      description="複数選択や同意確認に使用するチェックボックスコンポーネント"
    >
      {/* 基本的な使用例 */}
      <ShowcaseSection title="基本的な使用例" description="単一および複数選択のチェックボックス">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="example-terms" />
            <label htmlFor="example-terms" className="cursor-pointer text-sm font-medium">
              利用規約に同意する
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="example-newsletter" defaultChecked />
            <label htmlFor="example-newsletter" className="cursor-pointer text-sm font-medium">
              ニュースレターを受け取る
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="example-marketing" />
            <label htmlFor="example-marketing" className="cursor-pointer text-sm font-medium">
              マーケティング情報の配信に同意する
            </label>
          </div>
        </div>
      </ShowcaseSection>

      {/* 状態 */}
      <ShowcaseSection title="状態" description="チェックボックスの様々な状態">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="state-unchecked" />
            <label htmlFor="state-unchecked" className="cursor-pointer text-sm font-medium">
              未チェック状態
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="state-checked" defaultChecked />
            <label htmlFor="state-checked" className="cursor-pointer text-sm font-medium">
              チェック済み状態
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="state-disabled" disabled />
            <label
              htmlFor="state-disabled"
              className="text-text-disabled cursor-not-allowed text-sm font-medium"
            >
              無効状態
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="state-disabled-checked" disabled defaultChecked />
            <label
              htmlFor="state-disabled-checked"
              className="text-text-disabled cursor-not-allowed text-sm font-medium"
            >
              無効状態（チェック済み）
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="state-error" error />
            <label htmlFor="state-error" className="cursor-pointer text-sm font-medium">
              エラー状態
            </label>
            <span className="text-error text-sm">必須項目です</span>
          </div>
        </div>
      </ShowcaseSection>

      {/* グループ化 */}
      <ShowcaseSection title="チェックボックスグループ" description="関連する選択肢をグループ化">
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium">興味のある分野を選択してください</legend>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="group-tech" />
              <label htmlFor="group-tech" className="cursor-pointer text-sm">
                テクノロジー
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="group-design" />
              <label htmlFor="group-design" className="cursor-pointer text-sm">
                デザイン
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="group-business" />
              <label htmlFor="group-business" className="cursor-pointer text-sm">
                ビジネス
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="group-marketing" />
              <label htmlFor="group-marketing" className="cursor-pointer text-sm">
                マーケティング
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="group-education" />
              <label htmlFor="group-education" className="cursor-pointer text-sm">
                教育
              </label>
            </div>
          </div>
        </fieldset>
      </ShowcaseSection>

      {/* 実用例 */}
      <ShowcaseSection title="フォーム例" description="実際のフォームでの使用例">
        <form className="max-w-md space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">アカウント設定</legend>

            <div className="flex items-center space-x-2">
              <Checkbox id="form-email" defaultChecked />
              <label htmlFor="form-email" className="cursor-pointer text-sm">
                メール通知を有効にする
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="form-sms" />
              <label htmlFor="form-sms" className="cursor-pointer text-sm">
                SMS通知を有効にする
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="form-push" defaultChecked />
              <label htmlFor="form-push" className="cursor-pointer text-sm">
                プッシュ通知を有効にする
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">プライバシー設定</legend>

            <div className="flex items-center space-x-2">
              <Checkbox id="form-public" />
              <label htmlFor="form-public" className="cursor-pointer text-sm">
                プロフィールを公開する
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="form-analytics" defaultChecked />
              <label htmlFor="form-analytics" className="cursor-pointer text-sm">
                分析データの収集を許可する
              </label>
            </div>
          </fieldset>

          <div className="border-t pt-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="form-terms" className="mt-1" />
              <label htmlFor="form-terms" className="cursor-pointer text-sm">
                <span className="text-error">*</span>
                <a href="#" className="text-primary hover:underline">
                  利用規約
                </a>
                および
                <a href="#" className="text-primary hover:underline">
                  プライバシーポリシー
                </a>
                に同意する
              </label>
            </div>
          </div>
        </form>
      </ShowcaseSection>

      {/* コード例 */}
      <ShowcaseSection title="コード例">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">基本的な使用方法</h3>
            <CodeBlock code={basicUsageCode} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">グループ化の例</h3>
            <CodeBlock code={groupExampleCode} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">フォーム実装例</h3>
            <CodeBlock code={formExampleCode} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Props */}
      <ShowcaseSection title="Props">
        <PropsTable props={checkboxProps} />
      </ShowcaseSection>

      {/* 使用ガイドライン */}
      <ShowcaseSection title="使用ガイドライン">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>複数選択が可能な場合に使用（単一選択ならラジオボタンを使用）</li>
            <li>必ず label 要素と関連付けて、クリック領域を拡大</li>
            <li>関連する選択肢は fieldset と legend でグループ化</li>
            <li>チェックボックスとラベルの間隔は8px（spacing-sm）を推奨</li>
            <li>エラー時は視覚的にわかりやすく表示</li>
            <li>重要な同意事項は他の選択肢と視覚的に区別</li>
            <li>
              デフォルトでチェック済みは慎重に使用（ユーザーの明示的な同意が必要な場合は避ける）
            </li>
          </ul>
        </div>
      </ShowcaseSection>

      {/* アクセシビリティ */}
      <ShowcaseSection title="アクセシビリティ">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>label 要素で必ずチェックボックスとテキストを関連付け</li>
            <li>キーボードナビゲーション対応（Tab でフォーカス、Space でチェック）</li>
            <li>フォーカスリングでフォーカス状態を明示</li>
            <li>チェック状態の変更を視覚的・聴覚的に伝達</li>
            <li>グループ化には fieldset と legend を使用</li>
            <li>必須項目は aria-required 属性を追加</li>
            <li>エラー時は aria-invalid と aria-describedby を使用</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
