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
import { ServiceType } from "@/pages/Service/hooks/useService";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";

interface StatusViewProps {
  state: ProcessStatus;
  serviceType: ServiceType;
}

export type StatusData = {
  itemProcessState: ProcessStatus;
  icon: ReactNode;
  text: string;
};

const statusData: StatusData[] = [
  {
    itemProcessState: ProcessStatus.DRAFT,
    icon: <DesignServicesIcon />,
    text: "Projects.StatusView.state.draft",
  },
  {
    itemProcessState: ProcessStatus.CONTRACTOR_SELECTED,
    icon: <FactoryIcon />,
    text: "Projects.StatusView.state.contractorSelected",
  },
  {
    itemProcessState: ProcessStatus.VERIFIED,
    icon: <AssignmentTurnedInIcon />,
    text: "Projects.StatusView.state.verified",
  },
  {
    itemProcessState: ProcessStatus.REQUESTED,
    icon: <EmailIcon />,
    text: "Projects.StatusView.state.requested",
  },
  {
    itemProcessState: ProcessStatus.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "Projects.StatusView.state.clarification",
  },
  {
    itemProcessState: ProcessStatus.REJECTED_BY_CONTRACTOR,
    icon: <CloseIcon />,
    text: "Projects.StatusView.state.rejected",
  },
  {
    itemProcessState: ProcessStatus.CONFIRMED_BY_CONTRACTOR,
    icon: <CheckIcon />,
    text: "Projects.StatusView.state.confirmed",
  },
  {
    itemProcessState: ProcessStatus.PRODUCTION,
    icon: <FactoryIcon />,
    text: "Projects.StatusView.state.production",
  },
  {
    itemProcessState: ProcessStatus.DELIVERY,
    icon: <LocalShippingIcon />,
    text: "Projects.StatusView.state.delivery",
  },
  {
    itemProcessState: ProcessStatus.COMPLETED,
    icon: <DoneAllIcon />,
    text: "Projects.StatusView.state.finished",
  },
];

const StatusBar: React.FC<StatusViewProps> = (props) => {
  const { serviceType, state } = props;

  const getItems = (): StatusData[] => {
    if (state < ProcessStatus.REQUESTED)
      return statusData.filter(
        (data) => data.itemProcessState <= ProcessStatus.REQUESTED
      );
    else
      return statusData.filter(
        (data) => data.itemProcessState >= ProcessStatus.REQUESTED
      );
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative flex w-fit flex-col flex-wrap items-center justify-between pb-12 md:flex-row md:justify-center md:gap-y-16">
        {getItems().map((item, index) => (
          <Fragment key={index}>
            <StatusItem item={item} state={state} />
            {index < getItems().length - 1 ? (
              <StatusItemConnector
                active={state >= item.itemProcessState}
                onGoing={state === item.itemProcessState}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
