import React from "react";
import { Button } from "@component-library/index";
import { twMerge } from "tailwind-merge";

interface TableHeaderButtonProps<T> {
  handleSort: (column: keyof T) => void;
  getSortIcon: (column: keyof T) => React.ReactNode;
  title: string;
  objectKey: keyof T;
  className?: string;
}

const TableHeaderButton = <T,>(props: TableHeaderButtonProps<T>) => {
  const { getSortIcon, handleSort, title, objectKey, className } = props;

  return (
    <th>
      <div className="flex items-center justify-center ">
        <Button
          variant="text"
          title={title}
          onClick={() => handleSort(objectKey)}
          className={twMerge(`whitespace-nowrap`, className)}
        >
          <div className={`ml-6 flex flex-row items-center justify-center`}>
            {title}
            {getSortIcon(objectKey)}
          </div>
        </Button>
      </div>
    </th>
  );
};

export default TableHeaderButton;
