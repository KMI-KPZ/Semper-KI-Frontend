import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceSelectItemProps } from "../Select";
import { Text } from "@component-library/Typography";
import { ServiceType } from "../../hooks/useService";
import useProcess from "@/pages/Projects/hooks/useProcess";

const ServiceSelectItem: React.FC<ServiceSelectItemProps> = (props) => {
  const { active, icon, serviceType, processID } = props;
  const { t } = useTranslation();
  const { updateProcess, updateProcessWithProcessID } = useProcess();

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
  };

  return (
    <a
      onClick={handleOnClickCard}
      href={`/select/${ServiceType[serviceType]}`}
      className="flex w-fit flex-col items-center justify-center gap-5 rounded-xl bg-slate-100 p-5 duration-300 hover:cursor-pointer hover:bg-orange-200"
    >
      {icon}
      <Text variant="body">
        {t(`ProjectRoutes.Service.type.${ServiceType[serviceType]}`)}
      </Text>
    </a>
  );
};

export default ServiceSelectItem;
