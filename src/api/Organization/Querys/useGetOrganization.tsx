import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrganizationInfoProps } from "@/pages/Organization/hooks/useOrganizations";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

const useGetOrganization = () => {
  const queryClient = useQueryClient();
  const getOrganization = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getOrganization/`)
      .then((response) => {
        const responseData = response.data;
        const organization: OrganizationInfoProps = {
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

  return useQuery<OrganizationInfoProps, Error>({
    queryKey: ["organization", "info"],
    queryFn: getOrganization,
    staleTime: 300000, // 5 minutes
  });
};

export default useGetOrganization;
