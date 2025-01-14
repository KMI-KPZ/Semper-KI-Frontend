import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteMaterialProps {
  groupID: number;
  processID: string;
  projectID: string;
}

const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  const deleteMaterial = async ({
    groupID,
    processID,
    projectID,
  }: DeleteMaterialProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/material/delete/${projectID}/${processID}/${groupID}/`
      )
      .then((response) => {
        logger("useDeleteMaterial | deleteMaterial ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteMaterial | deleteMaterial ❌ |", error);
      });

  return useMutation<string, Error, DeleteMaterialProps>({
    mutationFn: deleteMaterial,
    onSuccess: (_, props) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useDeleteMaterial;
