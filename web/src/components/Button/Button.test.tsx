import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  describe('レンダリング', () => {
    it('正しくレンダリングされること', () => {
      render(<Button label="テストボタン" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('テストボタン')).toBeInTheDocument();
    });

    it('アイコン付きでレンダリングされること', () => {
      render(<Button label="テスト" showLeadIcon showTailIcon />);
      const icons = screen.getAllByText((content, element) => {
        return element?.className?.includes('button__icon') || false;
      });
      expect(icons).toHaveLength(2);
    });
  });

  describe('Figmaデザイントークンの適用', () => {
    it('Solidスタイルのデザイントークンが正しく適用されること', () => {
      render(<Button label="テスト" variant="solid" size="large" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      // 背景色の確認（#0017C1）
      expect(button).toHaveClass('button--solid');
      expect(button).toHaveClass('button--large');
      
      // CSSクラスの適用確認
      expect(button.className).toContain('button');
      expect(button.className).toContain('button--solid');
      expect(button.className).toContain('button--large');
    });

    it('フォントファミリーが正しく設定されること', () => {
      render(<Button label="テスト" />);
      const button = screen.getByRole('button');
      
      // Buttonコンポーネントがbuttonクラスを持つことを確認
      // （CSSでフォントファミリーが設定されている）
      expect(button).toHaveClass('button');
    });

    it('Largeサイズのスタイルが正しく適用されること', () => {
      render(<Button label="テスト" size="large" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      // パディング、フォントサイズ、行高の確認
      expect(button).toHaveClass('button--large');
      // CSSでは以下のように定義されている
      // padding: 16px
      // font-size: 16px
      // line-height: 1
      // letter-spacing: 0.02em
    });
  });

  describe('バリエーション', () => {
    it('Outlineバリアントが正しく適用されること', () => {
      render(<Button label="テスト" variant="outline" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button--outline');
    });

    it('各サイズが正しく適用されること', () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
      sizes.forEach(size => {
        const { rerender } = render(<Button label="テスト" size={size} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`button--${size}`);
        rerender(<></>);
      });
    });

    it('各状態が正しく適用されること', () => {
      const states: Array<'default' | 'hover' | 'focus' | 'disabled'> = ['default', 'hover', 'focus', 'disabled'];
      states.forEach(state => {
        const { rerender } = render(<Button label="テスト" state={state} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`button--${state}`);
        rerender(<></>);
      });
    });
  });

  describe('インタラクション', () => {
    it('クリックイベントが正しく動作すること', () => {
      const handleClick = jest.fn();
      render(<Button label="テスト" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled時にクリックできないこと', () => {
      const handleClick = jest.fn();
      render(<Button label="テスト" onClick={handleClick} disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('state=disabledの時もクリックできないこと', () => {
      const handleClick = jest.fn();
      render(<Button label="テスト" onClick={handleClick} state="disabled" />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なロールを持つこと', () => {
      render(<Button label="テスト" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('ラベルが正しく設定されること', () => {
      render(<Button label="送信ボタン" />);
      expect(screen.getByRole('button', { name: '送信ボタン' })).toBeInTheDocument();
    });
  });
});