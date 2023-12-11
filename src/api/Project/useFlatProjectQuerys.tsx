import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { ProjectDetailsProps } from "@/pages/Projects/hooks/useProject";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface useFlatProjectQuerysReturnProps {
  flatProjectsQuery: UseQueryResult<FlatProjectProps[], Error>;
}

export interface FlatProjectProps {
  projectID: string;
  client: string;
  status: ProcessStatus;
  created: Date;
  updated: Date;
  details: ProjectDetailsProps;
  processesCount: number;
}

export const isFlatProject = (project: any): project is FlatProjectProps => {
  return (
    "projectID" in project &&
    project.projectID !== undefined &&
    typeof project.projectID === "string" &&
    "client" in project &&
    project.client !== undefined &&
    typeof project.client === "string" &&
    "created" in project &&
    project.created !== undefined &&
    typeof project.created === "string" &&
    "updated" in project &&
    project.updated !== undefined &&
    typeof project.updated === "string" &&
    "details" in project &&
    project.details !== undefined &&
    "status" in project &&
    project.status !== undefined &&
    "processesCount" in project &&
    project.processesCount !== undefined &&
    typeof project.processesCount === "number"
  );
};

const useFlatProjectQuerys = (): useFlatProjectQuerysReturnProps => {
  const flatProjectsQuery = useQuery<FlatProjectProps[], Error>(
    ["flatProjects"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getFlatProjects/`; //TODO change when path changes
      return customAxios.get(apiUrl).then((response) => {
        logger("useFlatProjects | flatProjectsQuery ✅ |", response.data);
        return response.data.projects.map(
          (project: any, index: number): FlatProjectProps => ({
            client: project.client,
            projectID: project.projectID,
            status: project.status,
            details: project.details,
            processesCount: project.processesCount,
            created: new Date(project.createdWhen),
            updated: new Date(project.updatedWhen),
          })
        );
      });
    }
  );
  return { flatProjectsQuery };
};

export default useFlatProjectQuerys;
