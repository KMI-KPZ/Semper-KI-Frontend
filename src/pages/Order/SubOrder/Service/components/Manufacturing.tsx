import Contact from "@/pages/Legal/Contact/Contact";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ServiceManufacturingProps } from "@/pages/Service/Manufacturing/types";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderServiceManufacturingProps {
  service: ServiceManufacturingProps;
}

const SubOrderServiceManufacturing: React.FC<
  SubOrderServiceManufacturingProps
> = (props) => {
  const { service } = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" align="start" className="p-5">
      <Container>
        <Text variant="body">Modell:</Text>
        <Text variant="body">
          {service.model === undefined ? "---" : service.model.title}
        </Text>
      </Container>
      <Container>
        <Text variant="body">Material:</Text>
        <Text variant="body">
          {service.material === undefined ? "---" : service.material.title}
        </Text>
      </Container>
      <Container>
        <Text variant="body">Nachbeabeitungen:</Text>
        <Text variant="body">
          {service.postProcessings === undefined
            ? "---"
            : service.postProcessings.map(
                (postProcessing: PostProcessingProps) => postProcessing.title
              )}
        </Text>
      </Container>
    </Container>
  );
};

export default SubOrderServiceManufacturing;
