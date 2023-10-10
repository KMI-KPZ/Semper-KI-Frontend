import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { ServiceType } from "../hooks/useService";
import FactoryIcon from "@mui/icons-material/Factory";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ServiceSelectItem from "./components/Item";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface ServiceSelectProps {
  processID?: string;
}

export interface ServiceSelectItemProps {
  serviceType: ServiceType;
  icon: React.ReactNode;
  active: boolean;
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
  const { processID } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("ProjectRoutes.Service.Select.title")}</Heading>
      <PermissionGate element="ProcessServiceSelection">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          {serviceSelectItems.map((item, index) => (
            <ServiceSelectItem {...item} key={index} processID={processID} />
          ))}
        </div>
      </PermissionGate>
    </div>
  );
};

export default ServiceSelect;
