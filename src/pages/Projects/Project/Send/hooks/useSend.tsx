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
  sendProject: UseMutationResult<any, Error, SendProps, unknown>;
}

export interface SendProps {
  projectID: string;
  processIDs: string[];
}

const useSend = (): ReturnProps => {
  const queryClient = useQueryClient();

  const sendProject = useMutation<any, Error, SendProps>({
    mutationFn: async (props) => {
      const url = `${process.env.VITE_HTTP_API_URL}/public/sendProject/`;
      return getCustomAxios()
        .patch(url, {
          ...props,
        })
        .then((response) => {
          logger("useSend | sendProject ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", variables.projectID]);
    },
  });

  return { sendProject };
};

export default useSend;
