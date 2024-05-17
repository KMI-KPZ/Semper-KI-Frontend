import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";
import { ProjectDetailsProps } from "@/pages/Projects/hooks/useProject";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";

export interface FlatProject {
  projectID: string;
  client: string;
  projectStatus: ProcessStatus;
  createdWhen: Date;
  updatedWhen: Date;
  projectDetails: ProjectDetailsProps;
  processesCount: number;
}

export const isFlatProject = (project: any): project is FlatProject => {
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

const useGetFlatProjects = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const getFlatProjects = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getFlatProjects/`)
      .then((response) => {
        const responseData = response.data;
        const flatProjects: FlatProject[] = responseData.projects.map(
          (project: any, index: number): FlatProject => ({
            client: project.client,
            projectID: project.projectID,
            projectStatus: project.projectStatus,
            projectDetails: project.projectDetails,
            processesCount: project.processesCount,
            createdWhen: new Date(project.createdWhen),
            updatedWhen: new Date(project.updatedWhen),
          })
        );

        logger("useGetFlatProjects | getFlatProjects ✅ |", response);
        return flatProjects;
      });

  return useQuery<FlatProject[], Error>({
    queryKey: ["flatProjects"],
    queryFn: getFlatProjects,
    enabled: user.usertype !== UserType.ADMIN,
  });
};

export default useGetFlatProjects;
