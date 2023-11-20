import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import usePathID from "@/hooks/usePathID";
import { ProjectProps, useProject } from "./useProject";
import {
  GeneralServiceProps,
  GerneralUpdateServiceProps,
} from "@/pages/Service/hooks/useService";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

interface ReturnProps {
  deleteProcess: UseMutationResult<string, Error, string, unknown>;
  createProcess: UseMutationResult<string, Error, void, unknown>;
  updateProcess: UseMutationResult<string, Error, UpdateProcessProps, unknown>;
  getCurrentProcess: (_processID?: string) => ProcessProps | undefined;
  updateProcessWithProcessID: UseMutationResult<
    string,
    Error,
    {
      processID: string;
      updates: UpdateProcessProps;
    },
    unknown
  >;
  updateProcessesWithProcessIDs: UseMutationResult<
    string,
    Error,
    {
      processIDs: string[];
      updates: UpdateProcessProps;
    },
    unknown
  >;
  getProcessQuery: (_processID?: string) => ProcessQueryProps;
  uploadFiles: UseMutationResult<string, Error, UplaodFilesProps, unknown>;
  downloadFile: UseMutationResult<Blob, Error, DownloadFileProps, unknown>;
  downloadFilesZIP: UseMutationResult<
    Blob,
    Error,
    DownloadFilesZIPProps,
    unknown
  >;
  deleteFile: UseMutationResult<string, Error, DeleteFileProps, unknown>;
}

export interface ProcessDetailsProps {
  title?: string;
}

export interface ProcessProps {
  messages: { messages: ChatMessageProps[] };
  contractor: string[];
  client: string;
  details: ProcessDetailsProps;
  files: FilesDescriptionProps[];
  service: GeneralServiceProps;
  status: ProcessStatus;
  serviceStatus: number;
  processID: string;
  created: Date;
  updated: Date;
}

export interface FilesDescriptionProps {
  createdBy: string;
  date: string;
  id: string;
  title: string;
}

export interface ChatMessageProps {
  userID: string;
  userName: string;
  date: string;
  text: string;
}

export interface UpdateProcessProps {
  changes?: ProcessChangesProps;
  deletions?: ProcessDeletionsProps;
}

export interface ProcessChangesProps {
  contractor?: string[];
  messages?: ChatMessageProps;
  status?: ProcessStatus;
  files?: File[];
  details?: ProcessDetailsProps;
  service?: GerneralUpdateServiceProps;
}

export interface ProcessDeletionsProps {
  messages?: "";
  status?: "";
  files?: "";
  details?: "";
  service?: string[] | "";
}

export interface UplaodFilesProps {
  processID: string;
  files: File[];
}

export interface DownloadFileProps {
  processID: string;
  fileID: string;
}
export interface DownloadFilesZIPProps {
  processID: string;
  fileIDs: string[];
}
export interface DeleteFileProps {
  processID: string;
  fileID: string;
}

export enum ProcessStatus {
  "DRAFT" = 0,
  "WAITING_FOR_OTHER_PROCESS" = 100,
  "SERVICE_READY" = 200,
  "SERVICE_IN_PROGRESS" = 201,
  "SERVICE_COMPLICATION" = 202,
  "CONTRACTOR_SELECTED" = 300,
  "VERIFYING" = 400,
  "VERIFIED" = 500,
  "REQUESTED" = 600,
  "CLARIFICATION" = 700,
  "CONFIRMED_BY_CONTRACTOR" = 800,
  "REJECTED_BY_CONTRACTOR" = 801,
  "CONFIRMED_BY_CLIENT" = 900,
  "REJECTED_BY_CLIENT" = 901,
  "PRODUCTION" = 1000,
  "DELIVERY" = 1100,
  "DISPUTE" = 1200,
  "COMPLETED" = 1300,
  "FAILED" = 1400,
  "CANCELED" = 1500,
}

interface ProcessQueryProps {
  process: ProcessProps | undefined;
  query: UseQueryResult<ProjectProps, Error>;
}

