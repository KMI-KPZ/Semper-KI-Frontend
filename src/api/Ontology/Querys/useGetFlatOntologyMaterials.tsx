import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OntoMaterialFlat } from "@/pages/Resources/types/types";

const useGetFlatOntologyMaterials = () => {
  const queryClient = useQueryClient();
  const getOntologyMaterials = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/onto/getMaterials/`)
      .then((response) => {
        const responseData = response.data;
        const materials: OntoMaterialFlat[] = responseData.materials;

        logger("useGetOntologyMaterials | getOntologyMaterials ✅ |", response);
        return materials;
      });

  return useQuery<OntoMaterialFlat[], Error>({
    queryKey: ["onto", "materials"],
    queryFn: getOntologyMaterials,
  });
};

export default useGetFlatOntologyMaterials;
