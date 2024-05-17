import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { Process } from "../../hooks/useProcess";
import useStatusButtons from "../hooks/useStatusButtons";
import { Project } from "@/api/Project/Querys/useGetProject";

interface ProjectButtonsProps {
  project: Project;
  checkedProcesses: string[];
}

const ProjectButtons: React.FC<ProjectButtonsProps> = (props) => {
  const { project, checkedProcesses } = props;
  const { t } = useTranslation();
  const { getProjectStatusButtons, handleOnClickButtonCount } =
    useStatusButtons();

  const getSelectedProcesses = (): Process[] => {
    return project.processes.filter((process) =>
      checkedProcesses.includes(process.processID)
    );
  };

  return (
    <>
      {getProjectStatusButtons(getSelectedProcesses()).map((button, index) => (
        <PermissionGate
          element={
            button.action.type === "function" &&
            button.action.function.type === "deleteProcess"
              ? "ProjectButtonDelete"
              : `ProjectStatusButtons`
          }
          key={index}
        >
          <Button
            key={index}
            variant="secondary"
            size="xs"
            startIcon={button.icon}
            onClick={() => handleOnClickButtonCount(button)}
            title={`${button.title} ${
              button.processes !== undefined
                ? ` ( ${button.processes.length} )`
                : ""
            }`}
          />
        </PermissionGate>
      ))}
    </>
  );
};

export default ProjectButtons;
