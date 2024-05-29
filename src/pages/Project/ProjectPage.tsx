import { Header } from "@/components/Header";
import {
  Container,
  Heading,
  LoadingAnimation,
  Modal,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProjectInfo from "./components/Info";
import useGetProject from "@/api/Project/Querys/useGetProject";
import ProjectProcesses from "./components/Processes";
import ProjectTitleForm from "./components/TitleForm";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const project = useGetProject();

  if (project.data === undefined) return <LoadingAnimation />;

  return (
    <Container width="full" direction="col">
      <Container className="bg-white p-2" width="full">
        <Heading variant="h1">{t("Project.ProjectPage.header")}</Heading>
      </Container>
      <ProjectInfo project={project.data} />
      <ProjectProcesses processes={project.data.processes} />
    </Container>
  );
};

export default ProjectPage;
