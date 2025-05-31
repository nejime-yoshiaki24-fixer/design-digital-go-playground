import React from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

export type IconName = 'arrow_down' | 'check' | 'close' | 'search';

export interface IconProps {
  /** アイコンの名前 */
  name: IconName;
  /** アイコンのサイズ (デフォルト: 24) */
  size?: number;
  /** アイコンの色 (デフォルト: #1A1A1A) */
  color?: string;
  /** 追加のクラス名 */
  className?: string;
  /** アクセシビリティ用のラベル */
  'aria-label'?: string;
  /** スクリーンリーダーから隠す場合 */
  'aria-hidden'?: boolean;
}

const iconMap = {
  arrow_down: ArrowDownIcon,
  check: CheckIcon,
  close: CloseIcon,
  search: SearchIcon,
} as const;

/**
 * デジタル庁デザインシステムのアイコンコンポーネント
 * 
 * @example
 * ```tsx
 * <Icon name="search" size={24} color="#0017C1" />
 * <Icon name="close" size={16} aria-label="閉じる" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#1A1A1A',
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      className={`icon icon--${name} ${className}`.trim()}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

export default Icon;