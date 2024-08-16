import Table from "@/components/Table";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useGetOntoNodes, {
  OntoNode,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import ResourceTable from "../components/Table";
import useGetOntoNodeNeighbors from "@/api/Resources/Ontology/Querys/useGetOntoNodeNeighbors";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useRessourcesTableItem from "@/hooks/useRessourcesTableItem";

interface ResourcesMaterialsTableProps {}

const ResourcesMaterialsTable: React.FC<ResourcesMaterialsTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const allMaterials = useGetOntoNodes("material");
  const ownMaterials = useGetOntoNodeNeighbors({
    nodeID: user.organization === undefined ? "" : user.organization,
    nodeType: "material",
  });
  const { createRersourcesTableItem } = useRessourcesTableItem();

  if (allMaterials.isLoading || ownMaterials.isLoading)
    return <LoadingAnimation />;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Materials.table.header")}</Heading>
      </Container>

      <Divider />
      <Container width="full" justify="between" direction="row">
        <Heading variant="h3">{t("Resources.Materials.table.own")}</Heading>
        <PermissionGate element="ResourcesButtonAddMaterial">
          <Button
            title={t("Resources.Materials.table.button.createOwn")}
            to="create"
            variant="secondary"
            size="sm"
          />
        </PermissionGate>
      </Container>
      <ResourceTable
        nodes={createRersourcesTableItem(ownMaterials.data, allMaterials.data)}
        nodeType="material"
      />
    </Container>
  );
};

export default ResourcesMaterialsTable;
