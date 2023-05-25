import React, { ReactNode } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useTranslation } from "react-i18next";
import { UserType } from "@/hooks/useUser";
import { OrderState } from "../hooks/useOrders";

interface Props {
  status: OrderState;
  userType: UserType;
  updateStatus(status: OrderState): void;
}

export type StatusData = {
  orderState: OrderState;
  icon: ReactNode;
  text: string;
};

const statusData: StatusData[] = [
  {
    orderState: OrderState.requested,
    icon: <EmailIcon />,
    text: "Orders.StatusView.state.requested",
  },
  {
    orderState: OrderState.verify,
    icon: <QuestionMarkIcon />,
    text: "Orders.StatusView.state.verify",
  },
  {
    orderState: OrderState.rejected,
    icon: <CloseIcon />,
    text: "Orders.StatusView.state.rejected",
  },
  {
    orderState: OrderState.confirmed,
    icon: <CheckIcon />,
    text: "Orders.StatusView.state.confirmed",
  },
  {
    orderState: OrderState.production,
    icon: <FactoryIcon />,
    text: "Orders.StatusView.state.production",
  },
  {
    orderState: OrderState.delivery,
    icon: <LocalShippingIcon />,
    text: "Orders.StatusView.state.delivery",
  },
  {
    orderState: OrderState.finished,
    icon: <DoneAllIcon />,
    text: "Orders.StatusView.state.finished",
  },
];

const StatusView: React.FC<Props> = (props) => {
  const { status, userType, updateStatus: setStatus } = props;
  const { t } = useTranslation();

  const handleOnClickStatus = (_status: OrderState) => {
    if (
      userType === UserType.manufacturer //&& _status > status
    ) {
      setStatus(_status);
    }
  };

  const renderStatusItem = (statusData: StatusData, index: number) => {
    if (
      (status === OrderState.rejected &&
        statusData.orderState === OrderState.confirmed) ||
      (status === OrderState.confirmed &&
        statusData.orderState === OrderState.rejected) ||
      (status !== OrderState.rejected &&
        status !== OrderState.confirmed &&
        statusData.orderState === OrderState.rejected)
    )
      return;
    return (
      <React.Fragment key={index}>
        {index !== 0 ? (
          <div
            className={`h-2 border-l-2 md:h-0 md:w-5 md:border-t-2  ${
              status >= statusData.orderState
                ? "border-orange-200"
                : "border-slate-100"
            } `}
          />
        ) : null}
        <a
          onClick={() => handleOnClickStatus(statusData.orderState)}
          className={`flex flex-col items-center justify-center rounded-xl p-3 
          ${
            status === statusData.orderState
              ? "bg-orange text-white"
              : status > statusData.orderState
              ? "bg-orange-200"
              : "bg-slate-100"
          } ${
            userType === UserType.manufacturer &&
            status + 1 == statusData.orderState
              ? "hover:cursor-pointer hover:bg-orange-300"
              : ""
          }
          `}
        >
          {statusData.icon}
          <span className="text-center">{t(statusData.text)}</span>
        </a>
      </React.Fragment>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-5 md:flex-row">
      {statusData.map((statusData: StatusData, index) =>
        renderStatusItem(statusData, index)
      )}
    </div>
  );
};

export default StatusView;
