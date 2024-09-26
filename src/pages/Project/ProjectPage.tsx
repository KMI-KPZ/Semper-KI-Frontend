import { Container, Heading, LoadingAnimation } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProjectInfo from "./components/Info";
import useGetProject from "@/api/Project/Querys/useGetProject";
import ProjectProcesses from "./components/Processes";
import { useTopics } from "@/contexts/ChatbotContextProvider";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const project = useGetProject();
  const { setTopics } = useTopics();

  setTopics(
    new Map<string, string>([
      ["projektdetails", "Detailübersicht zum aktuell ausgewählten Projekt"],
    ]),
    "Projektdetails",
    "",
    [],
    new Map<string, string>([
      [
        "projektdetails",
        "Detailübersicht zum aktuell ausgewählten Projekt wo die einzelnen Vorgänge (Prozesse) des Projekts aufgelistet sind.",
      ],
    ])
  );
  if (project.data === undefined) return <LoadingAnimation />;

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h1">{t("Project.ProjectPage.header")}</Heading>
      </BackButtonContainer>
      <ProjectInfo project={project.data} />
      <ProjectProcesses processes={project.data.processes} />
    </Container>
  );
};

export default ProjectPage;
