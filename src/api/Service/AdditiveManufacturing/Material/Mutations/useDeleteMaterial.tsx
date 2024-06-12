import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteMaterialProps {
  materialID: string;
  processID: string;
  projectID: string;
}

const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  const deleteMaterial = async ({
    materialID,
    processID,
    projectID,
  }: DeleteMaterialProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/delete/${projectID}/${processID}/${materialID}/`
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
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useDeleteMaterial;
