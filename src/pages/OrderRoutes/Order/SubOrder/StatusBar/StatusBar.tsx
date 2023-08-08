import React, { Fragment, ReactNode } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { UserType } from "@/hooks/useUser/types";
import StatusItem from "./components/Item";
import StatusItemConnector from "./components/ItemConnector";
import StatusBarDecisionItem from "./components/DecisionItem";
import { OrderState } from "../../../hooks/useOrder";

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
    itemOrderState: OrderState.REQUESTED,
    icon: <EmailIcon />,
    text: "Orders.StatusView.state.requested",
  },
  {
    itemOrderState: OrderState.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "Orders.StatusView.state.verify",
  },
  {
    itemOrderState: OrderState.REJECTED,
    icon: <CloseIcon />,
    text: "Orders.StatusView.state.rejected",
  },
  {
    itemOrderState: OrderState.CONFIRMED,
    icon: <CheckIcon />,
    text: "Orders.StatusView.state.confirmed",
  },
  {
    itemOrderState: OrderState.PRODUCTION,
    icon: <FactoryIcon />,
    text: "Orders.StatusView.state.production",
  },
  {
    itemOrderState: OrderState.DELIVERY,
    icon: <LocalShippingIcon />,
    text: "Orders.StatusView.state.delivery",
  },
  {
    itemOrderState: OrderState.COMPLETED,
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
          itemOrderState: OrderState.REQUESTED,
          icon: <EmailIcon />,
          text: "Orders.StatusView.state.requested",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.REQUESTED} />
      <StatusItem
        item={{
          itemOrderState: OrderState.CLARIFICATION,
          icon: <QuestionMarkIcon />,
          text: "Orders.StatusView.state.verify",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.CLARIFICATION} />
      <StatusBarDecisionItem
        item1={{
          itemOrderState: OrderState.REJECTED,
          icon: <CloseIcon />,
          text: "Orders.StatusView.state.rejected",
        }}
        item2={{
          itemOrderState: OrderState.CONFIRMED,
          icon: <CheckIcon />,
          text: "Orders.StatusView.state.confirmed",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.CONFIRMED} />
      <StatusItem
        item={{
          itemOrderState: OrderState.PRODUCTION,
          icon: <FactoryIcon />,
          text: "Orders.StatusView.state.production",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.PRODUCTION} />
      <StatusItem
        item={{
          itemOrderState: OrderState.DELIVERY,
          icon: <LocalShippingIcon />,
          text: "Orders.StatusView.state.delivery",
        }}
        {...props}
      />
      <StatusItemConnector active={currentState > OrderState.DELIVERY} />
      <StatusItem
        item={{
          itemOrderState: OrderState.COMPLETED,
          icon: <DoneAllIcon />,
          text: "Orders.StatusView.state.finished",
        }}
        {...props}
      />
    </div>
  );
};

export default StatusBar;
