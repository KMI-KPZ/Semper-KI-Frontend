import { Heading } from "@component-library/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import useService, { ServiceType } from "../hooks/useService";
import FactoryIcon from "@mui/icons-material/Factory";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ServiceSelectItem, { ServiceSelectItemProps } from "./components/Item";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { useParams } from "react-router-dom";

interface ServiceSelectProps {
  processID?: string;
}

export const serviceSelectItems: ServiceSelectItemProps[] = [
  {
    serviceType: ServiceType.MANUFACTURING,
    icon: <FactoryIcon />,
    active: true,
  },
  {
    serviceType: ServiceType.MODELING,
    icon: <ViewInArIcon />,
    active: false,
  },
];

const ServiceSelect: React.FC<ServiceSelectProps> = (props) => {
  const { processID: manuelProcessID } = props;
  const { processID } = useParams();
  const { t } = useTranslation();
  const { getService } = useService();

  const service = getService();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("ProjectRoutes.Service.Select.title")}</Heading>
      <PermissionGate element="ProcessServiceSelection">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          {serviceSelectItems.map((item, index) => (
            <ServiceSelectItem
              {...item}
              key={index}
              processID={processID}
              active={service.type === item.serviceType}
              serviceSelected={service.type !== ServiceType.UNDEFINED}
            />
          ))}
        </div>
      </PermissionGate>
    </div>
  );
};

export default ServiceSelect;
