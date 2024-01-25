import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { objectToArray } from "@/services/utils";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface useServiceQuerysReturnProps {
  servicesQuery: UseQueryResult<ServiceItemProps[], Error>;
}

export interface ServiceItemProps {
  name: string;
  identifier: ServiceType;
}

const useServiceQuerys = (): useServiceQuerysReturnProps => {
  const servicesQuery = useQuery<ServiceItemProps[], Error>(
    ["services"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getServices/`;
      return authorizedCustomAxios.get(apiUrl).then((response) => {
        const services = objectToArray<ServiceItemProps>(response.data).filter(
          (service) => service.identifier !== 0
        );
        logger("useService | servicesQuery ✅ |", services);

        return services;
      });
    }
  );

  return { servicesQuery };
};

export default useServiceQuerys;
