import React, { PropsWithChildren } from "react";
interface TableProps {
  type?: "normal" | "fixed_last_row";
}

const Table: React.FC<PropsWithChildren<TableProps>> = (props) => {
  const { children, type = "normal" } = props;

  const getClassName = () => {
    switch (type) {
      case "normal":
        return "table-normal";
      case "fixed_last_row":
        return "table-fixed-last-row";
    }
  };

  return <table className={getClassName()}>{children}</table>;
};

export default Table;
