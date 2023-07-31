import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import OrdersTable, { OrdersTableRowProps } from "./Table";

interface OrdersOngoingProps {
  rows: OrdersTableRowProps[] | undefined;
}

const OrdersOngoing: React.FC<OrdersOngoingProps> = (props) => {
  const { rows } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
        <Heading variant="h2">{t("order.overview.ongoing")}</Heading>
      </div>
      <OrdersTable rows={rows} />
    </div>
  );
};

export default OrdersOngoing;
