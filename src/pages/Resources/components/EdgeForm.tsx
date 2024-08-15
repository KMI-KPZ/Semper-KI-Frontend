import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { OntoNodeType } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

interface ResourcesEdgeFormProps {
  nodeType: OntoNodeType;
}

const ResourcesEdgeForm: React.FC<ResourcesEdgeFormProps> = (props) => {
  const { nodeType } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <Heading variant="h3">
        {t("Resources.components.Edge.heading")}
        {t(`types.OntoNodeType.${nodeType}`)}
      </Heading>
    </Container>
  );
};

export default ResourcesEdgeForm;
