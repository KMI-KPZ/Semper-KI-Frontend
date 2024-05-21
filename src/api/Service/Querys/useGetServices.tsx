import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { objectToArray } from "@/services/utils";
import { ServiceType } from "@/pages/Service/hooks/useService";

export interface ServiceItemProps {
  name: string;
  identifier: ServiceType;
}

const useGetServices = () => {
  const queryClient = useQueryClient();
  const getServices = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getServices/`)
      .then((response) => {
        const services: ServiceItemProps[] = objectToArray<ServiceItemProps>(
          response.data
        ).filter((service) => service.identifier !== 0);
        logger("useGetServices | getServices ✅ |", response);
        return services;
      });

  return useQuery<ServiceItemProps[], Error>({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export default useGetServices;
