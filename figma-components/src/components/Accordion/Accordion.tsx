import React, { useState, useRef } from 'react';
import './Accordion.css';

export interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  defaultExpanded?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  defaultExpandedIndices?: number[];
  onChange?: (expandedIndices: number[]) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpandedIndices = [],
  onChange,
}) => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>(defaultExpandedIndices);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (index: number) => {
    let newExpandedIndices: number[];
    
    if (expandedIndices.includes(index)) {
      // 閉じる
      newExpandedIndices = expandedIndices.filter(i => i !== index);
    } else {
      // 開く
      if (allowMultiple) {
        newExpandedIndices = [...expandedIndices, index];
      } else {
        newExpandedIndices = [index];
      }
    }
    
    setExpandedIndices(newExpandedIndices);
    onChange?.(newExpandedIndices);
  };

  const isExpanded = (index: number) => expandedIndices.includes(index);

  return (
    <div className="accordion" role="region">
      {items.map((item, index) => {
        const expanded = isExpanded(index);
        const itemId = `accordion-item-${index}`;
        const headerId = `${itemId}-header`;
        const contentId = `${itemId}-content`;

        return (
          <div key={index} className="accordion-item">
            <button
              id={headerId}
              className={`accordion-header ${expanded ? 'accordion-header--expanded' : ''}`}
              onClick={() => toggleItem(index)}
              aria-expanded={expanded}
              aria-controls={contentId}
            >
              <span className="accordion-header-text">{item.title}</span>
              <span className={`accordion-icon ${expanded ? 'accordion-icon--expanded' : ''}`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="accordion-icon-svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              id={contentId}
              ref={el => {contentRefs.current[index] = el;}}
              className={`accordion-content ${expanded ? 'accordion-content--expanded' : ''}`}
              role="region"
              aria-labelledby={headerId}
              aria-hidden={!expanded}
            >
              <div className="accordion-content-inner">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 単一のAccordionItemコンポーネント（個別使用用）
export interface AccordionItemComponentProps extends AccordionItemProps {
  expanded?: boolean;
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemComponentProps> = ({
  title,
  content,
  expanded = false,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headerId = `accordion-item-header-${Math.random().toString(36).substr(2, 9)}`;
  const contentId = `accordion-item-content-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="accordion-item">
      <button
        id={headerId}
        className={`accordion-header ${expanded ? 'accordion-header--expanded' : ''}`}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        <span className="accordion-header-text">{title}</span>
        <span className={`accordion-icon ${expanded ? 'accordion-icon--expanded' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="accordion-icon-svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        id={contentId}
        ref={contentRef}
        className={`accordion-content ${expanded ? 'accordion-content--expanded' : ''}`}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!expanded}
      >
        <div className="accordion-content-inner">
          {content}
        </div>
      </div>
    </div>
  );
};