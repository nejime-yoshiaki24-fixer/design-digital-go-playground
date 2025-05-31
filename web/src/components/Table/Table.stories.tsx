import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Table, TableColumn } from './Table';

// サンプルデータの型定義
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

// サンプルデータ
const sampleUsers: User[] = [
  {
    id: 1,
    name: '田中太郎',
    email: 'tanaka@example.com',
    role: '管理者',
    department: '総務部',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: '鈴木花子',
    email: 'suzuki@example.com',
    role: '一般職員',
    department: '営業部',
    status: 'active',
    joinDate: '2023-03-20',
  },
  {
    id: 3,
    name: '佐藤次郎',
    email: 'sato@example.com',
    role: '管理者',
    department: '技術部',
    status: 'inactive',
    joinDate: '2022-11-10',
  },
  {
    id: 4,
    name: '高橋美咲',
    email: 'takahashi@example.com',
    role: '一般職員',
    department: '総務部',
    status: 'active',
    joinDate: '2023-06-01',
  },
  {
    id: 5,
    name: '伊藤健一',
    email: 'ito@example.com',
    role: '管理者',
    department: '営業部',
    status: 'active',
    joinDate: '2022-09-15',
  },
];

// 基本的なカラム定義
const basicColumns: TableColumn<User>[] = [
  { key: 'id', header: 'ID', width: 60, align: 'center' },
  { key: 'name', header: '氏名', width: 150 },
  { key: 'email', header: 'メールアドレス', width: 250 },
  { key: 'role', header: '役割', width: 120 },
  { key: 'department', header: '部署', width: 120 },
];

// カスタムレンダリングを含むカラム定義
const customColumns: TableColumn<User>[] = [
  { key: 'id', header: 'ID', width: 60, align: 'center' },
  { key: 'name', header: '氏名', width: 150 },
  {
    key: 'email',
    header: 'メールアドレス',
    width: 250,
    render: (value) => <a href={`mailto:${value}`}>{value}</a>,
  },
  { key: 'role', header: '役割', width: 120 },
  { key: 'department', header: '部署', width: 120 },
  {
    key: 'status',
    header: 'ステータス',
    width: 120,
    align: 'center',
    render: (value) => (
      <span
        style={{
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 700,
          backgroundColor: value === 'active' ? '#E8F5E9' : '#FFEBEE',
          color: value === 'active' ? '#2E7D32' : '#C62828',
        }}
      >
        {value === 'active' ? '有効' : '無効'}
      </span>
    ),
  },
  { key: 'joinDate', header: '入社日', width: 120, align: 'right' },
];

const meta = {
  title: 'Components/Table',
  component: Table as any,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'ユーザー一覧',
  },
};

export const WithCustomRender: Story = {
  args: {
    columns: customColumns,
    data: sampleUsers,
    caption: 'ユーザー管理テーブル',
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'ストライプテーブル',
    striped: true,
  },
};

export const Compact: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'コンパクトテーブル',
    compact: true,
  },
};

export const WithoutBorder: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'ボーダーなしテーブル',
    bordered: false,
  },
};

export const WithRowClick: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: '行クリック可能なテーブル',
    onRowClick: (record: any, index: number) => {
      alert(`選択された行: ${record.name} (インデックス: ${index})`);
    },
  },
};

export const WithDefaultSort: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'デフォルトソート付きテーブル',
    defaultSortKey: 'name',
    defaultSortDirection: 'asc',
  },
};

export const NoSorting: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'ソート無効テーブル',
    sortable: false,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    caption: '空のテーブル',
    emptyText: 'ユーザーが登録されていません',
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    caption: 'ローディング中',
    loading: true,
  },
};

export const AllFeatures: Story = {
  args: {
    columns: customColumns,
    data: sampleUsers,
    caption: '全機能搭載テーブル',
    striped: true,
    hoverable: true,
    bordered: true,
    sortable: true,
    responsive: true,
    onRowClick: (record: any) => {
      console.log('Clicked:', record);
    },
    rowKey: 'id',
  },
};

export const LargeDataset: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: 80, align: 'center' },
      { key: 'name', header: '商品名', width: 200 },
      { key: 'category', header: 'カテゴリー', width: 150 },
      { key: 'price', header: '価格', width: 120, align: 'right' },
      { key: 'stock', header: '在庫数', width: 100, align: 'right' },
      { key: 'lastUpdate', header: '最終更新日', width: 150 },
    ],
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `商品 ${i + 1}`,
      category: ['電化製品', '家具', '衣類', '食品'][i % 4],
      price: `¥${(Math.floor(Math.random() * 100000) + 1000).toLocaleString()}`,
      stock: Math.floor(Math.random() * 100),
      lastUpdate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('ja-JP'),
    })),
    caption: '商品在庫一覧（50件）',
    striped: true,
    compact: true,
  },
};

export const ResponsiveTable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: 60 },
      { key: 'projectName', header: 'プロジェクト名', width: 300 },
      { key: 'client', header: 'クライアント', width: 200 },
      { key: 'startDate', header: '開始日', width: 120 },
      { key: 'endDate', header: '終了日', width: 120 },
      { key: 'budget', header: '予算', width: 150, align: 'right' },
      { key: 'progress', header: '進捗', width: 100, align: 'center' },
      { key: 'manager', header: '担当者', width: 150 },
    ],
    data: [
      {
        id: 1,
        projectName: 'デジタル庁Webサイトリニューアル',
        client: 'デジタル庁',
        startDate: '2023-04-01',
        endDate: '2023-09-30',
        budget: '¥15,000,000',
        progress: '85%',
        manager: '山田太郎',
      },
      {
        id: 2,
        projectName: '市民向けポータルサイト構築',
        client: '〇〇市役所',
        startDate: '2023-06-15',
        endDate: '2024-03-31',
        budget: '¥8,500,000',
        progress: '40%',
        manager: '佐藤花子',
      },
    ],
    caption: 'プロジェクト管理（横スクロール対応）',
    responsive: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};