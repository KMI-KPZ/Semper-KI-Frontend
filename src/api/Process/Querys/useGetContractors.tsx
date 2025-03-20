import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { OrganizationBranding } from "@/api/Organization/Querys/useGetOrganization";

export interface ContractorReturnProps {
  contractors: ContractorProps[];
  errors: ContractorsError[];
}
export type ContractorsErrorType =
  | "material"
  | "color"
  | "postProcessing"
  | "printer";

export interface ContractorsError {
  groupID: number;
  error: ContractorsErrorType;
}

export interface ContractorProps {
  hashedID: string;
  name: string;
  distance: number;
  branding: OrganizationBranding;
  prices: { groupCosts: [number, number][] };
  contractorCoordinates: [number, number];
  groups: number[];
  verified: boolean;
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

        const contractors: ContractorReturnProps = responseData;
        logger("useGetContractors | getContractors ✅ |", response);
        return contractors;
      });

  return useQuery<ContractorReturnProps, Error>({
    queryKey: ["project", projectID, processID, "contractors"],
    queryFn: getContractors,
    enabled: processID !== undefined && processID !== "",
  });
};

export default useGetContractors;
