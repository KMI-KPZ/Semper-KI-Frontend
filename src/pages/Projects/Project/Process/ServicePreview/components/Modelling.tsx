import { ProcessProps } from "@/pages/Projects/hooks/useProcess";
import { ModelingServiceProps } from "@/pages/Service/Modelling/Modelling";
import Container from "@component-library/Container";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessServiceModellingProps {
  process: ProcessProps;
}

const ProcessServiceModelling: React.FC<ProcessServiceModellingProps> = (
  props
) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <Container>
      <Text variant="body">
        {t(
          "Projects.Project.Process.ServicePreview.components.Modelling.title"
        )}
      </Text>
    </Container>
  );
};

export default ProcessServiceModelling;
