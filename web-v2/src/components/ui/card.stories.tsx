import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Button } from './button'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'デジタル庁デザインシステムに準拠したカードコンポーネント',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>カードタイトル</CardTitle>
        <CardDescription>カードの説明文がここに入ります</CardDescription>
      </CardHeader>
      <CardContent>
        <p>カードのメインコンテンツがここに表示されます。テキストや他のコンポーネントを含めることができます。</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>アクション付きカード</CardTitle>
        <CardDescription>フッターにアクションボタンがあります</CardDescription>
      </CardHeader>
      <CardContent>
        <p>このカードはフッターにアクションボタンを含んでいます。</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">キャンセル</Button>
        <Button>保存</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>シンプルなカード</CardTitle>
      </CardHeader>
      <CardContent>
        <p>説明文なしのシンプルなカードレイアウト</p>
      </CardContent>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>ヘッダーなしでコンテンツのみのカード</p>
      </CardContent>
    </Card>
  ),
}

export const Feature: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>機能紹介</CardTitle>
        <CardDescription>
          このカードは機能の説明に使用できます
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-[var(--color-gray-700)]">
            • 高速な開発環境
          </p>
          <p className="text-sm text-[var(--color-gray-700)]">
            • TypeScriptによる型安全性
          </p>
          <p className="text-sm text-[var(--color-gray-700)]">
            • デザイントークンの完全統合
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[900px]">
      <Card>
        <CardHeader>
          <CardTitle>カード 1</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent>
          <p>コンテンツ</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>カード 2</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent>
          <p>コンテンツ</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>カード 3</CardTitle>
          <CardDescription>説明文</CardDescription>
        </CardHeader>
        <CardContent>
          <p>コンテンツ</p>
        </CardContent>
      </Card>
    </div>
  ),
}