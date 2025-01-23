import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { OrganizationBranding } from "@/api/Organization/Querys/useGetOrganization";

export interface ContractorProps {
  hashedID: string;
  name: string;
  branding: OrganizationBranding;
  prices: { groupCosts: [number, number][] };
}

const useGetContractors = () => {
  const { projectID, processID } = useParams();
  const getContractors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/contractors/get/${processID}/`
      )
      .then((response) => {
        const responseData = response.data;

        const contractors: ContractorProps[] = responseData;
        logger("useGetContractors | getContractors ✅ |", response);
        return contractors;
      });

  return useQuery<ContractorProps[], Error>({
    queryKey: ["project", projectID, processID, "contractors"],
    queryFn: getContractors,
    enabled: processID !== undefined && processID !== "",
  });
};

export default useGetContractors;
