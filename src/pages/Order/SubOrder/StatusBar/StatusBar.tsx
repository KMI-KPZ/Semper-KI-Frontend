import React, { Fragment, ReactNode } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import StatusItem from "./components/Item";
import StatusItemConnector from "./components/ItemConnector";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { OrderState } from "@/pages/Order/hooks/useOrder";
import { ServiceType } from "@/pages/Service/hooks/useService";
import SubOrderButtonConnector from "./components/ButtonConnector";

interface StatusViewProps {
  state: OrderState;
  serviceType: ServiceType;
}

export type StatusData = {
  itemOrderState: OrderState;
  icon: ReactNode;
  text: string;
};

const statusData: StatusData[] = [
  {
    itemOrderState: OrderState.DRAFT,
    icon: <DesignServicesIcon />,
    text: "Orders.StatusView.state.draft",
  },
  {
    itemOrderState: OrderState.CONTRACTOR_SELECTED,
    icon: <FactoryIcon />,
    text: "Orders.StatusView.state.contractorSelected",
  },
  {
    itemOrderState: OrderState.VERIFIED,
    icon: <AssignmentTurnedInIcon />,
    text: "Orders.StatusView.state.verified",
  },
  {
    itemOrderState: OrderState.REQUESTED,
    icon: <EmailIcon />,
    text: "Orders.StatusView.state.requested",
  },
  {
    itemOrderState: OrderState.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "Orders.StatusView.state.clarification",
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
  const { serviceType, state } = props;

  const getItems = (): StatusData[] => {
    if (state < OrderState.REQUESTED)
      return statusData.filter(
        (data) => data.itemOrderState <= OrderState.REQUESTED
      );
    else
      return statusData.filter(
        (data) => data.itemOrderState >= OrderState.REQUESTED
      );
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative flex w-fit flex-col flex-wrap items-center justify-between pb-12 md:flex-row md:justify-center md:gap-y-16">
        {getItems().map((item, index) => (
          <Fragment key={index}>
            <StatusItem item={item} state={state} />
            {index < getItems().length - 1 ? (
              state === item.itemOrderState ? (
                <SubOrderButtonConnector />
              ) : (
                <StatusItemConnector active={state > item.itemOrderState} />
              )
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
