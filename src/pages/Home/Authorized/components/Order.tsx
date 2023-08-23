import { OrderState, useOrder } from "@/pages/OrderRoutes/hooks/useOrder";
import { useFlatOrders } from "@/pages/Orders/hooks/useFlatOrders";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "../../components/Container";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface HomeAuthorizedOrderProps {}

const HomeAuthorizedOrder: React.FC<HomeAuthorizedOrderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  // const { ordersQuery } = useFlatOrders();
  const { createOrder } = useOrder();
  const handleOnClickButtonNew = () => {
    createOrder.mutate();
  };

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.Home.Authorized.Order.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <PermissionGate element={"OrdersButtonNew"}>
          <Button
            title={t("Home.Home.Authorized.Order.button.new")}
            onClick={handleOnClickButtonNew}
          />
        </PermissionGate>
        <PermissionGate element={"OrdersButton"}>
          <Button
            title={t("Home.Home.Authorized.Order.button.orders")}
            to="/orders"
          />
        </PermissionGate>
      </div>
    </HomeContainer>
  );
};

export default HomeAuthorizedOrder;
