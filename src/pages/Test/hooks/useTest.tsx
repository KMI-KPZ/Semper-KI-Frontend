import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { DownloadFileProps } from "@/pages/Projects/hooks/useProcess";
import {
  UseMutationResult,
  useMutation,
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

  return { saveProjectsQuery, downloadFileMutation, downloadFileTest };
};

export default useTest;
