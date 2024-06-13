import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilterItemProps } from "@/pages/Service/Manufacturing/Filter/Filter";

export interface MaterialProps {
  id: string;
  title: string;
  propList: string[];
  imgPath: string;
}

const useGetMaterials = (filters: FilterItemProps[]) => {
  const queryClient = useQueryClient();
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
