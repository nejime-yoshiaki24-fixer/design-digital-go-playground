import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableColumn } from './Table';

interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
}

const mockData: TestData[] = [
  { id: 1, name: '田中太郎', age: 30, email: 'tanaka@example.com' },
  { id: 2, name: '鈴木花子', age: 25, email: 'suzuki@example.com' },
  { id: 3, name: '佐藤次郎', age: 35, email: 'sato@example.com' },
];

const mockColumns: TableColumn<TestData>[] = [
  { key: 'id', header: 'ID', align: 'center' },
  { key: 'name', header: '名前' },
  { key: 'age', header: '年齢', align: 'right' },
  { key: 'email', header: 'メールアドレス' },
];

describe('Table', () => {
  it('正しくレンダリングされること', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    
    // ヘッダーが表示されていること
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('名前')).toBeInTheDocument();
    expect(screen.getByText('年齢')).toBeInTheDocument();
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    
    // データが表示されていること
    expect(screen.getByText('田中太郎')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('sato@example.com')).toBeInTheDocument();
  });

  it('キャプションが表示されること', () => {
    render(
      <Table 
        columns={mockColumns} 
        data={mockData} 
        caption="ユーザー一覧" 
      />
    );
    
    expect(screen.getByText('ユーザー一覧')).toBeInTheDocument();
  });

  it('データが空の時にemptyTextが表示されること', () => {
    render(
      <Table 
        columns={mockColumns} 
        data={[]} 
        emptyText="データが見つかりません" 
      />
    );
    
    expect(screen.getByText('データが見つかりません')).toBeInTheDocument();
  });

  it('ローディング中の表示が正しいこと', () => {
    render(
      <Table 
        columns={mockColumns} 
        data={mockData} 
        loading={true} 
      />
    );
    
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  describe('ソート機能', () => {
    it('ヘッダークリックでソートされること', () => {
      render(<Table columns={mockColumns} data={mockData} />);
      
      const nameHeader = screen.getByText('名前');
      
      // 最初の順序を確認
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('田中太郎');
      expect(rows[2]).toHaveTextContent('鈴木花子');
      expect(rows[3]).toHaveTextContent('佐藤次郎');
      
      // 名前でソート（昇順）
      fireEvent.click(nameHeader);
      
      // テーブルの行を取得（ヘッダー行を除く）
      const sortedRows = screen.getAllByRole('row').slice(1);
      const names = sortedRows.map(row => row.querySelector('td:nth-child(2)')?.textContent);
      
      expect(names).toEqual(['佐藤次郎', '田中太郎', '鈴木花子']);
    });

    it('2回クリックで降順ソートになること', () => {
      render(<Table columns={mockColumns} data={mockData} />);
      
      const ageHeader = screen.getByText('年齢');
      
      // 昇順ソート
      fireEvent.click(ageHeader);
      // 降順ソート
      fireEvent.click(ageHeader);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('35'); // 佐藤次郎
      expect(rows[2]).toHaveTextContent('30'); // 田中太郎
      expect(rows[3]).toHaveTextContent('25'); // 鈴木花子
    });

    it('3回クリックでソート解除されること', () => {
      render(<Table columns={mockColumns} data={mockData} />);
      
      const nameHeader = screen.getByText('名前');
      
      // 昇順
      fireEvent.click(nameHeader);
      // 降順
      fireEvent.click(nameHeader);
      // ソート解除
      fireEvent.click(nameHeader);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('田中太郎');
      expect(rows[2]).toHaveTextContent('鈴木花子');
      expect(rows[3]).toHaveTextContent('佐藤次郎');
    });

    it('sortable=falseの時はソートされないこと', () => {
      render(<Table columns={mockColumns} data={mockData} sortable={false} />);
      
      const nameHeader = screen.getByText('名前');
      fireEvent.click(nameHeader);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('田中太郎');
    });
  });

  describe('行クリック', () => {
    it('onRowClickが呼ばれること', () => {
      const handleRowClick = jest.fn();
      render(
        <Table 
          columns={mockColumns} 
          data={mockData} 
          onRowClick={handleRowClick}
        />
      );
      
      const row = screen.getByText('田中太郎').closest('tr');
      fireEvent.click(row!);
      
      expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0);
    });

    it('Enterキーでも行クリックが動作すること', () => {
      const handleRowClick = jest.fn();
      render(
        <Table 
          columns={mockColumns} 
          data={mockData} 
          onRowClick={handleRowClick}
        />
      );
      
      const row = screen.getByText('鈴木花子').closest('tr');
      row!.focus();
      fireEvent.keyDown(row!, { key: 'Enter' });
      
      expect(handleRowClick).toHaveBeenCalledWith(mockData[1], 1);
    });
  });

  describe('カスタムレンダリング', () => {
    it('renderプロップが動作すること', () => {
      const columnsWithRender: TableColumn<TestData>[] = [
        ...mockColumns.slice(0, 3),
        {
          key: 'email',
          header: 'メールアドレス',
          render: (value) => <a href={`mailto:${value}`}>{value}</a>,
        },
      ];
      
      render(<Table columns={columnsWithRender} data={mockData} />);
      
      const emailLink = screen.getByText('tanaka@example.com');
      expect(emailLink.tagName).toBe('A');
      expect(emailLink).toHaveAttribute('href', 'mailto:tanaka@example.com');
    });
  });

  describe('スタイルバリエーション', () => {
    it('stripedクラスが適用されること', () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} striped />
      );
      
      expect(container.querySelector('.table--striped')).toBeInTheDocument();
    });

    it('borderedクラスが適用されること', () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} bordered />
      );
      
      expect(container.querySelector('.table--bordered')).toBeInTheDocument();
    });

    it('compactクラスが適用されること', () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} compact />
      );
      
      expect(container.querySelector('.table--compact')).toBeInTheDocument();
    });

    it('hoverableクラスが適用されること', () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} hoverable />
      );
      
      expect(container.querySelector('.table--hoverable')).toBeInTheDocument();
    });
  });

  describe('レスポンシブ', () => {
    it('responsive=trueでコンテナクラスが適用されること', () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} responsive />
      );
      
      expect(container.querySelector('.table-container--responsive')).toBeInTheDocument();
    });

    it('responsive=falseでコンテナクラスが適用されないこと', () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} responsive={false} />
      );
      
      expect(container.querySelector('.table-container--responsive')).not.toBeInTheDocument();
    });
  });

  describe('rowKey', () => {
    it('関数型rowKeyが動作すること', () => {
      const { container } = render(
        <Table 
          columns={mockColumns} 
          data={mockData} 
          rowKey={(record) => `user-${record.id}`}
        />
      );
      
      // React内部でkeyが正しく設定されているかは直接確認できないため、
      // エラーが出ないことを確認
      expect(container.querySelector('.table')).toBeInTheDocument();
    });

    it('プロパティ型rowKeyが動作すること', () => {
      const { container } = render(
        <Table 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id"
        />
      );
      
      expect(container.querySelector('.table')).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('ソート可能なヘッダーにaria-sort属性があること', () => {
      render(<Table columns={mockColumns} data={mockData} />);
      
      const nameHeader = screen.getByText('名前').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');
      
      fireEvent.click(nameHeader!);
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      
      fireEvent.click(nameHeader!);
      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    });

    it('ソート可能なヘッダーにrole="button"があること', () => {
      render(<Table columns={mockColumns} data={mockData} />);
      
      const nameHeader = screen.getByText('名前').closest('th');
      expect(nameHeader).toHaveAttribute('role', 'button');
    });

    it('キーボードナビゲーションが動作すること', () => {
      render(<Table columns={mockColumns} data={mockData} />);
      
      const nameHeader = screen.getByText('名前').closest('th');
      nameHeader!.focus();
      
      fireEvent.keyDown(nameHeader!, { key: 'Enter' });
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('佐藤次郎');
    });
  });
});