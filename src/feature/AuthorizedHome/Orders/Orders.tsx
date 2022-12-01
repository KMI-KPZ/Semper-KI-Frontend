import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

const Orders = (props: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="authorized-home-headline">{t("orders.headline")}</h1>
      <div className="authorized-home-content vertical"></div>
    </>
  );
};

export default Orders;
