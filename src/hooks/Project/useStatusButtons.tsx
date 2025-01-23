import { ReactNode } from "react";
import { UserType } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DescriptionIcon from "@mui/icons-material/Description";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import useStatusButtonRequest from "@/api/Process/Mutations/useStatusButtonRequest";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useSendProject from "@/api/Project/Mutations/useSendProject";
import useVerifyProject from "@/api/Project/Mutations/useVerifyProject";
import logger from "../useLogger";
import DoneIcon from "@mui/icons-material/Done";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQueryClient } from "@tanstack/react-query";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import BugReportIcon from "@mui/icons-material/BugReport";

interface UseStatusButtonsReturnProps {
  getStatusButtons: (
    process: Process,
    includeDelete?: boolean
  ) => StatusButtonProps[];
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
  iconPosition: "left" | "right";
};

export type StatusButtonShowInType = "project" | "process" | "both";

export type StatusButtonPropsExtern = {
  icon: string;
} & StatusButtonPropsGeneric;

export type StatusButtonProps = {
  icon: ReactNode;
  oldTitle: string;
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
  const queryClient = useQueryClient();

  const getStatusButtons = (
    process: Process,
    includeDelete?: boolean
  ): StatusButtonProps[] => {
    const include = includeDelete === undefined ? false : includeDelete;

    return transformExternalStatusButtons(
      process.processStatusButtons !== undefined && include === false
        ? process.processStatusButtons.filter(
            (button) => button.title !== "DELETE"
          )
        : process.processStatusButtons !== undefined && include === true
        ? process.processStatusButtons
        : []
    );
  };

  const transformExternalStatusButtons = (
    externalStatusButtons: StatusButtonPropsExtern[]
  ): StatusButtonProps[] => {
    return externalStatusButtons.map((button) => ({
      ...button,
      oldTitle: button.title,
      title: transformTitle(button.title),
      icon: transformIcon(button.icon),
    }));
  };

  const transformIcon = (icon: string): ReactNode => {
    switch (icon) {
      case "DeleteIcon":
        return <DeleteIcon />;
      case "QuestionAnswerIcon":
        return <QuestionAnswerIcon />;
      case "DescriptionIcon":
        return <DescriptionIcon />;
      case "DoneAllIcon":
        return <DoneAllIcon />;
      case "LocalShippingIcon":
        return <LocalShippingIcon />;
      case "ArrowBackIcon":
        return <ArrowBackIcon />;
      case "ArrowForwardIcon":
        return <ArrowForwardIcon />;
      case "DoneIcon":
        return <DoneIcon />;
      case "CancelIcon":
        return <CancelOutlinedIcon />;
      case "CloneIcon":
        return <ControlPointDuplicateIcon />;
      default:
        return <BugReportIcon />;
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
          statusButtonRequest.mutate(
            {
              processIDs,
              button: button.action.data,
            },
            {
              onSuccess(_, __, ___) {
                logger("--------", button);
                if (
                  button.action.type === "request" &&
                  button.action.data.type === "cloneProcesses"
                ) {
                  navigate("/");
                  queryClient.invalidateQueries(["project"]);
                  queryClient.invalidateQueries(["dashboardProject"]);
                }
              },
            }
          );
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
