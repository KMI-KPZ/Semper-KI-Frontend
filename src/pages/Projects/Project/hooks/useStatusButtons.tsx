import { useContext } from "react";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";
import {
  StatusButtonProps,
  StatusButtonTitleType,
  statusButtonData,
} from "../components/StatusButtonData";
import useUser, { UserType } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import useCheckedProcesses from "./useCheckedProcesses";
import { useProject } from "../../hooks/useProject";
import useGeneralProcess from "../../hooks/useGeneralProcess";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";

interface UseStatusButtonsReturnProps {
  getProjectStatusButtons: (
    processes: ProcessProps[]
  ) => StatusButtonProcessProps[];
  getProcessStatusButtons: (process: ProcessProps) => StatusButtonProps[];
  handleOnClickButtonCount: (button: StatusButtonProcessProps) => void;
  handleOnClickButton: (button: StatusButtonProps, processID: string) => void;
}

export interface StatusButtonProcessProps extends StatusButtonProps {
  processes: string[];
}

const useStatusButtons = (): UseStatusButtonsReturnProps => {
  const { user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { checkedProcesses, setCheckedProcesses } = useCheckedProcesses();
  const { project, sendProject, verifyProject } = useProject();
  const { updateProcess, deleteProcess } = useGeneralProcess();

  const filterButtonByUser = (
    process: ProcessProps,
    button: StatusButtonProps
  ): boolean => {
    switch (button.user) {
      case UserType.USER:
        const userIsAllowed =
          (user.usertype !== UserType.ANONYM &&
            (user.hashedID === process.client ||
              (user.organization !== undefined &&
                user.organization.includes(process.client)))) ||
          user.usertype === UserType.ANONYM;
        return userIsAllowed;
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
    process: ProcessProps,
    button: StatusButtonProps
  ): boolean => {
    const isAllowed = button.allowedStates.includes(process.processStatus);
    return isAllowed;
  };

  const filterButtonByTitle = (
    button: StatusButtonProps,
    excludes: StatusButtonTitleType[]
  ): boolean => {
    return !excludes.includes(button.title);
  };

  const getFilteredButtons = (
    process: ProcessProps,
    excludes: StatusButtonTitleType[]
  ): StatusButtonProps[] => {
    if (user.usertype === UserType.ADMIN) return statusButtonData;
    return statusButtonData
      .filter((button) => filterButtonByTitle(button, excludes))
      .filter((button) => filterButtonByStatus(process, button))
      .filter((button) => filterButtonByUser(process, button));
  };

  const getProcessStatusButtons = (
    process: ProcessProps
  ): StatusButtonProps[] => {
    const exludes: StatusButtonTitleType[] = ["DELETE"];
    return getFilteredButtons(process, exludes);
  };

  const getProjectStatusButtons = (
    processes: ProcessProps[]
  ): StatusButtonProcessProps[] => {
    const exludes: StatusButtonTitleType[] = [];
    const buttonGroups = processes.map((process) => ({
      process,
      buttons: getFilteredButtons(process, exludes),
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
    updateProcess({
      processIDs,
      updates: {
        changes: {
          processStatus: status,
        },
      },
    });
  };

  const calcPath = (path: string, processID: string): string => {
    return `/projects/${project.projectID}/${processID}/${path}`;
  };

  const handleOnClickButtonCount = (button: StatusButtonProcessProps) => {
    if (
      window.confirm(
        t("Projects.Project.hooks.useStatusButtons.buttons.confirmAll", {
          title: t(`Projects.Project.hooks.useStatusButtons.${button.title}`),
        })
      )
    ) {
      handleButtonAction(button.title, button.processes);
    }
  };

  const handleOnClickButton = (
    button: StatusButtonProps,
    processID: string
  ) => {
    setCheckedProcesses([processID]);
    handleButtonAction(button.title, [processID]);
  };

  const handleButtonAction = (
    buttonType: StatusButtonTitleType,
    processIDs: string[]
  ) => {
    switch (buttonType) {
      case "EDIT":
        navigate(calcPath("service/edit", processIDs[0]));
        break;
      case "DELETE":
        deleteProcess({ processIDs });
        break;
      case "REPROJECT":
        logger("//TODO ReProject");
        break;
      case "VERIFYING":
        verifyProject({
          processIDs,
          send: false,
        });
        break;
      case "VERIFYING_AND_REQUESTED":
        verifyProject({
          processIDs,
          send: true,
        });
        break;
      case "REQUESTED":
        sendProject({ processIDs });
        break;
      case "CLARIFICATION":
        updateProcessStatus(ProcessStatus.CLARIFICATION, processIDs);
        break;
      case "COMPLETED":
        updateProcessStatus(ProcessStatus.COMPLETED, processIDs);
        break;
      case "CONFIRMED_BY_CLIENT":
        updateProcessStatus(ProcessStatus.CONFIRMED_BY_CLIENT, processIDs);
        break;
      case "CONFIRMED_BY_CONTRACTOR":
        updateProcessStatus(ProcessStatus.CONFIRMED_BY_CONTRACTOR, processIDs);
        break;
      case "REJECTED_BY_CLIENT":
        updateProcessStatus(ProcessStatus.REJECTED_BY_CLIENT, processIDs);
        break;
      case "REJECTED_BY_CONTRACTOR":
        updateProcessStatus(ProcessStatus.REJECTED_BY_CONTRACTOR, processIDs);
        break;
      case "CONTRACTOR_SELECTED":
        navigate("contractorSelection");
        break;
      case "DELIVERY":
        updateProcessStatus(ProcessStatus.DELIVERY, processIDs);
        break;
      case "PRODUCTION":
        updateProcessStatus(ProcessStatus.PRODUCTION, processIDs);
        break;
      case "SELECT_SERVICE":
        updateProcessStatus(ProcessStatus.DRAFT, processIDs);
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
