import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
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
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface OrdersTableProps {
  flatOrders: FlatOrderProps[];
}

interface OrderTableGroupingsProps {
  title: string;
  startState: OrderState;
  endState: OrderState;
}

const orderGroupings: OrderTableGroupingsProps[] = [
  {
    title: "draft",
    startState: OrderState.DRAFT,
    endState: OrderState.VERIFIED,
  },
  {
    title: "ongoing",
    startState: OrderState.REQUESTED,
    endState: OrderState.DELIVERY,
  },
  {
    title: "completed",
    startState: OrderState.COMPLETED,
    endState: OrderState.COMPLETED,
  },
];

interface OrderTableGroupProps {
  title: string;
  flatOrders: FlatOrderProps[];
}

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  const { flatOrders } = props;
  const { t } = useTranslation();
  const { deleteOrder } = useOrder();

  const handleOnClickButtonDelete = (orderID: string) => {
    window.confirm(t("order.overview.components.table.deleteConfirm")) === true
      ? deleteOrder.mutate(orderID)
      : logger("delete canceled");
  };

  const getGroupedFlatOrder = (
    flatOrders: FlatOrderProps[]
  ): OrderTableGroupProps[] => {
    let orderGroups: OrderTableGroupProps[] = [];
    orderGroupings.forEach((grouping) => {
      const filteredOrders = flatOrders.filter(
        (order) =>
          order.state >= grouping.startState && order.state <= grouping.endState
      );
      if (filteredOrders.length > 0)
        orderGroups.push({
          title: grouping.title,
          flatOrders: filteredOrders,
        });
    });
    return orderGroups;
  };

  const renderRowButtons = (flatOrder: FlatOrderProps) => (
    <div className="flex w-fit flex-row items-center justify-center gap-5">
      <PermissionGate element={"OrderButtonDelete"}>
        <Button
          variant="secondary"
          title={t("order.overview.components.table.button.delete")}
          children={<DeleteIcon />}
          onClick={() => handleOnClickButtonDelete(flatOrder.orderID)}
        />
      </PermissionGate>
      {flatOrder.state < OrderState.REQUESTED ? (
        <PermissionGate element={"OrderButtonEdit"}>
          <Button
            variant="secondary"
            title={t("order.overview.components.table.button.edit")}
            children={<EditIcon />}
            to={`/order/${flatOrder.orderID}`}
          />
        </PermissionGate>
      ) : (
        <Button
          variant="secondary"
          title={t("order.overview.components.table.button.detail")}
          children={<VisibilityIcon />}
          to={`/order/${flatOrder.orderID}`}
        />
      )}
    </div>
  );

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
        {getGroupedFlatOrder(flatOrders).map((group, groupIndex, groups) =>
          group.flatOrders
            .sort((subOrderA, subOrderB) =>
              subOrderA.state > subOrderB.state ? 1 : -1
            )
            .map((flatOrder, index, groupFlatOrder) => (
              <TableRow
                key={flatOrder.orderID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {index === 0 ? (
                  <TableCell
                    scope="row"
                    rowSpan={groupFlatOrder.length}
                    sx={{
                      verticalAlign: "top",
                      border: groupIndex === groups.length - 1 ? 0 : undefined,
                    }}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-start">
                      <Heading variant="h2">
                        {t(
                          `order.overview.components.table.groups.${group.title}`
                        )}
                      </Heading>
                    </div>
                  </TableCell>
                ) : null}
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
                <TableCell>{renderRowButtons(flatOrder)}</TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
