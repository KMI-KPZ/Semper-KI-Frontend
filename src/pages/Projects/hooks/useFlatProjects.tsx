import { getCustomAxios } from "@/hooks/useCustomAxios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import { t } from "i18next";
import { ProjectDetailsProps } from "./useProject";
import { ProcessStatus } from "./useProcess";

interface ReturnProps {
  flatProjectsQuery: UseQueryResult<FlatProjectProps[], Error>;
}

export interface FlatProjectProps {
  projectID: string;
  client: string;
  created: Date;
  updated: Date;
  details: ProjectDetailsProps;
  status: ProcessStatus;
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

export const useFlatProjects = (): ReturnProps => {
  const flatProjectsQuery = useQuery<FlatProjectProps[], Error>(
    ["flatProjects"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getFlatProjects/`; //TODO change when path changes
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useFlatProjects | flatProjectsQuery ✅ |", response.data);
          return response.data.projects.map((project: any, index: number) => {
            if (isFlatProject(project)) {
              return {
                ...project,
                created: new Date(project.created),
                updated: new Date(project.updated),
              };
            } else {
              logger("useFlatProjects | flatProjectsQuery ❌ |", project);
              return {
                projectID:
                  project.projectID === undefined
                    ? "errorProjectID"
                    : project.projectID,
                client:
                  project.client === undefined ? "errorClient" : project.client,
                created:
                  project.created === undefined
                    ? new Date()
                    : new Date(project.created),
                updated:
                  project.updated === undefined
                    ? new Date()
                    : new Date(project.updated),
                details:
                  project.details === undefined
                    ? {
                        title: "errorName",
                        description: "errorDescription",
                        items: [],
                      }
                    : project.details,
                status:
                  project.status === undefined
                    ? ProcessStatus.DRAFT
                    : project.status,
                processesCount:
                  project.processesCount === undefined
                    ? 0
                    : project.processesCount,
              };
            }
          });
        });
    }
  );

  return {
    flatProjectsQuery,
  };
};
