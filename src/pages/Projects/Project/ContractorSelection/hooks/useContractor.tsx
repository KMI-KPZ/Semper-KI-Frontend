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

const useContractors = (): ReturnProps => {
  const contractorsQuery = useQuery<ContractorProps[], Error>({
    queryKey: ["contractors"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getContractors/`)
        .then((res) => {
          logger("useContractors | getContractors ✅ |", res.data);
          return res.data === "fu" ? [] : res.data;
        }),
  });

  return { contractorsQuery };
};

export default useContractors;
