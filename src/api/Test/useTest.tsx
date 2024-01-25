import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface useTestReturnProps {
  saveProjectsQuery: UseMutationResult<string, Error, void, unknown>;
  testDynamicQuery: UseQueryResult<TestDynamicProps[], Error>;
  dynamicButtonMutation: UseMutationResult<
    string,
    Error,
    TestDynamicProps,
    unknown
  >;
}

export interface TestDynamicProps {
  title: string;
  icon: string;
  action: string;
  payload: { number: number };
}

const useTest = (): useTestReturnProps => {
  const queryClient = useQueryClient();

  const saveProjectsQuery = useMutation<string, Error, void>({
    mutationFn: async () => {
      return authorizedCustomAxios
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

  const testDynamicQuery = useQuery<TestDynamicProps[], Error>(
    ["testDynamicQuery"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/dynamic/`;
      return authorizedCustomAxios.get(apiUrl).then((response) => {
        logger("useTest | testDynamicQuery ✅ |", response.data);
        return response.data.Buttons;
      });
    }
  );

  const dynamicButtonMutation = useMutation<string, Error, TestDynamicProps>({
    mutationFn: async ({ payload, action }) => {
      return authorizedCustomAxios
        .post(`${process.env.VITE_HTTP_API_URL}/${action}`, { payload })
        .then((res) => {
          logger("useTest | dynamicButtonMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, ProjectID, context) {
      queryClient.invalidateQueries(["testDynamicQuery"]);
    },
  });

  return {
    saveProjectsQuery,
    testDynamicQuery,
    dynamicButtonMutation,
  };
};

export default useTest;
