import useGetServices, {
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import { Container, LoadingAnimation } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "./components/ServiceCard";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";
import logger from "@/hooks/useLogger";
import useChatbot from "@/hooks/useChatbot";
import {useTopics} from "@/contexts/ChatbotContextProvider";
import {useEffect} from "react";

interface ServiceSelectionProps {}

const ServiceSelection: React.FC<ServiceSelectionProps> = (props) => {

  const {topics, maintopic, addTopics, removeTopics, setMainTopic} = useTopics();

  useEffect(() => {
    return () => {
      removeTopics(["ServiceSelection"]);
    }
  }, []);


  const {} = props;
  const { t } = useTranslation();

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

    addTopics(["ServiceSelection"]);
    setMainTopic("Serviceselection: 3D Modell drucken oder 3D Modell entwerfen?");
  return (
    <Container
      width="full"
      direction="row"
      align="start"
      justify="center"
      wrap="wrap"
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
