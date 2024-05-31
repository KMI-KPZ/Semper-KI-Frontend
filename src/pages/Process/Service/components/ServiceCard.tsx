import {
  DisplayService,
  ServiceItemProps,
  ServiceProps,
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import { Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  service: ServiceItemProps;
  onClick: (type: ServiceType) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const { service, onClick } = props;
  const { t } = useTranslation();

  const handleOnClick = () => {
    onClick(service.type);
  };

  return (
    <Container
      onClick={handleOnClick}
      direction="col"
      gap={3}
      className="max-w-[30%] rounded-lg border-2 p-2 shadow-xl ring-0 ring-gray-200  duration-300 hover:cursor-pointer hover:bg-gray-50 hover:ring-2"
    >
      <Heading variant="h3">
        {t(
          `Process.Service.components.ServiceCard.title.${
            ServiceType[service.type] as keyof typeof ServiceType
          }`
        )}
      </Heading>
      <img src={service.imgPath} alt="" />
      <Text>
        {t(
          `Process.Service.components.ServiceCard.description.${
            ServiceType[service.type] as keyof typeof ServiceType
          }`
        )}
      </Text>
    </Container>
  );
};

export default ServiceCard;
