import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
} from "@component-library/index";
import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import ProjectInfo from "./components/Info";
import useGetProject, {FlatProcess} from "@/api/Project/Querys/useGetProject";
import ProjectProcesses from "./components/Processes";
import { useTopics } from "@/contexts/ChatbotContextProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface ProjectPageProps {}

const ProjectPage: React.FC<ProjectPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const project = useGetProject();
  const { userChoice, setTopics, setUserChoice } = useTopics();
  const initialAccumulator: { [key: string]: string } = {"1":"process-create"};
  let processess: FlatProcess[] = [];


  useEffect(() => {
    // get list of processes
    if (project.data?.processes === undefined) {
      project.refetch();
    }
    // console.log processes and their ids
    console.log("Processes: ", project.data?.processes);
    processess = project.data?.processes ?? [];
    setTopics(
        new Map<string, string>([
          ["projektdetails", "Detailübersicht zum aktuell ausgewählten Projekt"],
        ]),
        "Projektdetails",
        "",
        processess.reduce((acc, item, index) => {
          acc[(index + 1).toString()] =
              'Prozess "' + item.title + '" fortsetzen';
          return acc;
        }, initialAccumulator),
        new Map<string, string>([
          [
            "projektdetails",
            "Detailübersicht zum aktuell ausgewählten Projekt wo die einzelnen Vorgänge (Prozesse) des Projekts aufgelistet sind.",

          ], ["process-create", "Erstellt einen neuen Vorgang (Prozess) für das aktuelle Projekt. Wobei innerhalb des Prozesses dann z.B. ein 3D Modell erstellt werden kann von einem Gegenstand," +
          " oder ein vorhandenes 3D Modell gedruckt werden kann."],
        ])
    );
    if (userChoice && userChoice !== null) {
      // get process id of processess[userChoice -1 ]
        console.log("Process ID: ", processess[(userChoice - 1)].processID);
        const processID = processess[(userChoice - 1)].processID;
      // find <a> with data-button-id = processID and click it
        const button = document.querySelector(`a[data-button-id="${processID}"]`);
        if (button) {
          setUserChoice(null);
          button.click();
        }
    }

  }, [project.data?.processes, userChoice,setUserChoice]);

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
