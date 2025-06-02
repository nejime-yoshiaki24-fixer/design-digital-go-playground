import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertDescription, AlertTitle, AlertWithIcon } from './alert'

const meta = {
  title: 'Components/Alert',
  component: AlertWithIcon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'デジタル庁デザインシステムに準拠したアラートコンポーネント',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'アラートのタイプ',
    },
    icon: {
      control: 'boolean',
      description: 'アイコンの表示/非表示',
    },
  },
} satisfies Meta<typeof AlertWithIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <AlertDescription>デフォルトのアラートメッセージです。</AlertDescription>,
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: <AlertDescription>情報を提供するアラートメッセージです。</AlertDescription>,
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: <AlertDescription>処理が正常に完了しました。</AlertDescription>,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: <AlertDescription>注意が必要な情報があります。</AlertDescription>,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: <AlertDescription>エラーが発生しました。もう一度お試しください。</AlertDescription>,
  },
}

export const WithTitle: Story = {
  render: () => (
    <AlertWithIcon variant="info">
      <AlertTitle>お知らせ</AlertTitle>
      <AlertDescription>
        システムメンテナンスのため、明日の午前2時から4時まで一時的にサービスを停止します。
      </AlertDescription>
    </AlertWithIcon>
  ),
}

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    icon: false,
    children: <AlertDescription>アイコンなしのアラートメッセージです。</AlertDescription>,
  },
}

export const LongContent: Story = {
  render: () => (
    <AlertWithIcon variant="warning">
      <AlertTitle>重要なお知らせ</AlertTitle>
      <AlertDescription>
        このアラートは長いコンテンツを含んでいます。システムの仕様変更に伴い、以下の点にご注意ください：
        <ul className="mt-2 list-disc list-inside">
          <li>ログイン方法が変更されます</li>
          <li>パスワードの再設定が必要になる場合があります</li>
          <li>新機能が追加されます</li>
        </ul>
      </AlertDescription>
    </AlertWithIcon>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <AlertWithIcon>
        <AlertDescription>デフォルトアラート</AlertDescription>
      </AlertWithIcon>
      <AlertWithIcon variant="info">
        <AlertDescription>情報アラート</AlertDescription>
      </AlertWithIcon>
      <AlertWithIcon variant="success">
        <AlertDescription>成功アラート</AlertDescription>
      </AlertWithIcon>
      <AlertWithIcon variant="warning">
        <AlertDescription>警告アラート</AlertDescription>
      </AlertWithIcon>
      <AlertWithIcon variant="error">
        <AlertDescription>エラーアラート</AlertDescription>
      </AlertWithIcon>
    </div>
  ),
}

export const CustomAlert: Story = {
  render: () => (
    <Alert className="border-[var(--color-primary)] bg-[var(--color-blue-50)]">
      <AlertTitle className="text-[var(--color-primary)]">カスタムスタイル</AlertTitle>
      <AlertDescription className="text-[var(--color-blue-900)]">
        Alertコンポーネントを直接使用してカスタムスタイルを適用できます。
      </AlertDescription>
    </Alert>
  ),
}