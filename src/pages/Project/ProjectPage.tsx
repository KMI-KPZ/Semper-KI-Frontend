import { Container, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProjectInfo from "./components/Info";
import ProjectProcesses from "./components/Processes";
import { useTopics } from "@/contexts/ChatbotContextProvider";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";
import logger from "@/hooks/useLogger";
import { useProject } from "@/hooks/Project/useProject";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { project } = useProject();
  const { setTopics } = useTopics();

  logger("ProjectPage", "render", project);

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

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h1">{t("Project.header")}</Heading>
      </BackButtonContainer>
      <ProjectInfo project={project} />
      <ProjectProcesses processes={project.processes} />
    </Container>
  );
};

export default ProjectPage;
