import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MaterialProps } from "../Querys/useGetMaterials";
import { OntoNode } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

interface SetMaterialProps {
  material: MaterialProps;
  groupID: number;
  color: OntoNode | undefined;
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
