import React, { useState, useMemo } from 'react';
import './Table.css';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  caption?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  sortable?: boolean;
  defaultSortKey?: string;
  defaultSortDirection?: 'asc' | 'desc';
  onRowClick?: (record: T, index: number) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  emptyText?: string;
  loading?: boolean;
  responsive?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

export function Table<T extends Record<string, any>>({
  columns,
  data,
  caption,
  striped = false,
  hoverable = true,
  bordered = true,
  compact = false,
  sortable = true,
  defaultSortKey,
  defaultSortDirection = 'asc',
  onRowClick,
  rowKey,
  emptyText = 'データがありません',
  loading = false,
  responsive = true,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    defaultSortKey ? defaultSortDirection : null
  );

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    if (sortKey === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      }
    } else {
      setSortKey(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, 'ja');
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const getRowKey = (record: T, index: number): string | number => {
    if (rowKey) {
      return typeof rowKey === 'function' ? rowKey(record) : record[rowKey] as string | number;
    }
    return index;
  };

  const getSortIcon = (columnKey: string) => {
    if (sortKey !== columnKey) {
      return (
        <span className="table__sort-icon table__sort-icon--inactive">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 5L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 14L12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      );
    }

    if (sortDirection === 'asc') {
      return (
        <span className="table__sort-icon table__sort-icon--asc">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      );
    }

    return (
      <span className="table__sort-icon table__sort-icon--desc">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    );
  };

  const tableClassName = [
    'table',
    striped && 'table--striped',
    hoverable && 'table--hoverable',
    bordered && 'table--bordered',
    compact && 'table--compact',
    loading && 'table--loading',
  ]
    .filter(Boolean)
    .join(' ');

  const containerClassName = [
    'table-container',
    responsive && 'table-container--responsive',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName}>
      <table className={tableClassName}>
        {caption && <caption className="table__caption">{caption}</caption>}
        <thead className="table__head">
          <tr className="table__row">
            {columns.map((column) => {
              const isSortable = sortable && column.sortable !== false;
              const columnKey = typeof column.key === 'string' ? column.key : String(column.key);
              
              return (
                <th
                  key={columnKey}
                  className={`table__header-cell table__header-cell--${column.align || 'left'} ${
                    isSortable ? 'table__header-cell--sortable' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => isSortable && handleSort(columnKey)}
                  tabIndex={isSortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isSortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSort(columnKey);
                    }
                  }}
                  role={isSortable ? 'button' : undefined}
                  aria-sort={
                    sortKey === columnKey
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                >
                  <span className="table__header-content">
                    <span className="table__header-text">{column.header}</span>
                    {isSortable && getSortIcon(columnKey)}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table__body">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="table__cell table__cell--loading">
                <div className="table__loading-spinner">読み込み中...</div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table__cell table__cell--empty">
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                className={`table__row ${onRowClick ? 'table__row--clickable' : ''}`}
                onClick={() => onRowClick?.(record, index)}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onRowClick(record, index);
                  }
                }}
              >
                {columns.map((column) => {
                  const columnKey = typeof column.key === 'string' ? column.key : String(column.key);
                  const value = record[columnKey];
                  const cellContent = column.render
                    ? column.render(value, record, index)
                    : value;

                  return (
                    <td
                      key={columnKey}
                      className={`table__cell table__cell--${column.align || 'left'}`}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}