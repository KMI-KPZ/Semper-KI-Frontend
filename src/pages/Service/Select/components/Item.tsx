import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/index";
import { ServiceType } from "../../hooks/useService";
import useProcess, { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { useNavigate, useParams } from "react-router-dom";
import logger from "@/hooks/useLogger";

export interface ServiceSelectItemProps {
  serviceType: ServiceType;
  icon: React.ReactNode;
  active: boolean;
  serviceSelected?: boolean;
}

const ServiceSelectItem: React.FC<ServiceSelectItemProps> = (props) => {
  const { active, icon, serviceType, serviceSelected } = props;
  const { t } = useTranslation();
  const { updateProcess } = useProcess();
  const navigate = useNavigate();
  const { processID } = useParams();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (active) {
      navigateToService();
    } else {
      updateProcess(
        {
          changes: {
            serviceType,
            processStatus: ProcessStatus.SERVICE_IN_PROGRESS,
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

  const navigateToService = () => {
    navigate("edit");
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

export default ServiceSelectItem;
