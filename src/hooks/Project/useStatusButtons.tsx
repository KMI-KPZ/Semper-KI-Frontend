import { ReactNode } from "react";
import useUser, { UserType } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useProject } from "./useProject";
import { useTranslation } from "react-i18next";
import { externalStatusButtonData } from "./externalStatusButtonData";
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
  getProjectStatusButtons: (processes: Process[]) => StatusButtonProcessProps[];
  getProcessStatusButtons: (process: Process) => StatusButtonProps[];
  handleOnClickButtonCount: (button: StatusButtonProcessProps) => void;
  handleOnClickButton: (button: StatusButtonProps, processID: string) => void;
}

export type StatusButtonTitleType =
  | "BACK"
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
  | "SERVICE_IN_PROGRESS"
  | "NONE";

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
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { project } = useProject();
  const sendProject = useSendProject();
  const verifyProject = useVerifyProject();
  const updateProcess = useUpdateProcess();
  const deleteProcess = useDeleteProcess();
  const statusButtonRequest = useStatusButtonRequest();

  const getStatusButtons = (
    process: Process,
    showIn: StatusButtonShowInType
  ): StatusButtonProps[] => {
    if (process.processStatusButtons !== undefined) {
      return filterRemoteButtons(
        transformExternalStatusButtons(process.processStatusButtons),
        showIn
      );
    } else {
      return filterLocalButtons(
        process,
        transformExternalStatusButtons(externalStatusButtonData),
        showIn
      );
    }
  };

  const transformExternalStatusButtons = (
    externalStatusButtons: StatusButtonPropsExtern[]
  ): StatusButtonProps[] => {
    return externalStatusButtons.map((button) => ({
      ...button,
      title: tranformTitle(button.title),
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
  const tranformTitle = (title: string): StatusButtonTitleType => {
    let typedTitel: StatusButtonTitleType = "NONE";

    const validStatusButtonTitles: StatusButtonTitleType[] = [
      "BACK",
      "SERVICE_IN_PROGRESS",
      "SELECT_SERVICE",
      "EDIT",
      "DELETE",
      "SERVICE_IN_PROGRESS",
      "CONTRACTOR_SELECTED",
      "VERIFYING_AND_REQUESTED",
      "VERIFYING",
      "REQUESTED",
      "CLARIFICATION",
      "CONFIRMED_BY_CONTRACTOR",
      "REJECTED_BY_CONTRACTOR",
      "CONFIRMED_BY_CLIENT",
      "REJECTED_BY_CLIENT",
      "PRODUCTION",
      "DELIVERY",
      "COMPLETED",
      "REPROJECT",
    ];

    if (validStatusButtonTitles.includes(title as StatusButtonTitleType)) {
      typedTitel = title as StatusButtonTitleType;
    } else typedTitel = "NONE";

    return t(`Projects.Project.hooks.useStatusButtons.${typedTitel}`);
  };

  const filterButtonByUser = (
    process: Process,
    button: StatusButtonProps
  ): boolean => {
    if (button.user === undefined) return true;
    switch (button.user) {
      case UserType.USER:
        const isAnonmyAllowed = user.usertype === UserType.ANONYM;
        const isClient =
          user.usertype === UserType.USER && user.hashedID === process.client;
        const isOrgaAllowed =
          user.usertype === UserType.ORGANIZATION &&
          user.organization !== undefined &&
          user.organization === process.client;
        return isAnonmyAllowed || isClient || isOrgaAllowed;
      case UserType.ORGANIZATION:
        const orgaIsAllowed =
          user.usertype !== UserType.ANONYM &&
          user.organization !== undefined &&
          user.organization === process.processDetails.provisionalContractor;
        return orgaIsAllowed;
      case UserType.ADMIN:
        return user.usertype === UserType.ADMIN;
      case UserType.ANONYM:
        return true;
    }
  };

  const filterButtonByStatus = (
    process: Process,
    button: StatusButtonProps
  ): boolean => {
    return button.allowedStates === undefined
      ? true
      : button.allowedStates.includes(process.processStatus);
  };

  const filterButtonByShowIn = (
    button: StatusButtonProps,
    showIn: StatusButtonShowInType
  ): boolean => {
    return showIn === button.showIn || button.showIn === "both";
  };

  const filterLocalButtons = (
    process: Process,
    buttons: StatusButtonProps[],
    showIn: StatusButtonShowInType
  ): StatusButtonProps[] => {
    if (user.usertype === UserType.ADMIN) return buttons;
    return buttons
      .filter((button) => filterButtonByShowIn(button, showIn))
      .filter((button) => filterButtonByStatus(process, button))
      .filter((button) => filterButtonByUser(process, button));
  };

  const filterRemoteButtons = (
    buttons: StatusButtonProps[],
    showIn: StatusButtonShowInType
  ): StatusButtonProps[] => {
    return buttons.filter((button) => filterButtonByShowIn(button, showIn));
  };

  const getProcessStatusButtons = (process: Process): StatusButtonProps[] => {
    return getStatusButtons(process, "process");
  };

  const getProjectStatusButtons = (
    processes: Process[]
  ): StatusButtonProcessProps[] => {
    const buttonGroups = processes.map((process) => ({
      process,
      buttons: getStatusButtons(process, "project"),
    }));

    let buttonsWithProcesses: StatusButtonProcessProps[] = [];
    buttonGroups.forEach((buttonGroup) => {
      buttonGroup.buttons.forEach((button) => {
        const index = buttonsWithProcesses.findIndex(
          (buttonWithProcess) => buttonWithProcess.title === button.title
        );
        if (index === -1) {
          buttonsWithProcesses.push({
            ...button,
            processes: [buttonGroup.process.processID],
          });
        } else {
          buttonsWithProcesses[index].processes.push(
            buttonGroup.process.processID
          );
        }
      });
    });

    return buttonsWithProcesses;
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
        t("Projects.Project.hooks.useStatusButtons.buttons.confirmAll", {
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
    getProjectStatusButtons,
    getProcessStatusButtons,
    handleOnClickButton,
    handleOnClickButtonCount,
  };
};

export default useStatusButtons;
