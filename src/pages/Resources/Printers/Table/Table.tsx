import Table from "@/components/Table";
import { Button } from "@component-library/index";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useOntoPrinters from "@/hooks/useOntoPrinters";

interface ResourcesPrintersTableProps {}

const ResourcesPrintersTable: React.FC<ResourcesPrintersTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { allPrinters, ownPrinters } = useOntoPrinters();

  const handleOnClickDelete = (materialID: string) => {};

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Printers.table.header")}</Heading>
      <PermissionGate element="ResourcesButtonAddPrinter">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
          <Button
            title={t("Resources.Printers.table.button.add")}
            to="/resources/printers/add"
            variant="primary"
          />
        </div>
      </PermissionGate>
      <Divider />
      <Heading variant="h3">{t("Resources.Printers.table.ownPrinter")}</Heading>
      {ownPrinters.length > 0 ? (
        <Table
          header={[
            <Heading variant="h3">
              {t("Resources.Printers.table.name")}
            </Heading>,
            <Heading variant="h3">
              {t("Resources.Printers.table.actions")}
            </Heading>,
          ]}
          rows={ownPrinters.map((printer, index) => [
            <Text variant="body">{printer.nodeName}</Text>,
            <div className="flex flex-row items-center justify-center gap-5">
              <Button
                size="sm"
                title={t("Resources.Printers.table.button.delete")}
              />
              <Button
                size="sm"
                title={t("Resources.Printers.table.button.edit")}
              />
            </div>,
          ])}
        />
      ) : (
        t("Resources.Printers.table.empty")
      )}
      <Divider />
      <Heading variant="h3">{t("Resources.Printers.table.allPrinter")}</Heading>
      {allPrinters.length > 0 ? (
        <Table
          header={[
            <Heading variant="h3">
              {t("Resources.Printers.table.name")}
            </Heading>,
            <Heading variant="h3">
              {t("Resources.Printers.table.actions")}
            </Heading>,
          ]}
          rows={allPrinters.map((printer, index) => [
            <Text variant="body">{printer.nodeName}</Text>,
            <div className="flex flex-row items-center justify-center gap-5">
              <Button
                size="sm"
                title={t("Resources.Printers.table.button.delete")}
              />
              <Button
                size="sm"
                title={t("Resources.Printers.table.button.edit")}
              />
            </div>,
          ])}
        />
      ) : (
        t("Resources.Printers.table.empty")
      )}
    </div>
  );
};

export default ResourcesPrintersTable;
