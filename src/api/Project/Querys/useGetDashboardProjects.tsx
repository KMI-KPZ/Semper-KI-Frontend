import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ProjectDetailsProps } from "./useGetProject";

export interface DashboardProject {
  projectID: string;
  projectTitle: string;
  client: string;
  projectStatus: ProcessStatus;
  createdWhen: Date;
  updatedWhen: Date;
  projectDetails: ProjectDetailsProps;
  processesCount: number;
}

export const isDashboardProject = (
  project: any
): project is DashboardProject => {
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

const useGetDashboardProjects = () => {
  const { user } = useUser();
  const getDashboardProject = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/project/dashboard/all/get/`,
        {
          headers: { Accept: "application/json; version=0.3" },
        }
      )
      .then((response) => {
        const responseData = response.data;
        const DashboardProject: DashboardProject[] = responseData.projects.map(
          (project: any): DashboardProject => ({
            client: project.client,
            projectID: project.projectID,
            projectStatus: project.projectStatus,
            projectDetails: project.projectDetails,
            processesCount: project.processesCount,
            createdWhen: new Date(project.createdWhen),
            projectTitle:
              project.projectDetails.title === undefined
                ? "Projekt ohne Titel"
                : project.projectDetails.title,
            updatedWhen: new Date(project.updatedWhen),
          })
        );

        logger("useGetDashboardProject | getDashboardProject ✅ |", response);
        return DashboardProject;
      });

  return useQuery<DashboardProject[], Error>({
    queryKey: ["dashboardProject"],
    queryFn: getDashboardProject,
    enabled: user.usertype !== UserType.ADMIN,
  });
};

export default useGetDashboardProjects;
