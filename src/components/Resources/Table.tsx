import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ResourceTable from "../../pages/Resources/components/Table";
import { Navigate, useParams } from "react-router-dom";
import { isOntoNodeType } from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import useOrganization from "@/hooks/useOrganization";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";

interface ResourcesNodeTableProps {}

const ResourcesNodeTable: React.FC<ResourcesNodeTableProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const { nodeType: unsafeNodeType } = useParams();

  const nodeType =
    unsafeNodeType !== undefined && isOntoNodeType(unsafeNodeType)
      ? unsafeNodeType
      : undefined;

  const { organization } = useOrganization();

  const nodes = useGetOrgaNodeNeighbors({
    nodeID: organization.hashedID,
    nodeType,
  });

  if (nodes.error || nodeType === undefined) return <Navigate to=".." />;
  if (nodes.isLoading) return <LoadingAnimation />;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t(`types.OntoNodeType.${nodeType}`)}</Heading>
      </Container>
      <Divider />
      <Container width="full" justify="between" direction="row">
        <Heading variant="h3">
          {t("Resources.Table.subHeading", {
            name: t(`types.OntoNodeType.${nodeType}`),
          })}
        </Heading>
        <Button
          title={t("Resources.Printers.table.button.createOwn")}
          variant="secondary"
          size="sm"
          width="fit"
          to="create"
        />
      </Container>
      <ResourceTable
        nodes={nodes.data.filter((node) => node.createdBy !== "SYSTEM")}
        nodeType="printer"
      />
    </Container>
  );
};

export default ResourcesNodeTable;
