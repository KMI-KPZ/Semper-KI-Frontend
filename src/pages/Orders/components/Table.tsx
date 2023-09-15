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
      <div className="w-full">
        <table aria-label="simple table" className="w-full table-auto">
          <thead className="">
            <tr className="border-b">
              <th className="p-3 md:pb-3">
                <Text variant="strong">
                  {t("order.overview.components.table.grouping")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("order.overview.components.table.name")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("order.overview.components.table.status")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong">
                  {t("order.overview.components.table.count")}
                </Text>
              </th>
              <th className="p-3 text-left md:pb-3">
                <Text variant="strong" className="whitespace-nowrap">
                  {t("order.overview.components.table.created")}
                </Text>
              </th>
              <th className="p-3 md:pb-3">
                <Text variant="strong">
                  {t("order.overview.components.table.actions")}
                </Text>
              </th>
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
                    className={` ${
                      groupFlatOrder.length - 1 === index &&
                      groups.length - 1 === groupIndex
                        ? ""
                        : "border-b"
                    }`}
                    key={flatOrder.orderID}
                  >
                    {index === 0 ? (
                      <td
                        scope="row"
                        rowSpan={groupFlatOrder.length}
                        className={`h-full p-3 align-top md:py-3`}
                      >
                        <div className="flex w-full justify-center">
                          <Heading variant="h2">
                            {t(
                              `order.overview.components.table.groups.${group.title}`
                            )}
                          </Heading>
                        </div>
                      </td>
                    ) : null}
                    <td className="p-3 md:py-3">
                      {flatOrder.details.title === undefined
                        ? `Auftrag: #${flatOrder.orderID}`
                        : flatOrder.details.title}
                    </td>
                    <td className="p-3 md:py-3">
                      {t(
                        `Orders.OrderCollection.state.${
                          OrderState[flatOrder.state]
                        }`
                      )}
                    </td>
                    <td className="p-3 md:py-3">{flatOrder.subOrderCount}</td>
                    <td className="p-3 md:py-3">
                      {flatOrder.created.toLocaleDateString()}
                    </td>
                    <td className="p-3 md:py-3">
                      {renderRowButtons(flatOrder)}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default OrdersTable;
