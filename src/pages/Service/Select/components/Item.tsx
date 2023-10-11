import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/Typography";
import { ServiceType } from "../../hooks/useService";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { useNavigate } from "react-router-dom";

export interface ServiceSelectItemProps {
  serviceType: ServiceType;
  icon: React.ReactNode;
  active: boolean;
  processID?: string;
  serviceSelected?: boolean;
}

const ServiceSelectItem: React.FC<ServiceSelectItemProps> = (props) => {
  const { active, icon, serviceType, processID, serviceSelected } = props;
  const { t } = useTranslation();
  const { updateProcess, updateProcessWithProcessID } = useProcess();
  const navigate = useNavigate();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (processID !== undefined)
      updateProcessWithProcessID.mutate({
        processID,
        updates: {
          changes: { service: { type: serviceType } },
        },
      });
    else updateProcess.mutate({ changes: { service: { type: serviceType } } });
    navigate(ServiceType[serviceType].toString().toLowerCase());
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
        {t(`ProjectRoutes.Service.type.${ServiceType[serviceType]}`)}
      </Text>
    </a>
  );
};

export default ServiceSelectItem;
