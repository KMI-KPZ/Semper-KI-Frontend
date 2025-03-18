import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import HomeProcess from "./Process";
import useGetDashboardProject from "@/api/Project/Querys/useGetDashboardProject";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { gradientStyle } from "@component-library/Container/GrayContainer";

interface HomeProjectProps {
  projectID: string;
  owner: boolean;
}

const HomeProject: React.FC<HomeProjectProps> = (props) => {
  const { projectID, owner } = props;
  const { t } = useTranslation();
  // const project = useGetProject(projectID);
  const project = useGetDashboardProject(projectID);
  const createProcess = useCreateProcess();
  // const [hasCircularDependency, setHasCircularDependency] = useState(false);

  const handleOnClickButtonNew = () => {
    createProcess.mutate(projectID);
  };

  if (project.isLoading || project.isRefetching || project.data === undefined)
    return (
      <tr className="m-0 p-0">
        <td colSpan={4} className="m-0 p-0">
          <Container width="full" direction="col" className=" p-2">
            <LoadingAnimation />
          </Container>
        </td>
      </tr>
    );

  const sortProcesses = (processes: Process[]): Process[] => {
    // Create a map for quick lookup of processes by their ID
    const processMap = new Map<string, Process>();
    processes.forEach((process) => processMap.set(process.processID, process));

    // Sort processes topologically based on dependencies and updatedWhen
    const sorted: Process[] = [];
    const visited = new Set<string>();

    const dfs = (process: Process) => {
      if (visited.has(process.processID)) return;
      visited.add(process.processID);

      // First, visit all dependencies (dependenciesIn)
      for (const dependencyID of process.dependenciesIn) {
        const dependency = processMap.get(dependencyID);
        if (dependency) {
          dfs(dependency);
        }
      }

      // Add the current process to the sorted array
      sorted.push(process);
    };

    // Start DFS for each process, prioritizing those with the newest updatedWhen first
    const processesSortedByTime = [...processes].sort(
      (a, b) => b.updatedWhen.getTime() - a.updatedWhen.getTime()
    );

    for (const process of processesSortedByTime) {
      dfs(process);
    }

    return sorted;
  };

  return (
    <tr className="m-0 p-0" style={gradientStyle}>
      <td colSpan={4} className="m-0 rounded-md rounded-t-none  p-5">
        <Container
          width="full"
          direction="col"
          className="gap-5 p-0 text-black"
        >
          {project.data.processes.length > 0 ? (
            sortProcesses(project.data.processes).map((process) => (
              <React.Fragment key={process.processID}>
                <HomeProcess
                  project={project.data}
                  process={process}
                  owner={owner}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <Container
                width="full"
                direction="col"
                justify="start"
                className="m-0 bg-white py-5"
              >
                <Text>{t("Home.Projects.Project.noProcess")}</Text>
              </Container>
            </>
          )}
          {owner ? (
            <Button
              title={t("Home.Projects.Project.button.new")}
              onClick={handleOnClickButtonNew}
              className=""
              size="sm"
              variant="secondary"
            />
          ) : null}
        </Container>
      </td>
    </tr>
  );
};

export default HomeProject;
