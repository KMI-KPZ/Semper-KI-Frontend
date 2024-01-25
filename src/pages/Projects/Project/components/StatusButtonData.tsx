import { ReactNode } from "react";
import { ProcessStatus } from "../../hooks/useProcess";
import { UserType } from "@/hooks/useUser";
import CancelIcon from "@mui/icons-material/Cancel";
import FactoryIcon from "@mui/icons-material/Factory";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DescriptionIcon from "@mui/icons-material/Description";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TaskIcon from "@mui/icons-material/Task";
import ReplayIcon from "@mui/icons-material/Replay";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export type StatusButtonTitleType =
  | "SELECT_SERVICE"
  | "EDIT"
  | "DELETE"
  | "CONTRACTOR_SELECTED"
  | "VERIFYING_AND_REQUESTED"
  | "VERIFYING"
  | "REQUESTED"
  | "CLARIFICATION"
  | "CONFIRMED_BY_CONTRACTOR"
  | "REJECTED_BY_CONTRACTOR"
  | "CONFIRMED_BY_CLIENT"
  | "REJECTED_BY_CLIENT"
  | "PRODUCTION"
  | "DELIVERY"
  | "COMPLETED"
  | "REPROJECT"
  | "SERVICE_IN_PROGRESS";

export interface StatusButtonProps {
  title: StatusButtonTitleType;
  icon: ReactNode;
  user: UserType;
  priority: "primary" | "secondary";
  allowedStates: ProcessStatus[];
}

export const statusButtonData: StatusButtonProps[] = [
  {
    title: "SELECT_SERVICE",
    icon: <DesignServicesIcon />,
    user: UserType.ADMIN,
    allowedStates: [ProcessStatus.DRAFT],
    priority: "primary",
  },
  // {
  //   title: "SELECT_SERVICE",
  //   icon: <ArrowBackIcon />,
  //   user: UserType.USER,
  //   allowedStates: [
  //     ProcessStatus.SERVICE_IN_PROGRESS,
  //     ProcessStatus.SERVICE_READY,
  //     ProcessStatus.SERVICE_COMPLICATION,
  //   ],
  //   priority: "secondary",
  // },
  {
    title: "DELETE",
    icon: <DeleteIcon />,
    user: UserType.USER,
    allowedStates: [
      ProcessStatus.DRAFT,
      ProcessStatus.WAITING_FOR_OTHER_PROCESS,
      ProcessStatus.SERVICE_READY,
      ProcessStatus.SERVICE_COMPLICATION,
      ProcessStatus.CONTRACTOR_SELECTED,
      ProcessStatus.VERIFYING,
      ProcessStatus.VERIFIED,
    ],
    priority: "primary",
  },
  // {
  //   title: "SERVICE_IN_PROGRESS",
  //   icon: <ArrowBackIcon />,
  //   user: UserType.USER,
  //   allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
  //   priority: "secondary",
  // },
  {
    title: "CONTRACTOR_SELECTED",
    icon: <FactoryIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.SERVICE_READY],
    priority: "primary",
  },
  {
    title: "VERIFYING",
    icon: <TroubleshootIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
    priority: "secondary",
  },
  {
    title: "VERIFYING_AND_REQUESTED",
    icon: <ScheduleSendIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
    priority: "primary",
  },
  {
    title: "REQUESTED",
    icon: <MailIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.VERIFIED],
    priority: "primary",
  },
  {
    title: "CLARIFICATION",
    icon: <QuestionAnswerIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED],
    priority: "secondary",
  },
  {
    title: "CONFIRMED_BY_CONTRACTOR",
    icon: <DescriptionIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
    priority: "primary",
  },
  {
    title: "REJECTED_BY_CONTRACTOR",
    icon: <CancelIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
    priority: "secondary",
  },
  {
    title: "CONFIRMED_BY_CLIENT",
    icon: <DoneAllIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CONTRACTOR],
    priority: "primary",
  },
  {
    title: "REJECTED_BY_CLIENT",
    icon: <CancelIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CONTRACTOR],
    priority: "secondary",
  },
  {
    title: "PRODUCTION",
    icon: <FactoryIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CLIENT],
    priority: "primary",
  },
  {
    title: "DELIVERY",
    icon: <LocalShippingIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.PRODUCTION],
    priority: "primary",
  },
  {
    title: "COMPLETED",
    icon: <TaskIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.DELIVERY],
    priority: "primary",
  },
  {
    title: "REPROJECT",
    icon: <ReplayIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.COMPLETED],
    priority: "primary",
  },
];
