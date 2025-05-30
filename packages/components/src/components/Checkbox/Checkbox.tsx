import React, { useState, useEffect } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  errorText?: string;
  id?: string;
  name?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'medium',
  error = false,
  errorText,
  id,
  name,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const containerClassName = `checkbox-container checkbox-container--${size} ${error ? 'checkbox-container--error' : ''} ${disabled ? 'checkbox-container--disabled' : ''}`;

  return (
    <div className={containerClassName}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked !== undefined ? checked : isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="checkbox-input"
          aria-invalid={error}
          aria-describedby={error && errorText ? `${checkboxId}-error` : undefined}
        />
        <label htmlFor={checkboxId} className="checkbox-label">
          <span className="checkbox-box">
            {(checked !== undefined ? checked : isChecked) && (
              <svg 
                className="checkbox-check" 
                viewBox="0 0 24 24" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 6L9 17L4 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {label && <span className="checkbox-text">{label}</span>}
        </label>
      </div>
      {error && errorText && (
        <span id={`${checkboxId}-error`} className="checkbox-error">
          {errorText}
        </span>
      )}
    </div>
  );
};