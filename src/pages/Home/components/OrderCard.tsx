import React, { useTransition } from "react";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { LoadingSuspense } from "@component-library/Loading";
import { Button } from "@component-library/Button";
import { Badge } from "@component-library/Badge";
import { UserType } from "@/hooks/useUser/types";
import { OrderState, useOrders } from "@/pages/Orders/hooks/useOrders";
import { Heading, Text } from "@component-library/Typography";
import Table from "@/components/Table";

interface Props {
  className?: string;
  userType: UserType;
  cartCount?: number;
  ordersCount?: number;
}

const HomeOrderCard: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const orderShowCountClient = 4;
  const orderShowCountManufacturer = 6;
  const { className, userType, cartCount, ordersCount } = props;
  const orderShowCount =
    userType === UserType.client
      ? orderShowCountClient
      : orderShowCountManufacturer;
  const { ordersQuery } = useOrders(
    userType === UserType.client || userType === UserType.manufacturer
  );
  const additionalClassNames = className ?? "";

  const getOrderTable = () => (
    <Table
      header={[
        t("Home.HomeOrderCard.contracts.date"),
        t("Home.HomeOrderCard.contracts.article"),
        t("Home.HomeOrderCard.contracts.status"),
      ]}
      rows={
        ordersQuery.data !== undefined
          ? ordersQuery.data
              .slice(
                0,
                ordersQuery.data.length < orderShowCount
                  ? ordersQuery.data.length
                  : orderShowCount
              )
              .map((order, index) => [
                <Text variant="body" className="text-center">
                  {new Date(order.date).toLocaleDateString()}
                </Text>,
                <Text variant="body">{order.orders.length}</Text>,
                <Text variant="body">{OrderState[order.state]}</Text>,
              ])
          : [[]]
      }
    />
  );

  if (userType === UserType.manufacturer)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-5 p-3`}
      >
        <div className="flex h-full w-full flex-col items-center justify-start gap-5">
          <Heading variant="h2">{t("Home.HomeOrderCard.header")}</Heading>
          <div className="w-full border-t-2" />
          <Heading variant="h3">
            {t("Home.HomeOrderCard.contracts.header")}
          </Heading>
          <LoadingSuspense query={ordersQuery}>
            {ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
              getOrderTable()
            ) : (
              <Text variant="body">{t("Home.HomeOrderCard.order.empty")}</Text>
            )}
          </LoadingSuspense>
        </div>
        <Button
          to="/contracts"
          title={t("Home.HomeOrderCard.button.all-orders")}
          startIcon={
            ordersCount !== undefined ? (
              <Badge count={ordersCount}>
                <FileCopyIcon />
              </Badge>
            ) : (
              <FileCopyIcon />
            )
          }
          children={t("Home.HomeOrderCard.button.all-orders")}
        />
      </div>
    );
  if (userType === UserType.client)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-3 p-3`}
      >
        <div className="flex h-full w-full flex-col items-center justify-start gap-5">
          <Heading variant="h2">{t("Home.HomeOrderCard.header")}</Heading>
          <div className="w-full border-t-2" />
          <Heading variant="h3">{t("Home.HomeOrderCard.order.header")}</Heading>
          <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
            <Button
              to="/process/new"
              title={t("Home.HomeOrderCard.order.new")}
              children={<AddIcon />}
            />
            <Button
              to="/process/model"
              title={t("Home.HomeOrderCard.order.continue")}
              children={<PlayArrowIcon />}
            />
            <Button
              to="/cart"
              title={t("Home.HomeOrderCard.order.cart")}
              children={
                cartCount !== undefined ? (
                  <Badge count={cartCount}>
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )
              }
            />
          </div>
          <div className="w-full border-t-2" />
          <Heading variant="h3">
            {t("Home.HomeOrderCard.orders.header")}
          </Heading>
          <LoadingSuspense query={ordersQuery}>
            {ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
              getOrderTable()
            ) : (
              <Text variant="body">{t("Home.HomeOrderCard.order.empty")}</Text>
            )}
          </LoadingSuspense>
        </div>
        <Button
          to="/orders"
          title={t("Home.HomeOrderCard.button.all-orders")}
          startIcon={
            ordersCount !== undefined ? (
              <Badge count={ordersCount}>
                <FileCopyIcon />
              </Badge>
            ) : (
              <FileCopyIcon />
            )
          }
        />
      </div>
    );
  if (userType === UserType.anonym && cartCount !== undefined && cartCount > 0)
    return (
      <div
        className={`${additionalClassNames} flex flex-col items-center justify-center gap-3 p-3`}
      >
        <Button
          to="/process/new"
          startIcon={<AddIcon />}
          title={t("Home.HomeOrderCard.order.new")}
          variant="outline"
          size="xl"
        />
        <Button
          size="xl"
          to="/process/model"
          title={t("Home.HomeOrderCard.order.continue")}
          startIcon={<PlayArrowIcon />}
          variant="outline"
        />
        <Button
          size="xl"
          variant="outline"
          to="/cart"
          title={t("Home.HomeOrderCard.order.cart")}
          startIcon={
            cartCount !== undefined ? (
              <Badge count={cartCount}>
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <ShoppingCartIcon />
            )
          }
        />
      </div>
    );
  return (
    <Link
      to="/process/model"
      className={`${additionalClassNames} flex flex-col items-center justify-center gap-3 p-3 duration-300 hover:bg-türkis-300`}
    >
      <LocalShippingIcon fontSize="large" />
      <Heading variant="h2">
        {t("Home.HomeOrderCard.button.start-order")}
      </Heading>
    </Link>
  );
};

export default HomeOrderCard;
