import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  itemsCount: number;
  currentPage: number;
  onChangePage: (num: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ itemsCount, currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={itemsCount}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
