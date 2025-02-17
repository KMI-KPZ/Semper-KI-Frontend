import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

interface ResilienceScore {
  score: number;
}

const useGetResilienceScore = () => {
  const getResilienceScore = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/questionnaire/resilienceScore/`
      )
      .then((response) => {
        const data: ResilienceScore = {
          score: response.data.resilienceScore,
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
