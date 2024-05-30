import { Process } from "@/api/Process/Querys/useGetProcess";
import CardMenu from "@/components/CardMenu/CardMenu";
import { Container, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceCards from "./components/ServiceCards";

interface ServiceProps {
  process: Process;
}

const Service: React.FC<ServiceProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" className="relative bg-white p-3">
      <CardMenu title={t("Project.components.Info.button.menu")}></CardMenu>
      <Container width="full" justify="start">
        <Heading variant="h2">{t("Process.Service.Service.title")}</Heading>
      </Container>
      <ServiceCards />
    </Container>
  );
};

export default Service;
