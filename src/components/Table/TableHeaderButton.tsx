import React from "react";
import { Button } from "@component-library/index";

interface TableHeaderButtonProps<T> {
  handleSort: (column: keyof T) => void;
  getSortIcon: (column: keyof T) => React.ReactNode;
  title: string;
  objectKey: keyof T;
}

const TableHeaderButton = <T,>(props: TableHeaderButtonProps<T>) => {
  const { getSortIcon, handleSort, title, objectKey } = props;

  return (
    <th>
      <div className="flex items-center justify-center ">
        <Button
          variant="text"
          title={title}
          onClick={() => handleSort(objectKey)}
          className="whitespace-nowrap"
        >
          <div className="ml-6 flex flex-row items-center justify-center">
            {title}
            {getSortIcon(objectKey)}
          </div>
        </Button>
      </div>
    </th>
  );
};

export default TableHeaderButton;
