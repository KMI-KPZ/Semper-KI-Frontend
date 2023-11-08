import { ReactNode } from "react";
import { ProcessStatus } from "../../hooks/useProcess";
import { UserType } from "@/hooks/useUser";
import CancelIcon from "@mui/icons-material/Cancel";
import FactoryIcon from "@mui/icons-material/Factory";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export type StatusButtonTitleType =
  | "DELETE"
  | "CONTRACTOR_SELECTED"
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
  | "REPROJECT";

export interface StatusButtonProps {
  title: StatusButtonTitleType;
  icon: ReactNode;
  user: UserType;
  allowedStates: ProcessStatus[];
}

export const StatusButtonData: StatusButtonProps[] = [
  {
    title: "DELETE",
    icon: <FactoryIcon />,
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
  },
  {
    title: "CONTRACTOR_SELECTED",
    icon: <FactoryIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.SERVICE_READY],
  },
  {
    title: "VERIFYING",
    icon: <AssignmentTurnedInIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
  },
  {
    title: "REQUESTED",
    icon: <CancelIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.VERIFIED],
  },
  {
    title: "CLARIFICATION",
    icon: <CancelIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED],
  },
  {
    title: "CONFIRMED_BY_CONTRACTOR",
    icon: <CancelIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
  },
  {
    title: "REJECTED_BY_CONTRACTOR",
    icon: <CancelIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
  },
  {
    title: "CONFIRMED_BY_CLIENT",
    icon: <CancelIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CONTRACTOR],
  },
  {
    title: "REJECTED_BY_CLIENT",
    icon: <CancelIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CONTRACTOR],
  },
  {
    title: "PRODUCTION",
    icon: <CancelIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CLIENT],
  },
  {
    title: "DELIVERY",
    icon: <CancelIcon />,
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.PRODUCTION],
  },
  {
    title: "COMPLETED",
    icon: <CancelIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.DELIVERY],
  },
  {
    title: "REPROJECT",
    icon: <CancelIcon />,
    user: UserType.USER,
    allowedStates: [ProcessStatus.COMPLETED],
  },
];
