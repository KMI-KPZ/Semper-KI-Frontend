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
import EditIcon from "@mui/icons-material/Edit";
import { FlatOrderProps } from "@/pages/Orders/hooks/useFlatOrders";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { OrderState, useOrder } from "@/pages/OrderRoutes/hooks/useOrder";
import logger from "@/hooks/useLogger";

interface OrdersTableProps {
  flatOrders: FlatOrderProps[];
}

interface OrderTableGroupProps {
  startState: OrderState;
  endState: OrderState;
}

const orderGroups: OrderTableGroupProps[] = [
  {
    startState: OrderState.DRAFT,
    endState: OrderState.VERIFIED,
  },
];

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  const { flatOrders } = props;
  const { t } = useTranslation();
  const { deleteOrder } = useOrder();

  const handleOnClickButtonDelete = (orderID: string) => {
    window.confirm(t("order.overview.components.table.deleteConfirm")) === true
      ? deleteOrder.mutate(orderID)
      : logger("delete canceled");
  };

  const getGroupedFlatOrder = (flatOrder: FlatOrderProps) => {
    const groupedFlatOrder = flatOrders;
  };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>{t("order.overview.components.table.grouping")}</TableCell>
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
          flatOrders
            .sort((subOrderA, subOrderB) =>
              subOrderA.created > subOrderB.created ? -1 : 1
            )
            .map((flatOrder) => (
              <TableRow
                key={flatOrder.orderID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell component="th" scope="row">
                  Artikel: #{flatOrder.orderID}
                </TableCell>
                <TableCell>
                  {t(
                    `Orders.OrderCollection.state.${
                      OrderState[flatOrder.state]
                    }`
                  )}
                </TableCell>
                <TableCell>{flatOrder.subOrderCount}</TableCell>
                <TableCell>{flatOrder.created.toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex w-fit flex-row items-center justify-center gap-5">
                    <Button
                      variant="secondary"
                      title={t("order.overview.components.table.button.delete")}
                      children={<DeleteIcon />}
                      onClick={() =>
                        handleOnClickButtonDelete(flatOrder.orderID)
                      }
                    />
                    {flatOrder.state < OrderState.REQUESTED ? (
                      <Button
                        variant="secondary"
                        title={t("order.overview.components.table.button.edit")}
                        children={<EditIcon />}
                        to={`/order/${flatOrder.orderID}`}
                      />
                    ) : (
                      <Button
                        variant="secondary"
                        title={t(
                          "order.overview.components.table.button.detail"
                        )}
                        children={<VisibilityIcon />}
                        to={`/order/${flatOrder.orderID}`}
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
