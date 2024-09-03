import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";
import useOrganization from "@/hooks/useOrganization";
import ResourceTable from "../components/Table";

interface ResourcesMaterialsTableProps {}

const ResourcesMaterialsTable: React.FC<ResourcesMaterialsTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();
  const materials = useGetOrgaNodeNeighbors({
    nodeID: organization.hashedID,
    nodeType: "material",
  });

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
            width="fit"
          />
        </PermissionGate>
      </Container>
      {materials.isLoading ? (
        <LoadingAnimation />
      ) : (
        <ResourceTable
          nodes={materials.data?.filter((node) => node.createdBy !== "SYSTEM")}
          nodeType="material"
        />
      )}
    </Container>
  );
};

export default ResourcesMaterialsTable;
