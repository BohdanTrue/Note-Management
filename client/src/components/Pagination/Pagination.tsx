import React from 'react';
import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    const renderPageButton = (pageNumber: number, text: string | number) => {
      const isOnCurrentPage = currentPage === pageNumber;
      return (
        <div
          key={pageNumber}
          className={`${styles['page-item']} ${isOnCurrentPage ? styles['active'] : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          <p>{text}</p>
        </div>
      );
    };

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i, i));
      }
    } else {
      pageNumbers.push(renderPageButton(1, 1));
      if (currentPage > 2) {
        pageNumbers.push(<p key="ellipsis" className={styles['page-item']}>...</p>);
      }
      if (currentPage > 1 && currentPage < totalPages) {
        pageNumbers.push(renderPageButton(currentPage, currentPage));
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push(renderPageButton(currentPage + 1, currentPage + 1));
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<p key="ellipsis2" className={styles['page-item']}>...</p>);
      }
      pageNumbers.push(renderPageButton(totalPages, totalPages));
    }

    return pageNumbers;
  };

  return (
    <div className={styles['pagination']}>
      {currentPage > 1 && (
        <div className={styles['arrow']} onClick={() => onPageChange(currentPage - 1)}>
          <p>{'<'}</p>
        </div>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <div className={styles['arrow']} onClick={() => onPageChange(currentPage + 1)}>
          <p>{'>'}</p>
        </div>
      )}
    </div>
  );
};
