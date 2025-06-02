import type { Metadata } from 'next'
import '../global.css'

export const metadata: Metadata = {
  title: 'デジタル庁デザインシステム - コンポーネント展示',
  description: 'デジタル庁デザインシステムに準拠したReactコンポーネントの展示ページ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}