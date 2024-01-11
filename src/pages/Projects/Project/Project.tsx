import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { Heading, Text } from "@component-library/Typography";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  LoadingAnimation,
  LoadingSuspense,
} from "@component-library/index";
import ProjectButtons from "./components/StatusButtons";
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
import {
  ProjectEvents,
  ProjectEventItem,
  ProcessEventItem,
} from "@/pages/App/types";
import { ProjectContext } from "../context/ProjectContext";
import useScrollToProcess from "./hooks/useScrollToProcess";
import useGeneralProcess from "../hooks/useGeneralProcess";

interface Props {
  adminProject?: ProjectProps;
}

const Project: React.FC<Props> = (props) => {
  const { adminProject } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { processID } = useParams();
  useScrollToProcess(processID);
  const { user } = useUser();

  const { project: _project } = useContext(ProjectContext);
  const project: ProjectProps =
    user.usertype === UserType.ADMIN && adminProject !== undefined
      ? adminProject
      : _project;
  const { deleteProject, updateProject } = useProject();
  const { createProcess } = useGeneralProcess();
  const { checkedProcesses, handleOnChangeCheckboxSelectAll } =
    useCheckedProcesses();
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  const handleOnClickDelete = () => {
    if (
      window.confirm(t("Projects.Project.Project.confirm.delete")) &&
      project !== undefined
    ) {
      deleteProject([project.projectID]);
      navigate("/projects");
    }
  };

  const onButtonClickCreateProcess = () => {
    createProcess();
  };

  const updateProjectTitle = (title: string) => {
    if (project === undefined) return;
    updateProject({
      changes: {
        projectDetails: {
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
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      {/* <Routes>
        <Route path="service/*" element={<ServiceRoutes />} />
      </Routes> */}
      <Modal
        title="ProjectInfo"
        open={infoOpen}
        closeModal={closeInfo}
        className="flex w-full flex-col"
      >
        <ProjectInfo project={project} />
      </Modal>
      <Container width="full" justify="between">
        <Container direction="col" align="start">
          <ProjectTitleForm
            headerType="h1"
            title={
              project.projectDetails.title === undefined
                ? t("Projects.Project.Project.title")
                : project.projectDetails.title
            }
            updateTitle={updateProjectTitle}
          />
        </Container>
        <Text variant="body">
          {t("Projects.Project.Project.state")}
          {t(
            `enum.ProcessStatus.${
              ProcessStatus[project.status] as keyof typeof ProcessStatus
            }`
          )}
        </Text>
        <Container direction="row" wrap="wrap" gap={3}>
          <Button
            variant="secondary"
            width="fit"
            size="sm"
            children={<InfoIcon />}
            onClick={handleOnClickButtonInfo}
            title={t("Projects.Project.Project.button.info")}
          />
          <PermissionGate element={"ProjectButtonDELETE"}>
            <Button
              width="fit"
              variant="secondary"
              size="sm"
              children={<DeleteIcon />}
              title={t("Projects.Project.Project.button.delete")}
              onClick={handleOnClickDelete}
            />
          </PermissionGate>
        </Container>
      </Container>
      <Divider />
      <Container justify="between" width="full">
        <Container direction="row" wrap="wrap">
          <label
            className="flex flex-row items-center justify-start gap-3"
            htmlFor="selectAllProcesses"
          >
            <input
              type="checkbox"
              className="h-8 w-8"
              onChange={handleOnChangeCheckboxSelectAll}
              id="selectAllProcesses"
              name={t("Projects.Project.Project.label.selectProcess")}
              value={t("Projects.Project.Project.label.selectAllProcesses")}
              checked={checkedProcesses.length === project.processes.length}
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
        <Container direction="row" wrap="wrap">
          <ProjectButtons
            project={project}
            checkedProcesses={checkedProcesses}
          />
          <PermissionGate element={"ProjectButtonNew"}>
            <Button
              variant="primary"
              size="sm"
              startIcon={<AddIcon />}
              onClick={onButtonClickCreateProcess}
              title={t("Projects.Project.Project.button.new")}
            />
          </PermissionGate>
        </Container>
      </Container>

      {project.processes.length === 0 ? (
        <Heading variant="h2">
          {t("Projects.Project.Project.noProcesses")}
        </Heading>
      ) : (
        project.processes
          .sort((processA, processB) =>
            processA.createdWhen < processB.createdWhen ? -1 : 1
          )
          .map((process, index) => (
            <Process
              key={index}
              process={process}
              projectID={project.projectID}
              checked={checkedProcesses.includes(process.processID)}
            />
          ))
      )}
      <Modal
        open={project.projectDetails.title === undefined}
        locked={true}
        title="projectTitle"
        noIcon={true}
      >
        <Container className="bg-white p-10" direction="col">
          <ProjectTitleForm
            headerType="h1"
            title={t("Projects.Project.Project.modal.projectName")}
            labelTitle={t("Projects.Project.Project.modal.projectName")}
            updateTitle={updateProjectTitle}
            edit={true}
          />
        </Container>
      </Modal>
    </div>
  );
};

export default Project;
