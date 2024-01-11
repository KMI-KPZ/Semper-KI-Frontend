import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  DeleteFileProps,
  DownloadFileProps,
  DownloadFilesZIPProps,
  UpdateProcessProps,
  UplaodFilesProps,
} from "@/pages/Projects/hooks/useProcess";
import { useProject } from "@/pages/Projects/hooks/useProject";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface useProcessMutationsReturnProps {
  createProcessMutation: UseMutationResult<string, Error, void, unknown>;
  updateProcessMutation: UseMutationResult<
    string,
    Error,
    UpdateProcessMutationProps,
    unknown
  >;
  deleteProcessMutation: UseMutationResult<
    string,
    Error,
    MultipleProcessMutationProps,
    unknown
  >;
  uploadFilesMutation: UseMutationResult<
    string,
    Error,
    UploadFilesMutationProps,
    unknown
  >;
  downloadFileMutation: UseMutationResult<
    Blob,
    Error,
    DownloadFileMutationProps,
    unknown
  >;
  downloadZIPMutation: UseMutationResult<
    Blob,
    Error,
    DownloadZIPMutationProps,
    unknown
  >;
  deleteFileMutation: UseMutationResult<
    string,
    Error,
    DeleteFileMutationProps,
    unknown
  >;
}

export type MultipleProcessMutationProps = {
  processIDs: string[];
};

export type SingleProcessMutationProps = {
  processID: string;
};

export type UpdateProcessMutationProps = {
  updates: UpdateProcessProps;
} & MultipleProcessMutationProps;

export type DeleteProcessMutationProps = MultipleProcessMutationProps;

export type UploadFilesMutationProps = {
  files: File[];
} & SingleProcessMutationProps;

export type DownloadFileMutationProps = {
  fileID: string;
} & SingleProcessMutationProps;

export type DownloadZIPMutationProps = {
  fileIDs: string[];
} & SingleProcessMutationProps;

export type DeleteFileMutationProps = {
  fileID: string;
} & SingleProcessMutationProps;

const useProcessMutations = (): useProcessMutationsReturnProps => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const { project } = useProject();
  const navigate = useNavigate();
  const { processID } = useParams();

  const createProcessMutation = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProcessID/${projectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useProcess | createProcessMutation ✅ |", response.data);
        return response.data.processID;
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", projectID]);
      navigate(`${processID === undefined ? "" : "../"}${data}`);
    },
  });

  const updateProcessMutation = useMutation<
    string,
    Error,
    UpdateProcessMutationProps
  >({
    mutationFn: async (props) => {
      const { updates, processIDs } = props;
      const { changes = {}, deletions = {} } = updates;
      return customAxios
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID,
          processIDs,
          changes,
          deletions,
        })
        .then((res) => {
          logger("useProcessMutations | updateProcessMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const deleteProcessMutation = useMutation<
    string,
    Error,
    DeleteProcessMutationProps
  >({
    mutationFn: async (props) => {
      const { processIDs } = props;
      return customAxios
        .delete(
          `${
            process.env.VITE_HTTP_API_URL
          }/public/deleteProcesses/${projectID}/?processIDs=${processIDs.join(
            ","
          )}`
        )
        .then((res) => {
          logger("useProcessMutations | deleteProcessMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, processID, context) {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const uploadFilesMutation = useMutation<
    string,
    Error,
    UploadFilesMutationProps
  >({
    mutationFn: async (props) => {
      const { files, processID } = props;
      const formData = new FormData();
      files.forEach((file) => formData.append(file.name, file));
      formData.append("processID", processID);
      formData.append("projectID", project.projectID);
      return customAxios
        .post(
          `${process.env.VITE_HTTP_API_URL}/public/uploadFiles/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          logger("useProcessMutations | uploadFilesMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });

  const downloadFileMutation = useMutation<
    Blob,
    Error,
    DownloadFileMutationProps
  >({
    mutationFn: async (props) => {
      const { processID, fileID } = props;
      return customAxios
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/downloadFile/${processID}/${fileID}`,
          { responseType: "blob" }
        )
        .then((res) => {
          logger("useProcessMutations | downloadFileMutation ✅ |", res.data);
          return res.data;
        });
    },
  });

  const downloadZIPMutation = useMutation<
    Blob,
    Error,
    DownloadZIPMutationProps
  >({
    mutationFn: async (props) => {
      const { processID, fileIDs } = props;
      return customAxios
        .get(
          `${
            process.env.VITE_HTTP_API_URL
          }/public/downloadFilesAsZip/${processID}?fileIDs=${fileIDs.join(
            ","
          )}`,
          { responseType: "blob" }
        )
        .then((res) => {
          logger(
            "useProcessMutations | downloadFilesZIPMutation ✅ |",
            res.data
          );
          return res.data;
        });
    },
  });

  const deleteFileMutation = useMutation<
    string,
    Error,
    DeleteFileMutationProps
  >({
    mutationFn: async (props) => {
      const { processID, fileID } = props;
      return customAxios
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteFile/${processID}/${fileID}`
        )
        .then((res) => {
          logger("useProcessMutations | deleteFileMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });

  return {
    createProcessMutation,
    deleteFileMutation,
    deleteProcessMutation,
    downloadFileMutation,
    downloadZIPMutation,
    updateProcessMutation,
    uploadFilesMutation,
  };
};

export default useProcessMutations;
