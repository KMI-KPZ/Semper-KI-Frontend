import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { DownloadFileProps } from "@/pages/Projects/hooks/useProcess";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface useTestReturnProps {
  saveProjectsQuery: UseMutationResult<string, Error, void, unknown>;
  downloadFileMutation: UseMutationResult<string, Error, string, unknown>;
  downloadFileTest: UseMutationResult<
    string,
    Error,
    DownloadFileProps,
    unknown
  >;
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

  const downloadFileMutation = useMutation<string, Error, string>({
    mutationFn: async (url) => {
      return getCustomAxios()
        .get(url, { responseType: "blob" })
        .then((res) => {
          logger("useTest | downloadFileMutation ✅ |", res.data);
          const url = URL.createObjectURL(res.data);
          return url;
        });
    },
  });

  const downloadFileTest = useMutation<string, Error, DownloadFileProps>({
    mutationFn: async ({ processID, fileID }) => {
      return getCustomAxios()
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/downloadFile/${processID}/${fileID}`,
          { responseType: "blob" }
        )
        .then((res) => {
          return res.data;
        })
        .then((blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          // logger("useTest | downloadFileTest ✅ |", blob, url);
          return url;
        });
    },
  });

  const testDynamicQuery = useQuery<TestDynamicProps[], Error>(
    ["testDynamicQuery"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/dynamic/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useTest | testDynamicQuery ✅ |", response.data);
          return response.data.Buttons;
        });
    }
  );

  const dynamicButtonMutation = useMutation<string, Error, TestDynamicProps>({
    mutationFn: async ({ payload, action }) => {
      return getCustomAxios()
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
    downloadFileMutation,
    downloadFileTest,
    testDynamicQuery,
    dynamicButtonMutation,
  };
};

export default useTest;
