import useGetOntoNodes from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ResourceTable from "../components/Table";
import useGetOntoNodeNeighbors from "@/api/Resources/Ontology/Querys/useGetOntoNodeNeighbors";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useRessourcesTableItem from "@/hooks/useRessourcesTableItem";

interface ResourcesPostProcessingsProps {}

const ResourcesPostProcessings: React.FC<ResourcesPostProcessingsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const allAdditionalrequirements = useGetOntoNodes("additionalRequirement");
  const ownAdditionalRequirements = useGetOntoNodeNeighbors({
    nodeID: user.organization === undefined ? "" : user.organization,
    nodeType: "additionalRequirement",
  });
  const { createRersourcesTableItem } = useRessourcesTableItem();
  if (
    allAdditionalrequirements.isLoading ||
    ownAdditionalRequirements.isLoading
  )
    return <LoadingAnimation />;
  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.PostProcessings.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" justify="between" direction="row">
        <Heading variant="h3">{t("Resources.PostProcessings.own")}</Heading>
        <Button
          title={t("Resources.PostProcessings.button.createOwn")}
          to="create"
          variant="secondary"
          size="sm"
        />
      </Container>
      <ResourceTable
        nodes={createRersourcesTableItem(
          ownAdditionalRequirements.data,
          allAdditionalrequirements.data
        )}
        nodeType="additionalRequirement"
      />
      {/* <Divider />
      <Container width="full" justify="start" direction="row">
        <Heading variant="h3">{t("Resources.PostProcessings.all")}</Heading>
      </Container>
      <ResourceTable
        nodes={allAdditionalrequirements.data}
        nodeType="additionalRequirement"
        actionType="all"
      /> */}
    </Container>
  );
};

export default ResourcesPostProcessings;
