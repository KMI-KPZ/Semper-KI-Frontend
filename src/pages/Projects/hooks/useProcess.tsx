import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
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
}

export interface ProcessDetailsProps {
  title?: string;
}

export interface ProcessProps {
  messages: { messages: ChatMessageProps[] };
  contractor: string[];
  client: string;
  created: Date;
  details: ProcessDetailsProps;
  files: string[];
  service: GeneralServiceProps;
  status: ProcessStatus;
  serviceStatus: number;
  processID: string;
  updated: string;
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

export enum ProcessStatus {
  "DRAFT" = 0,
  "WAITING_FOR_OTHER_PROCESS" = 100,
  "SERVICE_READY" = 200,
  "SERVICE_COMPLICATION" = 201,
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
  projectQuery: UseQueryResult<ProjectProps, Error>;
}

const useProcess = (): ReturnProps => {
  const queryClient = useQueryClient();
  const { projectID, processID } = useParams();
  const { project } = useContext(ProjectContext);
  const { projectQuery } = useProject();
  const navigate = useNavigate();

  const getProcessQuery = (_processID?: string): ProcessQueryProps => {
    return {
      process: project.processes.find(
        (process) =>
          process.processID ===
          (_processID === undefined ? processID : _processID)
      ),
      projectQuery,
    };
  };

  const getCurrentProcess = (_processID?: string): ProcessProps | undefined => {
    return project.processes.find(
      (process) =>
        process.processID ===
        (_processID === undefined ? processID : _processID)
    );
  };

  const createProcess = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProcessID/${projectID}/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useProcess | createProcess ✅ |", response.data);
          return response.data.processID;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", projectID]);
    },
  });

  const updateProcess = useMutation<string, Error, UpdateProcessProps>({
    mutationFn: async ({ changes = {}, deletions = {} }) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID,
          processIDs: [processID],
          changes: changes,
          deletions: deletions,
        })
        .then((res) => {
          logger("useProcess | updateProcess ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
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
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID,
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
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const uploadFiles = useMutation<string, Error, UplaodFilesProps>({
    mutationFn: async ({ files, processID }) => {
      const formData = new FormData();
      files.forEach((file) => formData.append(file.name, file));
      formData.append("processID", processID);
      formData.append("projectID", project.projectID);
      return getCustomAxios()
        .post(`${process.env.VITE_HTTP_API_URL}/public/uploadFiles/`, formData)
        .then((res) => {
          logger("useProcess | uploadFiles ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
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
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
          projectID,
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
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const deleteProcess = useMutation<string, Error, string>({
    mutationFn: async (processID: string) => {
      return getCustomAxios()
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteProcess/${projectID}/${processID}/`
        )
        .then((res) => {
          logger("useProcess | deleteProcess ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, processID, context) {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
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
  };
};

export default useProcess;
