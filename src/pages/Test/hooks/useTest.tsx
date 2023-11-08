import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface useTestReturnProps {
  saveProjectsQuery: UseMutationResult<string, Error, void, unknown>;
}

const useTest = (): useTestReturnProps => {
  const queryClient = useQueryClient();

  const saveProjectsQuery = useMutation<string, Error, void>({
    mutationFn: async () => {
      return getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/saveProjects/`)
        .then((res) => {
          logger("useTest | saveProjects ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, ProjectID, context) {
      queryClient.invalidateQueries(["project", ProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  return { saveProjectsQuery };
};

export default useTest;
