import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FlatOrderProps } from "@/pages/Orders/hooks/useFlatOrders";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logger from "@/hooks/useLogger";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { OrderState, useOrder } from "@/pages/Order/hooks/useOrder";
import Container from "@component-library/Container";

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
    <div className="flex w-full flex-row items-center justify-center gap-5">
      <PermissionGate element={"OrderButtonDelete"}>
        <Button
          variant="secondary"
          title={t("order.overview.components.table.button.delete")}
          children={<DeleteIcon />}
          onClick={() => handleOnClickButtonDelete(flatOrder.orderID)}
        />
      </PermissionGate>
      <PermissionGate element={"OrderButtonSee"}>
        <Button
          variant="secondary"
          title={t("order.overview.components.table.button.detail")}
          children={<VisibilityIcon />}
          to={`/order/${flatOrder.orderID}`}
        />
      </PermissionGate>
    </div>
  );

  return (
    <Container className="overflow-auto" width="full">
      <table aria-label="simple table" className="w-full table-auto ">
        <thead className="">
          <tr className="border-b-2">
            <th>{t("order.overview.components.table.grouping")}</th>
            <th className="text-left">
              {t("order.overview.components.table.name")}
            </th>
            <th className="text-left">
              {t("order.overview.components.table.status")}
            </th>
            <th className="text-left">
              {t("order.overview.components.table.count")}
            </th>
            <th className="text-left">
              {t("order.overview.components.table.created")}
            </th>
            <th>{t("order.overview.components.table.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {getGroupedFlatOrder(flatOrders).map((group, groupIndex, groups) =>
            group.flatOrders
              .sort((subOrderA, subOrderB) =>
                subOrderA.state > subOrderB.state ? 1 : -1
              )
              .map((flatOrder, index, groupFlatOrder) => (
                <tr
                  key={flatOrder.orderID}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {index === 0 ? (
                    <td
                      scope="row"
                      rowSpan={groupFlatOrder.length}

                      // sx={{
                      //   verticalAlign: "top",
                      //   border:
                      //     groupIndex === groups.length - 1 ? 0 : undefined,
                      // }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-start">
                        <Heading variant="h2">
                          {t(
                            `order.overview.components.table.groups.${group.title}`
                          )}
                        </Heading>
                      </div>
                    </td>
                  ) : null}
                  <td scope="row">
                    {flatOrder.details.title === undefined
                      ? `Auftrag: #${flatOrder.orderID}`
                      : flatOrder.details.title}
                  </td>
                  <td>
                    {t(
                      `Orders.OrderCollection.state.${
                        OrderState[flatOrder.state]
                      }`
                    )}
                  </td>
                  <td>{flatOrder.subOrderCount}</td>
                  <td>{flatOrder.created.toLocaleDateString()}</td>
                  <td>{renderRowButtons(flatOrder)}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default OrdersTable;
