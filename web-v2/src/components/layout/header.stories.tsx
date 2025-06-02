import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'アプリケーションのヘッダーコンポーネント',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onMenuClick: {
      action: 'menu clicked',
      description: 'モバイルメニューボタンのクリックハンドラー',
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    onMenuClick: () => alert('メニューがクリックされました'),
  },
}

export const InContext: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      <Header />
      <main className="container mx-auto px-[var(--spacing-4)] py-[var(--spacing-8)]">
        <h1 className="text-[var(--font-size-3xl)] font-[var(--font-weight-bold)] mb-[var(--spacing-4)]">
          ページコンテンツ
        </h1>
        <p className="text-[var(--color-gray-700)]">
          ヘッダーと一緒に表示されたページのコンテンツ例です。
        </p>
      </main>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}