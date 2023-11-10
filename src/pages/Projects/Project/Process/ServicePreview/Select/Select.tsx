import { Heading } from "@component-library/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ServicePreviewSelectItem, {
  ServiceSelectItemProps,
} from "./components/Item";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { useParams } from "react-router-dom";
import useService, {
  GeneralServiceProps,
  ServiceType,
} from "@/pages/Service/hooks/useService";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";

interface ServiceSelectProps {
  process: ProcessProps;
}

interface ServiceSelectItemData {
  serviceType: ServiceType;
  icon: React.ReactNode;
  active: boolean;
}

export const serviceSelectItems: ServiceSelectItemData[] = [
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

const ServicePreviewSelect: React.FC<ServiceSelectProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("Service.Select.Select.title")}</Heading>
      <PermissionGate element="ProcessServiceSelection">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          {serviceSelectItems.map((item, index) => (
            <ServicePreviewSelectItem
              {...item}
              key={index}
              manuelProcessID={process.processID}
              active={process.service.type === item.serviceType}
              serviceSelected={process.service.type !== ServiceType.UNDEFINED}
            />
          ))}
        </div>
      </PermissionGate>
    </div>
  );
};

export default ServicePreviewSelect;
