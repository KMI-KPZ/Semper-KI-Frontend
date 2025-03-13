import { Process, ProcessOrigin } from "@/api/Process/Querys/useGetProcess";
import { Heading } from "@component-library/index";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import StatusWizardCard from "./components/Card";
import useScrollIntoView from "@/hooks/Process/useScrollIntoView";
import GrayContainer from "@component-library/Container/GrayContainer";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

interface ProcessStatusWizardProps {
  process: Process;
}

export type StatusWizardItem = {
  startStatus?: ProcessStatus;
  endStatus?: ProcessStatus;
  icon: ReactNode;
  targetID: ProcessOrigin;
};

export const statusWizardItems: StatusWizardItem[] = [
  {
    startStatus: ProcessStatus.DRAFT,
    endStatus: ProcessStatus.DRAFT,
    icon: <DashboardCustomizeIcon />,
    targetID: "ServiceSelection",
  },
  {
    startStatus: ProcessStatus.SERVICE_READY,
    endStatus: ProcessStatus.SERVICE_COMPLICATION,
    icon: <DesignServicesIcon />,
    targetID: "ServiceDetails",
  },
  {
    startStatus: ProcessStatus.SERVICE_COMPLETED,
    endStatus: ProcessStatus.SERVICE_COMPLETED,
    icon: <PersonSearchIcon />,
    targetID: "Contractor",
  },
  {
    startStatus: ProcessStatus.CONTRACTOR_COMPLETED,
    endStatus: ProcessStatus.VERIFYING_IN_PROGRESS,
    icon: <AssignmentTurnedInIcon />,
    targetID: "Verification",
  },
  {
    startStatus: ProcessStatus.VERIFYING_COMPLETED,
    endStatus: ProcessStatus.VERIFYING_COMPLETED,
    icon: <EmailIcon />,
    targetID: "Request",
  },
  {
    startStatus: ProcessStatus.REQUEST_COMPLETED,
    endStatus: ProcessStatus.OFFER_REJECTED,
    icon: <DescriptionIcon />,
    targetID: "Contract",
  },
  {
    startStatus: ProcessStatus.CONFIRMATION_COMPLETED,
    endStatus: ProcessStatus.PRODUCTION_IN_PROGRESS,
    icon: <FactoryIcon />,
    targetID: "Production",
  },
  {
    startStatus: ProcessStatus.PRODUCTION_COMPLETED,
    endStatus: ProcessStatus.DELIVERY_IN_PROGRESS,
    icon: <LocalShippingIcon />,
    targetID: "Delivery",
  },
  {
    startStatus: ProcessStatus.DELIVERY_COMPLETED,
    endStatus: ProcessStatus.COMPLETED,
    icon: <DoneAllIcon />,
    targetID: "Completed",
  },
];

const ProcessStatusWizard: React.FC<ProcessStatusWizardProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const newestStatusItem = statusWizardItems.find(
    (item) =>
      item.startStatus !== undefined &&
      process.processStatus >= item.startStatus &&
      item.endStatus !== undefined &&
      process.processStatus <= item.endStatus
  );
  const newestStatusID =
    newestStatusItem === undefined ? "" : newestStatusItem.targetID;
  useScrollIntoView(newestStatusID);

  return (
    <GrayContainer
      width="fit"
      direction="col"
      headerChildren={
        <Heading
          variant="h2"
          className="w-full rounded-md  rounded-b-none bg-white p-2 text-center"
        >
          {t("Process.components.StatusWizard.header")}
        </Heading>
      }
      className="top-5 max-h-60 overflow-y-auto rounded-md  md:sticky md:max-h-fit md:overflow-y-visible"
    >
      {statusWizardItems.map((item) => {
        return (
          <StatusWizardCard key={item.targetID} item={item} process={process} />
        );
      })}
    </GrayContainer>
  );
};

export default ProcessStatusWizard;
