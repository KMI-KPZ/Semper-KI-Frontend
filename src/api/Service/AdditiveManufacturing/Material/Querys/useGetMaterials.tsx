import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeProperty,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useFilter from "@/hooks/useFilter";

export interface MaterialProps {
  id: string;
  title: string;
  propList: OntoNodeProperty[];
  colors: OntoNode[];
  imgPath: string;
  medianPrice: number;
}

const useGetMaterials = () => {
  const { activeFilters } = useFilter();
  const getMaterials = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/material/get/`,
        {
          filters: activeFilters,
        }
      )
      .then((response) => {
        const materials: MaterialProps[] = response.data.materials.map(
          (mat: any) => ({
            ...mat,
            colors: mat.colors.map((color: any) => ({
              ...color,
              name: color.nodeName,
            })),
          })
        );
        logger("useGetMaterials | getMaterials ✅ |", response);
        return materials;
      });

  return useQuery<MaterialProps[], Error>({
    queryKey: ["materials", activeFilters],
    queryFn: getMaterials,
    enabled: !!activeFilters,
  });
};

export default useGetMaterials;
