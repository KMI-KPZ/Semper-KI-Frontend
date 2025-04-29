import {
  ServiceItemProps,
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import usePermissionGate from "@/components/PermissionGate/hooks/usePermissionGate";
import { Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ServiceCardProps {
  service: ServiceItemProps;
  onClick: (type: ServiceType) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const { service, onClick } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const handleOnClick = () => {
    if (hasPermission("ProcessEditService")) onClick(service.type);
  };

  return (
    <Container
      onClick={handleOnClick}
      direction="col"
      gap={3}
      className={twMerge(
        "max-w-[30%] justify-start self-stretch rounded-lg border-2 bg-white p-3 shadow-xl ring-0 ring-gray-200  duration-300  ",
        hasPermission("ProcessEditService")
          ? " hover:cursor-pointer hover:bg-gray-50 hover:ring-2"
          : "hover:cursor-not-allowed"
      )}
    >
      <Heading variant="h3">
        {t(
          `Process.components.Service.ServiceSelection.components.ServiceCard.heading.${
            ServiceType[service.type] as keyof typeof ServiceType
          }`
        )}
      </Heading>
      <img
        src={service.imgPath}
        alt=""
        className="max-h-40 w-full object-contain"
      />
      <Text>
        {t(
          `Process.components.Service.ServiceSelection.components.ServiceCard.description.${
            ServiceType[service.type] as keyof typeof ServiceType
          }`
        )}
      </Text>
    </Container>
  );
};

export default ServiceCard;
