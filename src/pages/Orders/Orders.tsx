import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { useFlatOrders } from "./hooks/useFlatOrders";
import OrdersTable from "./components/Table";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { useOrder } from "../Order/hooks/useOrder";
import { UserProps, UserType } from "@/hooks/useUser/types";
import { Divider } from "@component-library/Divider";

interface OrdersProps {
  user: UserProps | undefined;
}

const Orders: React.FC<OrdersProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  const { ordersQuery } = useFlatOrders();
  const { createOrder } = useOrder();

  const onButtonClickCreateOrder = () => {
    createOrder.mutate();
  };

  const renderClientOrders = () =>
    ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
      <OrdersTable
        flatOrders={
          user !== undefined && user.usertype === UserType.ORGANIZATION
            ? ordersQuery.data.filter((order) =>
                user.organizations.includes(order.client)
              )
            : ordersQuery.data
        }
      />
    ) : (
      <Text variant="body">{t("Orders.OrderCollectionOverview.empty")}</Text>
    );

  const renderOrganizationOrders = (user: UserProps) =>
    ordersQuery.data !== undefined &&
    ordersQuery.data.length > 0 &&
    ordersQuery.data.filter(
      (order) => !user.organizations.includes(order.client)
    ).length > 0 ? (
      <OrdersTable
        flatOrders={ordersQuery.data.filter(
          (order) => !user.organizations.includes(order.client)
        )}
      />
    ) : (
      <Text variant="body">{t("Orders.OrderCollectionOverview.empty")}</Text>
    );

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <Heading variant="h1">{t("order.overview.title")}</Heading>
        <PermissionGate element={"OrdersButtonNew"}>
          <Button
            title={t("order.overview.button.create")}
            onClick={onButtonClickCreateOrder}
          />
        </PermissionGate>
      </div>
      <LoadingSuspense query={ordersQuery}>
        {renderClientOrders()}
        {user !== undefined && user.usertype === UserType.ORGANIZATION ? (
          <>
            <Heading variant="h2" className="mt-10 w-full text-left">
              {t("order.overview.orga")}
            </Heading>
            {renderOrganizationOrders(user)}
          </>
        ) : null}
      </LoadingSuspense>
    </div>
  );
};

export default Orders;
