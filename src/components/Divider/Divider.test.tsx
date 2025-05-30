import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider Component', () => {
  describe('レンダリング', () => {
    it('正しくレンダリングされること', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      expect(divider).toBeInTheDocument();
    });

    it('hrタグとしてレンダリングされること', () => {
      const { container } = render(<Divider />);
      const hr = container.querySelector('hr');
      expect(hr).toBeInTheDocument();
    });
  });

  describe('Figmaデザイントークンの適用', () => {
    it('デフォルトカラー(gray-420)が正しく適用されること', () => {
      render(<Divider />);
      const divider = screen.getByRole('separator');
      const styles = window.getComputedStyle(divider);
      
      // インラインスタイルで#949494が設定されることを確認
      expect(divider).toHaveStyle('border-color: #949494');
    });

    it('gray-536カラーが正しく適用されること', () => {
      render(<Divider color="gray-536" />);
      const divider = screen.getByRole('separator');
      
      // インラインスタイルで#767676が設定されることを確認
      expect(divider).toHaveStyle('border-color: #767676');
    });

    it('blackカラーが正しく適用されること', () => {
      render(<Divider color="black" />);
      const divider = screen.getByRole('separator');
      
      // インラインスタイルで#000000が設定されることを確認
      expect(divider).toHaveStyle('border-color: #000000');
    });
  });

  describe('太さのバリエーション', () => {
    it('各太さが正しくクラスに適用されること', () => {
      const thicknesses: Array<'thin' | 'medium' | 'thick' | 'extra-thick'> = ['thin', 'medium', 'thick', 'extra-thick'];
      
      thicknesses.forEach(thickness => {
        const { rerender } = render(<Divider thickness={thickness} />);
        const divider = screen.getByRole('separator');
        expect(divider).toHaveClass(`divider--${thickness}`);
        rerender(<></>);
      });
    });

    it('horizontalの場合、太さがborder-topに適用されること', () => {
      render(<Divider orientation="horizontal" thickness="thin" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--horizontal');
      expect(divider).toHaveClass('divider--thin');
      // CSSクラスによって border-top-width: 1px が適用される
    });

    it('verticalの場合、太さがborder-leftに適用されること', () => {
      render(<Divider orientation="vertical" thickness="medium" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--vertical');
      expect(divider).toHaveClass('divider--medium');
      // CSSクラスによって border-left-width: 2px が適用される
    });
  });

  describe('スタイルバリエーション', () => {
    it('solidスタイルが正しく適用されること', () => {
      render(<Divider variant="solid" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--solid');
    });

    it('dashedスタイルが正しく適用されること', () => {
      render(<Divider variant="dashed" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--dashed');
    });
  });

  describe('方向', () => {
    it('horizontalが正しく適用されること', () => {
      render(<Divider orientation="horizontal" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--horizontal');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('verticalが正しく適用されること', () => {
      render(<Divider orientation="vertical" />);
      const divider = screen.getByRole('separator');
      expect(divider).toHaveClass('divider--vertical');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('スペーシング', () => {
    it('各スペーシングが正しくクラスに適用されること', () => {
      const spacings: Array<'none' | 'small' | 'medium' | 'large'> = ['none', 'small', 'medium', 'large'];
      
      spacings.forEach(spacing => {
        const { rerender } = render(<Divider spacing={spacing} />);
        const divider = screen.getByRole('separator');
        expect(divider).toHaveClass(`divider--spacing-${spacing}`);
        rerender(<></>);
      });
    });
  });

  describe('複合的なスタイル適用', () => {
    it('すべてのプロパティが正しく組み合わされること', () => {
      render(
        <Divider 
          variant="dashed"
          orientation="vertical"
          thickness="thick"
          color="black"
          spacing="large"
        />
      );
      
      const divider = screen.getByRole('separator');
      
      // すべてのクラスが適用されていることを確認
      expect(divider).toHaveClass('divider');
      expect(divider).toHaveClass('divider--dashed');
      expect(divider).toHaveClass('divider--vertical');
      expect(divider).toHaveClass('divider--thick');
      expect(divider).toHaveClass('divider--spacing-large');
      
      // カラーが正しく適用されていることを確認
      expect(divider).toHaveStyle('border-color: #000000');
      
      // アクセシビリティ属性の確認
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('アクセシビリティ', () => {
    it('separatorロールを持つこと', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('aria-orientationが設定されること', () => {
      const { rerender } = render(<Divider orientation="horizontal" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
      
      rerender(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    });
  });
});