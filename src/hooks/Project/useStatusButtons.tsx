import { ReactNode } from "react";
import { UserType } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import ReportIcon from "@mui/icons-material/Report";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import useStatusButtonRequest from "@/api/Process/Mutations/useStatusButtonRequest";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useSendProject from "@/api/Project/Mutations/useSendProject";
import useVerifyProject from "@/api/Project/Mutations/useVerifyProject";
interface UseStatusButtonsReturnProps {
  getStatusButtons: (process: Process) => StatusButtonProps[];
  handleOnClickButtonCount: (button: StatusButtonProcessProps) => void;
  handleOnClickButton: (button: StatusButtonProps, processID: string) => void;
}

export type StatusButtonTitleType =
  | "NONE"
  | "DELETE"
  | "BACK-TO-SERVICE_READY"
  | "BACK-TO-DRAFT"
  | "BACK-TO-SERVICE_COMPLETED"
  | "BACK-TO-CONTRACTOR_COMPLETED"
  | "FORWARD-TO-CONTRACTOR_COMPLETED"
  | "FORWARD-TO-SERVICE_COMPLETED"
  | "FORWARD-TO-CONTRACTOR_COMPLETED"
  | "FORWARD-TO-VERIFYING"
  | "FORWARD-TO-VERIFICATION_COMPLETED"
  | "FORWARD-TO-REQUEST_COMPLETED"
  | "FORWARD-TO-CLARIFICATION"
  | "FORWARD-TO-OFFER_COMPLETED"
  | "FORWARD-TO-OFFER_REJECTED"
  | "FORWARD-TO-CONFIRMATION_COMPLETED"
  | "FORWARD-TO-CONFIRMATION_REJECTED"
  | "FORWARD-TO-PRODUCTION_IN_PROGRESS"
  | "FORWARD-TO-PRODUCTION_COMPLETED"
  | "FORWARD-TO-DELIVERY_IN_PROGRESS"
  | "FORWARD-TO-DELIVERY_COMPLETED"
  | "FORWARD-TO-FAILED"
  | "FORWARD-TO-COMPLETED"
  | "FORWARD-TO-DISPUTE"
  | "CLONE";

export type StatusButtonPropsGeneric = {
  title: string;
  buttonVariant: "primary" | "secondary";
  action: StatusButtonAction;
  active: boolean;
  showIn: StatusButtonShowInType;
  user?: UserType;
  allowedStates?: ProcessStatus[];
};

export type StatusButtonShowInType = "project" | "process" | "both";

export type StatusButtonPropsExtern = {
  icon: string;
} & StatusButtonPropsGeneric;

export type StatusButtonProps = {
  icon: ReactNode;
} & StatusButtonPropsGeneric;

export type StatusButtonAction =
  | StatusButtonActionNavigationProps
  | StatusButtonActionRequestProps
  | StatusButtonActionFunctionProps;

export interface StatusButtonActionNavigationProps {
  type: "navigation";
  to: string;
}

export interface StatusButtonActionRequestProps {
  type: "request";
  data: any;
}

export interface StatusButtonActionFunctionProps {
  type: "function";
  function: SBAFDeleteProcessProps;
}

export interface SBAFDeleteProcessProps {
  type: "deleteProcess";
}

export interface StatusButtonProcessProps extends StatusButtonProps {
  processes: string[];
}

