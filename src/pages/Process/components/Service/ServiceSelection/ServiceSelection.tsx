import useGetServices, {
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import { Container, LoadingAnimation } from "@component-library/index";
import React from "react";
import ServiceCard from "./components/ServiceCard";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";

import {useTopics} from "@/contexts/ChatbotContextProvider";
import {useEffect} from "react";

interface ServiceSelectionProps {}

const ServiceSelection: React.FC<ServiceSelectionProps> = (props) => {

  const {topics, maintopic, response: string, choices,userChoice, setTopics, setUserChoice, closeChatbot,removeTopics} = useTopics();

  useEffect(() => {
    if (userChoice) {
      // Perform actions based on the user choice
      console.log(`User made a choice: ${userChoice}`);
      debugger
      if (userChoice == "0") {
        handleOnClickCard(ServiceType.MANUFACTURING);
      }
      if (userChoice == "1") {
          handleOnClickCard(ServiceType.MODELING);
      }
      // Reset user choice after handling
      setUserChoice(null);

    }
  }, [userChoice, setUserChoice]);


  const {} = props;

  const updateProcess = useUpdateProcess();
  const { process } = useProcess();

  const services = useGetServices();



  const handleOnClickCard = (type: ServiceType) => {
    // logger("ServiceCards.tsx", "handleOnClickCard", "type", type);
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: { changes: { serviceType: type } },
    });
  };

  if (services.isLoading || services.data === undefined)
    return <LoadingAnimation />;
    console.log("running service selection");
    setTopics(new Map([["ServiceSelection", "Der Nutzer kann hier entscheiden ob er ein vorhandenes digitales 3D Modell drucken lassen will, oder erst einmal eins entwerfen lassen will z.B. aus einem pyhsischen Gegenstand. Sag ihm einfach die beiden Möglichkeiten und falls er fragt, gib mehr Details hinzu."],
        ["3d-print", "Ruft einige Parameter für die Rahmenbedingungen des Bauteils ab um dann diese mit den vorhandenen Herstellern und ihren Drucktechniken abzugleichen, so dass ein passender Hersteller gefunden wird. Der Nutzer kann dann den Druckauftrag erteilen."],
        ["3d-dev", "Der Nutzer kann hier ein 3D Modell entwerfen lassen. Dazu wird ein Designer beauftragt, der das Modell erstellt. Der Nutzer kann dann das Modell begutachten und ggf. Änderungen anfordern."]]),
        "ServiceSelection",
        "",
        {"0":"3d-print","1":"3d-dev"});
  return (
    <Container
      width="full"
      direction="row"
      align="start"
      justify="center"
      wrap="wrap"
      className="pb-5"
    >
      {services.data.map((service, index) => (
        <ServiceCard
          key={index}
          service={service}
          onClick={handleOnClickCard}
        />
      ))}
    </Container>
  );
};

export default ServiceSelection;
