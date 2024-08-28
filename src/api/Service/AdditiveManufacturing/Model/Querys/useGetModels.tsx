import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import useProcess from "@/hooks/Process/useProcess";

const useGetModels = () => {
  const { filters } = useProcess();
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
    initialData: [],
  });
};

export default useGetModels;
