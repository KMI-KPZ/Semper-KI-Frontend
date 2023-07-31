import { Button } from "@component-library/Button";
import { Text } from "@component-library/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import { OrderState } from "@/pages/Order/hooks/useOrders";

interface OrdersTableProps {
  rows: OrdersTableRowProps[] | undefined;
}

export interface OrdersTableRowProps {
  id: string;
  name: string;
  count: number;
  created: string;
  status: string;
}

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  const { rows } = props;
  const { t } = useTranslation();

  const handleOnClickButtonDelete = () => {
    console.log("Delete");
  };
  const handleOnClickButtonEdit = () => {
    console.log("Edit");
  };
  const handleOnClickButtonContinue = () => {
    console.log("Continue");
  };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>{t("order.overview.components.table.name")}</TableCell>
          <TableCell>{t("order.overview.components.table.status")}</TableCell>
          <TableCell>{t("order.overview.components.table.count")}</TableCell>
          <TableCell>{t("order.overview.components.table.created")}</TableCell>
          <TableCell>{t("order.overview.components.table.actions")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows === undefined ? (
          <Text variant="body">
            {t("order.overview.components.table.noItems")}
          </Text>
        ) : (
          rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.count}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>
                <div className="flex w-fit flex-row items-center justify-center gap-5">
                  <Button
                    variant="secondary"
                    title={t("order.overview.components.table.button.delete")}
                    children={<DeleteIcon />}
                    onClick={handleOnClickButtonDelete}
                  />
                  <Button
                    variant="secondary"
                    title={t("order.overview.components.table.button.edit")}
                    children={<EditIcon />}
                    to={`/process/${row.id}`}
                  />
                  <Button
                    variant="secondary"
                    title={t("order.overview.components.table.button.detail")}
                    children={<PlayArrowIcon />}
                    to={`/order/${row.id}`}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
