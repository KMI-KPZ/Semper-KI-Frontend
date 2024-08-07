import { Header } from "@/components/Header";
import {
  Button,
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const project = useGetProject();

  if (project.data === undefined) return <LoadingAnimation />;

  return (
    <Container width="full" direction="col">
      <Container width="full" className="relative  bg-white p-2">
        <Button
          width="fit"
          to=".."
          title={t("Process.ProcessPage.button.back")}
          variant="text"
          className="absolute left-5"
        >
          <ArrowBackIosIcon />
        </Button>
        <Heading variant="h1">{t("Project.ProjectPage.header")}</Heading>
      </Container>
      <ProjectInfo project={project.data} />
      <ProjectProcesses processes={project.data.processes} />
    </Container>
  );
};

export default ProjectPage;
