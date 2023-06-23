import React, { Fragment, ReactNode } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useTranslation } from "react-i18next";
import { UserType } from "@/hooks/useUser/types";
import { OrderState } from "../hooks/useOrders";
import { Divider } from "@component-library/Divider";
import usePermissionGate from "@/components/PermissionGate/hooks";
import { OrdersEditPermission } from "@/hooks/usePermissions";

interface StatusViewProps {
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

const StatusView: React.FC<StatusViewProps> = (props) => {
  const { status, userType, updateStatus } = props;
  const preDecisionData = statusData.filter(
    (statusData: StatusData) => statusData.orderState <= OrderState.verify
  );
  const decisionData = statusData.filter(
    (statusData: StatusData) =>
      statusData.orderState > OrderState.verify &&
      statusData.orderState < OrderState.production
  );
  const postDecisionData = statusData.filter(
    (statusData: StatusData) => statusData.orderState >= OrderState.production
  );

  return (
    <div className="flex w-full flex-col items-center justify-center p-5 md:flex-row">
      {preDecisionData.map((statusData: StatusData, index) => (
        <Fragment key={index}>
          <StatusItem {...statusData} {...props} />
          <StatusItemConnector active={status >= statusData.orderState} />
        </Fragment>
      ))}
      <StatusDoubleItem
        {...props}
        item1={decisionData[0]}
        item2={decisionData[1]}
      />
      {postDecisionData.map((statusData: StatusData, index) => (
        <Fragment key={index}>
          <StatusItemConnector active={status >= statusData.orderState} />
          <StatusItem {...statusData} {...props} />
        </Fragment>
      ))}
    </div>
  );
};

type StatusItemType = {
  orderState: OrderState;
  icon: ReactNode;
  text: string;
  status: OrderState;
  userType: UserType;
  updateStatus(status: OrderState): void;
};

const StatusItem: React.FC<StatusItemType> = (props) => {
  const {
    icon,
    orderState,
    text,
    status,
    updateStatus: setStatus,
    userType,
  } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const handleOnClickStatus = () => {
    if (userType === UserType.manufacturer) {
      setStatus(orderState);
    }
  };

  const getClassName = (): string => {
    let classname: string[] = [];
    if (status === orderState) {
      classname.push("bg-orange text-white");
    } else if (status > orderState) {
      classname.push("bg-orange-200");
    } else if (status < orderState) {
      classname.push("bg-slate-100");
    }
    if (userType === UserType.manufacturer && status + 1 == orderState) {
      classname.push("hover:cursor-pointer hover:bg-orange-300");
    }
    return classname.join(" ");
  };

  return (
    <a
      onClick={
        hasPermission(OrdersEditPermission) ? handleOnClickStatus : () => {}
      }
      className={`flex w-full flex-col items-center justify-center rounded-xl p-3 md:w-fit ${getClassName()}`}
    >
      {icon}
      <span className="text-center">{t(text)}</span>
    </a>
  );
};
type StatusDoubleItemType = {
  item1: StatusData;
  item2: StatusData;
  status: OrderState;
  userType: UserType;
  updateStatus(status: OrderState): void;
};

const StatusDoubleItem: React.FC<StatusDoubleItemType> = (props) => {
  const {
    item1: itemDenied,
    item2: itemSucceed,
    status,
    updateStatus: setStatus,
    userType,
  } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const handleOnClickStatus = (orderState: OrderState) => {
    if (userType === UserType.manufacturer) {
      setStatus(orderState);
    }
  };

  const getOuterClassName = (): string => {
    let classname: string[] = [];
    if (status > OrderState.confirmed) {
      classname.push("bg-orange-200");
    } else if (status < OrderState.rejected) {
      classname.push("bg-slate-100");
    }
    return classname.join(" ");
  };

  const getClassName = (orderState: OrderState): string => {
    let classname: string[] = [];
    if (status === orderState) {
      classname.push("bg-orange text-white");
    } else if (status > itemDenied.orderState) {
      classname.push("bg-orange-200");
    } else if (status < itemSucceed.orderState) {
      classname.push("bg-slate-100");
    }
    if (userType === UserType.manufacturer) {
      classname.push("hover:cursor-pointer hover:bg-orange-300");
    }
    return classname.join(" ");
  };

  return (
    <div
      className={`flex h-full w-full flex-row items-center justify-center overflow-clip rounded-xl md:h-fit md:w-fit md:flex-col ${getOuterClassName()}`}
    >
      {status < itemDenied.orderState || status === itemDenied.orderState ? (
        <a
          onClick={
            hasPermission(OrdersEditPermission)
              ? () => handleOnClickStatus(itemDenied.orderState)
              : () => {}
          }
          className={`flex h-full w-full flex-col items-center justify-center p-3 ${getClassName(
            itemDenied.orderState
          )}`}
        >
          {itemDenied.icon}
          <span className="text-center">{t(itemDenied.text)}</span>
        </a>
      ) : null}
      {status < itemDenied.orderState ? <Divider type="auto-vertical" /> : null}
      {status < itemDenied.orderState ||
      status === itemSucceed.orderState ||
      status > itemSucceed.orderState ? (
        <a
          onClick={
            hasPermission(OrdersEditPermission)
              ? () => handleOnClickStatus(itemSucceed.orderState)
              : () => {}
          }
          className={`flex h-full w-full flex-col items-center justify-center p-3  ${getClassName(
            itemSucceed.orderState
          )}`}
        >
          {itemSucceed.icon}
          <span className="text-center">{t(itemSucceed.text)}</span>
        </a>
      ) : null}
    </div>
  );
};

type StatusItemConnector = {
  active: boolean;
};

const StatusItemConnector: React.FC<StatusItemConnector> = (props) => {
  const { active } = props;
  return (
    <div
      className={`h-2 border-l-2 md:h-0 md:w-5 md:border-t-2  ${
        active ? "border-orange-200" : "border-slate-100"
      } `}
    />
  );
};

export default StatusView;
