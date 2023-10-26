import React, { Fragment, ReactNode } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
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
import DescriptionIcon from "@mui/icons-material/Description";

interface StatusViewProps {
  status: ProcessStatus;
  serviceType: ServiceType;
}

export type StatusData = {
  startStatus: ProcessStatus;
  endStatus?: ProcessStatus;
  icon: ReactNode;
  text: string;
};

const statusData: StatusData[] = [
  {
    startStatus: ProcessStatus.DRAFT,
    icon: <DesignServicesIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.draft",
  },
  {
    startStatus: ProcessStatus.CONTRACTOR_SELECTED,
    icon: <FactoryIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.contractorSelected",
  },
  {
    startStatus: ProcessStatus.VERIFYING,
    endStatus: ProcessStatus.VERIFIED,
    icon: <AssignmentTurnedInIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.verified",
  },
  {
    startStatus: ProcessStatus.REQUESTED,
    icon: <EmailIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.requested",
  },
  {
    startStatus: ProcessStatus.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.clarification",
  },
  {
    startStatus: ProcessStatus.CONFIRMED_BY_CONTRACTOR,
    endStatus: ProcessStatus.REJECTED_BY_CONTRACTOR,
    icon: <DescriptionIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.offer",
  },
  {
    startStatus: ProcessStatus.CONFIRMED_BY_CLIENT,
    endStatus: ProcessStatus.REJECTED_BY_CLIENT,
    icon: <CheckIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.client",
  },
  {
    startStatus: ProcessStatus.PRODUCTION,
    icon: <FactoryIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.production",
  },
  {
    startStatus: ProcessStatus.DELIVERY,
    icon: <LocalShippingIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.delivery",
  },
  {
    startStatus: ProcessStatus.COMPLETED,
    icon: <DoneAllIcon />,
    text: "Projects.Project.Process.StatusBar.StatusBar.finished",
  },
];

const StatusBar: React.FC<StatusViewProps> = (props) => {
  const { serviceType, status } = props;

  const getItems = (): StatusData[] => {
    if (status < ProcessStatus.REQUESTED)
      return statusData.filter(
        (data) => data.startStatus <= ProcessStatus.REQUESTED
      );
    else
      return statusData.filter(
        (data) => data.startStatus >= ProcessStatus.REQUESTED
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
                active={
                  (status >= item.startStatus &&
                    item.endStatus === undefined) ||
                  (item.endStatus !== undefined && status > item.endStatus)
                }
                onGoing={
                  (status === item.startStatus &&
                    item.endStatus === undefined) ||
                  (item.endStatus !== undefined && status === item.endStatus)
                }
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
