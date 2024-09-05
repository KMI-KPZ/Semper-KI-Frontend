import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { ProjectDetailsProps } from "../Querys/useGetProject";

export interface UpdateProjectProps {
  changes?: ProjectChangesProps;
  deletions?: ProjectDeletionsProps;
}

export interface ProjectChangesProps {
  projectStatus?: ProcessStatus;
  projectDetails?: ProjectDetailsProps;
}

export interface ProjectDeletionsProps {
  projectDetails?: { title?: "" };
  projectStatus?: "";
}

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const updateProject = async ({
    changes = {},
    deletions = {},
  }: UpdateProjectProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/project/update/`, {
        projectID,
        changes,
        deletions,
      })
      .then((response) => {
        logger("useUpdateProject | updateProject ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateProject | updateProject ❌ |", error);
      });

  return useMutation<void, Error, UpdateProjectProps>({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });
};

export default useUpdateProject;
