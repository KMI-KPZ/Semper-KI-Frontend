import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ChatMessageProps, FileProps } from "./useGetProcess";
import { ServiceProps } from "@/api/Service/Querys/useGetServices";

export enum ProcessHistoryType {
  CREATION = 1,
  STATUS = 2,
  MESSAGE = 3,
  FILE = 4,
  DELETION = 5,
  DETAILS = 6,
  OTHER = 7,
}

export type HistoryProps = {
  createdBy: string;
  createdWhen: Date;
} & (
  | ProcessHistoryCREATION
  | ProcessHistorySTATUS
  | ProcessHistoryMESSAGE
  | ProcessHistoryFILE
  | ProcessHistoryDELETION
  | ProcessHistoryDETAILS
  | ProcessHistoryOTHER
);

export type ProcessHistoryCREATION = {
  type: ProcessHistoryType.CREATION;
  data: {};
};
export type ProcessHistorySTATUS = {
  type: ProcessHistoryType.STATUS;
  data: ProcessStatusType;
};
export type ProcessHistoryMESSAGE = {
  type: ProcessHistoryType.MESSAGE;
  data: ChatMessageProps;
};
export type ProcessHistoryFILE = {
  type: ProcessHistoryType.FILE;
  data: FileProps;
};
export type ProcessHistoryDELETION = {
  type: ProcessHistoryType.DELETION;
  data: {};
};
export type ProcessHistoryDETAILS = {
  type: ProcessHistoryType.DETAILS;
  data: ServiceProps;
};
export type ProcessHistoryOTHER = {
  type: ProcessHistoryType.OTHER;
  data: any;
};

const useGetProcessHistory = () => {
  const queryClient = useQueryClient();
  const { projectID, processID } = useParams();

  const getProcessHistory = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/getProcessHistory/${processID}`
      )
      .then((response) => {
        const responseData = response.data;
        const history: HistoryProps[] = responseData.history.map(
          (historyItem: any) => ({
            createdBy: historyItem.createdBy,
            createdWhen: new Date(historyItem.createdWhen),
            type: historyItem.type,
            data: historyItem.data,
          })
        );
        logger("useGetProcessHistory | getProcessHistory ✅ |", response);
        return history;
      });

  return useQuery<HistoryProps[], Error>({
    queryKey: ["project", projectID, processID, "history"],
    queryFn: getProcessHistory,
    enabled: processID !== undefined && projectID !== undefined,
  });
};

export default useGetProcessHistory;
