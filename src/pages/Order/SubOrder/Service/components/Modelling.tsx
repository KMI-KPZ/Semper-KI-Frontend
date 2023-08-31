import { ServiceModellingProps } from "@/pages/Service/Modelling/Modelling";
import Container from "@component-library/Container";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderServiceModellingProps {
  service: ServiceModellingProps;
}

const SubOrderServiceModelling: React.FC<SubOrderServiceModellingProps> = (
  props
) => {
  const { service } = props;
  const { t } = useTranslation();

  return (
    <Container>
      <Text variant="body">Modell entwerfen</Text>
    </Container>
  );
};

export default SubOrderServiceModelling;
