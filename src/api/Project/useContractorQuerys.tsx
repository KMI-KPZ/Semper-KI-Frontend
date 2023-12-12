import { customAxios } from "@/api/customAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  contractorsQuery: UseQueryResult<ContractorProps[], Error>;
}

export interface ContractorProps {
  name: string;
  id: string;
}

const useContractorsQuerys = (processID: string): ReturnProps => {
  const contractorsQuery = useQuery<ContractorProps[], Error>({
    queryKey: ["contractors", processID],
    queryFn: async () =>
      customAxios
        .get(
          `${process.env.VITE_HTTP_API_URL}/public/getContractors/${processID}/`
        )
        .then((res) => {
          logger("useContractorsQuerys | getContractors ✅ |", res.data);
          return res.data === "fu" ? [] : res.data;
        }),
    enabled: processID !== undefined,
  });

  return { contractorsQuery };
};

export default useContractorsQuerys;
