import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation } from "@component-library/index";
import { OntoNodeType } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetNodeProperties from "@/api/Graph/Querys/useGetNodeProperties";
import ResourcesNodeForm, { getMatchingEdges } from "./NodeForm";
import useGetOrgaNode from "@/api/Resources/Organization/Querys/useGetOrgaNode";
import useResourcesNodeEdges from "@/hooks/useResourcesNodeEdges";

interface ResourcesNodeProps {
  type: "edit" | "create" | "variant";
  nodeType: OntoNodeType;
}

const ResourcesNode: React.FC<ResourcesNodeProps> = (props) => {
  const { nodeType, type } = props;
  const { t } = useTranslation();
  const node = useGetOrgaNode();
  const nodeProperties = useGetNodeProperties(nodeType);
  const { edges, isLoading: edgesAreLoading } = useResourcesNodeEdges({
    nodeID: node.data?.nodeID ?? "",
    types: getMatchingEdges(nodeType),
  });

  if (
    (node.isLoading && (type === "edit" || type === "variant")) ||
    nodeProperties.isLoading ||
    edgesAreLoading
  )
    return <LoadingAnimation />;
  if (
    (node.data === undefined && (type === "edit" || type === "variant")) ||
    nodeProperties.data === undefined
  )
    return <Container>{t("Resources.components.Edit.error")}</Container>;

  return (
    <ResourcesNodeForm
      type={type}
      nodeType={nodeType}
      nodeProperties={nodeProperties.data}
      node={node.data}
      edges={edges}
    />
  );
};

export default ResourcesNode;
