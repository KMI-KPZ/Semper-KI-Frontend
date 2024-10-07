import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation } from "@component-library/index";
import { parseOntoNodesToEdges } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetNodeProperties from "@/api/Graph/Querys/useGetNodeProperties";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";
import useOrganization from "@/hooks/useOrganization";
import ResourcesNodeForm from "@/pages/Resources/components/NodeForm";
import useGetAdminNode from "@/api/Resources/Admin/Querys/useGetAdminNode";

interface ResourcesNodeProps {
  type: "edit" | "create" | "variant";
}

const AdminResourcesNode: React.FC<ResourcesNodeProps> = (props) => {
  const { type } = props;
  const { t } = useTranslation();
  const node = useGetAdminNode();
  const nodeType = node.data?.nodeType ?? "printer";
  const nodeProperties = useGetNodeProperties(nodeType);
  const { organization } = useOrganization();

  const allOrgaNodeNeighbors = useGetAllOrgaNodeNeighbors(
    node.data?.nodeID ?? ""
  );

  const edges =
    allOrgaNodeNeighbors.data !== undefined && node.data !== undefined
      ? allOrgaNodeNeighbors.data.filter(
          (edgeNode) => edgeNode.nodeID !== organization.hashedID
        )
      : [];

  if (
    (node.isLoading && (type === "edit" || type === "variant")) ||
    ((allOrgaNodeNeighbors.isLoading || allOrgaNodeNeighbors.isRefetching) &&
      (type === "edit" || type === "variant")) ||
    nodeProperties.isLoading
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
      edges={parseOntoNodesToEdges(edges)}
    />
  );
};

export default AdminResourcesNode;
