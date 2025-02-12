import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { ModelingServiceProps } from "@/pages/Process/components/Service/ServiceEdit/Modelling/Modelling";
import { PostProcessingProps } from "../AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import { MaterialProps } from "../AdditiveManufacturing/Material/Querys/useGetMaterials";
import { ProcessModel } from "@/api/Process/Querys/useGetProcess";
import { CheckModel } from "@/api/Process/Querys/useGetCheckModel";
import { OntoNode } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

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
  "ADDITIVE_MANUFACTURING",
  "CREATE_MODEL",
  "DELIVERY",
  "POST_PROCESSING",
  "PACKAGING",
  "QUALITY_CONTROL",
  "AFTER_SALES",
  "ASSEMBLY",
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
  name?: string;
  models: ProcessModel[];
  material: MaterialProps | undefined;
  color: OntoNode | undefined;
  postProcessings: PostProcessingProps[];
  manufacturerID?: string;
  context?: string;
  calculations?: CheckModel[];
};

export type UpdateServiceManufacturingProps = {
  groups?: {
    title?: string;
    models?: ProcessModel[];
    material?: MaterialProps | undefined;
    postProcessings?: PostProcessingProps[];
    manufacturerID?: string;
    context?: string;
  }[];
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
        const services: ServiceItemProps[] = response.data.map(
          (service: ServiceItemProps) => ({
            name: service.type,
            type: ServiceType[service.type] as keyof typeof ServiceType,
            imgPath: service.imgPath,
          })
        );
        logger("useGetServices | getServices ✅ |", response);
        // const mockedServices: ServiceItemProps[] = [
        //   {
        //     name: "Manufacturing",
        //     type: ServiceType.ADDITIVE_MANUFACTURING,
        //     imgPath: TestImg,
        //   },
        //   {
        //     name: "Modeling",
        //     type: ServiceType.CREATE_MODEL,
        //     imgPath: TestImg,
        //   },
        // ];
        return services;
      });

  return useQuery<ServiceItemProps[], Error>({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export default useGetServices;
