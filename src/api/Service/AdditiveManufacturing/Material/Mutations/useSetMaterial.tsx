import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MaterialProps } from "../Querys/useGetMaterials";

interface SetMaterialProps {
  materials: MaterialProps[];
  groupIndex: number;
  processID: string;
  projectID: string;
}

const useSetMaterial = () => {
  const queryClient = useQueryClient();
  const setMaterial = async (props: SetMaterialProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/material/set/`,
        props
      )
      .then((response) => {
        logger("useSetMaterial | setMaterial ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSetMaterial | setMaterial ❌ |", error);
      });

  return useMutation<string, Error, SetMaterialProps>({
    mutationFn: setMaterial,
    onSuccess: (_, props) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useSetMaterial;
