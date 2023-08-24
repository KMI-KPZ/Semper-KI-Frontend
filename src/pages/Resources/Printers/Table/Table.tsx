import Table from "@/components/Table";
import { Button } from "@component-library/Button";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import useOntoPrinters from "../../hooks/useOntoPrinters";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface ResourcesPrintersTableProps {}

const ResourcesPrintersTable: React.FC<ResourcesPrintersTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { printersQuery } = useOntoPrinters({});

  const handleOnClickDelete = (materialID: string) => {};

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Printers.table.header")}</Heading>
      <PermissionGate element="ResourcesButtonAddPrinter">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
          <Button
            title={t("Resources.Printers.table.button.add")}
            to="/resources/printers/add"
          />
        </div>
      </PermissionGate>
      <LoadingSuspense
        query={printersQuery}
        errorText={t("Resources.Printers.table.empty")}
      >
        <Divider />
        {printersQuery.data !== undefined && printersQuery.data.length > 0 ? (
          <Table
            header={[
              <Heading variant="h3">
                {t("Resources.Printers.table.name")}
              </Heading>,
              <Heading variant="h3">
                {t("Resources.Printers.table.actions")}
              </Heading>,
            ]}
            rows={printersQuery.data.map((material, index) => [
              <Text variant="body">{material.title}</Text>,
              <div className="flex flex-row items-center justify-center gap-5">
                <Button title={t("Resources.Printers.table.button.delete")} />
              </div>,
            ])}
          />
        ) : (
          t("Resources.Printers.table.empty")
        )}
      </LoadingSuspense>
    </div>
  );
};

export default ResourcesPrintersTable;
