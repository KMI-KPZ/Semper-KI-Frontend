import Table from "@/components/Table";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useGetOntoNodes, {
  OntoNodeMaterial,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import ResourceTable from "../components/Table";
import useGetOntoNodeNeighbors from "@/api/Resources/Ontology/Querys/useGetOntoNodeNeighbors";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

interface ResourcesMaterialsTableProps {}

const ResourcesMaterialsTable: React.FC<ResourcesMaterialsTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const allMaterials = useGetOntoNodes<OntoNodeMaterial>("material");
  const ownMaterials = useGetOntoNodeNeighbors<OntoNodeMaterial>({
    nodeID: user.organization === undefined ? "" : user.organization,
    nodeType: "material",
  });

  if (allMaterials.isLoading || ownMaterials.isLoading)
    return <LoadingAnimation />;

  return (
    <Container direction="col" width="full">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Materials.table.header")}</Heading>
      </Container>
      {/* <PermissionGate element="ResourcesButtonAddMaterial">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
          <Button
            title={t("Resources.Materials.table.button.add")}
            to="/resources/materials/add"
            variant="secondary"
            size="sm"
          />
        </div>
      </PermissionGate> */}
      <Divider />
      <Container width="full" justify="start" direction="row">
        <Heading variant="h3">{t("Resources.Materials.table.own")}</Heading>
      </Container>

      <ResourceTable nodes={ownMaterials.data} nodeType="material" />
      <Divider />
      <Container width="full" justify="start" direction="row">
        <Heading variant="h3">{t("Resources.Materials.table.all")}</Heading>
      </Container>
      <ResourceTable
        nodes={allMaterials.data}
        nodeType="material"
        actionType="all"
      />
    </Container>
  );
};

export default ResourcesMaterialsTable;
