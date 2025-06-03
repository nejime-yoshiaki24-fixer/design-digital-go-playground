'use client'

import { Select } from '@/components/ui/select'
import { ShowcaseLayout } from '@/components/showcase/showcase-layout'
import { ShowcaseSection } from '@/components/showcase/showcase-section'
import { CodeBlock } from '@/components/showcase/code-block'
import { PropsTable } from '@/components/showcase/props-table'

export default function SelectShowcasePage() {
  const selectProps = [
    {
      name: 'value',
      type: 'string',
      description: '選択された値（制御コンポーネント用）',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: 'デフォルトの選択値（非制御コンポーネント用）',
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
      name: 'required',
      type: 'boolean',
      defaultValue: 'false',
      description: '必須選択フィールド',
    },
    {
      name: 'onChange',
      type: '(e: ChangeEvent<HTMLSelectElement>) => void',
      description: '選択変更時のイベントハンドラー',
    },
    {
      name: 'className',
      type: 'string',
      description: '追加のCSSクラス',
    },
  ]

  const basicUsageCode = `import { Select } from '@/components/ui/select'

// 基本的な使用方法
<Select>
  <option value="">選択してください</option>
  <option value="option1">オプション1</option>
  <option value="option2">オプション2</option>
  <option value="option3">オプション3</option>
</Select>

// ラベル付き
<div className="space-y-2">
  <label htmlFor="prefecture" className="text-sm font-medium">
    都道府県
  </label>
  <Select id="prefecture">
    <option value="">選択してください</option>
    <option value="tokyo">東京都</option>
    <option value="osaka">大阪府</option>
    <option value="kyoto">京都府</option>
  </Select>
</div>

// エラー状態
<div className="space-y-2">
  <Select error>
    <option value="">選択してください</option>
    <option value="option1">オプション1</option>
  </Select>
  <p className="text-sm text-error">
    選択が必要です
  </p>
</div>`

  const formExampleCode = `// フォーム例
<form className="space-y-4 max-w-md">
  <div className="space-y-2">
    <label htmlFor="prefecture" className="text-sm font-medium">
      住所 <span className="text-error">*</span>
    </label>
    <Select id="prefecture" required>
      <option value="">都道府県を選択</option>
      <option value="hokkaido">北海道</option>
      <option value="aomori">青森県</option>
      <option value="iwate">岩手県</option>
      <option value="tokyo">東京都</option>
      <option value="osaka">大阪府</option>
    </Select>
  </div>
  
  <div className="space-y-2">
    <label htmlFor="inquiry-type" className="text-sm font-medium">
      お問い合わせ種別 <span className="text-error">*</span>
    </label>
    <Select id="inquiry-type" required>
      <option value="">選択してください</option>
      <option value="general">一般的なお問い合わせ</option>
      <option value="support">サポート</option>
      <option value="bug-report">不具合報告</option>
      <option value="feature-request">機能リクエスト</option>
    </Select>
  </div>
  
  <div className="space-y-2">
    <label htmlFor="priority" className="text-sm font-medium">
      優先度
    </label>
    <Select id="priority" defaultValue="medium">
      <option value="low">低</option>
      <option value="medium">中</option>
      <option value="high">高</option>
      <option value="urgent">緊急</option>
    </Select>
  </div>
</form>`

  return (
    <ShowcaseLayout title="Select" description="ドロップダウンで選択肢から選択するコンポーネント">
      {/* 基本的な使用例 */}
      <ShowcaseSection title="基本的な使用例" description="様々な用途での選択ボックス">
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">都道府県を選択</label>
            <Select>
              <option value="">選択してください</option>
              <option value="tokyo">東京都</option>
              <option value="osaka">大阪府</option>
              <option value="kyoto">京都府</option>
              <option value="kanagawa">神奈川県</option>
              <option value="saitama">埼玉県</option>
              <option value="chiba">千葉県</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">年齢層</label>
            <Select>
              <option value="">選択してください</option>
              <option value="10s">10代</option>
              <option value="20s">20代</option>
              <option value="30s">30代</option>
              <option value="40s">40代</option>
              <option value="50s">50代以上</option>
            </Select>
          </div>
        </div>
      </ShowcaseSection>

      {/* 状態 */}
      <ShowcaseSection title="状態" description="選択ボックスの様々な状態">
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">通常状態</label>
            <Select>
              <option value="">選択してください</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
              <option value="option3">オプション3</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">初期選択あり</label>
            <Select defaultValue="option2">
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
              <option value="option3">オプション3</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">無効状態</label>
            <Select disabled>
              <option value="">選択できません</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-error text-sm font-medium">エラー状態</label>
            <Select error>
              <option value="">選択してください</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
            </Select>
            <p className="text-error text-sm">選択が必要です</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* サイズバリエーション */}
      <ShowcaseSection title="幅の調整" description="用途に応じた幅の調整例">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">フルサイズ</label>
            <Select className="w-full">
              <option value="">横幅いっぱいの選択ボックス</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">中サイズ</label>
            <Select className="w-64">
              <option value="">中サイズ</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary text-sm font-medium">小サイズ</label>
            <Select className="w-32">
              <option value="">小</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
            </Select>
          </div>
        </div>
      </ShowcaseSection>

      {/* グループ化 */}
      <ShowcaseSection title="オプションのグループ化" description="関連する選択肢をグループ化">
        <div className="max-w-md">
          <label className="text-text-secondary text-sm font-medium">商品カテゴリー</label>
          <Select className="mt-2">
            <option value="">選択してください</option>
            <optgroup label="電子機器">
              <option value="smartphone">スマートフォン</option>
              <option value="tablet">タブレット</option>
              <option value="laptop">ノートパソコン</option>
            </optgroup>
            <optgroup label="家電">
              <option value="tv">テレビ</option>
              <option value="refrigerator">冷蔵庫</option>
              <option value="washing">洗濯機</option>
            </optgroup>
          </Select>
        </div>
      </ShowcaseSection>

      {/* フォーム例 */}
      <ShowcaseSection title="フォーム例" description="実際のフォームでの使用例">
        <form className="max-w-md space-y-4">
          <div className="space-y-2">
            <label htmlFor="form-prefecture" className="text-sm font-medium">
              住所 <span className="text-error">*</span>
            </label>
            <Select id="form-prefecture" required>
              <option value="">都道府県を選択</option>
              <option value="hokkaido">北海道</option>
              <option value="aomori">青森県</option>
              <option value="iwate">岩手県</option>
              <option value="tokyo">東京都</option>
              <option value="osaka">大阪府</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="form-inquiry-type" className="text-sm font-medium">
              お問い合わせ種別 <span className="text-error">*</span>
            </label>
            <Select id="form-inquiry-type" required>
              <option value="">選択してください</option>
              <option value="general">一般的なお問い合わせ</option>
              <option value="support">サポート</option>
              <option value="bug-report">不具合報告</option>
              <option value="feature-request">機能リクエスト</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="form-priority" className="text-sm font-medium">
              優先度
            </label>
            <Select id="form-priority" defaultValue="medium">
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="urgent">緊急</option>
            </Select>
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
        <PropsTable props={selectProps} />
      </ShowcaseSection>

      {/* 使用ガイドライン */}
      <ShowcaseSection title="使用ガイドライン">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>選択肢が5個以上の場合に使用（それ以下ならラジオボタンを検討）</li>
            <li>デフォルトで「選択してください」などのプレースホルダーを設定</li>
            <li>関連する選択肢は optgroup でグループ化</li>
            <li>選択肢の順序は論理的に（五十音順、頻度順など）</li>
            <li>長い選択肢は省略せず全文表示</li>
            <li>必須項目にはラベルに「*」を付けて明示</li>
          </ul>
        </div>
      </ShowcaseSection>

      {/* アクセシビリティ */}
      <ShowcaseSection title="アクセシビリティ">
        <div className="prose prose-sm text-text-secondary max-w-none">
          <ul className="space-y-2">
            <li>label 要素でセレクトボックスとラベルを関連付け</li>
            <li>キーボードナビゲーション対応（矢印キー、Enter、Space）</li>
            <li>フォーカス時の視覚的フィードバック</li>
            <li>選択状態の明確な表示</li>
            <li>必須項目は aria-required 属性を設定</li>
            <li>エラー時は aria-invalid と aria-describedby を使用</li>
          </ul>
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  )
}
