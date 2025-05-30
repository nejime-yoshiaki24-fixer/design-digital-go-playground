import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    title: 'セクション1：基本情報',
    content: (
      <div>
        <p>これは最初のセクションの内容です。アコーディオンは、限られたスペースで多くの情報を整理して表示するのに役立ちます。</p>
        <p>ユーザーは必要な情報だけを展開して確認できます。</p>
      </div>
    ),
  },
  {
    title: 'セクション2：詳細設定',
    content: (
      <div>
        <p>2番目のセクションです。ここには詳細な設定項目が含まれています。</p>
        <ul>
          <li>設定項目1</li>
          <li>設定項目2</li>
          <li>設定項目3</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'セクション3：よくある質問',
    content: (
      <div>
        <p>よくある質問とその回答を掲載しています。</p>
        <p>Q: アコーディオンの利点は何ですか？</p>
        <p>A: スペースを節約しながら、構造化された情報を提供できます。</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: sampleItems,
    defaultExpandedIndices: [0],
  },
};

export const MultipleDefaultExpanded: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    defaultExpandedIndices: [0, 2],
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        title: '長いコンテンツの例',
        content: (
          <div>
            <h3>見出し</h3>
            <p>これは長いコンテンツの例です。アコーディオンは、どんな長さのコンテンツでも適切に表示できます。</p>
            <p>段落1：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>段落2：Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>段落3：Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>段落4：Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        ),
      },
      ...sampleItems.slice(1),
    ],
  },
};

// 個別のAccordionItemコンポーネントの使用例
export const IndividualAccordionItem: Story = {
  args: {
    items: [], // Accordionコンポーネントのpropsを満たすため
  },
  render: () => {
    const [expanded, setExpanded] = React.useState(false);
    
    return (
      <AccordionItem
        title="個別のアコーディオンアイテム"
        content={
          <div>
            <p>これは個別に使用できるAccordionItemコンポーネントです。</p>
            <p>独自の展開状態を管理できます。</p>
          </div>
        }
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      />
    );
  },
};

// モバイル表示の例
export const MobileView: Story = {
  args: {
    items: sampleItems,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '375px', border: '1px solid #ccc', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};