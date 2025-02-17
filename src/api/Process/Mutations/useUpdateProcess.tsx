import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MultipleProcessMutationProps } from "../types";
import {
  ProcessChangesProps,
  ProcessDeletionsProps,
} from "../Querys/useGetProcess";

export interface UpdateProcessProps {
  changes?: ProcessChangesProps;
  deletions?: ProcessDeletionsProps;
}

export type UpdateProcessMutationProps = {
  projectID?: string;
  updates: UpdateProcessProps;
} & MultipleProcessMutationProps;

const useUpdateProcess = () => {
  const queryClient = useQueryClient();
  const { projectID: paramProjectID } = useParams();
  const updateProcess = async ({
    processIDs,
    projectID: customProjectID,
    updates,
  }: UpdateProcessMutationProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/process/update/`, {
        projectID:
          customProjectID !== undefined ? customProjectID : paramProjectID,
        processIDs,
        changes: updates.changes,
        deletions: updates.deletions,
      })
      .then((response) => {
        logger("useUpdateProcess | updateProcess ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateProcess | updateProcess ❌ |", error);
      });

  return useMutation<string, Error, UpdateProcessMutationProps>({
    mutationFn: updateProcess,
    onSuccess(_, variables) {
      queryClient.invalidateQueries([
        "project",
        variables.projectID !== undefined
          ? variables.projectID
          : paramProjectID,
      ]);
      queryClient.invalidateQueries(["dashboardProject"]);
    },
  });
};

export default useUpdateProcess;
