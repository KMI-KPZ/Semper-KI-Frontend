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
  status: ProcessStatus;
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
    text: "Projects.Project.Process.StatusBar.StatusBar.draft",
  },
  {
    itemProcessState: ProcessStatus.CONTRACTOR_SELECTED,
    icon: <FactoryIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.contractorSelected",
  },
  {
    itemProcessState: ProcessStatus.VERIFIED,
    icon: <AssignmentTurnedInIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.verified",
  },
  {
    itemProcessState: ProcessStatus.REQUESTED,
    icon: <EmailIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.requested",
  },
  {
    itemProcessState: ProcessStatus.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.clarification",
  },
  {
    itemProcessState: ProcessStatus.REJECTED_BY_CONTRACTOR,
    icon: <CloseIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.rejected",
  },
  {
    itemProcessState: ProcessStatus.CONFIRMED_BY_CONTRACTOR,
    icon: <CheckIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.confirmed",
  },
  {
    itemProcessState: ProcessStatus.PRODUCTION,
    icon: <FactoryIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.production",
  },
  {
    itemProcessState: ProcessStatus.DELIVERY,
    icon: <LocalShippingIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.delivery",
  },
  {
    itemProcessState: ProcessStatus.COMPLETED,
    icon: <DoneAllIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.finished",
  },
];

const StatusBar: React.FC<StatusViewProps> = (props) => {
  const { serviceType, status } = props;

  const getItems = (): StatusData[] => {
    if (status < ProcessStatus.REQUESTED)
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
            <StatusItem item={item} state={status} />
            {index < getItems().length - 1 ? (
              <StatusItemConnector
                active={status >= item.itemProcessState}
                onGoing={status === item.itemProcessState}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
