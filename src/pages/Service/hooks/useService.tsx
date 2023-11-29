import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  ServiceManufacturingProps,
  UpdateServiceManufacturingProps,
} from "../Manufacturing/types/types";
import logger from "@/hooks/useLogger";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "@/pages/Projects/hooks/useProcess";
import { ServiceModelingProps } from "../Modelling/Modelling";
import { ProjectProps } from "@/pages/Projects/hooks/useProject";
import { useContext } from "react";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";

interface ReturnProps {
  isServiceComplete: (
    serviceType: ServiceType,
    service: ServiceProps
  ) => boolean;
  updatedService: (updateServiceProps: UpdateServiceManufacturingProps) => void;
}

export enum ServiceType {
  "NONE",
  "MANUFACTURING",
  "MODELING",
}

export type ServiceProps =
  | ServiceManufacturingProps
  | ServiceModelingProps
  | ServiceUndefinedProps;

export interface ServiceUndefinedProps {}

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
  service: ServiceProps;
  projectQuery: UseQueryResult<ProjectProps, Error>;
}

const useService = (): ReturnProps => {
  const { project } = useContext(ProjectContext);
  const { process } = useContext(ProcessContext);
  const { updateProcess } = useProcess();
  const service = process.service as ServiceManufacturingProps;

  const isServiceComplete = (
    serviceType: ServiceType,
    service: ServiceProps
  ): boolean => {
    switch (serviceType) {
      case ServiceType.MANUFACTURING:
        const manufacturingService = service as ServiceManufacturingProps;
        return (
          manufacturingService.model !== undefined &&
          manufacturingService.material !== undefined
        );
      case ServiceType.MODELING:
        return true;
      case ServiceType.NONE:
        return false;
    }
  };

  const updatedService = (
    updateServiceProps: UpdateServiceManufacturingProps
  ) => {
    const newService: ServiceManufacturingProps = {
      ...service,
      ...updateServiceProps,
    };
    const serviceIsComplete = isServiceComplete(
      ServiceType.MANUFACTURING,
      newService
    );
    updateProcess.mutate({
      changes: {
        service: updateServiceProps,
        status: serviceIsComplete
          ? ProcessStatus.SERVICE_READY
          : ProcessStatus.SERVICE_IN_PROGRESS,
      },
    });
  };

  return {
    isServiceComplete,
    updatedService,
  };
};

export default useService;
