import { Process } from "@/api/Process/Querys/useGetProcess";
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

interface StatusWizardProps {
  process: Process;
}

export type StatusWizardItem = {
  startStatus: ProcessStatus;
  endStatus?: ProcessStatus;
  icon: ReactNode;
  text:
    | "draft"
    | "service"
    | "contractorSelected"
    | "verified"
    | "requested"
    | "clarification"
    | "offer"
    | "client"
    | "production"
    | "delivery"
    | "finished";
};

const statusWizardItems: StatusWizardItem[] = [
  {
    startStatus: ProcessStatus.DRAFT,
    icon: <DesignServicesIcon />,
    text: "draft",
  },
  {
    startStatus: ProcessStatus.SERVICE_READY,
    endStatus: ProcessStatus.SERVICE_COMPLICATION,
    icon: <ModeIcon />,
    text: "service",
  },
  {
    startStatus: ProcessStatus.CONTRACTOR_SELECTED,
    icon: <FactoryIcon />,
    text: "contractorSelected",
  },
  {
    startStatus: ProcessStatus.VERIFYING,
    endStatus: ProcessStatus.VERIFIED,
    icon: <AssignmentTurnedInIcon />,
    text: "verified",
  },
  {
    startStatus: ProcessStatus.REQUESTED,
    icon: <EmailIcon />,
    text: "requested",
  },
  {
    startStatus: ProcessStatus.CLARIFICATION,
    icon: <QuestionMarkIcon />,
    text: "clarification",
  },
  {
    startStatus: ProcessStatus.CONFIRMED_BY_CONTRACTOR,
    endStatus: ProcessStatus.REJECTED_BY_CONTRACTOR,
    icon: <DescriptionIcon />,
    text: "offer",
  },
  {
    startStatus: ProcessStatus.CONFIRMED_BY_CLIENT,
    endStatus: ProcessStatus.REJECTED_BY_CLIENT,
    icon: <CheckIcon />,
    text: "client",
  },
  {
    startStatus: ProcessStatus.PRODUCTION,
    icon: <FactoryIcon />,
    text: "production",
  },
  {
    startStatus: ProcessStatus.DELIVERY,
    icon: <LocalShippingIcon />,
    text: "delivery",
  },
  {
    startStatus: ProcessStatus.COMPLETED,
    icon: <DoneAllIcon />,
    text: "finished",
  },
];

const StatusWizard: React.FC<StatusWizardProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" className="bg-white p-5">
      {statusWizardItems.map((item) => {
        return (
          <StatusWizardCard key={item.text} item={item} process={process} />
        );
      })}
      ;
    </Container>
  );
};

export default StatusWizard;
