import React from "react";
import { useTranslation } from "react-i18next";

interface TableProps {
  header: React.ReactElement[];
  rows: React.ReactElement[][];
}

const Table: React.FC<TableProps> = (props) => {
  const { header, rows } = props;
  const { t } = useTranslation();

  return (
    <table className="w-full table-auto">
      <thead className="">
        <tr className="">
          {header.map((headerItem, index) => (
            <th className="text-center" key={index}>
              <div className="flex w-full flex-row items-center justify-center">
                {headerItem}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {rows.map((row, rowIndex) => (
          <tr className="" key={rowIndex}>
            {row.map((rowItem, index) => (
              <td key={index}>
                <div className="flex w-full flex-row items-center justify-center">
                  {rowItem}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
