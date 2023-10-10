import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeneralServiceProps, ServiceProps } from "../Service";
import { useLocation, useParams } from "react-router-dom";
import { ServiceManufacturingProps } from "../Manufacturing/types";
import logger from "@/hooks/useLogger";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface ReturnProps {
  getService: () => GeneralServiceProps | undefined;
  isServiceComplete: (processID: string) => boolean;
  getServiceName: (processID: string) => string;
}

export enum ServiceType {
  "UNDEFINED",
  "MANUFACTURING",
  "MODELING",
}

const useService = (): ReturnProps => {
  const { getCurrentProcess } = useProcess();

  const getService = (): GeneralServiceProps | undefined => {
    return getCurrentProcess()?.service;
  };

  const isServiceReady = (processID: string): boolean => {
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
  };

  return { getService, isServiceComplete: isServiceReady, getServiceName };
};

export default useService;
