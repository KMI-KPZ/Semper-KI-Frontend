import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import {
  OntoNodeType,
  adminNodeTypes,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

interface AdminResourcesButtonsProps {
  nodeType?: OntoNodeType;
}

const AdminResourcesButtons: React.FC<AdminResourcesButtonsProps> = (props) => {
  const { nodeType } = props;
  const { t } = useTranslation();

  return (
    <Container width="full">
      {adminNodeTypes.map((_nodeType, index) => (
        <Button
          key={index}
          title={t(`types.OntoNodeType.${_nodeType}`)}
          size="sm"
          variant={_nodeType === nodeType ? "primary" : "secondary"}
          to={nodeType === undefined ? `${_nodeType}` : `../${_nodeType}`}
        />
      ))}
    </Container>
  );
};

export default AdminResourcesButtons;
