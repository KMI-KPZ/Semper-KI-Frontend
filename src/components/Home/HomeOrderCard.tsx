import React, { useTransition } from "react";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { EOrderState, EUserType } from "../../interface/enums";
import Button from "../General/Button";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useOrders } from "../../hooks/useOrders";
import LoadingSuspense from "../General/LoadingSuspense";
import Badge from "../General/Badge";

interface Props {
  className?: string;
  userType: EUserType;
  cartCount?: number;
  ordersCount?: number;
}

const HomeOrderCard: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { ordersQuery } = useOrders();
  const orderShowCountClient = 3;
  const orderShowCountManufacturer = 6;
  const { className, userType, cartCount, ordersCount } = props;
  const additionalClassNames = className ?? "";

  if (userType === EUserType.manufacturer)
    return (
      <div
        className={`${additionalClassNames}  p-3 flex flex-col justify-start items-center gap-5`}
      >
        <h2>{t("Home.HomeOrderCard.header")}</h2>
        <div className="border-t-2 w-full" />
        <h3>{t("Home.HomeOrderCard.contracts.header")}</h3>
        <LoadingSuspense query={ordersQuery}>
          <ul className="flex flex-col gap-2 w-full">
            <li className="flex flex-row justify-between w-full">
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
                    className="flex flex-row justify-between w-full"
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
  if (userType === EUserType.client)
    return (
      <div
        className={`${additionalClassNames}  p-3 flex flex-col justify-start items-center gap-3`}
      >
        <h2>{t("Home.HomeOrderCard.header")}</h2>
        <div className="border-t-2 w-full" />
        <h3>{t("Home.HomeOrderCard.order.header")}</h3>
        <div className="flex flex-row gap-3">
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
          {/* <Button
          to="/cart"
            title={t("Home.HomeOrderCard.order.delete")}
            icon={<DeleteIcon />}
          /> */}
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
        <div className="border-t-2 w-full" />
        <h3>{t("Home.HomeOrderCard.orders.header")}</h3>
        <LoadingSuspense query={ordersQuery}>
          <ul className="flex flex-col gap-2 w-full">
            <li className="flex flex-row justify-between w-full">
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
                    className="flex flex-row justify-between w-full"
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
        className={`${additionalClassNames} p-3 flex flex-col justify-center items-center gap-3 duration-300`}
      >
        <Link
          to="/process/new"
          title={t("Home.HomeOrderCard.order.new")}
          className="flex flex-row hover:bg-türkis-300 gap-5 p-5 justify-between"
        >
          <AddIcon />
          {t("Home.HomeOrderCard.order.new")}
        </Link>
        <Link
          to="/process/model"
          title={t("Home.HomeOrderCard.order.continue")}
          className="flex flex-row hover:bg-türkis-300 gap-5 p-5 justify-between"
        >
          <PlayArrowIcon />
          {t("Home.HomeOrderCard.order.continue")}
        </Link>
        <Link
          to="/cart"
          title={t("Home.HomeOrderCard.order.cart")}
          className="flex flex-row hover:bg-türkis-300 gap-5 p-5 justify-between"
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
      className={`${additionalClassNames} p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300`}
    >
      <LocalShippingIcon fontSize="large" />
      <h2>{t("Home.HomeOrderCard.button.start-order")}</h2>
    </Link>
  );
};

export default HomeOrderCard;
