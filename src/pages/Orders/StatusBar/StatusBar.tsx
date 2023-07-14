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
import usePermissionGate from "@/components/PermissionGate/hooks/usePermissionGate";
import StatusItem from "./components/Item";
import StatusItemConnector from "./components/ItemConnector";
import StatusBarDoubleItem from "./components/DecisionItem";
import StatusBarDecisionItem from "./components/DecisionItem";

interface StatusViewProps {
  currentState: OrderState;
  userType: UserType;
  updateStatus(status: OrderState): void;
}

export type StatusData = {
  itemOrderState: OrderState;
  icon: ReactNode;
  text: string;
};

const statusData: StatusData[] = [
  {
    itemOrderState: OrderState.requested,
    icon: <EmailIcon />,
    text: "Orders.StatusView.state.requested",
  },
  {
    itemOrderState: OrderState.verify,
    icon: <QuestionMarkIcon />,
    text: "Orders.StatusView.state.verify",
  },
  {
    itemOrderState: OrderState.rejected,
    icon: <CloseIcon />,
    text: "Orders.StatusView.state.rejected",
  },
  {
    itemOrderState: OrderState.confirmed,
    icon: <CheckIcon />,
    text: "Orders.StatusView.state.confirmed",
  },
  {
    itemOrderState: OrderState.production,
    icon: <FactoryIcon />,
    text: "Orders.StatusView.state.production",
  },
  {
    itemOrderState: OrderState.delivery,
    icon: <LocalShippingIcon />,
    text: "Orders.StatusView.state.delivery",
  },
  {
    itemOrderState: OrderState.finished,
    icon: <DoneAllIcon />,
    text: "Orders.StatusView.state.finished",
  },
];

const StatusBar: React.FC<StatusViewProps> = (props) => {
  const { currentState } = props;
  return (
    <div className="flex w-full flex-col items-center justify-center p-5 md:flex-row">
      <StatusItem
        item={{
          itemOrderState: OrderState.requested,
          icon: <EmailIcon />,
          text: "Orders.StatusView.state.requested",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.requested} />
      <StatusItem
        item={{
          itemOrderState: OrderState.verify,
          icon: <QuestionMarkIcon />,
          text: "Orders.StatusView.state.verify",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.verify} />
      <StatusBarDecisionItem
        item1={{
          itemOrderState: OrderState.rejected,
          icon: <CloseIcon />,
          text: "Orders.StatusView.state.rejected",
        }}
        item2={{
          itemOrderState: OrderState.confirmed,
          icon: <CheckIcon />,
          text: "Orders.StatusView.state.confirmed",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.confirmed} />
      <StatusItem
        item={{
          itemOrderState: OrderState.production,
          icon: <FactoryIcon />,
          text: "Orders.StatusView.state.production",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.production} />
      <StatusItem
        item={{
          itemOrderState: OrderState.delivery,
          icon: <LocalShippingIcon />,
          text: "Orders.StatusView.state.delivery",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.delivery} />
      <StatusItem
        item={{
          itemOrderState: OrderState.finished,
          icon: <DoneAllIcon />,
          text: "Orders.StatusView.state.finished",
        }}
        {...props}
      />
    </div>
  );
};

export default StatusBar;
