import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  IconCheck,
  IconChecklist,
  IconFactory,
  IconFast,
  IconQuestionMark,
  IconX,
} from "../../constants/Icons";
import { EOrderState } from "../../interface/enums";
import { IOrder } from "../../interface/Interface";

interface Props {
  order: IOrder;
}

const DashboardOrderCard: React.FC<Props> = (props) => {
  const { order } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(`order/${order.orderId}`);
  };

  const getIconByState = (state: EOrderState) => {
    switch (state) {
      case 0:
        return IconQuestionMark;
      case 1:
        return IconX;
      case 2:
        return IconCheck;
      case 3:
        return IconChecklist;
      case 4:
        return IconFactory;
      case 5:
        return IconFast;
    }
  };

  return (
    <a
      className="dashboard-order-card"
      onClick={handleOnClickCard}
      href={`order/${order.orderId}`}
    >
      <h4>{order.date.toLocaleDateString()}</h4>
      <h4>{order.orderId === undefined ? "#000000" : `#${order.orderId}`}</h4>
      <img
        className="dashboard-order-card-img"
        src={getIconByState(order.orderState)}
      />
      <h4>{t(`order.state.${EOrderState[order.orderState]}`)}</h4>
    </a>
  );
};

export default DashboardOrderCard;
