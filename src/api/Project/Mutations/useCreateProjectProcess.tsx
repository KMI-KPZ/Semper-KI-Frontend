import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";

interface CreateProcessProps {
  projectID: string;
  serviceType?: ServiceType;
}

const useCreateProjectProcess = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateProcess = useUpdateProcess();

  const createProjectProcess = async ({ projectID }: CreateProcessProps) =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/create/${projectID}/`
      )
      .then((response) => {
        logger("useCreateProjectProcess | createProjectProcess ✅ |", response);
        return response.data.processID;
      })
      .catch((error) => {
        logger("useCreateProjectProcess | createProjectProcess ❌ |", error);
      });

  return useMutation<string, Error, CreateProcessProps>({
    mutationFn: createProjectProcess,
    onSuccess: (newProcessID, props) => {
      if (props.serviceType !== undefined) {
        updateProcess.mutate(
          {
            processIDs: [newProcessID],
            projectID: props.projectID,
            updates: { changes: { serviceType: props.serviceType } },
          },
          {
            onSuccess: () => {
              navigate(`/projects/${props.projectID}/${newProcessID}`);
            },
          }
        );
      } else {
        queryClient.invalidateQueries(["dashboardProject"]);
        queryClient.invalidateQueries(["project", props.projectID]);
        navigate(`/projects/${props.projectID}/${newProcessID}`);
      }
    },
  });
};

export default useCreateProjectProcess;
