import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import useCreateProjectProcess from "./useCreateProjectProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface CreateProjectPropsChatbot {
  title: string;
  serviceType?: ServiceType;
  processName?: string;
  materialCategory?: string;
  amount?: number;
  description?: string;
}

const useCreateProject = () => {
  const createProjectProcess = useCreateProjectProcess();

  const createProject = async ({ title }: CreateProjectPropsChatbot) =>
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

  return useMutation<string, Error, CreateProjectPropsChatbot>({
    mutationFn: createProject,
    onSuccess: (projectID, props) => {
      createProjectProcess.mutate({ projectID, serviceType: props.serviceType });
    },
  });
};

export default useCreateProject;
