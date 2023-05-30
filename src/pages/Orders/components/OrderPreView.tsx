import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@component-library/Badge";
import EmailIcon from "@mui/icons-material/Email";
import FactoryIcon from "@mui/icons-material/Factory";
import { IOrder, OrderState } from "../hooks/useOrders";
import { OrderEvent } from "@/hooks/useUser";
import { getModelURI } from "@/services/utils";

interface Props {
  order: IOrder;
  orderEvent?: OrderEvent;
}

const OrderPreView: React.FC<Props> = (props) => {
  const { order, orderEvent } = props;
  const { t } = useTranslation();

  return (
    <div className="relative flex w-60 flex-col items-center gap-2 overflow-clip rounded-lg border-2">
      {orderEvent !== undefined ? (
        <div className="absolute right-4 top-3 flex flex-row justify-end gap-3">
          {orderEvent.messages !== undefined && orderEvent.messages > 0 ? (
            <Badge count={orderEvent.messages}>
              <EmailIcon />
            </Badge>
          ) : null}
          {orderEvent.status !== undefined && orderEvent.status > 0 ? (
            <Badge count={orderEvent.status}>
              <FactoryIcon />
            </Badge>
          ) : null}
        </div>
      ) : null}
      <img src={getModelURI(order.item.model!)} />
      <h3 className="break-words">{order.item.title}</h3>
      <span>{t(`Orders.OrderPreView.${OrderState[order.orderState]}`)}</span>
    </div>
  );
};

export default OrderPreView;
