import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableColumn, TableProps } from './Table';
import './TableWithPagination.css';

export interface PaginationConfig {
  pageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showTotal?: boolean;
  showJumper?: boolean;
}

export interface TableWithPaginationProps<T = any> extends Omit<TableProps<T>, 'data'> {
  data: T[];
  pagination?: PaginationConfig | boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}

const defaultPaginationConfig: Required<PaginationConfig> = {
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  showSizeChanger: true,
  showTotal: true,
  showJumper: true,
};

export function TableWithPagination<T extends Record<string, any>>({
  data,
  pagination = true,
  onPageChange,
  ...tableProps
}: TableWithPaginationProps<T>) {
  const paginationConfig = useMemo(() => {
    if (pagination === false) return null;
    if (pagination === true) return defaultPaginationConfig;
    return { ...defaultPaginationConfig, ...pagination };
  }, [pagination]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(paginationConfig?.pageSize || 10);

  const totalPages = useMemo(() => {
    if (!paginationConfig) return 1;
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize, paginationConfig]);

  const paginatedData = useMemo(() => {
    if (!paginationConfig) return data;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize, paginationConfig]);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page, pageSize);
    }
  }, [totalPages, pageSize, onPageChange]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    onPageChange?.(1, newPageSize);
  }, [onPageChange]);

  const handleJumpToPage = useCallback((value: string) => {
    const page = parseInt(value, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
    }
  }, [handlePageChange]);

  if (!paginationConfig) {
    return <Table data={data} {...tableProps} />;
  }

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, data.length);

  // ページ番号の生成
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxButtons = 7;
    
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="table-with-pagination">
      <Table data={paginatedData} {...tableProps} />
      <div className="table-pagination">
        <div className="table-pagination__left">
          {paginationConfig.showTotal && (
            <span className="table-pagination__total">
              {data.length}件中 {startIndex}-{endIndex}件を表示
            </span>
          )}
        </div>
        <div className="table-pagination__center">
          <button
            className="table-pagination__button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="前のページ"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {getPageNumbers().map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="table-pagination__ellipsis">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                className={`table-pagination__button ${
                  currentPage === pageNum ? 'table-pagination__button--active' : ''
                }`}
                onClick={() => handlePageChange(pageNum as number)}
                aria-label={`ページ ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            )
          ))}
          
          <button
            className="table-pagination__button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="次のページ"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="table-pagination__right">
          {paginationConfig.showSizeChanger && (
            <div className="table-pagination__size-changer">
              <label htmlFor="page-size" className="table-pagination__label">
                表示件数:
              </label>
              <select
                id="page-size"
                className="table-pagination__select"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                {paginationConfig.pageSizeOptions.map(size => (
                  <option key={size} value={size}>
                    {size}件
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {paginationConfig.showJumper && (
            <div className="table-pagination__jumper">
              <label htmlFor="page-jumper" className="table-pagination__label">
                ページ:
              </label>
              <input
                id="page-jumper"
                type="number"
                className="table-pagination__input"
                min={1}
                max={totalPages}
                placeholder={String(currentPage)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJumpToPage(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}