import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ResourceTable from "../components/Table";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";
import useOrganization from "@/hooks/useOrganization";

interface ResourcesPrintersTableProps {}

const ResourcesPrintersTable: React.FC<ResourcesPrintersTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();
  const printers = useGetOrgaNodeNeighbors({
    nodeID: organization.hashedID,
    nodeType: "printer",
  });

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
      {printers.isLoading ? (
        <LoadingAnimation />
      ) : (
        <ResourceTable
          nodes={printers.data?.filter((node) => node.createdBy !== "SYSTEM")}
          nodeType="printer"
        />
      )}
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
