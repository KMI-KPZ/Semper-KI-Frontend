import { OrderState } from "@/pages/OrderRoutes/hooks/useOrder";
import { useFlatOrders } from "@/pages/Orders/hooks/useFlatOrders";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "../../components/Container";

interface HomeAuthorizedOrderProps {}

const HomeAuthorizedOrder: React.FC<HomeAuthorizedOrderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { ordersQuery } = useFlatOrders();

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.Home.Authorized.Order.title")}</Heading>
      <div className="flex flex-col">
        {ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
          ordersQuery.data.slice(0, 5).map((order) => (
            <div key={order.orderID}>
              <Text variant="body">{order.orderID}</Text>
              <Text variant="body">{order.state}</Text>
              <Text variant="body">{order.created.toLocaleDateString()}</Text>
              <Text variant="body">{order.subOrderCount}</Text>
              <Button
                title={t(
                  order.state < OrderState.REQUESTED
                    ? "Home.Home.Authorized.Order.button.continue"
                    : "Home.Home.Authorized.Order.button.see"
                )}
                to={`/order/${order.orderID}`}
              />
            </div>
          ))
        ) : (
          <Text variant="body">{t("Home.Home.Authorized.Order.noOrders")}</Text>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          title={t("Home.Home.Authorized.Order.button.new")}
          to="/order/new"
        />
        <Button
          title={t("Home.Home.Authorized.Order.button.orders")}
          to="/orders"
        />
      </div>
    </HomeContainer>
  );
};

export default HomeAuthorizedOrder;
