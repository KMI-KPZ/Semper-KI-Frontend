import { useContext } from "react";
import { ProcessProps } from "../../hooks/useProcess";
import {
  StatusButtonProps,
  StatusButtonTitleType,
  StatusButtonData as statusButtonData,
} from "../components/StatusButtonData";
import { UserContext } from "@/contexts/UserContextProvider";
import useUser, { UserType } from "@/hooks/useUser";

interface UseStatusButtonsReturnProps {
  getProjectStatusButtons: (
    processes: ProcessProps[]
  ) => StatusButtonCountProps[];
  getProcessStatusButtons: (process: ProcessProps) => StatusButtonProps[];
}

export interface StatusButtonCountProps extends StatusButtonProps {
  count?: number;
}

const useStatusButtons = (): UseStatusButtonsReturnProps => {
  const { user } = useUser();

  const filterButtonByUser = (
    process: ProcessProps,
    button: StatusButtonProps
  ): boolean => {
    switch (button.user) {
      case UserType.USER:
        const userIsAllowed =
          (user.usertype !== UserType.ANONYM &&
            (user.hashedID === process.client ||
              user.organizations.includes(process.client))) ||
          user.usertype === UserType.ANONYM;
        return userIsAllowed;
      case UserType.ORGANIZATION:
        const orgaIsAllowed =
          user.usertype !== UserType.ANONYM &&
          user.organizations.filter((orga) => {
            process.contractor.includes(orga);
          }).length > 0;
        return orgaIsAllowed;
      case UserType.ADMIN:
        return true;
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

  const getProcessStatusButtons = (
    process: ProcessProps
  ): StatusButtonProps[] => {
    const exludes: StatusButtonTitleType[] = ["DELETE"];
    return statusButtonData
      .filter((button) => filterButtonByTitle(button, exludes))
      .filter((button) => filterButtonByStatus(process, button))
      .filter((button) => filterButtonByUser(process, button));
  };

  const getProjectStatusButtons = (
    processes: ProcessProps[]
  ): StatusButtonCountProps[] => {
    const exludes: StatusButtonTitleType[] = [];
    const allButtons = processes.flatMap((process) =>
      statusButtonData
        .filter((button) => filterButtonByTitle(button, exludes))
        .filter((button) => filterButtonByStatus(process, button))
        .filter((button) => filterButtonByUser(process, button))
    );

    let buttonsWithCount: StatusButtonCountProps[] = [];
    allButtons.forEach((button) => {
      const index = buttonsWithCount.findIndex((b) => b.title === button.title);
      if (index === -1) {
        buttonsWithCount.push({ ...button, count: 1 });
      } else {
        buttonsWithCount[index].count! += 1;
      }
    });

    return buttonsWithCount;
  };

  return { getProjectStatusButtons, getProcessStatusButtons };
};

export default useStatusButtons;
