import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { FilterItemProps } from "@/pages/Service/Manufacturing/Filter/Filter";

const useGetPostProcessigns = (filters: FilterItemProps[]) => {
  const queryClient = useQueryClient();
  const getPostProcessigns = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/getPostProcessigns/`, {
        filters,
      })
      .then((response) => {
        const postProcessings: PostProcessingProps[] =
          response.data.postProcessing;

        logger("useGetPostProcessigns | getPostProcessigns ✅ |", response);
        return postProcessings;
      });

  return useQuery<PostProcessingProps[], Error>({
    queryKey: ["postProcessigns"],
    queryFn: getPostProcessigns,
  });
};

export default useGetPostProcessigns;
