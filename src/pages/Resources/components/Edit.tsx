import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation } from "@component-library/index";
import { OntoNodeType } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetOntoNode from "@/api/Resources/Ontology/Querys/useGetOntoNode";
import useGetNodeProperties from "@/api/Graph/Querys/useGetNodeProperties";
import ResourcesNodeEditForm from "./EditForm";

interface ResourcesNodeEditProps {
  type: "edit" | "create" | "variant";
  nodeType: OntoNodeType;
}

const ResourcesNodeEdit: React.FC<ResourcesNodeEditProps> = (props) => {
  const { nodeType, type } = props;
  const { t } = useTranslation();
  const node = useGetOntoNode();
  const nodeProperties = useGetNodeProperties(nodeType);

  if (
    (node.isLoading && (type === "edit" || type === "variant")) ||
    nodeProperties.isLoading
  )
    return <LoadingAnimation />;
  if (
    (node.data === undefined && (type === "edit" || type === "variant")) ||
    nodeProperties.data === undefined
  )
    return <Container>{t("Resources.components.Edit.error")}</Container>;

  return (
    <ResourcesNodeEditForm
      type={type}
      nodeType={nodeType}
      nodeProperties={nodeProperties.data}
      node={node.data}
    />
  );
};

export default ResourcesNodeEdit;
