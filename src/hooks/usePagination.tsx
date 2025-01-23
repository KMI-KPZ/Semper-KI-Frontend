import { useState } from "react";

interface usePaginationReturnProps<T> {
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
  paginatedItems: T[];
}

interface usePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

const usePagination = <T,>(
  props: usePaginationProps<T>
): usePaginationReturnProps<T> => {
  const { items, itemsPerPage = 10 } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, handlePageChange, paginatedItems, totalPages };
};

export default usePagination;
