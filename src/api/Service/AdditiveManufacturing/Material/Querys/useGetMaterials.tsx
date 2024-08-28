import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";
import { OntoNodeProperty } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useProcess from "@/hooks/Process/useProcess";

export interface MaterialProps {
  id: string;
  title: string;
  propList: OntoNodeProperty[];
  imgPath: string;
}

const useGetMaterials = () => {
  const queryClient = useQueryClient();
  const { filters } = useProcess();
  const getMaterials = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/material/get/`,
        {
          filters,
        }
      )
      .then((response) => {
        const materials: MaterialProps[] = response.data.materials;
        logger("useGetMaterials | getMaterials ✅ |", response);
        return materials;
      });

  return useQuery<MaterialProps[], Error>({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
};

export default useGetMaterials;
