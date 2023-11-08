import { useContext } from "react";
import { ProcessProps } from "../../hooks/useProcess";
import {
  StatusButtonProps,
  StatusButtonData as statusButtonData,
} from "../components/StatusButtonData";
import { UserContext } from "@/contexts/UserContextProvider";
import { UserType } from "@/hooks/useUser";

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
  const { user } = useContext(UserContext);

  const filterButtonByUser = (
    process: ProcessProps,
    button: StatusButtonProps
  ): boolean => {
    switch (button.user) {
      case UserType.USER:
        const userIsAllowed =
          user === undefined ||
          (user !== undefined &&
            (user.hashedID === process.client ||
              user.organizations.includes(process.client)));
        return userIsAllowed;
      case UserType.ORGANIZATION:
        const orgaIsAllowed =
          user !== undefined &&
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
    const isAllowed = button.allowedStates.includes(process.status);
    return isAllowed;
  };

  const getProcessStatusButtons = (
    process: ProcessProps
  ): StatusButtonProps[] => {
    return statusButtonData
      .filter((button) => filterButtonByStatus(process, button))
      .filter((button) => filterButtonByUser(process, button));
  };

  const getProjectStatusButtons = (
    processes: ProcessProps[]
  ): StatusButtonCountProps[] => {
    const allButtons = processes.flatMap((process) =>
      statusButtonData
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
