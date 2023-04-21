import React from "react";
import { useTranslation } from "react-i18next";
import { EOrderState } from "../../interface/enums";
import { IOrder, IOrderEvent } from "../../interface/Interface";
import { getModelURI } from "../../services/utils";
import Badge from "../General/Badge";
import EmailIcon from "@mui/icons-material/Email";
import FactoryIcon from "@mui/icons-material/Factory";
interface Props {
  order: IOrder;
  orderEvent?: IOrderEvent;
}

const OrderPreView: React.FC<Props> = (props) => {
  const { order, orderEvent } = props;
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col w-60 gap-2 rounded-lg border-2 items-center overflow-clip">
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
      <span>{t(`OrderPreView.${EOrderState[order.orderState]}`)}</span>
    </div>
  );
};

export default OrderPreView;
