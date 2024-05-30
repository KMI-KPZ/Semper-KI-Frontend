import useGetServices from "@/api/Service/Querys/useGetServices";
import { Container, LoadingAnimation } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";

interface ServiceCardsProps {


const ServiceCards: React.FC<ServiceCardsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const services = useGetServices();

  if (services.isLoading) return <LoadingAnimation />;
  return (
    <Container
      width="full"
      direction="row"
      align="start"
      justify="center"
      wrap="wrap"
    >
      {services.data?.map((service) => (
        <ServiceCard key={service.identifier} service={service} />    
    )}
    </Container>
  );
};

export default ServiceCards;
