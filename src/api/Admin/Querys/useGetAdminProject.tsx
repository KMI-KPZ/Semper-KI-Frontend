import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectFiles } from "@/api/Project/useProjectQuerys";
import { ProjectProps } from "@/pages/Projects/hooks/useProject";
import useUser, { UserType } from "@/hooks/useUser";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";

const useGetAdminProject = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const { user } = useUser();
  const getSpecificProject = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/admin/getSpecificProjectAsAdmin/${projectID}/`
      )
      .then((response) => {
        const responseData = response.data;
        const project: ProjectProps = {
          client: responseData.client,
          projectID: responseData.projectID,
          projectStatus: responseData.status,
          projectDetails: responseData.details,
          createdWhen: new Date(responseData.createdWhen),
          updatedWhen: new Date(responseData.updatedWhen),
          processes: responseData.processes.map(
            (process: any): ProcessProps => ({
              client: process.client,
              processDetails: process.processDetails,
              processID: process.processID,
              processStatus: process.processStatus,
              serviceDetails: process.serviceDetails,
              serviceStatus: process.serviceStatus,
              serviceType: process.serviceType,
              messages: process.messages.messages,
              contractor: process.contractor,
              createdWhen: new Date(process.createdWhen),
              updatedWhen: new Date(process.updatedWhen),
              files: getProjectFiles(process.files),
            })
          ),
        };

        logger("useGetAdminProject | getSpecificProject ✅ |", response);
        return project;
      });

  return useQuery<ProjectProps, Error>({
    queryKey: ["admin", "project", projectID],
    queryFn: getSpecificProject,
    enabled: projectID !== undefined && user.usertype === UserType.ADMIN,
  });
};

export default useGetAdminProject;