const useStatusButtons = (): UseStatusButtonsReturnProps => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sendProject = useSendProject();
  const verifyProject = useVerifyProject();
  const updateProcess = useUpdateProcess();
  const deleteProcess = useDeleteProcess();
  const statusButtonRequest = useStatusButtonRequest();

  const getStatusButtons = (process: Process): StatusButtonProps[] => {
    return transformExternalStatusButtons(
      process.processStatusButtons !== undefined
        ? process.processStatusButtons.filter(
            (button) => button.title !== "DELETE"
          )
        : []
    );
  };

  const transformExternalStatusButtons = (
    externalStatusButtons: StatusButtonPropsExtern[]
  ): StatusButtonProps[] => {
    return externalStatusButtons.map((button) => ({
      ...button,
      title: transformTitle(button.title),
      icon: transformIcon(button.icon),
    }));
  };

  const transformIcon = (icon: string): ReactNode => {
    switch (icon) {
      case "DeleteIcon":
        return <DeleteIcon />;
      case "FactoryIcon":
        return <FactoryIcon />;
      case "TroubleshootIcon":
        return <TroubleshootIcon />;
      case "ScheduleSendIcon":
        return <ScheduleSendIcon />;
      case "EditIcon":
        return <EditIcon />;
      case "CancelIcon":
        return <CancelIcon />;
      case "ReplayIcon":
        return <ReplayIcon />;
      case "AssignmentTurnedInIcon":
        return <AssignmentTurnedInIcon />;
      case "MailIcon":
        return <MailIcon />;
      case "QuestionAnswerIcon":
        return <QuestionAnswerIcon />;
      case "DescriptionIcon":
        return <DescriptionIcon />;
      case "DoneAllIcon":
        return <DoneAllIcon />;
      case "LocalShippingIcon":
        return <LocalShippingIcon />;
      case "TaskIcon":
        return <TaskIcon />;
      case "DesignServicesIcon":
        return <DesignServicesIcon />;
      case "ArrowBackIcon":
        return <ArrowBackIcon />;
      default:
        return <ReportIcon />;
    }
  };

  const transformTitle = (title: string): string => {
    const validStatusButtonTitles: StatusButtonTitleType[] = [
      "NONE",
      "DELETE",
      "BACK-TO-SERVICE_READY",
      "BACK-TO-DRAFT",
      "BACK-TO-SERVICE_COMPLETED",
      "FORWARD-TO-CONTRACTOR_COMPLETED",
      "BACK-TO-CONTRACTOR_COMPLETED",
      "FORWARD-TO-SERVICE_COMPLETED",
      "FORWARD-TO-CONTRACTOR_COMPLETED",
      "FORWARD-TO-VERIFYING",
      "FORWARD-TO-VERIFICATION_COMPLETED",
      "FORWARD-TO-REQUEST_COMPLETED",
      "FORWARD-TO-OFFER_COMPLETED",
      "FORWARD-TO-OFFER_REJECTED",
      "FORWARD-TO-CONFIRMATION_COMPLETED",
      "FORWARD-TO-CONFIRMATION_REJECTED",
      "FORWARD-TO-PRODUCTION_IN_PROGRESS",
      "FORWARD-TO-PRODUCTION_COMPLETED",
      "FORWARD-TO-DELIVERY_IN_PROGRESS",
      "FORWARD-TO-DELIVERY_COMPLETED",
      "FORWARD-TO-FAILED",
      "FORWARD-TO-COMPLETED",
      "FORWARD-TO-DISPUTE",
      "CLONE",
    ];
    return validStatusButtonTitles.includes(title as StatusButtonTitleType)
      ? t(`hooks.useStatusButtons.${title as StatusButtonTitleType}`)
      : title;
  };

  const updateProcessStatus = (status: ProcessStatus, processIDs: string[]) => {
    updateProcess.mutate({
      processIDs,
      updates: {
        changes: {
          processStatus: status,
        },
      },
    });
  };

  const handleOnClickButtonCount = (button: StatusButtonProcessProps) => {
    if (
      window.confirm(
        t("hooks.useStatusButtons.button.confirmAll", {
          title: button.title,
        })
      )
    ) {
      handleButtonAction(button, button.processes);
    }
  };

  const handleOnClickButton = (
    button: StatusButtonProps,
    processID: string
  ) => {
    handleButtonAction(button, [processID]);
  };

  const handleButtonAction = (
    button: StatusButtonProps,
    processIDs: string[]
  ) => {
    switch (button.action.type) {
      case "navigation":
        navigate(button.action.to);
        break;
      case "function":
        switch (button.action.function.type) {
          case "deleteProcess":
            deleteProcess.mutate({ processIDs });
            break;
        }
        break;
      case "request":
        if (button.action.data.localTestDataStatus === undefined) {
          statusButtonRequest.mutate({
            processIDs,
            button: button.action.data,
          });
        } else {
          if (
            button.action.data.localTestDataStatus === "VERIFYING_AND_REQUESTED"
          ) {
            verifyProject.mutate({
              processIDs,
              send: true,
            });
          } else if (button.action.data.localTestDataStatus === "VERIFYING") {
            verifyProject.mutate({
              processIDs,
              send: false,
            });
          } else if (button.action.data.localTestDataStatus === "REQUESTED") {
            sendProject.mutate(processIDs);
          } else {
            const processStatusString = button.action.data
              .localTestDataStatus as string;
            const processStatus: ProcessStatus =
              ProcessStatus[processStatusString as keyof typeof ProcessStatus];
            updateProcessStatus(processStatus, processIDs);
          }
        }
        break;
    }
  };

  return {
    getStatusButtons,
    handleOnClickButton,
    handleOnClickButtonCount,
  };
};

export default useStatusButtons;
