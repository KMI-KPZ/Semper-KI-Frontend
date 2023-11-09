import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/Typography";
import useProcess, { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { useNavigate, useParams } from "react-router-dom";
import logger from "@/hooks/useLogger";
import { ServiceType } from "@/pages/Service/hooks/useService";
import Process from "../../../Process";

export interface ServiceSelectItemProps {
  serviceType: ServiceType;
  icon: React.ReactNode;
  active: boolean;
  manuelProcessID: string;
  serviceSelected?: boolean;
}

const ServicePreviewSelectItem: React.FC<ServiceSelectItemProps> = (props) => {
  const { active, icon, serviceType, manuelProcessID, serviceSelected } = props;
  const { t } = useTranslation();
  const { updateProcess, updateProcessWithProcessID } = useProcess();
  const navigate = useNavigate();
  const { processID } = useParams();

  const navigateToService = () => {
    navigate(
      processID !== undefined && processID !== manuelProcessID
        ? `../${manuelProcessID}/service/edit`
        : processID !== undefined && processID === manuelProcessID
        ? `service/edit`
        : `${manuelProcessID}/service/edit`
    );
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      processID === undefined ||
      (processID !== undefined && processID !== manuelProcessID)
    ) {
      updateProcessWithProcessID.mutate(
        {
          processID: manuelProcessID,
          updates: {
            changes: {
              service: { type: serviceType },
              status: ProcessStatus.SERVICE_IN_PROGRESS,
            },
          },
        },
        {
          onSuccess: () => {
            navigateToService();
          },
        }
      );
    } else {
      updateProcess.mutate(
        {
          changes: {
            service: { type: serviceType },
            status: ProcessStatus.SERVICE_IN_PROGRESS,
          },
        },
        {
          onSuccess: () => {
            navigateToService();
          },
        }
      );
    }
  };

  return (
    <a
      onClick={handleOnClickCard}
      href={`/select/${ServiceType[serviceType]}`}
      className={`flex w-fit flex-col items-center justify-center gap-5 rounded-xl bg-slate-100 p-5 duration-300
      ${active ? "shadow-inner-border shadow-türkis-500" : ""}
      ${
        serviceSelected !== undefined && serviceSelected === true
          ? ""
          : "hover:cursor-pointer hover:bg-orange-200 "
      }
      `}
    >
      {icon}
      <Text variant="body">
        {t(
          `enum.ServiceType.${
            ServiceType[serviceType] as keyof typeof ServiceType
          }`
        )}
      </Text>
    </a>
  );
};

export default ServicePreviewSelectItem;
