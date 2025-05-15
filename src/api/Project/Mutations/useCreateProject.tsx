import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import useCreateProjectProcess from "./useCreateProjectProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface CreateProjectProps {
  title: string;
  serviceType?: ServiceType;
  onProjectSuccess?: (projectID: string, processID: string) => void;
}

const useCreateProject = () => {
  const createProjectProcess = useCreateProjectProcess();

  const createProject = async ({ title }: CreateProjectProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/project/create/`, {
        title,
      })
      .then((response) => {
        logger("useCreateProject | createProject ✅ |", response);
        return response.data.projectID;
      })
      .catch((error) => {
        logger("useCreateProject | createProject ❌ |", error);
      });

  return useMutation<string, Error, CreateProjectProps>({
    mutationFn: createProject,
    onSuccess: (projectID, props) => {
      createProjectProcess.mutate({ projectID, serviceType: props.serviceType , onProjectSuccess: props.onProjectSuccess}, );
    },
  });
};

export default useCreateProject;
