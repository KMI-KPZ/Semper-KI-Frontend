import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUser, { UserType } from "@/hooks/useUser";
import { Project, getProcessFiles } from "@/api/Project/Querys/useGetProject";
import { Process } from "@/api/Process/Querys/useGetProcess";

const useGetAdminProject = () => {
  const { projectID } = useParams();
  const { user } = useUser();
  const getSpecificProject = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/admin/getSpecificProjectAsAdmin/${projectID}/`
      )
      .then((response) => {
        const responseData = response.data;
        const project: Project = {
          client: responseData.client,
          projectID: responseData.projectID,
          projectStatus: responseData.status,
          projectDetails: responseData.details,
          createdWhen: new Date(responseData.createdWhen),
          updatedWhen: new Date(responseData.updatedWhen),
          processes: responseData.processes.map(
            (process: any): Process => ({
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
              files: getProcessFiles(process.files),
              accessedWhen: new Date(process.accessedWhen),
              processStatusButtons: process.processStatusButtons,
            })
          ),
        };

        logger("useGetAdminProject | getSpecificProject ✅ |", response);
        return project;
      });

  return useQuery<Project, Error>({
    queryKey: ["admin", "project", projectID],
    queryFn: getSpecificProject,
    enabled: projectID !== undefined && user.usertype === UserType.ADMIN,
  });
};

export default useGetAdminProject;
