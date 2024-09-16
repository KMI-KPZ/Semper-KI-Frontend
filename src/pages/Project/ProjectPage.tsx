import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProjectInfo from "./components/Info";
import useGetProject from "@/api/Project/Querys/useGetProject";
import ProjectProcesses from "./components/Processes";
import { useTopics } from "@/contexts/ChatbotContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const project = useGetProject();
    const {topics, maintopic, response: string, choices,userChoice, setTopics, setUserChoice, closeChatbot, removeTopics} = useTopics();
    // useEffect(() => {
    //     return () => {
    //         removeTopics(["Projektdetails"]);
    //     }
    // }, []);

    // setMainTopic("Projektdetailseite - Übersicht der einzelnen Vorgänge im aktuellen Projekt");
    setTopics(new Map<string,string>([["projektdetails","Detailübersicht zum aktuell ausgewählten Projekt"]]),
        "Projektdetails", "",[],new Map<string,string>([["projektdetails","Detailübersicht zum aktuell ausgewählten Projekt wo die einzelnen Vorgänge (Prozesse) des Projekts aufgelistet sind."]]));
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
