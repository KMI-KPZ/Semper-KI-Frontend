import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { OntoNodeProperty } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useFilter from "@/hooks/useFilter";

export interface PostProcessingProps {
  id: string;
  title: string;
  checked: boolean;
  value: string;
  propList: OntoNodeProperty[];
  type: EPostProcessingOptionType;
  imgPath: string;
}

export enum EPostProcessingOptionType {
  "selection",
  "number",
  "string",
}

const useGetPostProcessigns = () => {
  const { activeFilters } = useFilter();
  const getPostProcessigns = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/post-processing/get/`,
        {
          filters: activeFilters,
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
