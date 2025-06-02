'use client'

import Link from 'next/link'
import { LanguageSelector } from '@/components/ui/language-selector'
import type { Language } from '@/components/ui/language-selector'

export default function LanguageSelectorShowcasePage() {
  // 基本的な言語リスト
  const basicLanguages: Language[] = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English' },
  ]

  // 詳細な言語リスト（ネイティブラベル付き）
  const detailedLanguages: Language[] = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English', nativeLabel: '英語' },
    { code: 'zh', label: '中文', nativeLabel: '中国語' },
    { code: 'ko', label: '한국어', nativeLabel: '韓国語' },
    { code: 'vi', label: 'Tiếng Việt', nativeLabel: 'ベトナム語' },
    { code: 'pt', label: 'Português', nativeLabel: 'ポルトガル語' },
  ]

  const handleLanguageChange = (language: string) => {
    console.log('選択された言語:', language)
  }

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div>
        <h1 className="text-display-lg mb-8 font-bold">言語選択</h1>
        <p className="text-body-lg text-text-secondary mb-8">
          多言語対応サイトで言語を切り替えるためのコンポーネントです。
        </p>
      </div>

      {/* 基本的な使用例 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">基本的な使用例</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <LanguageSelector
            languages={basicLanguages}
            currentLanguage="ja"
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </section>

      {/* アイコンなし */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">アイコンなし</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <LanguageSelector
            languages={basicLanguages}
            currentLanguage="ja"
            onLanguageChange={handleLanguageChange}
            showIcon={false}
          />
        </div>
      </section>

      {/* 多言語対応 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">多言語対応（ネイティブラベル付き）</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <LanguageSelector
            languages={detailedLanguages}
            currentLanguage="ja"
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </section>

      {/* ボタン型 */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">ボタン型</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <LanguageSelector
            languages={basicLanguages}
            currentLanguage="ja"
            onLanguageChange={handleLanguageChange}
            variant="button"
          />
        </div>
      </section>

      {/* カスタムラベル */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">カスタムラベル</h2>
        <div className="bg-bg-secondary space-y-4 rounded-lg p-6">
          <LanguageSelector
            languages={detailedLanguages}
            currentLanguage="ja"
            onLanguageChange={handleLanguageChange}
            label="言語を選択してください"
          />
        </div>
      </section>

      {/* 使用ガイドライン */}
      <section className="space-y-6">
        <h2 className="text-heading-xl font-bold">使用ガイドライン</h2>
        <div className="prose max-w-none">
          <ul className="space-y-2">
            <li>言語名は現地の言語で表記する（例：日本語、English、中文）</li>
            <li>必要に応じて日本語のラベルも併記</li>
            <li>現在選択されている言語を明確に表示</li>
            <li>言語コードはISO 639-1規格に準拠</li>
            <li>ヘッダーまたはフッターの目立つ位置に配置</li>
          </ul>
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <Link
          href="/showcase"
          className="text-primary inline-flex items-center gap-2 hover:underline"
        >
          ← ショーケース一覧に戻る
        </Link>
      </div>
    </div>
  )
}
