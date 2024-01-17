import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { LoadingAnimation, Text } from "@component-library/index";
import { Error } from "@/pages/Error/Error";
import FactoryIcon from "@mui/icons-material/Factory";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { ServiceType } from "@/pages/Service/hooks/useService";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { ProcessProps, ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import logger from "@/hooks/useLogger";
import useServiceQuerys from "@/api/Service/useServiceQuerys";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";

interface ProcessServiceSelectProps {
  process: ProcessProps;
}

const ProcessServiceSelect: React.FC<ProcessServiceSelectProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { servicesQuery } = useServiceQuerys();
  const { updateProcess } = useGeneralProcess();

  const getIcon = (serviceType: ServiceType) => {
    switch (serviceType) {
      case ServiceType.MANUFACTURING:
        return <FactoryIcon />;
      case ServiceType.MODELING:
        return <ViewInArIcon />;
      default:
        return <DesignServicesIcon />;
    }
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    serviceType: ServiceType
  ) => {
    e.preventDefault();
    updateProcess({
      processIDs: [process.processID],
      updates: {
        changes: {
          serviceType,
          processStatus: ProcessStatus.SERVICE_IN_PROGRESS,
        },
      },
    });
  };

  if (servicesQuery.isLoading) return <LoadingAnimation />;
  if (servicesQuery.isFetched && servicesQuery.data !== undefined)
    return (
      <Container width="full" className="flex-wrap">
        {servicesQuery.data.map((service, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => handleOnClickCard(e, service.identifier)}
            className="
            flex flex-col items-center justify-center gap-5 rounded-xl 
             border-2  border-blau-button p-5 shadow-card duration-300
            hover:cursor-pointer hover:shadow-button-inner-primary focus:shadow-button-inner-primary
            "
          >
            {getIcon(service.identifier)}
            <Text>
              {t(
                `enum.ServiceType.${
                  ServiceType[service.identifier] as keyof typeof ServiceType
                }`
              )}
            </Text>
          </a>
        ))}
      </Container>
    );
  return <Error />;
};

export default ProcessServiceSelect;
