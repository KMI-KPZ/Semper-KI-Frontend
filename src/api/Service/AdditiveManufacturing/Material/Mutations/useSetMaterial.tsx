import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SetMaterialProps {
  materialID: string;
  processID: string;
  projectID: string;
}

const useSetMaterial = () => {
  const queryClient = useQueryClient();
  const setMaterial = async (props: SetMaterialProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/setitive-manufacturing/material/set/`,
        {
          props,
        }
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
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useSetMaterial;
