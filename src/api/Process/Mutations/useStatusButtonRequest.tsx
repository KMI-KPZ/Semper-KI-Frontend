import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MultipleProcessMutationProps } from "../types";
import { StatusButtonActionRequestProps } from "@/hooks/Project/useStatusButtons";

export type StatusButtonRequestProps = {
  button: StatusButtonActionRequestProps;
} & MultipleProcessMutationProps;

const useStatusButtonRequest = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const statusButtonRequest = async ({
    button,
    processIDs,
  }: StatusButtonRequestProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/states/buttons/get/`, {
        projectID,
        processIDs,
        buttonData: { ...button },
      })
      .then((response) => {
        logger("useStatusButtonRequest | statusButtonRequest ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useStatusButtonRequest | statusButtonRequest ❌ |", error);
      });

  return useMutation<string, Error, StatusButtonRequestProps>({
    mutationFn: statusButtonRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });
};

export default useStatusButtonRequest;
