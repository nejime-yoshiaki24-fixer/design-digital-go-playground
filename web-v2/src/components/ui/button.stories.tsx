import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'デジタル庁デザインシステムに準拠したボタンコンポーネント',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'ボタンのスタイルバリアント',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'ボタンのサイズ',
    },
    radius: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'full'],
      description: '角丸のサイズ',
    },
    disabled: {
      control: 'boolean',
      description: 'ボタンの無効化状態',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'ボタン',
  },
}

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'プライマリボタン',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'セカンダリボタン',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'アウトラインボタン',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'ゴーストボタン',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '削除',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: '小さいボタン',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大きいボタン',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '→',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '無効なボタン',
  },
}

export const FullRadius: Story = {
  args: {
    radius: 'full',
    children: '完全な角丸',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button>デフォルト</Button>
        <Button variant="secondary">セカンダリ</Button>
        <Button variant="outline">アウトライン</Button>
        <Button variant="ghost">ゴースト</Button>
        <Button variant="destructive">削除</Button>
      </div>
      <div className="flex gap-2">
        <Button size="sm">小</Button>
        <Button size="default">中</Button>
        <Button size="lg">大</Button>
        <Button size="icon">→</Button>
      </div>
      <div className="flex gap-2">
        <Button radius="sm">小角丸</Button>
        <Button radius="default">中角丸</Button>
        <Button radius="lg">大角丸</Button>
        <Button radius="full">完全角丸</Button>
      </div>
    </div>
  ),
}