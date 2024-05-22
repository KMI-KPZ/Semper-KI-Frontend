import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Project } from "@/api/Project/Querys/useGetProject";
import {
  ManufacturingServiceProps,
  UpdateServiceManufacturingProps,
} from "../Manufacturing/types/types";
import { ModelingServiceProps } from "../Modelling/Modelling";
import { ProjectContext } from "@/contexts/ProjectContext";
import { ProcessContext } from "@/contexts/ProcessContext";
import useProcess, { ProcessStatus } from "@/hooks/Process/useProcess";
import { useContext } from "react";

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

interface ServiceQueryProps {
  service: ServiceProps;
  projectQuery: UseQueryResult<Project, Error>;
}

const useService = (): ReturnProps => {
  const { project } = useContext(ProjectContext);
  const { process } = useContext(ProcessContext);
  const { updateProcess } = useProcess();

  const isServiceComplete = (
    serviceType: ServiceType,
    service: ServiceProps
  ): boolean => {
    switch (serviceType) {
      case ServiceType.MANUFACTURING:
        const manufacturingService = service as ManufacturingServiceProps;
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
    const newService: ManufacturingServiceProps = {
      ...process.serviceDetails,
      ...updateServiceProps,
    };
    const serviceIsComplete = isServiceComplete(
      ServiceType.MANUFACTURING,
      newService
    );
    updateProcess({
      changes: {
        serviceDetails: updateServiceProps,
        processStatus: serviceIsComplete
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
