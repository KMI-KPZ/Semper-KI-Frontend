import useProcess from "@/hooks/Process/useProcess";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import {
  ManufacturingServiceProps,
  ServiceProps,
  ServiceType,
  UpdateServiceManufacturingProps,
} from "@/api/Service/Querys/useGetServices";

interface ReturnProps {
  updatedService: (updateServiceProps: UpdateServiceManufacturingProps) => void;
}

export const isServiceComplete = (
  serviceType: ServiceType,
  service: ServiceProps
): boolean => {
  switch (serviceType) {
    case ServiceType.MANUFACTURING:
      const manufacturingService = service as ManufacturingServiceProps;
      return (
        manufacturingService.models !== undefined &&
        manufacturingService.materials !== undefined
      );
    case ServiceType.MODELING:
      return true;
    case ServiceType.NONE:
      return false;
  }
};

const useService = (): ReturnProps => {
  const { process } = useProcess();
  const updateProcess = useUpdateProcess();

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
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: {
        changes: {
          serviceDetails: updateServiceProps,
          processStatus: serviceIsComplete
            ? ProcessStatus.SERVICE_READY
            : ProcessStatus.SERVICE_IN_PROGRESS,
        },
      },
    });
  };

  return {
    updatedService,
  };
};

export default useService;
