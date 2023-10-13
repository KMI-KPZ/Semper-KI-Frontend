import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserProps, UserType } from "@/hooks/useUser/types";
import { Heading, Text } from "@component-library/Typography";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  LoadingAnimation,
  LoadingSuspense,
} from "@component-library/index";
import ProjectButtons from "./components/Buttons";
import { ProjectProps, useProject } from "../hooks/useProject";
import Container from "@component-library/Container";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjectTitleForm from "./components/TitleForm";
import InfoIcon from "@mui/icons-material/Info";
import ProjectInfo from "./components/Info";
import Modal from "@component-library/Modal";
import useProcess, { ProcessStatus } from "../hooks/useProcess";
import Process from "./Process/Process";
import useCheckedProcesses from "./hooks/useCheckedProcesses";
import { ProjectEvent, ProjectEventItem } from "@/pages/App/types";
import { ProjectContext } from "../context/ProjectContext";
import logger from "@/hooks/useLogger";
import useScrollToProcess from "./hooks/useScrollToProcess";

interface Props {
  user: UserProps | undefined;
  event?: ProjectEvent;
}

const Project: React.FC<Props> = (props) => {
  const { user, event: projectCollectionEvent } = props;
  const { project: testProject } = useContext(ProjectContext);
  const { processID } = useParams();
  useScrollToProcess(processID);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projectQuery, deleteProject, updateProject } = useProject();
  const { createProcess } = useProcess();
  const {
    checkedProcesses,
    handleOnChangeCheckboxSelect,
    handleOnChangeCheckboxSelectAll,
  } = useCheckedProcesses(projectQuery.data);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const project: ProjectProps | undefined = projectQuery.data;

  const handleOnClickDelete = () => {
    if (
      window.confirm(t("Projects.Project.Project.confirm.delete")) &&
      project !== undefined
    ) {
      deleteProject.mutate(project.projectID, {
        onSuccess: () => navigate("/projects"),
      });
    }
  };

  const onButtonClickCreateProcess = () => {
    createProcess.mutate();
  };

  const getProjectEventItemByID = (
    projectID: string
  ): ProjectEventItem | undefined => {
    if (
      projectCollectionEvent === undefined ||
      projectCollectionEvent.processes.length < 1
    )
      return undefined;
    return projectCollectionEvent.processes.find(
      (projectEvent) => projectEvent.processID === projectID
    );
  };

  const updateProjectTitle = (title: string) => {
    if (project === undefined) return;
    updateProject.mutate({
      changes: {
        details: {
          title,
        },
      },
    });
  };

  const handleOnClickButtonInfo = () => {
    setInfoOpen(true);
  };

  const closeInfo = () => {
    setInfoOpen(false);
  };

  return (
    <LoadingSuspense query={projectQuery}>
      {project === undefined ||
      (project !== undefined && project.projectID === undefined) ? (
        <LoadingAnimation />
      ) : (
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Container width="full" justify="between">
            <Container direction="col" align="start">
              <ProjectTitleForm
                headerType="h1"
                title={
                  project.details.title === undefined
                    ? t("Projects.Project.Project.title")
                    : project.details.title
                }
                updateTitle={updateProjectTitle}
              />
            </Container>
            <Text variant="body">
              {t("Projects.Project.Project.state")}
              {t(`enum.ProcessStatus.${ProcessStatus[project.status]}`)}
            </Text>
            <Container direction="row" wrap="wrap">
              <Button
                variant="icon"
                width="fit"
                size="sm"
                children={<InfoIcon />}
                onClick={handleOnClickButtonInfo}
                title={t("Projects.Project.Project.button.info")}
              />
              <PermissionGate element={"ProjectButtonDelete"}>
                <Button
                  width="fit"
                  variant="icon"
                  size="sm"
                  children={<DeleteIcon />}
                  title={t("Projects.Project.Project.button.delete")}
                  onClick={handleOnClickDelete}
                />
              </PermissionGate>
            </Container>
          </Container>
          <Divider />
          <Container width="full" justify="between">
            <Heading variant="h2">
              {t("Projects.Project.Project.processes")}
            </Heading>
            <PermissionGate element={"ProjectButtonNew"}>
              <Button
                width="fit"
                variant="icon"
                size="sm"
                startIcon={<AddIcon />}
                onClick={onButtonClickCreateProcess}
                title={t("Projects.Project.Project.button.new")}
              />
            </PermissionGate>
          </Container>
          {project.processes.length > 0 ? (
            <Container justify="between" width="full">
              <Container direction="row" wrap="wrap">
                <label className="flex flex-row items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="h-8 w-8"
                    onChange={handleOnChangeCheckboxSelectAll}
                    checked={
                      checkedProcesses.length === project.processes.length
                    }
                  />
                  <Text variant="body" className="whitespace-nowrap">
                    {t("Projects.Project.Project.selectAll")}
                  </Text>
                </label>
                {checkedProcesses.length > 0 ? (
                  <Text variant="body" className="whitespace-nowrap">
                    {t("Projects.Project.Project.selected", {
                      count: checkedProcesses.length,
                    })}
                  </Text>
                ) : null}
              </Container>
              <ProjectButtons
                project={project}
                user={user}
                checkedProcesses={checkedProcesses}
              />
            </Container>
          ) : null}
          {project.processes.length === 0 ? (
            <Heading variant="h2">
              {t("Projects.Project.Project.noProcesses")}
            </Heading>
          ) : (
            project.processes
              .sort((processA, processB) =>
                processA.created < processB.created ? -1 : 1
              )
              .map((process, index) => (
                <Process
                  key={index}
                  process={process}
                  projectID={project.projectID}
                  user={user}
                  projectEvent={getProjectEventItemByID(process.processID)}
                  checked={checkedProcesses.includes(process.processID)}
                  handleOnChangeCheckboxSelect={handleOnChangeCheckboxSelect}
                />
              ))
          )}
          <Modal
            open={infoOpen}
            closeModal={closeInfo}
            className="flex w-full flex-col"
          >
            <ProjectInfo project={project} />
          </Modal>
        </div>
      )}
    </LoadingSuspense>
  );
};

export default Project;
