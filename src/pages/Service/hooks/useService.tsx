import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  ServiceManufacturingProps,
  UpdateServiceManufacturingProps,
} from "../Manufacturing/types";
import logger from "@/hooks/useLogger";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { ServiceModellingProps } from "../Modelling/Modelling";

interface ReturnProps {
  getService: () => GeneralServiceProps;
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
  | ServiceModellingProps
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

const useService = (): ReturnProps => {
  const { getCurrentProcess } = useProcess();

  const getService = (): GeneralServiceProps => {
    const service = getCurrentProcess()?.service;
    if (service === undefined) return { type: ServiceType.UNDEFINED };
    return service;
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
    switch (process.service.type) {
      case ServiceType.MANUFACTURING:
        const manufacturingService =
          process.service as ServiceManufacturingProps;
        return (
          manufacturingService.model !== undefined &&
          manufacturingService.material !== undefined &&
          manufacturingService.postProcessings !== undefined
        );
      case ServiceType.MODELING:
        return false;
      case ServiceType.UNDEFINED:
        return false;
    }
    return false;
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
