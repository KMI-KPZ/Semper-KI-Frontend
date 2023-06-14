import Table from "@/components/Table";
import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { OntoMaterialFlat } from "../../types/types";

interface ResourcesMaterialsTableProps {}

const ResourcesMaterialsTable: React.FC<ResourcesMaterialsTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">{t("Resources.Materials.table.header")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
        <Button
          title={t("Resources.Materials.table.button.add")}
          to="/resources/materials/add"
        />
      </div>
      {/* <Table header={} /> */}
    </div>
  );
};

export default ResourcesMaterialsTable;
