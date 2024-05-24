import { Process } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import { Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessServiceModellingProps {
  process: Process;
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
