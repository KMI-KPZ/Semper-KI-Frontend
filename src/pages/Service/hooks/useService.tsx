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
  isServiceComplete: (service: GeneralServiceProps) => boolean;
  updatedService: (updateServiceProps: UpdateServiceManufacturingProps) => void;
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
  const { project } = useContext(ProjectContext);
  const { process } = useContext(ProcessContext);
  const { updateProcess } = useProcess();
  const service = process.service as ServiceManufacturingProps;

  const isServiceComplete = (service: GeneralServiceProps): boolean => {
    switch (service.type) {
      case ServiceType.MANUFACTURING:
        const manufacturingService = service as ServiceManufacturingProps;
        return (
          manufacturingService.model !== undefined &&
          manufacturingService.material !== undefined
        );
      case ServiceType.MODELING:
        return true;
      case ServiceType.UNDEFINED:
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
    const serviceIsComplete = isServiceComplete(newService);
    updateProcess.mutate({
      changes: {
        service: newService,
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
