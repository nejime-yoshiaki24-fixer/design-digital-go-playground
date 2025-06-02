'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SelectPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Select コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            ドロップダウン選択コンポーネント
          </p>
        </section>

        {/* 基本的な選択ボックス */}
        <Card>
          <CardHeader>
            <CardTitle>基本的な選択ボックス</CardTitle>
            <CardDescription>
              基本的なドロップダウン選択の使用例
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">都道府県を選択</label>
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
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">年齢</label>
              <Select>
                <option value="">選択してください</option>
                <option value="10s">10代</option>
                <option value="20s">20代</option>
                <option value="30s">30代</option>
                <option value="40s">40代</option>
                <option value="50s">50代以上</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 状態 */}
        <Card>
          <CardHeader>
            <CardTitle>状態</CardTitle>
            <CardDescription>
              選択ボックスの様々な状態
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">通常状態</label>
              <Select>
                <option value="">選択してください</option>
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
                <option value="option3">オプション3</option>
              </Select>
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">初期選択あり</label>
              <Select defaultValue="option2">
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
                <option value="option3">オプション3</option>
              </Select>
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">無効状態</label>
              <Select disabled>
                <option value="">選択できません</option>
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
              </Select>
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium text-destructive">エラー状態</label>
              <Select error>
                <option value="">選択してください</option>
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
              </Select>
              <p className="text-sm text-destructive">選択が必要です</p>
            </div>
          </CardContent>
        </Card>

        {/* サイズバリエーション */}
        <Card>
          <CardHeader>
            <CardTitle>サイズバリエーション</CardTitle>
            <CardDescription>
              異なる幅の選択ボックス
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">フルサイズ</label>
              <Select className="w-full">
                <option value="">横幅いっぱいの選択ボックス</option>
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
              </Select>
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">中サイズ</label>
              <Select className="w-64">
                <option value="">中サイズ</option>
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
              </Select>
            </div>
            
            <div className="space-y-spacing-sm">
              <label className="text-sm font-medium">小サイズ</label>
              <Select className="w-32">
                <option value="">小</option>
                <option value="option1">オプション1</option>
                <option value="option2">オプション2</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 実用例 */}
        <Card>
          <CardHeader>
            <CardTitle>実用的な使用例</CardTitle>
            <CardDescription>
              実際のフォームでの使用例
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-spacing-md max-w-md">
              <div className="space-y-spacing-sm">
                <label htmlFor="prefecture" className="text-sm font-medium">
                  住所 <span className="text-destructive">*</span>
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
              
              <div className="space-y-spacing-sm">
                <label htmlFor="inquiry-type" className="text-sm font-medium">
                  お問い合わせ種別 <span className="text-destructive">*</span>
                </label>
                <Select id="inquiry-type" required>
                  <option value="">選択してください</option>
                  <option value="general">一般的なお問い合わせ</option>
                  <option value="support">サポート</option>
                  <option value="bug-report">不具合報告</option>
                  <option value="feature-request">機能リクエスト</option>
                </Select>
              </div>
              
              <div className="space-y-spacing-sm">
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
            </form>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              選択コンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>キーボードナビゲーション対応（矢印キー、Enter、Space）</li>
              <li>フォーカス時の視覚的フィードバック</li>
              <li>適切なラベルの関連付け</li>
              <li>選択状態の明確な表示</li>
              <li>スクリーンリーダー対応</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}