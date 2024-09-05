import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { StatusButtonPropsExtern } from "./useStatusButtons";

export const exampleRemoteStatusButtonData: StatusButtonPropsExtern[] = [
  {
    title: "BACK",
    icon: "ArrowBackIcon",
    action: {
      type: "request",
      data: {
        type: "backstepStatus",
        targetStatus: ProcessStatus.DRAFT,
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "process",
  },
  {
    title: "DELETE",
    icon: "DeleteIcon",
    action: {
      type: "request",
      data: { type: "deleteProcess" },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "project",
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
  },
  {
    title: "BACK",
    icon: "ArrowBackIcon",
    action: {
      type: "request",
      data: {
        type: "backstepStatus",
        targetStatus: ProcessStatus.SERVICE_READY,
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "process",
  },
  {
    title: "VERIFYING",
    icon: "TroubleshootIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "VERIFYING",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
  },
  {
    title: "VERIFYING_AND_REQUESTED",
    icon: "ScheduleSendIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "VERIFYING_AND_REQUESTED",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "BACK",
    icon: "ArrowBackIcon",
    action: {
      type: "request",
      data: {
        type: "backstepStatus",
        targetStatus: ProcessStatus.CONTRACTOR_COMPLETED,
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "process",
  },
  {
    title: "REQUESTED",
    icon: "MailIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "REQUESTED",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "CLARIFICATION",
    icon: "QuestionAnswerIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "CLARIFICATION",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
  },
  {
    title: "CONFIRMED_BY_CONTRACTOR",
    icon: "DescriptionIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "CONFIRMED_BY_CONTRACTOR",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "REJECTED_BY_CONTRACTOR",
    icon: "CancelIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "REJECTED_BY_CONTRACTOR",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
  },
  {
    title: "CONFIRMED_BY_CLIENT",
    icon: "DoneAllIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "CONFIRMED_BY_CLIENT",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "REJECTED_BY_CLIENT",
    icon: "CancelIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "REJECTED_BY_CLIENT",
      },
    },
    active: true,
    buttonVariant: "secondary",
    showIn: "both",
  },
  {
    title: "PRODUCTION",
    icon: "FactoryIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "PRODUCTION",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "DELIVERY",
    icon: "LocalShippingIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "DELIVERY",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "COMPLETED",
    icon: "TaskIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "COMPLETED",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
  {
    title: "REPROJECT",
    icon: "ReplayIcon",
    action: {
      type: "request",
      data: {
        type: "nextStatus",
        targetStatus: "REPROJECT",
      },
    },
    active: true,
    buttonVariant: "primary",
    showIn: "both",
  },
];
