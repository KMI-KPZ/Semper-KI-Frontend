import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilterItemProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Filter/Filter";

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

const useGetPostProcessigns = (filters: FilterItemProps[]) => {
  const queryClient = useQueryClient();
  const getPostProcessigns = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/post-processing/get/`,
        {
          filters,
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
  });
};

export default useGetPostProcessigns;
