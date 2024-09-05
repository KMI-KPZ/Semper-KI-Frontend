import useGetServices, {
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import { Container, LoadingAnimation } from "@component-library/index";
import React from "react";
import ServiceCard from "./components/ServiceCard";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";

interface ServiceSelectionProps {}

const ServiceSelection: React.FC<ServiceSelectionProps> = (props) => {
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
