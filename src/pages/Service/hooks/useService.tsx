import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  ServiceManufacturingProps,
  UpdateServiceManufacturingProps,
} from "../Manufacturing/types/types";
import logger from "@/hooks/useLogger";
import useProcess, { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { ServiceModelingProps } from "../Modelling/Modelling";
import { ProjectProps } from "@/pages/Projects/hooks/useProject";

interface ReturnProps {
  getService: () => ServiceQueryProps;
  isServiceComplete: (processID: string) => boolean;
  getServiceName: (processID: string) => string;
}

export enum ServiceType {
  "UNDEFINED",
  "MANUFACTURING",
  "MODELING",
}

export type GeneralServiceProps =
  | ServiceManufacturingProps
  | ServiceModelingProps
  | ServiceUndefinedProps;

export interface ServiceUndefinedProps {
  type: ServiceType.UNDEFINED;
}

export interface UpdateServiceProps {
  type?: ServiceType;
}

export type GerneralUpdateServiceProps =
  | UpdateServiceManufacturingProps
  | UpdateServiceUndefinedProps;

export interface UpdateServiceUndefinedProps {
  type: ServiceType;
}

interface ServiceQueryProps {
  service: GeneralServiceProps;
  projectQuery: UseQueryResult<ProjectProps, Error>;
}

const useService = (): ReturnProps => {
  const { getCurrentProcess, getProcessQuery } = useProcess();

  const getService = (): ServiceQueryProps => {
    const { process, projectQuery } = getProcessQuery();
    const service = process?.service;
    return {
      service:
        service === undefined ? { type: ServiceType.UNDEFINED } : service,
      projectQuery,
    };
  };

  const isServiceComplete = (processID: string): boolean => {
    const process = getCurrentProcess(processID);

    if (
      process === undefined ||
      (process !== undefined && process.service === undefined) ||
      (process !== undefined &&
        process.service !== undefined &&
        process.service.type === undefined)
    )
      return false;

    let serviceReady = false;

    switch (process.service.type) {
      case ServiceType.MANUFACTURING:
        const manufacturingService =
          process.service as ServiceManufacturingProps;
        if (
          manufacturingService.model !== undefined &&
          manufacturingService.material !== undefined &&
          manufacturingService.postProcessings !== undefined
        )
          serviceReady = true;
        break;
      case ServiceType.MODELING:
        serviceReady = true;
        break;
      case ServiceType.UNDEFINED:
        serviceReady = false;
        break;
    }

    return serviceReady && process.status === ProcessStatus.DRAFT;
  };

  const getServiceName = (processID: string): string => {
    const process = getCurrentProcess();
    if (process === undefined || process.service === undefined)
      return "service";
    switch (process.service.type) {
      case ServiceType.MANUFACTURING:
        return "manufacturingService";
      case ServiceType.MODELING:
        return "modelingService";
      case ServiceType.UNDEFINED:
        return "service";
    }
    return "service";
  };

  return { getService, isServiceComplete, getServiceName };
};

export default useService;
