import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import ProcessHistory from "@/pages/Projects/Project/Process/History/History";
import {
  ChatMessageProps,
  FileProps,
  FilesDescriptionProps,
} from "@/pages/Projects/hooks/useProcess";
import { ProcessStatusType } from "@/pages/Service/Manufacturing/Header/types";
import { ServiceProps } from "@/pages/Service/hooks/useService";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface useProcessQuerysReturnProps {
  processHistoryQuery: UseQueryResult<HistoryProps[], Error>;
}

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

const useProcessQuerys = (): useProcessQuerysReturnProps => {
  const { projectID, processID } = useParams();

  const processHistoryQuery = useQuery<HistoryProps[], Error>({
    queryKey: ["project", projectID, processID, "history"],
    queryFn: async (props) =>
      authorizedCustomAxios
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/getProcessHistory/${processID}`
        )
        .then((response) => {
          const history: HistoryProps[] = response.data.history.map(
            (historyItem: any) => ({
              createdBy: historyItem.createdBy,
              createdWhen: new Date(historyItem.createdWhen),
              type: historyItem.type,
              data: historyItem.data,
            })
          );
          logger("useProcessQuerys | processHistoryQuery ✅ |", history);
          return history;
        }),
  });
  return { processHistoryQuery };
};

export default useProcessQuerys;
