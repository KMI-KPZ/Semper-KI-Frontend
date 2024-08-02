import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilterItemProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Filter/Filter";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";

export interface PostProcessingProps {
  id: string;
  title: string;
  checked: boolean;
  value: string;
  valueList: string[];
  type: EPostProcessingOptionType;
  imgPath: string;
}

export enum EPostProcessingOptionType {
  "selection",
  "number",
  "string",
}

const useGetPostProcessigns = () => {
  const queryClient = useQueryClient();
  const getFilters = useGetFilters();
  const getPostProcessigns = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/post-processing/get/`,
        {
          filters: getFilters.data,
        }
      )
      .then((response) => {
        const postProcessings: PostProcessingProps[] =
          response.data.postProcessings;

        logger("useGetPostProcessigns | getPostProcessigns ✅ |", response);
        return postProcessings;
      });

  return useQuery<PostProcessingProps[], Error>({
    queryKey: ["postProcessigns"],
    queryFn: getPostProcessigns,
    enabled: true || (getFilters.isFetched && getFilters.data !== undefined),
  });
};

export default useGetPostProcessigns;
