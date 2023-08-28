import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceSelectItemProps } from "../Select";
import { Text } from "@component-library/Typography";
import { ServiceType } from "../../hooks/useService";
import useSubOrder from "@/pages/Order/SubOrder/hooks/useSubOrder";

const ServiceSelectItem: React.FC<ServiceSelectItemProps> = (props) => {
  const { active, icon, serviceType, subOrderID } = props;
  const { t } = useTranslation();
  const { updateSubOrder, updateSubOrderWithSubOrderID } = useSubOrder();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (subOrderID !== undefined)
      updateSubOrderWithSubOrderID.mutate({
        subOrderID,
        updates: {
          changes: { service: { type: serviceType } },
        },
      });
    else updateSubOrder.mutate({ changes: { service: { type: serviceType } } });
  };

  return (
    <a
      onClick={handleOnClickCard}
      href={`/select/${ServiceType[serviceType]}`}
      className="flex w-fit flex-col items-center justify-center gap-5 rounded-xl bg-slate-100 p-5 duration-300 hover:cursor-pointer hover:bg-orange-200"
    >
      {icon}
      <Text variant="body">
        {t(`OrderRoutes.Service.type.${ServiceType[serviceType]}`)}
      </Text>
    </a>
  );
};

export default ServiceSelectItem;
