import { ProcessStatus } from "../Process/useProcess";
import { UserType } from "@/hooks/useUser";
import { StatusButtonPropsExtern } from "./useStatusButtons";

export const externalStatusButtonData: StatusButtonPropsExtern[] = [
  {
    title: "DELETE",
    icon: "DeleteIcon",
    action: {
      type: "function",
      function: { type: "deleteProcess" },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "project",
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
    icon: "FactoryIcon",
    action: {
      type: "navigation",
      to: "contractorSelection",
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.SERVICE_READY],
  },
  {
    title: "VERIFYING",
    icon: "TroubleshootIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "VERIFYING",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
  },
  {
    title: "VERIFYING_AND_REQUESTED",
    icon: "ScheduleSendIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "VERIFYING_AND_REQUESTED",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
  },
  {
    title: "REQUESTED",
    icon: "MailIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "REQUESTED",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.VERIFIED],
  },
  {
    title: "CLARIFICATION",
    icon: "QuestionAnswerIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "CLARIFICATION",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED],
  },
  {
    title: "CONFIRMED_BY_CONTRACTOR",
    icon: "DescriptionIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "CONFIRMED_BY_CONTRACTOR",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
  },
  {
    title: "REJECTED_BY_CONTRACTOR",
    icon: "CancelIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "REJECTED_BY_CONTRACTOR",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
  },
  {
    title: "CONFIRMED_BY_CLIENT",
    icon: "DoneAllIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "CONFIRMED_BY_CLIENT",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CONTRACTOR],
  },
  {
    title: "REJECTED_BY_CLIENT",
    icon: "CancelIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "REJECTED_BY_CLIENT",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CONTRACTOR],
  },
  {
    title: "PRODUCTION",
    icon: "FactoryIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "PRODUCTION",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.CONFIRMED_BY_CLIENT],
  },
  {
    title: "DELIVERY",
    icon: "LocalShippingIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "DELIVERY",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.ORGANIZATION,
    allowedStates: [ProcessStatus.PRODUCTION],
  },
  {
    title: "COMPLETED",
    icon: "TaskIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "COMPLETED",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.DELIVERY],
  },
  {
    title: "REPROJECT",
    icon: "ReplayIcon",
    action: {
      type: "request",
      data: {
        localTestDataStatus: "REPROJECT",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
    user: UserType.USER,
    allowedStates: [ProcessStatus.COMPLETED],
  },
];
