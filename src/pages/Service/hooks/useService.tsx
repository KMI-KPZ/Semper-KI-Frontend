import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeneralServiceProps, ServiceProps } from "../Service";
import { useLocation, useParams } from "react-router-dom";
import { useOrder } from "@/pages/Order/hooks/useOrder";
import { ServiceManufacturingProps } from "../Manufacturing/types";
import logger from "@/hooks/useLogger";
import useSubOrder from "@/pages/Order/SubOrder/hooks/useSubOrder";

interface ReturnProps {
  getService: () => GeneralServiceProps | undefined;
  isServiceComplete: (subOrderID: string) => boolean;
  getServiceName: (subOrderID: string) => string;
}

export enum ServiceType {
  "UNDEFINED",
  "MANUFACTURING",
  "MODELING",
}

const useService = (): ReturnProps => {
  const { getCurrentSubOrder } = useSubOrder();

  const getService = (): GeneralServiceProps | undefined => {
    return getCurrentSubOrder()?.service;
  };

  const isServiceReady = (subOrderID: string): boolean => {
    const subOrder = getCurrentSubOrder(subOrderID);
    if (
      subOrder === undefined ||
      (subOrder !== undefined && subOrder.service === undefined) ||
      (subOrder !== undefined &&
        subOrder.service !== undefined &&
        subOrder.service.type === undefined)
    )
      return false;
    switch (subOrder.service.type) {
      case ServiceType.MANUFACTURING:
        const manufacturingService =
          subOrder.service as ServiceManufacturingProps;
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

  const getServiceName = (subOrderID: string): string => {
    const subOrder = getCurrentSubOrder();
    if (subOrder === undefined || subOrder.service === undefined)
      return "service";
    switch (subOrder.service.type) {
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
