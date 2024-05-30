import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { objectToArray } from "@/services/utils";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ModelingServiceProps } from "@/pages/Service/Modelling/Modelling";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";
import { MaterialProps } from "@/pages/Service/Manufacturing/Material/Material";
import Service from "@/pages/Service/Service";

export interface ServiceItemProps {
  name: string;
  identifier: ServiceType;
}

export interface DisplayService {
  title: string;
  imgPath: string;
  description: string;
  type: ServiceType;
}

export enum ServiceType {
  "NONE",
  "MANUFACTURING",
  "MODELING",
}

export type ServiceProps =
  | ManufacturingServiceProps
  | ModelingServiceProps
  | undefined;

export interface UpdateServiceProps {
  type?: ServiceType;
}

export type GerneralUpdateServiceProps =
  | UpdateServiceManufacturingProps
  | UpdateServiceUndefinedProps;

export interface UpdateServiceUndefinedProps {
  type: ServiceType;
}

export type ManufacturingServiceProps = {
  model?: ModelProps;
  material?: MaterialProps;
  postProcessings?: PostProcessingProps[];
  manufacturerID?: string;
};

export type UpdateServiceManufacturingProps = {
  title?: string;
  model?: ModelProps;
  material?: MaterialProps;
  postProcessings?: PostProcessingProps[];
  manufacturerID?: string;
};

export interface ServiceManufacturingState {
  grid: boolean;
  searchText: string;
  filterOpen: boolean;
}

export interface ServiceManufacturingContextReturnProps {
  processState: ServiceManufacturingState;
  setGrid(grid: boolean): void;
  setFilter(open: boolean): void;
  setSearchInput(name: string): void;
  service: ManufacturingServiceProps;
}

export const instanceOfManufacturingServiceProps = (
  object: any
): object is ManufacturingServiceProps => {
  return (
    "model" in object ||
    "material" in object ||
    "postProcessings" in object ||
    "manufacturerID" in object
  );
};

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
