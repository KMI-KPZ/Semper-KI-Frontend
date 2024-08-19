import Table from "@/components/Table";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ResourceTable from "../components/Table";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

import useRessourcesTableItem from "@/hooks/useRessourcesTableItem";
import useGetOrgaNodes from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";

interface ResourcesPrintersTableProps {}

const ResourcesPrintersTable: React.FC<ResourcesPrintersTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const allPrinters = useGetOrgaNodes("printer");
  const ownPrinters = useGetOrgaNodeNeighbors({
    nodeID: user.organization === undefined ? "" : user.organization,
    nodeType: "printer",
  });
  const { createRersourcesTableItem } = useRessourcesTableItem();

  if (allPrinters.isLoading || ownPrinters.isLoading)
    return <LoadingAnimation />;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Printers.table.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" justify="between" direction="row">
        <Heading variant="h3">{t("Resources.Printers.table.own")}</Heading>
        <Button
          title={t("Resources.Printers.table.button.createOwn")}
          variant="secondary"
          size="sm"
          width="fit"
          to="create"
        />
      </Container>
      <ResourceTable
        nodes={createRersourcesTableItem(ownPrinters.data, allPrinters.data)}
        nodeType="printer"
      />
      {/* <Divider />
      <Container width="full" justify="between" direction="row">
        <Heading variant="h3">{t("Resources.Printers.table.all")}</Heading>
      </Container>
      <ResourceTable
        nodes={allPrinters.data}
        nodeType="printer"
        actionType="all"
      /> */}
    </Container>
  );
};

export default ResourcesPrintersTable;
