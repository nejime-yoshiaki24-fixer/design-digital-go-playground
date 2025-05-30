import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '選択肢',
  },
};

export const Checked: Story = {
  args: {
    label: '選択済み',
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    label: '小サイズ',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: '中サイズ',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: '大サイズ',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    label: '無効な選択肢',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '無効な選択済み',
    defaultChecked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: '必須項目',
    error: true,
    errorText: 'この項目は必須です',
  },
};

export const NoLabel: Story = {
  args: {
    // ラベルなし
  },
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="オプション1" size="large" />
      <Checkbox label="オプション2" size="large" defaultChecked />
      <Checkbox label="オプション3" size="large" />
    </div>
  ),
};

export const InlineCheckboxes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Checkbox label="選択肢A" size="small" />
      <Checkbox label="選択肢B" size="small" defaultChecked />
      <Checkbox label="選択肢C" size="small" />
    </div>
  ),
};