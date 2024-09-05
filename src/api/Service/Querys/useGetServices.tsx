import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { ModelingServiceProps } from "@/pages/Process/components/Service/ServiceEdit/Modelling/Modelling";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import TestImg from "@images/Test2.png";
import { PostProcessingProps } from "../AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import { MaterialProps } from "../AdditiveManufacturing/Material/Querys/useGetMaterials";

export interface ServiceItemProps {
  name: string;
  type: ServiceType;
  imgPath: string;
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

export type ServiceProps = DefinedServiceProps | undefined;

export type DefinedServiceProps =
  | ManufacturingServiceProps
  | ModelingServiceProps;

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
  models?: ModelProps[];
  materials?: MaterialProps[];
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
  searchInput: string;
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
  const getServices = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/services/get/`)
      .then((response) => {
        // const services: ServiceItemProps[] = objectToArray<ServiceItemProps>(
        //   response.data
        // ).filter((service) => service.type !== 0);
        logger("useGetServices | getServices ✅ |", response);
        const mockedServices: ServiceItemProps[] = [
          {
            name: "Manufacturing",
            type: ServiceType.MANUFACTURING,
            imgPath: TestImg,
          },
          {
            name: "Modeling",
            type: ServiceType.MODELING,
            imgPath: TestImg,
          },
        ];
        return mockedServices;
      });

  return useQuery<ServiceItemProps[], Error>({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export default useGetServices;
