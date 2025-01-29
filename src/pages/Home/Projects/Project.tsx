import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import HomeProcess from "./Process";
import useGetDashboardProject from "@/api/Project/Querys/useGetDashboardProject";
import { Process } from "@/api/Process/Querys/useGetProcess";

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

  // const sortProcesses2 = (processes: Process[]): Process[] => {
  //   const processMap = new Map(); // Map to store processes by ID
  //   const inDegree = new Map(); // Map to store in-degrees of each process
  //   const result = [];
  //   let hasCircularDependency = false;

  //   // Initialize processMap and inDegree
  //   processes.forEach((process) => {
  //     processMap.set(process.processID, process);
  //     inDegree.set(process.processID, 0);
  //   });

  //   // Build the dependency graph and calculate in-degrees
  //   processes.forEach((process) => {
  //     process.dependenciesOut.forEach((depID) => {
  //       if (processMap.has(depID)) {
  //         inDegree.set(depID, inDegree.get(depID) + 1);
  //       }
  //     });
  //   });

  //   // Priority queue to store processes with no incoming dependencies
  //   const priorityQueue: Process[] = [];
  //   processes.forEach((process) => {
  //     if (inDegree.get(process.processID) === 0) {
  //       priorityQueue.push(process);
  //     }
  //   });

  //   // Sort the priority queue by updatedWhen (newest first)
  //   priorityQueue.sort(
  //     (a, b) => b.updatedWhen.getTime() - a.updatedWhen.getTime()
  //   );

  //   // Process the graph using Kahn's Algorithm
  //   while (priorityQueue.length > 0) {
  //     const current = priorityQueue.shift(); // Get the next process
  //     result.push(current);

  //     // Reduce in-degree for outgoing dependencies
  //     current?.dependenciesOut.forEach((depID) => {
  //       if (processMap.has(depID)) {
  //         inDegree.set(depID, inDegree.get(depID) - 1);
  //         if (inDegree.get(depID) === 0) {
  //           priorityQueue.push(processMap.get(depID));

  //           // Re-sort the priority queue by updatedWhen
  //           priorityQueue.sort(
  //             (a, b) => b.updatedWhen.getTime() - a.updatedWhen.getTime()
  //           );
  //         }
  //       }
  //     });
  //   }

  //   // Check for circular dependencies
  //   if (result.length < processes.length) {
  //     hasCircularDependency = true;
  //   }

  //   // Call setCircleDependency if circular dependencies are detected
  //   setHasCircularDependency(hasCircularDependency);

  //   return result.filter(
  //     (process): process is Process => process !== undefined
  //   );
  // };

  return (
    <tr className="m-0 p-0">
      <td colSpan={4} className="m-0  p-0">
        <Container
          width="full"
          direction="col"
          className="gap-0  rounded-md border-2 border-t-0 border-gray-300 p-0"
        >
          {project.data.processes.length > 0 ? (
            sortProcesses(project.data.processes).map((process) => (
              <React.Fragment key={process.processID}>
                <HomeProcess
                  project={project.data}
                  process={process}
                  owner={owner}
                />
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <>
              <Container
                width="full"
                direction="col"
                justify="start"
                className="m-0  py-5"
              >
                <Text>{t("Home.Projects.Project.noProcess")}</Text>
              </Container>
              <Divider />
            </>
          )}
          <Button
            title={t("Home.Projects.Project.button.new")}
            onClick={handleOnClickButtonNew}
            className="my-5"
            size="sm"
            variant="primary"
          />
        </Container>
      </td>
    </tr>
  );
};

export default HomeProject;
