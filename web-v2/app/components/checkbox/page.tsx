'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckboxPage() {
  return (
    <MainLayout>
      <div className="space-y-spacing-xl">
        <section>
          <h1 className="text-font-size-4xl font-font-weight-bold text-foreground mb-spacing-md">
            Checkbox コンポーネント
          </h1>
          <p className="text-font-size-lg text-muted-foreground mb-spacing-xl">
            チェックボックス選択コンポーネント
          </p>
        </section>

        {/* 基本的なチェックボックス */}
        <Card>
          <CardHeader>
            <CardTitle>基本的なチェックボックス</CardTitle>
            <CardDescription>
              単一および複数選択のチェックボックス
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                利用規約に同意する
              </label>
            </div>
            
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="newsletter" defaultChecked />
              <label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">
                ニュースレターを受け取る
              </label>
            </div>
            
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="marketing" />
              <label htmlFor="marketing" className="text-sm font-medium cursor-pointer">
                マーケティング情報の配信に同意する
              </label>
            </div>
          </CardContent>
        </Card>

        {/* 状態 */}
        <Card>
          <CardHeader>
            <CardTitle>状態</CardTitle>
            <CardDescription>
              チェックボックスの様々な状態
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-spacing-md">
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="unchecked" />
              <label htmlFor="unchecked" className="text-sm font-medium cursor-pointer">
                未チェック状態
              </label>
            </div>
            
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="checked" defaultChecked />
              <label htmlFor="checked" className="text-sm font-medium cursor-pointer">
                チェック済み状態
              </label>
            </div>
            
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="disabled" disabled />
              <label htmlFor="disabled" className="text-sm font-medium text-muted-foreground cursor-not-allowed">
                無効状態
              </label>
            </div>
            
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="disabled-checked" disabled defaultChecked />
              <label htmlFor="disabled-checked" className="text-sm font-medium text-muted-foreground cursor-not-allowed">
                無効状態（チェック済み）
              </label>
            </div>
            
            <div className="flex items-center space-x-spacing-sm">
              <Checkbox id="error" error />
              <label htmlFor="error" className="text-sm font-medium cursor-pointer">
                エラー状態
              </label>
              <span className="text-sm text-destructive">必須項目です</span>
            </div>
          </CardContent>
        </Card>

        {/* グループ化 */}
        <Card>
          <CardHeader>
            <CardTitle>チェックボックスグループ</CardTitle>
            <CardDescription>
              複数の選択肢をグループ化した例
            </CardDescription>
          </CardHeader>
          <CardContent>
            <fieldset className="space-y-spacing-md">
              <legend className="text-sm font-medium mb-spacing-sm">
                興味のある分野を選択してください
              </legend>
              
              <div className="space-y-spacing-sm">
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="tech" />
                  <label htmlFor="tech" className="text-sm cursor-pointer">
                    テクノロジー
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="design" />
                  <label htmlFor="design" className="text-sm cursor-pointer">
                    デザイン
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="business" />
                  <label htmlFor="business" className="text-sm cursor-pointer">
                    ビジネス
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="marketing" />
                  <label htmlFor="marketing" className="text-sm cursor-pointer">
                    マーケティング
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="education" />
                  <label htmlFor="education" className="text-sm cursor-pointer">
                    教育
                  </label>
                </div>
              </div>
            </fieldset>
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
            <form className="space-y-spacing-lg max-w-md">
              <fieldset className="space-y-spacing-md">
                <legend className="text-sm font-medium">
                  アカウント設定
                </legend>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="email-notifications" defaultChecked />
                  <label htmlFor="email-notifications" className="text-sm cursor-pointer">
                    メール通知を有効にする
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="sms-notifications" />
                  <label htmlFor="sms-notifications" className="text-sm cursor-pointer">
                    SMS通知を有効にする
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="push-notifications" defaultChecked />
                  <label htmlFor="push-notifications" className="text-sm cursor-pointer">
                    プッシュ通知を有効にする
                  </label>
                </div>
              </fieldset>
              
              <fieldset className="space-y-spacing-md">
                <legend className="text-sm font-medium">
                  プライバシー設定
                </legend>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="public-profile" />
                  <label htmlFor="public-profile" className="text-sm cursor-pointer">
                    プロフィールを公開する
                  </label>
                </div>
                
                <div className="flex items-center space-x-spacing-sm">
                  <Checkbox id="analytics" defaultChecked />
                  <label htmlFor="analytics" className="text-sm cursor-pointer">
                    分析データの収集を許可する
                  </label>
                </div>
              </fieldset>
              
              <div className="border-t pt-spacing-md">
                <div className="flex items-start space-x-spacing-sm">
                  <Checkbox id="required-terms" className="mt-1" />
                  <label htmlFor="required-terms" className="text-sm cursor-pointer">
                    <span className="text-destructive">*</span> 
                    <a href="#" className="text-primary hover:underline">利用規約</a>
                    および
                    <a href="#" className="text-primary hover:underline">プライバシーポリシー</a>
                    に同意する
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* アクセシビリティ */}
        <Card>
          <CardHeader>
            <CardTitle>アクセシビリティ機能</CardTitle>
            <CardDescription>
              チェックボックスコンポーネントのアクセシビリティ配慮
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-spacing-xs text-muted-foreground">
              <li>キーボードナビゲーション対応（Tab、Space）</li>
              <li>フォーカス時の視覚的フィードバック</li>
              <li>適切なラベルの関連付け</li>
              <li>チェック状態の明確な表示</li>
              <li>fieldsetとlegendによるグループ化</li>
              <li>スクリーンリーダー対応</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}