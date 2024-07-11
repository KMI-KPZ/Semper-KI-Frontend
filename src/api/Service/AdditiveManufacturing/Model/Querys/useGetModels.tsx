import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import { FilterItemProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Filter/Filter";

const useGetModels = (filters: FilterItemProps[]) => {
  const queryClient = useQueryClient();
  const getModels = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/get/`,
        {
          filters,
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
    enabled: false,
    initialData: [],
  });
};

export default useGetModels;
