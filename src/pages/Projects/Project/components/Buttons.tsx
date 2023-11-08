import React, { ReactNode, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import FactoryIcon from "@mui/icons-material/Factory";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import { UserProps, UserType } from "@/hooks/useUser";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Container from "@component-library/Container";
import useService from "@/pages/Service/hooks/useService";
import { ProjectProps } from "../../hooks/useProject";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";
import { UserContext } from "@/contexts/UserContextProvider";
import useStatusButtons, {
  StatusButtonCountProps,
} from "../hooks/useStatusButtons";

interface ProjectButtonsProps {
  project: ProjectProps;
  checkedProcesses: string[];
}

const ProjectButtons: React.FC<ProjectButtonsProps> = (props) => {
  const { project, checkedProcesses } = props;
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteProcess } = useProcess();
  const { getProjectStatusButtons } = useStatusButtons();

  const getSelectedProcesses = (): ProcessProps[] => {
    return project.processes.filter((process) =>
      checkedProcesses.includes(process.processID)
    );
  };

  const handleOnClickButton = (button: StatusButtonCountProps) => {
    switch (button.title) {
      case "DELETE":
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
      case "REPROJECT":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.reProject") + "?"
          )
        ) {
          logger("//TODO ReProject");
        }
        break;
      case "REJECTED_BY_CONTRACTOR":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.reject") + "?"
          )
        ) {
          logger("//TODO Reject");
        }
        break;
      case "CONFIRMED_BY_CONTRACTOR":
        if (
          window.confirm(
            t("Projects.Project.components.Buttons.button.confirm") + "?"
          )
        ) {
          logger("//TODO Confirm");
        }
        break;
      case "VERIFYING":
        navigate("verification");
        break;
      case "CONTRACTOR_SELECTED":
        navigate("contractorSelection");
        break;
    }
  };

  return (
    <Container wrap="wrap">
      {getProjectStatusButtons(getSelectedProcesses()).map((button, index) => (
        <PermissionGate element={`ProjectButton${button.title}`} key={index}>
          <Button
            key={index}
            variant="icon"
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button)}
            title={`${t(
              `Projects.Project.hooks.useStatusButtons.${button.title}`
            )} ${button.count !== undefined ? ` ( ${button.count} )` : ""}`}
          />
        </PermissionGate>
      ))}
    </Container>
  );
};

export default ProjectButtons;
