import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
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
  accessedWhen: Date;
  contentID: string;
  createdBy: string;
  createdWhen: Date;
  data: {};
  dataID: string;
  details: Object;
  type: ProcessHistoryType;
  updatedWhen: Date;
};

const useProcessQuerys = (): useProcessQuerysReturnProps => {
  const { projectID, processID } = useParams();

  const processHistoryQuery = useQuery<HistoryProps[], Error>({
    queryKey: ["project", projectID, processID, "history"],
    queryFn: async (props) =>
      customAxios
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/getProcessHistory/${processID}`
        )
        .then((response) => {
          const history: HistoryProps[] = response.data.history.map(
            (historyItem: any) => ({
              createdWhen: new Date(historyItem.createdWhen),
              accessedWhen: new Date(historyItem.accessedWhen),
              updatedWhen: new Date(historyItem.updatedWhen),
              createdBy: historyItem.createdBy,
              type: historyItem.type,
              contentID: historyItem.contentID,
              data: historyItem.data,
              dataID: historyItem.dataID,
              details: historyItem.details,
            })
          );
          logger("useProcessQuerys | processHistoryQuery ✅ |", history);
          return history;
        }),
  });
  return { processHistoryQuery };
};

export default useProcessQuerys;
