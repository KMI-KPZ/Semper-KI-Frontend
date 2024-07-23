import useGetOrganization, {
  Organization,
} from "@/api/Organization/Querys/useGetOrganization";
import { UseQueryResult } from "@tanstack/react-query";

interface useOrganizationsReturnProps {
  organizationQuery: UseQueryResult<Organization, Error>;
}

const useOrganizations = (roleID?: string): useOrganizationsReturnProps => {
  const organizationQuery = useGetOrganization();

  return {
    organizationQuery,
  };
};

export default useOrganizations;
