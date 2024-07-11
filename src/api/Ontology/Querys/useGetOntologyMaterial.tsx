import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OntoMaterialFlat } from "@/pages/Resources/types/types";

const useGetOntologyMaterial = (materialID?: string) => {
  const queryClient = useQueryClient();
  const getOntoMaterial = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/onto/getMaterial/`)
      .then((response) => {
        const responseData = response.data;
        const material: OntoMaterialFlat = responseData;

        logger("useGetOntologyMaterial | getOntoMaterial ✅ |", response);
        return material;
      });

  return useQuery<OntoMaterialFlat, Error>({
    queryKey: ["onto", "material", materialID],
    queryFn: getOntoMaterial,
    enabled: materialID !== undefined && materialID !== "",
  });
};

export default useGetOntologyMaterial;
