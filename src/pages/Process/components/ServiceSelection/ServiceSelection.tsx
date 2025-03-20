import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useGetServices, {
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import ProcessContainer from "@/components/Process/Container/Container";
import {
  Container,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import ServiceCard from "./components/ServiceCard";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { useTopics } from "@/contexts/ChatbotContextProvider";

interface ServiceSelectionProps {
  process: Process;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  const updateProcess = useUpdateProcess();
  const services = useGetServices();

  const pageTitle = `${
    process.serviceType === undefined ||
    process.serviceType === ServiceType.NONE
      ? t("Process.components.Service.noType")
      : t(
          `enum.ServiceType.${
            ServiceType[process.serviceType] as keyof typeof ServiceType
          }`
        )
  }`;

  const { userChoice, setTopics, setUserChoice } = useTopics();

  useEffect(() => {
    if (userChoice) {
      // Perform actions based on the user choice

      if (userChoice == "2") {
        handleOnClickCard(ServiceType.ADDITIVE_MANUFACTURING);
      }
      if (userChoice == "1") {
        handleOnClickCard(ServiceType.CREATE_MODEL);
      }
      // Reset user choice after handling
      setUserChoice(null);
    }
  }, [userChoice, setUserChoice]);

  const handleOnClickCard = (type: ServiceType) => {
    // logger("ServiceCards.tsx", "handleOnClickCard", "type", type);
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: { changes: { serviceType: type } },
    });
  };

  setTopics(
    new Map([
      [
        "ServiceSelection",
        "Der Nutzer kann hier entscheiden ob er ein vorhandenes digitales 3D Modell drucken lassen will, oder erst einmal eins entwerfen lassen will z.B. aus einem pyhsischen Gegenstand. Sag ihm einfach die beiden Möglichkeiten und falls er fragt, gib mehr Details hinzu.",
      ],
      [
        "3d-print",
        "Ruft einige Parameter für die Rahmenbedingungen des Bauteils ab um dann diese mit den vorhandenen Herstellern und ihren Drucktechniken abzugleichen, so dass ein passender Hersteller gefunden wird. Der Nutzer kann dann den Druckauftrag erteilen.",
      ],
      [
        "3d-dev",
        "Der Nutzer kann hier ein 3D Modell entwerfen lassen. Dazu wird ein Designer beauftragt, der das Modell erstellt. Der Nutzer kann dann das Modell begutachten und ggf. Änderungen anfordern.",
      ],
    ]),
    "ServiceSelection",
    "",
    { "1": "3d-dev", "2": "3d-print" },
    null
  );

  if (services.isLoading || services.data === undefined)
    return <LoadingAnimation />;

  const selectedService = services.data.find(
    (service) => service.type === process.serviceType
  );

  return (
    <ProcessContainer
      id="ServiceSelection"
      start={ProcessStatus.DRAFT}
      end={ProcessStatus.DRAFT}
      titleAddition={pageTitle}
    >
      {selectedService === undefined ? (
        <Container
          width="full"
          direction="row"
          items="start"
          justify="center"
          wrap="wrap"
          id="Process-ServiceType"
        >
          {services.data.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onClick={handleOnClickCard}
            />
          ))}
        </Container>
      ) : (
        <Container
          width="full"
          direction="row"
          className="rounded-md border-2 bg-white p-5"
        >
          <img
            src={selectedService.imgPath}
            alt=""
            className="max-h-40 w-fit object-contain"
          />
          <Container width="full" direction="col">
            <Heading variant="h3">
              {t(
                `Process.components.Service.ServiceSelection.components.ServiceCard.heading.${
                  ServiceType[selectedService.type] as keyof typeof ServiceType
                }`
              )}
            </Heading>
            <Text className="text-center">
              {t(
                `Process.components.Service.ServiceSelection.components.ServiceCard.description.${
                  ServiceType[selectedService.type] as keyof typeof ServiceType
                }`
              )}
            </Text>
          </Container>
        </Container>
      )}
    </ProcessContainer>
  );
};

export default ServiceSelection;
