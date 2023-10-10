import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

interface ReturnProps {
  verifyProject: UseMutationResult<any, Error, VerificationProps, unknown>;
}

export interface VerificationProps {
  projectID: string;
  processIDs: string[];
  send: boolean;
}

const useVerification = (): ReturnProps => {
  const queryClient = useQueryClient();

  const verifyProject = useMutation<any, Error, VerificationProps>({
    mutationFn: async (props) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/verifyProject/`;
      return getCustomAxios()
        .patch(url, {
          ...props,
        })
        .then((response) => {
          logger("useVerification | verifyProject ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", variables.projectID]);
    },
  });

  return { verifyProject };
};

export default useVerification;
