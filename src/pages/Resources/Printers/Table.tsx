import Table from "@/components/Table";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import { Divider, LoadingSuspense } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useOntoPrinters from "@/hooks/useOntoPrinters";
import ResourceTable from "../components/Table";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetOntoNodes, {
  OntoNodePrinter,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetOntoNodeNeighbors from "@/api/Resources/Ontology/Querys/useGetOntoNodeNeighbors";

interface ResourcesPrintersTableProps {}

const ResourcesPrintersTable: React.FC<ResourcesPrintersTableProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const allPrinters = useGetOntoNodes<OntoNodePrinter>("printer");
  const ownPrinters = useGetOntoNodeNeighbors<OntoNodePrinter>({
    nodeID: user.organization === undefined ? "" : user.organization,
    nodeType: "printer",
  });

  if (allPrinters.isLoading || ownPrinters.isLoading)
    return <LoadingAnimation />;

  return (
    <Container direction="col" width="full">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Printers.table.header")}</Heading>
      </Container>
      {/* <PermissionGate element="ResourcesButtonAddPrinter">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-col">
          <Button
            title={t("Resources.Printers.table.button.add")}
            to="/resources/printers/add"
            variant="secondary"
            size="sm"
          />
        </div>
      </PermissionGate> */}
      <Divider />
      <Container width="full" justify="start" direction="row">
        <Heading variant="h3">{t("Resources.Printers.table.own")}</Heading>
      </Container>
      <ResourceTable nodes={ownPrinters.data} nodeType="printer" />
      <Divider />
      <Container width="full" justify="start" direction="row">
        <Heading variant="h3">{t("Resources.Printers.table.all")}</Heading>
      </Container>
      <ResourceTable
        nodes={allPrinters.data}
        nodeType="printer"
        actionType="all"
      />
    </Container>
  );
};

export default ResourcesPrintersTable;
