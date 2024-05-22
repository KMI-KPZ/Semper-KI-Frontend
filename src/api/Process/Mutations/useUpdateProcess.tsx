import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MultipleProcessMutationProps } from "../types";
import {
  ProcessChangesProps,
  ProcessDeletionsProps,
} from "@/hooks/Process/useProcess";

export interface UpdateProcessProps {
  changes?: ProcessChangesProps;
  deletions?: ProcessDeletionsProps;
}

export type UpdateProcessMutationProps = {
  updates: UpdateProcessProps;
} & MultipleProcessMutationProps;

const useUpdateProcess = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const updateProcess = async ({
    processIDs,
    updates,
  }: UpdateProcessMutationProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProcess/`, {
        projectID,
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
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });
};

export default useUpdateProcess;
