import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import { FilterItemProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Filter/Filter";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";

const useGetModels = () => {
  const queryClient = useQueryClient();
  const getFilters = useGetFilters();
  const getModels = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/get/`,
        {
          filters: getFilters.data,
        }
      )
      .then((response) => {
        const models: ModelProps[] = response.data.models;

        logger("useGetModels | getModels ✅ |", response);
        return models;
      });

  return useQuery<ModelProps[], Error>({
    queryKey: ["models"],
    queryFn: getModels,
    enabled: false && getFilters.isFetched && getFilters.data !== undefined,
    initialData: [],
  });
};

export default useGetModels;
