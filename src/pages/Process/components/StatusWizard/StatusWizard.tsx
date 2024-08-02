import { Process, ProcessOrigin } from "@/api/Process/Querys/useGetProcess";
import { Container, Heading } from "@component-library/index";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import ModeIcon from "@mui/icons-material/Mode";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import StatusWizardCard from "./components/Card";
import InfoIcon from "@mui/icons-material/Info";
import useScrollIntoView from "@/hooks/Process/useScrollIntoView";

interface ProcessStatusWizardProps {
  process: Process;
}

export type StatusWizardItem = {
  startStatus?: ProcessStatus;
  endStatus?: ProcessStatus;
  icon: ReactNode;
  targetID: ProcessOrigin | string;
  text:
    | "processInfo"
    | "header"
    | "draft"
    | "service"
    | "contractorSelected"
    | "verified"
    | "requested"
    | "clarification"
    | "offer"
    | "confirmation"
    | "production"
    | "delivery"
    | "completed";
};

const statusWizardItems: StatusWizardItem[] = [
  {
    icon: <InfoIcon />,
    text: "processInfo",
    targetID: "header",
  },
  {
    startStatus: ProcessStatus.DRAFT,
    endStatus: ProcessStatus.SERVICE_COMPLICATION,
    icon: <DesignServicesIcon />,
    text: "draft",
    targetID: "Service",
  },
  {
    startStatus: ProcessStatus.SERVICE_COMPLETED,
    endStatus: ProcessStatus.SERVICE_COMPLETED,
    icon: <FactoryIcon />,
    text: "contractorSelected",
    targetID: "Contractor",
  },
  {
    startStatus: ProcessStatus.CONTRACTOR_COMPLETED,
    endStatus: ProcessStatus.VERIFYING_IN_PROGRESS,
    icon: <AssignmentTurnedInIcon />,
    text: "verified",
    targetID: "Verification",
  },
  {
    startStatus: ProcessStatus.VERIFYING_COMPLETED,
    endStatus: ProcessStatus.REQUEST_COMPLETED,
    icon: <EmailIcon />,
    text: "requested",
    targetID: "Request",
  },
  // {
  //   startStatus: ProcessStatus.CLARIFICATION,
  //   endStatus: ProcessStatus.CLARIFICATION,
  //   icon: <QuestionMarkIcon />,
  //   text: "clarification",
  //   targetID: "Clarification",
  // },
  {
    startStatus: ProcessStatus.OFFER_COMPLETED,
    endStatus: ProcessStatus.OFFER_REJECTED,
    icon: <DescriptionIcon />,
    text: "offer",
    targetID: "Contract",
  },
  // {
  //   startStatus: ProcessStatus.CONFIRMATION_COMPLETED,
  //   endStatus: ProcessStatus.CONFIRMATION_REJECTED,
  //   icon: <CheckIcon />,
  //   text: "confirmation",
  //   targetID: "Confirmation",
  // },
  {
    startStatus: ProcessStatus.PRODUCTION_IN_PROGRESS,
    endStatus: ProcessStatus.PRODUCTION_COMPLETED,
    icon: <FactoryIcon />,
    text: "production",
    targetID: "Production",
  },
  {
    startStatus: ProcessStatus.DELIVERY_IN_PROGRESS,
    endStatus: ProcessStatus.DELIVERY_COMPLETED,
    icon: <LocalShippingIcon />,
    text: "delivery",
    targetID: "Delivery",
  },
  {
    startStatus: ProcessStatus.COMPLETED,
    endStatus: ProcessStatus.COMPLETED,
    icon: <DoneAllIcon />,
    text: "completed",
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
    <Container
      direction="col"
      justify="start"
      className="top-5 max-h-60  overflow-y-auto rounded-xl bg-white p-5 md:sticky md:max-h-fit md:overflow-y-visible"
    >
      <Heading variant="h2">
        {t("Process.StatusWizard.StatusWizard.header")}
      </Heading>
      {statusWizardItems.map((item) => {
        return (
          <StatusWizardCard key={item.text} item={item} process={process} />
        );
      })}
    </Container>
  );
};

export default ProcessStatusWizard;
