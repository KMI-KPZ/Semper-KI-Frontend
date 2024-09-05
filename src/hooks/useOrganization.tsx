import { Organization } from "@/api/Organization/Querys/useGetOrganization";
import { OrganizationContext } from "@/contexts/OrganisationContext";
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
