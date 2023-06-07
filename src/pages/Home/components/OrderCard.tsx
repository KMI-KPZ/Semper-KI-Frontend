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
import { UserType } from "@/hooks/useUser";
import { OrderState, useOrders } from "@/pages/Orders/hooks/useOrders";
import { Heading } from "@component-library/Typography";

interface Props {
  className?: string;
  userType: UserType;
  cartCount?: number;
  ordersCount?: number;
}

const HomeOrderCard: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const orderShowCountClient = 3;
  const orderShowCountManufacturer = 6;
  const { className, userType, cartCount, ordersCount } = props;
  const { ordersQuery } = useOrders(
    userType === UserType.client || userType === UserType.manufacturer
  );
  const additionalClassNames = className ?? "";

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
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>{t("Home.HomeOrderCard.contracts.date")}</th>
                  <th>{t("Home.HomeOrderCard.contracts.article")}</th>
                  <th>{t("Home.HomeOrderCard.contracts.status")}</th>
                </tr>
              </thead>
              <tbody>
                {ordersQuery.data !== undefined ? (
                  ordersQuery.data
                    .slice(
                      0,
                      ordersQuery.data.length < orderShowCountManufacturer
                        ? ordersQuery.data.length
                        : orderShowCountManufacturer
                    )
                    .map((order, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="text-center">{order.orders.length}</td>
                        <td className="text-center">
                          {OrderState[order.state]}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr className="flex w-full flex-row justify-between">
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </LoadingSuspense>
        </div>
        <Button
          to="/contracts"
          title={t("Home.HomeOrderCard.button.all-orders")}
          icon={
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
              icon={<AddIcon />}
            />
            <Button
              to="/process/model"
              title={t("Home.HomeOrderCard.order.continue")}
              icon={<PlayArrowIcon />}
            />
            <Button
              to="/cart"
              title={t("Home.HomeOrderCard.order.cart")}
              icon={
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
            <table className="table-auto">
              <thead>
                <tr>
                  <th>{t("Home.HomeOrderCard.orders.date")}</th>
                  <th>{t("Home.HomeOrderCard.orders.article")}</th>
                  <th>{t("Home.HomeOrderCard.orders.status")}</th>
                </tr>
              </thead>
              <tbody>
                {ordersQuery.data !== undefined ? (
                  ordersQuery.data
                    .slice(
                      0,
                      ordersQuery.data.length < orderShowCountClient
                        ? ordersQuery.data.length
                        : orderShowCountClient
                    )
                    .map((order, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="text-center">{order.orders.length}</td>
                        <td className="text-center">
                          {OrderState[order.state]}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr className="flex w-full flex-row justify-between">
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </LoadingSuspense>
        </div>
        <Button
          to="/orders"
          title={t("Home.HomeOrderCard.button.all-orders")}
          icon={
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
  if (userType === UserType.anonym && cartCount !== undefined && cartCount > 0)
    return (
      <div
        className={`${additionalClassNames} flex flex-col items-center justify-center gap-3 p-3`}
      >
        <Link
          to="/process/new"
          title={t("Home.HomeOrderCard.order.new")}
          className="flex flex-row justify-between gap-5 p-5 duration-300 hover:bg-türkis-300"
        >
          <AddIcon />
          {t("Home.HomeOrderCard.order.new")}
        </Link>
        <Link
          to="/process/model"
          title={t("Home.HomeOrderCard.order.continue")}
          className="flex flex-row justify-between gap-5 p-5 duration-300 hover:bg-türkis-300"
        >
          <PlayArrowIcon />
          {t("Home.HomeOrderCard.order.continue")}
        </Link>
        <Link
          to="/cart"
          title={t("Home.HomeOrderCard.order.cart")}
          className="flex flex-row justify-between gap-5 p-5 duration-300 hover:bg-türkis-300"
        >
          {cartCount !== undefined ? (
            <Badge count={cartCount}>
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <ShoppingCartIcon />
          )}
          {t("Home.HomeOrderCard.order.cart")}
        </Link>
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
