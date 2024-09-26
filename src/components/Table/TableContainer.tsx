import React, { PropsWithChildren } from "react";

interface TableContainerProps {}

const TableContainer: React.FC<PropsWithChildren<TableContainerProps>> = (
  props
) => {
  const { children } = props;

  return (
    <div className="flex  w-full flex-col items-start justify-start overflow-auto rounded-xl border-2">
      {children}
    </div>
  );
};

export default TableContainer;
