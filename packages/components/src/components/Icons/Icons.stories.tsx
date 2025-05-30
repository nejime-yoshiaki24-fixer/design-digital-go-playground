import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import './Icons.css';

const meta = {
  title: 'Base/Icons',
  parameters: {
    docs: {
      description: {
        component: 'デジタル庁デザインシステムのアイコン集です。Material Symbolsをベースにしています。',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const iconList = [
  { name: 'arrow_down', Icon: ArrowDownIcon, description: '下矢印' },
  { name: 'check', Icon: CheckIcon, description: 'チェックマーク' },
  { name: 'close', Icon: CloseIcon, description: '閉じる' },
  { name: 'search', Icon: SearchIcon, description: '検索' },
];

export const AllIcons: Story = {
  render: () => (
    <div className="icon-gallery">
      <h2>アイコン一覧</h2>
      <div className="icon-grid">
        {iconList.map(({ name, Icon, description }) => (
          <div key={name} className="icon-item">
            <div className="icon-preview">
              <Icon width={24} height={24} />
            </div>
            <div className="icon-name">{name}</div>
            <div className="icon-description">{description}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="icon-sizes">
      <h2>サイズバリエーション</h2>
      <div className="size-examples">
        <div className="size-group">
          <h3>Small (16px)</h3>
          <SearchIcon width={16} height={16} />
        </div>
        <div className="size-group">
          <h3>Medium (24px)</h3>
          <SearchIcon width={24} height={24} />
        </div>
        <div className="size-group">
          <h3>Large (32px)</h3>
          <SearchIcon width={32} height={32} />
        </div>
        <div className="size-group">
          <h3>XLarge (40px)</h3>
          <SearchIcon width={40} height={40} />
        </div>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="icon-colors">
      <h2>カラーバリエーション</h2>
      <div className="color-examples">
        <div className="color-group">
          <h3>Default (#1A1A1A)</h3>
          <CheckIcon width={24} height={24} style={{ fill: '#1A1A1A' }} />
        </div>
        <div className="color-group">
          <h3>Primary (#0017C1)</h3>
          <CheckIcon width={24} height={24} style={{ fill: '#0017C1' }} />
        </div>
        <div className="color-group">
          <h3>Error (#D32F2F)</h3>
          <CheckIcon width={24} height={24} style={{ fill: '#D32F2F' }} />
        </div>
        <div className="color-group">
          <h3>Success (#2E7D32)</h3>
          <CheckIcon width={24} height={24} style={{ fill: '#2E7D32' }} />
        </div>
      </div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => (
    <div className="icon-usage">
      <h2>使用例</h2>
      <div className="usage-examples">
        <button className="button-with-icon">
          <SearchIcon width={20} height={20} />
          <span>検索</span>
        </button>
        
        <button className="icon-button" aria-label="閉じる">
          <CloseIcon width={24} height={24} />
        </button>
        
        <div className="list-item">
          <ArrowDownIcon width={16} height={16} />
          <span>展開可能なアイテム</span>
        </div>
        
        <div className="success-message">
          <CheckIcon width={20} height={20} style={{ fill: '#2E7D32' }} />
          <span>正常に保存されました</span>
        </div>
      </div>
    </div>
  ),
};