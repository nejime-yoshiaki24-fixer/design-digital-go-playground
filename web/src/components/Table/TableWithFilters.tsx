import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableColumn, TableProps } from './Table';
import './TableWithFilters.css';

export interface FilterConfig<T> {
  key: keyof T | string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface TableWithFiltersProps<T = any> extends Omit<TableProps<T>, 'data'> {
  data: T[];
  filters?: FilterConfig<T>[];
  onFilterChange?: (filters: Record<string, any>) => void;
  showClearButton?: boolean;
}

export function TableWithFilters<T extends Record<string, any>>({
  data,
  filters = [],
  onFilterChange,
  showClearButton = true,
  ...tableProps
}: TableWithFiltersProps<T>) {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const handleFilterChange = useCallback((key: string, value: any) => {
    const newFilters = {
      ...filterValues,
      [key]: value === '' ? undefined : value,
    };
    
    // 空の値は削除
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k] === undefined) {
        delete newFilters[k];
      }
    });
    
    setFilterValues(newFilters);
    onFilterChange?.(newFilters);
  }, [filterValues, onFilterChange]);

  const handleClearFilters = useCallback(() => {
    setFilterValues({});
    onFilterChange?.({});
  }, [onFilterChange]);

  const filteredData = useMemo(() => {
    if (Object.keys(filterValues).length === 0) {
      return data;
    }

    return data.filter(item => {
      return Object.entries(filterValues).every(([key, filterValue]) => {
        if (!filterValue) return true;

        const itemValue = item[key];
        const filter = filters.find(f => f.key === key);

        if (!filter) return true;

        switch (filter.type) {
          case 'text':
            return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
          
          case 'select':
            return itemValue === filterValue;
          
          case 'number':
            const numValue = Number(itemValue);
            const numFilter = Number(filterValue);
            return numValue === numFilter;
          
          case 'date':
            return String(itemValue).includes(filterValue);
          
          default:
            return true;
        }
      });
    });
  }, [data, filterValues, filters]);

  const hasActiveFilters = Object.keys(filterValues).length > 0;

  if (filters.length === 0) {
    return <Table data={data} {...tableProps} />;
  }

  return (
    <div className="table-with-filters">
      <div className="table-filters">
        <div className="table-filters__header">
          <h3 className="table-filters__title">フィルター</h3>
          {showClearButton && hasActiveFilters && (
            <button
              className="table-filters__clear-button"
              onClick={handleClearFilters}
              type="button"
            >
              クリア
            </button>
          )}
        </div>
        <div className="table-filters__content">
          {filters.map(filter => {
            const key = String(filter.key);
            const value = filterValues[key] || '';

            return (
              <div key={key} className="table-filter">
                <label htmlFor={`filter-${key}`} className="table-filter__label">
                  {filter.label}
                </label>
                {filter.type === 'select' && filter.options ? (
                  <select
                    id={`filter-${key}`}
                    className="table-filter__select"
                    value={value}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                  >
                    <option value="">すべて</option>
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`filter-${key}`}
                    type={filter.type === 'number' ? 'number' : filter.type === 'date' ? 'date' : 'text'}
                    className="table-filter__input"
                    value={value}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    placeholder={filter.placeholder}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="table-with-filters__results">
        <div className="table-with-filters__info">
          {hasActiveFilters && (
            <span className="table-with-filters__count">
              {filteredData.length}件 / 全{data.length}件
            </span>
          )}
        </div>
        <Table data={filteredData} {...tableProps} />
      </div>
    </div>
  );
}