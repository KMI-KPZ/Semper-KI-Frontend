import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

interface MaturityLevel {
  maturityLevel: MaturityLevelItem[];
}

interface MaturityLevelItem {
  level: string;
  value: number;
  buildingBlocks: {
    label: string;
    level: string;
    value: number;
  }[];
  recommendations: {
    code: string;
    item: string;
    text: string;
    label: string;
    trigger: string;
    code_type: string;
  }[];
  buildingBlocksDict: {
    [key: string]: number;
  };
  assessment_block_id: string;
}

const useGetMaturityLevel = () => {
  const getMaturityLevel = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/questionnaire/maturityLevel/get/`
      )
      .then((response) => {
        const data: MaturityLevel = {
          maturityLevel: response.data.maturityLevel,
        };

        logger("useGetMaturityLevel | getMaturityLevel ✅ |", response);
        return data;
      });

  return useQuery<MaturityLevel, Error>({
    queryKey: ["resources", "maturity"],
    queryFn: getMaturityLevel,
  });
};

export default useGetMaturityLevel;
