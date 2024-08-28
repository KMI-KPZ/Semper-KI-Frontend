import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

export interface ContractorProps {
  name: string;
  hashedID: string;
  details: {
    adress: string;
  };
}

const useGetContractors = (processID: string) => {
  const getContractors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/contractors/get/${processID}/`
      )
      .then((response) => {
        const responseData = response.data;
        const contractors: ContractorProps[] =
          responseData === "fu" ? [] : responseData;

        logger("useGetContractors | getContractors ✅ |", response);
        return contractors;
      });

  return useQuery<ContractorProps[], Error>({
    queryKey: ["contractors", processID],
    queryFn: getContractors,
    enabled: processID !== undefined && processID !== "",
  });
};

export default useGetContractors;
