import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUser, { UserType } from "@/hooks/useUser";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ProjectDetailsProps } from "./useGetProject";

export interface DashboardProject {
  projectID: string;
  projectStatus: ProcessStatus;
  projectDetails: ProjectDetailsProps;
  client: string;
  createdWhen: Date;
  updatedWhen: Date;
  processes: Process[];
  accessedWhen: Date;
}

const useGetDashboardProject = (customProjectID?: string) => {
  const { projectID: paramProjectID } = useParams();

  const projectID =
    customProjectID !== undefined ? customProjectID : paramProjectID;
  const { user } = useUser();
  const getProject = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/project/dashboard/get/${projectID}/`
      )
      .then((response) => {
        const project: DashboardProject = {
          client: response.data.client,
          projectID: response.data.projectID,
          projectStatus: response.data.projectStatus,
          projectDetails: response.data.projectDetails,
          createdWhen: new Date(response.data.createdWhen),
          updatedWhen: new Date(response.data.updatedWhen),
          accessedWhen: new Date(response.data.accessedWhen),
          processes: response.data.processes.map(
            (process: any): Process => ({
              ...process,
              updatedWhen: new Date(process.updatedWhen),
              createdWhen: new Date(process.createdWhen),
              accessedWhen: new Date(process.accessedWhen),
              files: Object.values(process.files),
              serviceDetails: {
                groups: [
                  {
                    material: process.serviceDetails.material,
                    models: process.serviceDetails.models,
                    postProcessings: process.serviceDetails.postProcessings,
                    manufacturerID: process.serviceDetails.manufacturerID,
                  },
                ],
              },
              processDetails: process.processDetails,
              messages:
                Object.keys(process.messages).length === 0
                  ? []
                  : process.messages,
            })
          ),
        };
        logger("useGetDashboardProject | getDashboardProject ✅ |", response);
        return project;
      });

  return useQuery<DashboardProject, Error>({
    queryKey: ["project", projectID],
    queryFn: getProject,
    enabled:
      (paramProjectID !== undefined && user.usertype !== UserType.ADMIN) ||
      customProjectID !== undefined,
  });
};

export default useGetDashboardProject;
