import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";
import { OntoNodeProperty } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useProcess from "@/hooks/Process/useProcess";

export interface PostProcessingProps {
  id: string;
  title: string;
  checked: boolean;
  value: string;
  valueList: OntoNodeProperty[];
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
  const { filters } = useProcess();
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