const useProcess = (): ReturnProps => {
  const queryClient = useQueryClient();
  const { projectID: URLProjectID, processID: URLProcessID } = useParams();
  const { project, projectQuery: query } = useContext(ProjectContext);

  const getProcessQuery = (_processID?: string): ProcessQueryProps => {
    return {
      process: project.processes.find(
        (process) =>
          process.processID ===
          (_processID === undefined ? URLProcessID : _processID)
      ),
      query,
    };
  };

  const getCurrentProcess = (_processID?: string): ProcessProps | undefined => {
    return project.processes.find(
      (process) =>
        process.processID ===
        (_processID === undefined ? URLProcessID : _processID)
    );
  };

  const createProcess = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProcessID/${URLProjectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useProcess | createProcess ✅ |", response.data);
        return response.data.processID;
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", URLProjectID]);
    },
  });

  const updateProcess = useMutation<string, Error, UpdateProcessProps>({
    mutationFn: async ({ changes = {}, deletions = {} }) => {
      return customAxios
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID: URLProjectID,
          processIDs: [URLProcessID],
          changes: changes,
          deletions: deletions,
        })
        .then((res) => {
          logger("useProcess | updateProcess ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", URLProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const updateProcessWithProcessID = useMutation<
    string,
    Error,
    { processID: string; updates: UpdateProcessProps }
  >({
    mutationFn: async (props: {
      processID: string;
      updates: UpdateProcessProps;
    }) => {
      const { updates, processID } = props;
      const { changes = {}, deletions = {} } = updates;
      return customAxios
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID: URLProjectID,
          processIDs: [processID],
          changes,
          deletions,
        })
        .then((res) => {
          logger("useProcess | updateProcess ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", URLProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const uploadFiles = useMutation<string, Error, UplaodFilesProps>({
    mutationFn: async ({ files, processID }) => {
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
          logger("useProcess | uploadFiles ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", URLProjectID]);
    },
  });

  const updateProcessesWithProcessIDs = useMutation<
    string,
    Error,
    { processIDs: string[]; updates: UpdateProcessProps }
  >({
    mutationFn: async (props: {
      processIDs: string[];
      updates: UpdateProcessProps;
    }) => {
      const { updates, processIDs } = props;
      const { changes = {}, deletions = {} } = updates;
      return customAxios
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID: URLProjectID,
          processIDs,
          changes,
          deletions,
        })
        .then((res) => {
          logger("useProcess | updateProcess ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", URLProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const deleteProcess = useMutation<string, Error, string>({
    mutationFn: async (processID: string) => {
      return customAxios
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteProcess/${URLProjectID}/`,
          { data: { processIDs: [processID] } }
        )
        .then((res) => {
          logger("useProcess | deleteProcess ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, processID, context) {
      queryClient.invalidateQueries(["project", URLProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const downloadFile = useMutation<Blob, Error, DownloadFileProps>({
    mutationFn: async ({ processID, fileID }) => {
      return customAxios
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/downloadFile/${processID}/${fileID}`,
          { responseType: "blob" }
        )
        .then((res) => {
          logger("useProcess | downloadFile ✅ |", res.data);
          return res.data;
        });
    },
  });

  const downloadFilesZIP = useMutation<Blob, Error, DownloadFilesZIPProps>({
    mutationFn: async ({ processID, fileIDs }) => {
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
          logger("useProcess | downloadFilesZIP ✅ |", res.data);
          return res.data;
        });
    },
  });
  const deleteFile = useMutation<string, Error, DeleteFileProps>({
    mutationFn: async ({ processID, fileID }) => {
      return customAxios
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteFile/${processID}/${fileID}`
        )
        .then((res) => {
          logger("useProcess | deleteFile ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", URLProjectID]);
    },
  });

  return {
    createProcess,
    deleteProcess,
    updateProcess,
    getCurrentProcess,
    getProcessQuery,
    updateProcessWithProcessID,
    updateProcessesWithProcessIDs,
    uploadFiles,
    downloadFile,
    downloadFilesZIP,
    deleteFile,
  };
};

export default useProcess;
