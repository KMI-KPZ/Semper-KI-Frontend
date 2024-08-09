import Table from "@/components/Table";
import { Button } from "@component-library/index";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useGetOntoNodes, {
  OntoNodeMaterial,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

interface ResourcesMaterialsTableProps {}

const ResourcesMaterialsTable: React.FC<ResourcesMaterialsTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const materialsQuery = useGetOntoNodes("material");
  const materials: OntoNodeMaterial[] =
    materialsQuery.data as OntoNodeMaterial[];

  const handleOnClickDelete = (materialID: string) => {};

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Materials.table.header")}</Heading>
      <PermissionGate element="ResourcesButtonAddMaterial">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
          <Button
            title={t("Resources.Materials.table.button.add")}
            to="/resources/materials/add"
            variant="primary"
          />
        </div>
      </PermissionGate>
      <LoadingSuspense
        query={materialsQuery}
        errorText={t("Resources.Materials.table.empty")}
      >
        <Divider />
        {materialsQuery.data !== undefined && materialsQuery.data.length > 0 ? (
          <Table
            header={[
              <Heading variant="h3">
                {t("Resources.Materials.table.name")}
              </Heading>,
              <Heading variant="h3">
                {t("Resources.Materials.table.actions")}
              </Heading>,
            ]}
            rows={materials.map((material, index) => [
              <Text variant="body">{material.nodeName}</Text>,
              <div className="flex flex-row items-center justify-center gap-5">
                <Button title={t("Resources.Materials.table.button.delete")} />
              </div>,
            ])}
          />
        ) : (
          t("Resources.Materials.table.empty")
        )}
      </LoadingSuspense>
    </div>
  );
};

export default ResourcesMaterialsTable;
