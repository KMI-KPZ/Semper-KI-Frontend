import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { OntoNode } from "./useGetOrgaNodesByType";

export interface CharacterisationItem {
  printer: OntoNode;
  material: OntoNode;
  status: CharacterisationStatus;
  details?: any;
}

export interface CharacterisationItemFlat {
  details: any;
  materialID: string;
  organizationID: string;
  printerID: string;
  status: CharacterisationStatus;
  accessedWhen: string;
  createdWhen: string;
  updatedWhen: string;
}

export enum CharacterisationStatus {
  UNVERIFIED = 0,
  REQUESTED = 1,
  SEND = 2,
  VERIFIED = 3,
}

const useGetVerification = () => {
  const getVerification = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/verification/get/`
      )
      .then((response) => {
        const data: CharacterisationItemFlat[] = response.data;

        logger("useGetVerification | getVerification ✅ |", response);
        return data;
      });

  return useQuery<CharacterisationItemFlat[], Error>({
    queryKey: ["resources", "verification"],
    queryFn: getVerification,
  });
};

export default useGetVerification;
