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
import { Divider } from "@component-library/Divider";

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

  const renderStartLink = () => (
    <Link
      data-testid="start-order-link"
      to="/process/model"
      className={`${additionalClassNames} flex flex-col items-center justify-center gap-3 p-3 duration-300 hover:bg-türkis-300`}
    >
      <LocalShippingIcon fontSize="large" />
      <Heading variant="h2">
        {t("Home.HomeOrderCard.button.start-order")}
      </Heading>
    </Link>
  );

  const renderHeader = () => (
    <Heading variant="h2">{t("Home.HomeOrderCard.header")}</Heading>
  );
  const renderOrderControl = () => (
    <div
      className="flex w-full flex-col items-center gap-2"
      data-testid="order-control"
    >
      <Divider />
      <Heading variant="h3">{t("Home.HomeOrderCard.order.header")}</Heading>
      {userType === UserType.anonym
        ? getBigOrderControl()
        : getSmallOrderControl()}
    </div>
  );
  const getBigOrderControl = () => (
    <div className="flex w-full flex-col items-center justify-center gap-2">
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
  const getSmallOrderControl = () => (
    <div className="flex w-full flex-col gap-3 md:w-fit md:flex-row">
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
  );
  const renderOrders = () => (
    <>
      <Divider />
      <Heading variant="h3">
        {t(
          userType === UserType.manufacturer
            ? "Home.HomeOrderCard.contracts.header"
            : "Home.HomeOrderCard.orders.header"
        )}
      </Heading>
      <LoadingSuspense query={ordersQuery}>
        {ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
          getOrderTable()
        ) : (
          <Text variant="body">{t("Home.HomeOrderCard.order.empty")}</Text>
        )}
      </LoadingSuspense>
      <Divider />
      <Button
        to={userType === UserType.client ? "/orders" : "/contracts"}
        title={t(
          userType === UserType.client
            ? "Home.HomeOrderCard.button.all-orders"
            : "Home.HomeOrderCard.button.all-contracts"
        )}
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
    </>
  );

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

  if (
    userType === UserType.anonym &&
    (cartCount === undefined || cartCount === 0)
  )
    return renderStartLink();
  return (
    <div
      data-testid="home-order-card"
      className={`${additionalClassNames}  flex flex-col items-center justify-start gap-5 p-3`}
    >
      {renderHeader()}
      {userType !== UserType.manufacturer ? renderOrderControl() : null}
      {userType !== UserType.anonym ? renderOrders() : null}
    </div>
  );
};

export default HomeOrderCard;
