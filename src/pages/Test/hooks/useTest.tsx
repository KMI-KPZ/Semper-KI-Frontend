import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface useTestReturnProps {
  safeProjectsQuery: UseMutationResult<string, Error, void, unknown>;
}

const useTest = (): useTestReturnProps => {
  const queryClient = useQueryClient();

  const safeProjectsQuery = useMutation<string, Error, void>({
    mutationFn: async () => {
      return getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/safeProject/`)
        .then((res) => {
          logger("useTest | safeProject ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, ProjectID, context) {
      queryClient.invalidateQueries(["project", ProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  return { safeProjectsQuery };
};

export default useTest;
