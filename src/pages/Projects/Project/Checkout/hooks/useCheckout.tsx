import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface ReturnProps {
  sendProject: UseMutationResult<any, Error, CheckoutProps, unknown>;
}

export interface CheckoutProps {
  projectID: string;
  processIDs: string[];
}

const useCheckout = (): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const sendProject = useMutation<any, Error, CheckoutProps>({
    mutationFn: async ({ projectID, processIDs }) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/sendProject/`;
      return getCustomAxios()
        .patch(url, {
          projectID,
          processIDs,
        })
        .then((response) => {
          logger("useCheckout | sendProject ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", variables.projectID]);
      navigate(`/projects/${variables.projectID}/${variables.processIDs[0]}`);
    },
  });

  return { sendProject };
};

export default useCheckout;
