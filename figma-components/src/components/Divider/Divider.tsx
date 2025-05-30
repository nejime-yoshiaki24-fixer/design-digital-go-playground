import React from 'react';
import './Divider.css';

export interface DividerProps {
  variant?: 'solid' | 'dashed';
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick' | 'extra-thick';
  color?: 'gray-420' | 'gray-536' | 'black';
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

const colorMap = {
  'gray-420': '#949494',
  'gray-536': '#767676',
  'black': '#000000',
};

export const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  thickness = 'thin',
  color = 'gray-420',
  spacing = 'medium',
}) => {
  const className = `divider divider--${variant} divider--${orientation} divider--${thickness} divider--spacing-${spacing}`;
  const borderColor = colorMap[color] || colorMap['gray-420'];

  return (
    <hr 
      className={className}
      style={{ borderColor }}
      aria-orientation={orientation}
    />
  );
};