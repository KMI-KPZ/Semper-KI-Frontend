import useGetOrganization, {
  Organization,
} from "@/api/Organization/Querys/useGetOrganization";
import { OrganizationContext } from "@/contexts/OrganisationContext";
import { UseQueryResult } from "@tanstack/react-query";
import { useContext } from "react";

interface useOrganizationReturnProps {
  organization: Organization;
}

const useOrganization = (): useOrganizationReturnProps => {
  const { organization } = useContext(OrganizationContext);

  return {
    organization,
  };
};

export default useOrganization;
