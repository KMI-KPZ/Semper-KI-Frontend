import React, { ReactNode } from "react";
import { EOrderState, EUserType } from "../../interface/enums";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useTranslation } from "react-i18next";

interface Props {
  status: EOrderState;
  userType: EUserType;
  updateStatus(status: EOrderState): void;
}

interface StatusData {
  orderState: EOrderState;
  icon: ReactNode;
  text: string;
}

const statusData: StatusData[] = [
  {
    orderState: EOrderState.requested,
    icon: <EmailIcon />,
    text: "Orders.StatusView.state.requested",
  },
  {
    orderState: EOrderState.verify,
    icon: <QuestionMarkIcon />,
    text: "Orders.StatusView.state.verify",
  },
  {
    orderState: EOrderState.rejected,
    icon: <CloseIcon />,
    text: "Orders.StatusView.state.rejected",
  },
  {
    orderState: EOrderState.confirmed,
    icon: <CheckIcon />,
    text: "Orders.StatusView.state.confirmed",
  },
  {
    orderState: EOrderState.production,
    icon: <FactoryIcon />,
    text: "Orders.StatusView.state.production",
  },
  {
    orderState: EOrderState.delivery,
    icon: <LocalShippingIcon />,
    text: "Orders.StatusView.state.delivery",
  },
  {
    orderState: EOrderState.finished,
    icon: <DoneAllIcon />,
    text: "Orders.StatusView.state.finished",
  },
];

const StatusView: React.FC<Props> = (props) => {
  const { status, userType, updateStatus: setStatus } = props;
  const { t } = useTranslation();

  const handleOnClickStatus = (_status: EOrderState) => {
    if (
      userType === EUserType.manufacturer //&& _status > status
    ) {
      setStatus(_status);
    }
  };

  const renderStatusItem = (statusData: StatusData, index: number) => {
    if (
      (status === EOrderState.rejected &&
        statusData.orderState === EOrderState.confirmed) ||
      (status === EOrderState.confirmed &&
        statusData.orderState === EOrderState.rejected) ||
      (status !== EOrderState.rejected &&
        status !== EOrderState.confirmed &&
        statusData.orderState === EOrderState.rejected)
    )
      return;
    return (
      <React.Fragment key={index}>
        {index !== 0 ? (
          <div
            className={`border-l-2 h-2 md:h-0 md:border-t-2 md:w-5  ${
              status >= statusData.orderState
                ? "border-orange-200"
                : "border-slate-100"
            } `}
          />
        ) : null}
        <a
          onClick={() => handleOnClickStatus(statusData.orderState)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl 
          ${
            status === statusData.orderState
              ? "bg-orange text-white"
              : status > statusData.orderState
              ? "bg-orange-200"
              : "bg-slate-100"
          } ${
            userType === EUserType.manufacturer &&
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
    <div className="flex flex-col md:flex-row items-center justify-center p-5 w-full">
      {statusData.map((statusData: StatusData, index) =>
        renderStatusItem(statusData, index)
      )}
    </div>
  );
};

export default StatusView;
