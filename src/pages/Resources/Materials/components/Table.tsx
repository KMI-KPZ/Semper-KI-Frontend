import Table from "@/components/Table";
import { Button } from "@component-library/Button";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import useOntoMaterials from "../../hooks/useOntoMaterials";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface ResourcesMaterialsTableProps {}

const ResourcesMaterialsTable: React.FC<ResourcesMaterialsTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { materialsQuery } = useOntoMaterials({});

  const handleOnClickDelete = (materialID: string) => {};

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Materials.table.header")}</Heading>
      <PermissionGate element="ResourcesMaterialsAddButton">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
          <Button
            title={t("Resources.Materials.table.button.add")}
            to="/resources/materials/add"
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
            rows={materialsQuery.data.map((material, index) => [
              <Text variant="body">{material.title}</Text>,
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
