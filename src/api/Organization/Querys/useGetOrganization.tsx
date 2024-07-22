import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { UserAddressProps } from "@/hooks/useUser";

export interface Organization {
  hashedID: string;
  name: string;
  details: OrganizationDetails;
  accessedWhen: Date;
  createdWhen: Date;
  updatedWhen: Date;
  supportedServices: ServiceType[];
}

export interface OrganizationDetails {
  taxID: string;
  email: string;
  addresses?: UserAddressProps[];
  locale?: string;
  notificationSettings?: {
    [key: string]: { event?: boolean; email?: boolean };
  };
  priorities?: {};
}

const useGetOrganization = () => {
  const queryClient = useQueryClient();
  const getOrganization = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/organizations/get/`)
      .then((response) => {
        const responseData = response.data;
        const organization: Organization = {
          ...responseData,
          accessedWhen: new Date(responseData.accessedWhen),
          createdWhen: new Date(responseData.createdWhen),
          updatedWhen: new Date(responseData.updatedWhen),
          details: responseData.details,
          supportedServices: responseData.supportedServices.filter(
            (serviceType: ServiceType) => serviceType !== 0
          ),
        };

        logger("useGetOrganization | getOrganization ✅ |", response);
        return organization;
      });

  return useQuery<Organization, Error>({
    queryKey: ["organization", "info"],
    queryFn: getOrganization,
    staleTime: 300000, // 5 minutes
  });
};

export default useGetOrganization;
