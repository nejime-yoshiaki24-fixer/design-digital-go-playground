import React from 'react';
import './Button.css';

export interface ButtonProps {
  label: string;
  variant?: 'solid' | 'outline';
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'hover' | 'focus' | 'disabled';
  showLeadIcon?: boolean;
  showTailIcon?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'solid',
  size = 'large',
  state = 'default',
  showLeadIcon = false,
  showTailIcon = false,
  onClick,
  disabled = false,
}) => {
  const className = `button button--${variant} button--${size} button--${state}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || state === 'disabled'}
    >
      {showLeadIcon && <span className="button__icon button__icon--lead">←</span>}
      <span className="button__label">{label}</span>
      {showTailIcon && <span className="button__icon button__icon--tail">→</span>}
    </button>
  );
};