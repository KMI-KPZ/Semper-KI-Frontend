import React from "react";
import { useTranslation } from "react-i18next";
import { Order } from "../../../interface/Interface";

interface Props {
  orderList: Order[];
}

const Orders = ({ orderList }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="authorized-home-headline">{t("orders.headline")}</h1>
      <div className="authorized-home-content vertical"></div>
    </>
  );
};

export default Orders;
