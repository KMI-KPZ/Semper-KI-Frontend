import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

interface ResilienceScore {
  resilienceScore: ResilienceScoreItem[];
}

interface ResilienceScoreItem {
  value: number;
  buildingBlocks: {
    label: string;
    value: number;
  }[];
  recommendations: any[];
  buildingBlocksDict: {
    [key: string]: number;
  };
  assessment_block_id: string;
}

const useGetResilienceScore = () => {
  const getResilienceScore = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/questionnaire/resilienceScore/get/`
      )
      .then((response) => {
        const data: ResilienceScore = {
          resilienceScore: response.data.resilienceScore,
        };

        logger("useGetResiliencescore | getResiliencescore ✅ |", response);
        return data;
      });

  return useQuery<ResilienceScore, Error>({
    queryKey: ["resources", "resilience"],
    queryFn: getResilienceScore,
  });
};

export default useGetResilienceScore;
