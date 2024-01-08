import { FlatProjectProps } from "@/api/Project/useFlatProjectQuerys";
import Container from "@component-library/Container";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProcessStatus } from "../hooks/useProcess";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { Button } from "@component-library/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useProject } from "../hooks/useProject";
import logger from "@/hooks/useLogger";

interface ProjectsCardProps {
  flatProject: FlatProjectProps;
  selectedProjects: string[];
  setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProjectsCard: React.FC<ProjectsCardProps> = (props) => {
  const { flatProject, selectedProjects, setSelectedProjects } = props;
  const { t } = useTranslation();
  const { deleteProject } = useProject();

  const handleOnClickButtonDelete = (projectID: string) => {
    window.confirm(t("Projects.components.Table.deleteConfirm")) === true
      ? deleteProject([projectID])
      : logger("delete canceled");
  };

  const handleOnChangeCheckboxSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    projectID: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedProjects([...selectedProjects, projectID]);
    } else {
      setSelectedProjects(
        selectedProjects.filter(
          (checkedProjectID) => checkedProjectID !== projectID
        )
      );
    }
  };

  return (
    <Container
      direction="auto"
      justify="between"
      width="full"
      className="rounded-md p-2 shadow-button-primary"
    >
      <Container gap={3} className=" md:justify-between">
        <label className="flex w-full  items-center justify-center p-3">
          <input
            id="selectProcess"
            type="checkbox"
            className="h-6 w-6"
            name={t("Projects.components.Table.label.selectProject", {
              name: flatProject.projectID,
            })}
            value={t("Projects.components.Table.label.selectProject", {
              name: flatProject.projectID,
            })}
            checked={selectedProjects.includes(flatProject.projectID)}
            onChange={(e) =>
              handleOnChangeCheckboxSelect(e, flatProject.projectID)
            }
          />
          <Text className="hidden">
            {t("Projects.components.Card.name")}
            {flatProject.details.title === undefined
              ? `Auftrag: #${flatProject.projectID}`
              : flatProject.details.title}
          </Text>
        </label>
      </Container>
      <Container
        gap={3}
        justify="between"
        className="grow flex-wrap"
        align="start"
      >
        <Container
          gap={3}
          direction="row"
          justify="start"
          align="start"
          width="full"
        >
          <Text className="min-w-[120px]">
            {t("Projects.components.Card.name")}
          </Text>
          <Text className="min-w-[120px] break-all ">
            {flatProject.details.title === undefined
              ? `Auftrag: #${flatProject.projectID}`
              : flatProject.details.title}
          </Text>
        </Container>

        <Container direction="col" align="start" gap={3}>
          <Container gap={3} direction="row" justify="start">
            <Text className="min-w-[120px]">
              {t("Projects.components.Card.created")}
            </Text>
            <Text className="min-w-[120px]">
              {flatProject.createdWhen.toLocaleString()}
            </Text>
          </Container>
          <Container gap={3} direction="row" justify="start">
            <Text className="min-w-[120px]">
              {t("Projects.components.Card.updated")}
            </Text>
            <Text className="min-w-[120px]">
              {flatProject.updatedWhen.toLocaleString()}
            </Text>
          </Container>
        </Container>
        <Container direction="col" align="start" gap={3}>
          <Container gap={3} direction="row" justify="start">
            <Text className="min-w-[120px]">
              {t("Projects.components.Card.count")}
            </Text>
            <Text className="min-w-[120px]">{flatProject.processesCount}</Text>
          </Container>
          <Container gap={3} direction="row" justify="start" align="start">
            <Text className="min-w-[120px]">
              {t("Projects.components.Card.status")}
            </Text>
            <Text className="min-w-[120px]">
              {t(
                `enum.ProcessStatus.${
                  ProcessStatus[
                    flatProject.status
                  ] as keyof typeof ProcessStatus
                }`
              )}
            </Text>
          </Container>
        </Container>
      </Container>
      <Container gap={3}>
        <PermissionGate element={"ProjectButtonDelete"}>
          <Button
            variant="secondary"
            title={t("Projects.components.Table.button.delete")}
            children={<DeleteIcon />}
            onClick={() => handleOnClickButtonDelete(flatProject.projectID)}
          />
        </PermissionGate>
        <PermissionGate element={"ProjectButtonSee"}>
          <Button
            variant="secondary"
            title={t("Projects.components.Table.button.detail")}
            children={<VisibilityIcon />}
            to={`${flatProject.projectID}`}
          />
        </PermissionGate>
      </Container>
    </Container>
  );
};

export default ProjectsCard;
