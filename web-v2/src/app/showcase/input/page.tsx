'use client'

import { Input } from '@/components/ui/input'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'

export default function InputShowcasePage() {
  const inputProps = [
    {
      name: 'type',
      type: 'string',
      defaultValue: '"text"',
      description: '入力フィールドのタイプ（text, email, password, number など）',
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'プレースホルダーテキスト',
    },
    {
      name: 'value',
      type: 'string',
      description: '入力値（制御コンポーネント用）',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: 'デフォルト値（非制御コンポーネント用）',
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '無効化状態',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      defaultValue: 'false',
      description: '読み取り専用',
    },
    {
      name: 'error',
      type: 'boolean',
      defaultValue: 'false',
      description: 'エラー状態の表示',
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: 'false',
      description: '必須入力フィールド',
    },
    {
      name: 'onChange',
      type: '(e: ChangeEvent<HTMLInputElement>) => void',
      description: '値変更時のイベントハンドラー',
    },
    {
      name: 'className',
      type: 'string',
      description: '追加のCSSクラス',
    },
  ]

  const basicUsageCode = `import { Input } from '@/components/ui/input'

// 基本的な使用方法
<Input type="text" placeholder="テキストを入力" />

// ラベル付き
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    メールアドレス
  </label>
  <Input 
    id="email" 
    type="email" 
    placeholder="example@email.com" 
  />
</div>

// エラー状態
<div className="space-y-2">
  <Input error placeholder="エラーのある入力" />
  <p className="text-sm text-error">
    入力内容に誤りがあります
  </p>
</div>`

  const formExampleCode = `// フォーム例
<form className="space-y-4 max-w-md">
  <div className="space-y-2">
    <label htmlFor="name" className="text-sm font-medium">
      お名前 <span className="text-error">*</span>
    </label>
    <Input 
      id="name" 
      required 
      placeholder="山田 太郎" 
    />
  </div>
  
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium">
      メールアドレス <span className="text-error">*</span>
    </label>
    <Input 
      id="email" 
      type="email" 
      required 
      placeholder="taro@example.com" 
    />
  </div>
  
  <div className="space-y-2">
    <label htmlFor="tel" className="text-sm font-medium">
      電話番号
    </label>
    <Input 
      id="tel" 
      type="tel" 
      placeholder="090-1234-5678" 
    />
  </div>
</form>`

  return (
    <ShowcaseLayout
      title="Input"
      description="様々なタイプのテキスト入力に対応する入力フィールドコンポーネント"
    >
      {/* 基本的な入力タイプ */}
      <ShowcaseSection title="入力タイプ" description="用途に応じた様々な入力タイプ">
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">テキスト入力</label>
            <Input type="text" placeholder="テキストを入力してください" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">メールアドレス</label>
            <Input type="email" placeholder="example@email.com" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">パスワード</label>
            <Input type="password" placeholder="パスワードを入力" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">数値入力</label>
            <Input type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">電話番号</label>
            <Input type="tel" placeholder="090-1234-5678" />
          </div>
        </div>
      </ShowcaseSection>

      {/* 状態 */}
      <ShowcaseSection title="状態" description="入力フィールドの様々な状態">
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">通常状態</label>
            <Input placeholder="通常の入力フィールド" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">無効状態</label>
            <Input placeholder="無効な入力フィールド" disabled />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">読み取り専用</label>
            <Input value="読み取り専用のテキスト" readOnly />
          </div>

          <div className="space-y-2">
            <label className="text-error text-sm font-medium">エラー状態</label>
            <Input placeholder="エラーのある入力" error />
            <p className="text-error text-sm">入力内容に誤りがあります</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* サイズバリエーション */}
      <ShowcaseSection title="幅の調整" description="用途に応じた幅の調整例">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">フルサイズ</label>
            <Input placeholder="横幅いっぱいの入力フィールド" className="w-full" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">中サイズ</label>
            <Input placeholder="中サイズ" className="w-64" />
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">小サイズ</label>
            <Input placeholder="小" className="w-32" />
          </div>
        </div>
      </ShowcaseSection>

      {/* 実用例 */}
      <ShowcaseSection title="フォーム例" description="実際のフォームでの使用例">
        <form className="max-w-md space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              お名前 <span className="text-error">*</span>
            </label>
            <Input id="name" required placeholder="山田 太郎" />
          </div>

          <div className="space-y-2">
            <label htmlFor="form-email" className="text-sm font-medium">
              メールアドレス <span className="text-error">*</span>
            </label>
            <Input id="form-email" type="email" required placeholder="taro@example.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="form-tel" className="text-sm font-medium">
              電話番号
            </label>
            <Input id="form-tel" type="tel" placeholder="090-1234-5678" />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              備考
            </label>
            <Input id="message" placeholder="ご要望などあれば記入してください" />
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
            <h3 className="mb-3 text-sm font-medium">フォーム実装例</h3>
            <CodeBlock code={formExampleCode} />
          </div>
        </div>
      </ShowcaseSection>

      {/* Props */}
      <ShowcaseSection title="Props">
        <PropsTable props={inputProps} />
      </ShowcaseSection>

      {/* 使用ガイドライン */}
      <ShowcaseSection title="使用ガイドライン">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>必須フィールドには required 属性を設定し、ラベルに「*」を表示</li>
            <li>適切な type 属性を設定（email, tel, number など）</li>
            <li>プレースホルダーは入力例を示し、ラベルの代替として使用しない</li>
            <li>エラー時は error プロパティを設定し、エラーメッセージを表示</li>
            <li>フォーカス時の視覚的フィードバックを確保</li>
            <li>モバイルでは適切なキーボードタイプが表示されるよう type を設定</li>
          </ul>
        </div>
      </ShowcaseSection>

      {/* アクセシビリティ */}
      <ShowcaseSection title="アクセシビリティ">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>label 要素を使用して入力フィールドとラベルを関連付け</li>
            <li>aria-label または aria-labelledby でスクリーンリーダー対応</li>
            <li>aria-invalid と aria-describedby でエラー状態を伝達</li>
            <li>キーボードナビゲーションに完全対応</li>
            <li>44×44px 以上のタップ領域を確保（モバイル）</li>
            <li>高コントラストモードでの視認性を確保</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
