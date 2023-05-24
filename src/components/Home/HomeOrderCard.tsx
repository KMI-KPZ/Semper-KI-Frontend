import React, { useTransition } from "react";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { EOrderState, EUserType } from "../../interface/enums";
import { Button } from "@component-library/Button";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useOrders } from "../../hooks/useOrders";
import { Badge } from "@component-library/Badge";
import { LoadingSuspense } from "@component-library/Loading";

interface Props {
  className?: string;
  userType: EUserType;
  cartCount?: number;
  ordersCount?: number;
}

const HomeOrderCard: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const orderShowCountClient = 3;
  const orderShowCountManufacturer = 6;
  const { className, userType, cartCount, ordersCount } = props;
  const { ordersQuery } = useOrders(
    userType === EUserType.client || userType === EUserType.manufacturer
  );
  const additionalClassNames = className ?? "";

  if (userType === EUserType.manufacturer)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-5 p-3`}
      >
        <div className="flex h-full w-full flex-col items-center justify-start gap-5">
          <h2>{t("Home.HomeOrderCard.header")}</h2>
          <div className="w-full border-t-2" />
          <h3>{t("Home.HomeOrderCard.contracts.header")}</h3>
          <LoadingSuspense query={ordersQuery}>
            <ul className="flex w-full flex-col gap-2">
              <li className="flex w-full flex-row justify-between">
                <span className="text-left">
                  {t("Home.HomeOrderCard.contracts.date")}
                </span>
                <span className="text-left">
                  {t("Home.HomeOrderCard.contracts.article")}
                </span>
                <span className="text-left">
                  {t("Home.HomeOrderCard.contracts.status")}
                </span>
              </li>
              {ordersQuery.data !== undefined ? (
                ordersQuery.data
                  .slice(
                    0,
                    ordersQuery.data.length < orderShowCountManufacturer
                      ? ordersQuery.data.length
                      : orderShowCountManufacturer
                  )
                  .map((order, index) => (
                    <li
                      key={index}
                      className="flex w-full flex-row justify-between"
                    >
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                      <span>{order.orders.length}</span>
                      <span>{EOrderState[order.state]}</span>
                    </li>
                  ))
              ) : (
                <></>
              )}
            </ul>
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
  if (userType === EUserType.client)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-3 p-3`}
      >
        <div className="flex h-full w-full flex-col items-center justify-start gap-5">
          <h2>{t("Home.HomeOrderCard.header")}</h2>
          <div className="w-full border-t-2" />
          <h3>{t("Home.HomeOrderCard.order.header")}</h3>
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
          <h3>{t("Home.HomeOrderCard.orders.header")}</h3>
          <LoadingSuspense query={ordersQuery}>
            <ul className="flex w-full flex-col gap-2">
              <li className="flex w-full flex-row justify-between">
                <span className="text-left">
                  {t("Home.HomeOrderCard.orders.date")}
                </span>
                <span className="text-left">
                  {t("Home.HomeOrderCard.orders.article")}
                </span>
                <span className="text-left">
                  {t("Home.HomeOrderCard.orders.status")}
                </span>
              </li>
              {ordersQuery.data !== undefined ? (
                ordersQuery.data
                  .slice(
                    0,
                    ordersQuery.data.length < orderShowCountClient
                      ? ordersQuery.data.length
                      : orderShowCountClient
                  )
                  .map((order, index) => (
                    <li
                      key={index}
                      className="flex w-full flex-row justify-between"
                    >
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                      <span>{order.orders.length}</span>
                      <span>{EOrderState[order.state]}</span>
                    </li>
                  ))
              ) : (
                <></>
              )}
            </ul>
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
  if (userType === EUserType.anonym && cartCount !== undefined && cartCount > 0)
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
      <h2>{t("Home.HomeOrderCard.button.start-order")}</h2>
    </Link>
  );
};

export default HomeOrderCard;
