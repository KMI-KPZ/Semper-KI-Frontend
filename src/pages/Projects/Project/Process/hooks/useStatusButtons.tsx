import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";

interface useStatusButtonsReturnProps {
  updateStatus: UseMutationResult<string, Error, UpdateStatusProps, unknown>;
}

interface UpdateStatusProps {
  projectID: string;
  processID: string;
  status: ProcessStatus;
}

const useStatusButtons = (): useStatusButtonsReturnProps => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateStatus = useMutation<string, Error, UpdateStatusProps>({
    mutationFn: async (props) => {
      const { projectID, processID, status } = props;
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/updateProcessStatus/${projectID}/${processID}/${status}}`;
      return getCustomAxios()
        .patch(apiUrl)
        .then((response) => {
          logger("useStatusButtons | updateStatus ✅ |", response.data);
          return response.data.processID;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", variables.projectID]);
    },
  });

  return { updateStatus };
};

export default useStatusButtons;
