import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import FactoryIcon from "@mui/icons-material/Factory";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import { UserProps } from "@/hooks/useUser/types";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Container from "@component-library/Container";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import useService from "@/pages/Service/hooks/useService";
import { ProjectProps } from "../../hooks/useProject";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";

interface ProjectButtonsProps {
  project: ProjectProps;
  user: UserProps | undefined;
  checkedProcesses: string[];
}

interface ProjectButtonProps {
  title:
    | "delete"
    | "edit"
    | "cancel"
    | "contractorSelect"
    | "verify"
    | "reject"
    | "confirm"
    | "reProject";
  type: ProjectButtonType;
  icon: ReactNode;
  contractor: boolean;
  allowedStates: ProcessStatus[];
}

interface ProjectButtonWithCountProps extends ProjectButtonProps {
  count?: number;
}

type ProjectButtonType =
  | "Delete"
  | "Cancel"
  | "ReProject"
  | "Reject"
  | "Confirm"
  | "Verify"
  | "Edit"
  | "ContractorSelection";

const ProjectButtonData: ProjectButtonProps[] = [
  {
    title: "delete",
    type: "Delete",
    icon: <DeleteForever />,
    contractor: false,
    allowedStates: [
      ProcessStatus.DRAFT,
      ProcessStatus.CONTRACTOR_SELECTED,
      ProcessStatus.DELIVERY,
      ProcessStatus.REQUESTED,
    ],
  },
  {
    title: "edit",
    type: "Edit",
    icon: <EditIcon />,
    contractor: false,
    allowedStates: [ProcessStatus.DRAFT],
  },
  {
    title: "cancel",
    type: "Cancel",
    icon: <CancelIcon />,
    contractor: false,
    allowedStates: [ProcessStatus.REQUESTED],
  },
  {
    title: "contractorSelect",
    type: "ContractorSelection",
    icon: <FactoryIcon />,
    contractor: false,
    allowedStates: [ProcessStatus.DRAFT],
  },
  {
    title: "verify",
    type: "Verify",
    icon: <AssignmentTurnedInIcon />,
    contractor: false,
    allowedStates: [ProcessStatus.CONTRACTOR_SELECTED],
  },
  {
    title: "reject",
    type: "Reject",
    icon: <CancelIcon />,
    contractor: true,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
  },
  {
    title: "confirm",
    type: "Confirm",
    icon: <CheckIcon />,
    contractor: true,
    allowedStates: [ProcessStatus.REQUESTED, ProcessStatus.CLARIFICATION],
  },
  {
    title: "reProject",
    type: "ReProject",
    icon: <ReplayIcon />,
    contractor: false,
    allowedStates: [ProcessStatus.COMPLETED],
  },
];

const ProjectButtons: React.FC<ProjectButtonsProps> = (props) => {
  const { user, project, checkedProcesses } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteProcess } = useProcess();
  const { isServiceComplete } = useService();

  const showClientButton = (): boolean =>
    user === undefined ||
    (user !== undefined &&
      (user.organizations.includes(project.client) ||
        user.hashedID === project.client));

  const showContractorButton = (): boolean => user !== undefined && false;

  const filterButtonsByUser = (button: ProjectButtonProps): boolean =>
    (showClientButton() && button.contractor === false) ||
    (showContractorButton() && button.contractor === true);

  const getCountOfProcessesForButton = (
    button: ProjectButtonProps,
    selectedProcesses: ProcessProps[]
  ): number => {
    return selectedProcesses.filter(
      (process) =>
        button.allowedStates.includes(process.status) &&
        ((isServiceComplete(process.processID) &&
          button.type === "ContractorSelection") ||
          button.type !== "ContractorSelection")
    ).length;
  };

  const getButtons = (): ProjectButtonWithCountProps[] => {
    const buttonsFilterByUser = ProjectButtonData.filter(filterButtonsByUser);
    let buttonsWithCount: ProjectButtonWithCountProps[] = [];

    const selectedProcessStates: ProcessProps[] = project.processes.filter(
      (process) => checkedProcesses.includes(process.processID)
    );

    buttonsFilterByUser.forEach((button) => {
      const count = getCountOfProcessesForButton(button, selectedProcessStates);
      if (count > 0) {
        buttonsWithCount.push({
          ...button,
          count: count,
        });
      }
    });

    return buttonsWithCount;
  };

  const handleOnClickButton = (button: ProjectButtonProps) => {
    switch (button.type) {
      case "Delete":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.cancel") + "?"
          )
        ) {
          logger("checkefProcesses", checkedProcesses);
          checkedProcesses.forEach((processID) => {
            deleteProcess.mutate(processID);
          });
        }
        break;
      case "Cancel":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.cancel") + "?"
          )
        ) {
          logger("//TODO Cancel");
        }
        break;
      case "ReProject":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.reProject") + "?"
          )
        ) {
          logger("//TODO ReProject");
        }
        break;
      case "Reject":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.reject") + "?"
          )
        ) {
          logger("//TODO Reject");
        }
        break;
      case "Confirm":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.confirm") + "?"
          )
        ) {
          logger("//TODO Confirm");
        }
        break;
      case "Verify":
        navigate("verification");
        break;
      case "Edit":
        navigate(`${checkedProcesses[0]}`);
        break;
      case "ContractorSelection":
        navigate("contractorSelection");
        break;
    }
  };

  return (
    <Container wrap="wrap">
      {getButtons().map((button, index) => (
        <PermissionGate element={`ProjectButton${button.type}`} key={index}>
          <Button
            key={index}
            variant="icon"
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button)}
            title={`${t(
              `Projects.Project.components.Buttons.button.${button.title}`
            )} ${button.count !== undefined ? ` ( ${button.count} )` : ""}`}
          />
        </PermissionGate>
      ))}
    </Container>
  );
};

export default ProjectButtons;
