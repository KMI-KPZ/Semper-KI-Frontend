import { Process, ProcessContext } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
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
  targetID: ProcessContext | string;
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
    startStatus: ProcessStatus.CONTRACTOR_SELECTED,
    endStatus: ProcessStatus.VERIFYING,
    icon: <AssignmentTurnedInIcon />,
    text: "verified",
    targetID: "Verification",
  },
  {
    startStatus: ProcessStatus.VERIFIED,
    endStatus: ProcessStatus.REQUESTED,
    icon: <EmailIcon />,
    text: "requested",
    targetID: "Request",
  },
  {
    startStatus: ProcessStatus.CLARIFICATION,
    endStatus: ProcessStatus.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "clarification",
    targetID: "Clarification",
  },
  {
    startStatus: ProcessStatus.CONFIRMED_BY_CONTRACTOR,
    endStatus: ProcessStatus.REJECTED_BY_CONTRACTOR,
    icon: <DescriptionIcon />,
    text: "offer",
    targetID: "Contract",
  },
  {
    startStatus: ProcessStatus.CONFIRMED_BY_CLIENT,
    endStatus: ProcessStatus.REJECTED_BY_CLIENT,
    icon: <CheckIcon />,
    text: "confirmation",
    targetID: "Confirmation",
  },
  {
    startStatus: ProcessStatus.PRODUCTION,
    endStatus: ProcessStatus.PRODUCTION,
    icon: <FactoryIcon />,
    text: "production",
    targetID: "Production",
  },
  {
    startStatus: ProcessStatus.DELIVERY,
    endStatus: ProcessStatus.DELIVERY,
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
    newestStatusItem === undefined
      ? ""
      : newestStatusItem.targetID !== undefined
      ? newestStatusItem.targetID
      : newestStatusItem.text;
  useScrollIntoView(newestStatusID);

  return (
    <Container direction="col" className="sticky top-5 bg-white p-5">
      {statusWizardItems.map((item) => {
        return (
          <StatusWizardCard key={item.text} item={item} process={process} />
        );
      })}
    </Container>
  );
};

export default ProcessStatusWizard;
