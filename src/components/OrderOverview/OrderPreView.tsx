import React from "react";
import { useTranslation } from "react-i18next";
import { EOrderState } from "../../interface/enums";
import { IOrder } from "../../interface/Interface";
import { getModelURI } from "../../services/utils";

interface Props {
  order: IOrder;
}

const OrderPreView: React.FC<Props> = (props) => {
  const { order } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-60 gap-2 rounded-lg border-2 items-center overflow-clip">
      <img src={getModelURI(order.item.model!)} />
      <h3 className="break-words">{order.item.title}</h3>
      <span>{t(`orderPreView.${EOrderState[order.orderState]}`)}</span>
    </div>
  );
};

export default OrderPreView;
