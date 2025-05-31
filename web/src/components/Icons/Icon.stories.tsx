import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Icon } from './Icon';
import './Icons.css';

const meta = {
  title: 'Base/Icons/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'デジタル庁デザインシステムのアイコンを表示するためのラッパーコンポーネントです。',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['arrow_down', 'check', 'close', 'search'],
      description: 'アイコンの名前',
    },
    size: {
      control: { type: 'number', min: 12, max: 48, step: 4 },
      description: 'アイコンのサイズ（幅・高さ）',
    },
    color: {
      control: 'color',
      description: 'アイコンの色',
    },
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
    'aria-label': {
      control: 'text',
      description: 'アクセシビリティ用のラベル',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'search',
    size: 24,
    color: '#1A1A1A',
  },
};

export const AllIcons: Story = {
  args: {
    name: 'arrow_down',
  },
  render: () => (
    <div className="icon-gallery">
      <h3>すべてのアイコン</h3>
      <div className="icon-grid">
        <div className="icon-item">
          <Icon name="arrow_down" />
          <span>arrow_down</span>
        </div>
        <div className="icon-item">
          <Icon name="check" />
          <span>check</span>
        </div>
        <div className="icon-item">
          <Icon name="close" />
          <span>close</span>
        </div>
        <div className="icon-item">
          <Icon name="search" />
          <span>search</span>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    name: 'search',
  },
  render: () => (
    <div className="icon-sizes">
      <h3>サイズバリエーション</h3>
      <div className="size-examples">
        <div className="size-group">
          <Icon name="search" size={16} />
          <span>16px</span>
        </div>
        <div className="size-group">
          <Icon name="search" size={20} />
          <span>20px</span>
        </div>
        <div className="size-group">
          <Icon name="search" size={24} />
          <span>24px (default)</span>
        </div>
        <div className="size-group">
          <Icon name="search" size={32} />
          <span>32px</span>
        </div>
        <div className="size-group">
          <Icon name="search" size={40} />
          <span>40px</span>
        </div>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div className="icon-colors">
      <h3>カラーバリエーション</h3>
      <div className="color-examples">
        <div className="color-group">
          <Icon name="check" size={32} color="#1A1A1A" />
          <span>Default</span>
        </div>
        <div className="color-group">
          <Icon name="check" size={32} color="#0017C1" />
          <span>Primary</span>
        </div>
        <div className="color-group">
          <Icon name="check" size={32} color="#2E7D32" />
          <span>Success</span>
        </div>
        <div className="color-group">
          <Icon name="check" size={32} color="#D32F2F" />
          <span>Error</span>
        </div>
        <div className="color-group">
          <Icon name="check" size={32} color="#757575" />
          <span>Disabled</span>
        </div>
      </div>
    </div>
  ),
};

export const WithAccessibility: Story = {
  args: {
    name: 'close',
    'aria-label': '閉じる',
  },
};

export const Decorative: Story = {
  args: {
    name: 'arrow_down',
    'aria-hidden': true,
  },
};