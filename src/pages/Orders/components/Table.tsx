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
import { FlatOrder } from "@/pages/Orders/hooks/useFlatOrders";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { OrderState } from "@/pages/OrderRoutes/hooks/useOrder";

interface OrdersTableProps {
  flatOrders: FlatOrder[];
}

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  const { flatOrders } = props;
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
        {flatOrders.length === 0 ? (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell colSpan={5} align="center">
              <Text variant="body">
                {t("order.overview.components.table.noItems")}
              </Text>
            </TableCell>
          </TableRow>
        ) : (
          flatOrders.map((flatOrder) => (
            <TableRow
              key={flatOrder.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Artikel: #{flatOrder.id}
              </TableCell>
              <TableCell>{flatOrder.state}</TableCell>
              <TableCell>{flatOrder.subOrderCount}</TableCell>
              <TableCell>{flatOrder.date}</TableCell>
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
                    title={t("order.overview.components.table.button.detail")}
                    children={<VisibilityIcon />}
                    to={`/order/${flatOrder.id}`}
                  />
                  {flatOrder.state >= OrderState.REQUESTED ? null : (
                    <Button
                      variant="secondary"
                      title={t("order.overview.components.table.button.edit")}
                      children={<EditIcon />}
                      to={`/order/${flatOrder.id}/process`}
                    />
                  )}
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
