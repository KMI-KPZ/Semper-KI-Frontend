import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Container from "@component-library/Container";
import { ProjectProps } from "../../hooks/useProject";
import { ProcessProps } from "../../hooks/useProcess";
import useStatusButtons from "../hooks/useStatusButtons";

interface ProjectButtonsProps {
  project: ProjectProps;
  checkedProcesses: string[];
}

const ProjectButtons: React.FC<ProjectButtonsProps> = (props) => {
  const { project, checkedProcesses } = props;
  const { t } = useTranslation();
  const { getProjectStatusButtons, handleOnClickButtonCount } =
    useStatusButtons();

  const getSelectedProcesses = (): ProcessProps[] => {
    return project.processes.filter((process) =>
      checkedProcesses.includes(process.processID)
    );
  };

  return (
    <Container wrap="wrap">
      {getProjectStatusButtons(getSelectedProcesses()).map((button, index) => (
        <PermissionGate element={`ProjectButton${button.title}`} key={index}>
          <Button
            key={index}
            variant="secondary"
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButtonCount(button)}
            title={`${t(
              `Projects.Project.hooks.useStatusButtons.${button.title}`
            )} ${
              button.processes !== undefined
                ? ` ( ${button.processes.length} )`
                : ""
            }`}
          />
        </PermissionGate>
      ))}
    </Container>
  );
};

export default ProjectButtons;
