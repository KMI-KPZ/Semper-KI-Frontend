import { Heading } from "@component-library/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import useService, { ServiceType } from "../hooks/useService";
import FactoryIcon from "@mui/icons-material/Factory";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ServiceSelectItem, { ServiceSelectItemProps } from "./components/Item";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { useParams } from "react-router-dom";
import { Button } from "@component-library/Button";
import { LoadingSuspense } from "@component-library/index";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { ServiceContext } from "../context/ServiceContext";

interface ServiceSelectProps {}

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
  const {} = props;
  const { t } = useTranslation();
  const { process } = useContext(ProcessContext);
  const service = process.service;

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h1">{t("Service.Select.Select.title")}</Heading>
      <PermissionGate element="ProcessServiceSelection">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          {serviceSelectItems.map((item, index) => (
            <ServiceSelectItem
              {...item}
              key={index}
              active={process.serviceType === item.serviceType}
              serviceSelected={process.serviceType !== ServiceType.NONE}
            />
          ))}
        </div>
        {service !== undefined && process.serviceType !== ServiceType.NONE ? (
          <Button title={t("Service.Select.Select.continue")} to="edit" />
        ) : null}
      </PermissionGate>
    </div>
  );
};

export default ServiceSelect;
