import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface useSortReturnProps<T> {
  handleSort: (column: keyof T) => void;
  getSortIcon: (column: keyof T) => React.ReactNode;
  sortItems: (a: T, b: T) => 1 | -1 | 0;
}

const useSort = <T,>(): useSortReturnProps<T> => {
  const [sortColumn, setSortColumn] = useState<keyof T | undefined>(); // State variable to keep track of the column to sort
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State variable to keep track of the sorting order

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the sorting order
      setSortOrder((prevState) => (prevState === "asc" ? "desc" : "asc"));
    } else {
      // If a different column is clicked, set the new column and reset the sorting order to ascending
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: keyof T): React.ReactNode => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    }
    return <div className="h-6 w-6" />;
  };

  const sortItems = (a: T, b: T) => {
    if (sortColumn) {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
    }
    return 0;
  };

  return { getSortIcon, handleSort, sortItems };
};

export default useSort;
