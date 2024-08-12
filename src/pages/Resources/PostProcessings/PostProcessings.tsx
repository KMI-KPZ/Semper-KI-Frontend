import useGetOntoNodes, {
  OntoNodeAdditionalRequirement,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
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

interface ResourcesPostProcessingsProps {}

const ResourcesPostProcessings: React.FC<ResourcesPostProcessingsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const allAdditionalrequirements =
    useGetOntoNodes<OntoNodeAdditionalRequirement>("additionalRequirement");
  const ownAdditionalRequirements =
    useGetOntoNodeNeighbors<OntoNodeAdditionalRequirement>({
      nodeID: user.organization === undefined ? "" : user.organization,
      nodeType: "additionalRequirement",
    });

  if (
    allAdditionalrequirements.isLoading ||
    ownAdditionalRequirements.isLoading
  )
    return <LoadingAnimation />;
  return (
    <Container direction="col" width="full">
      <Heading variant="h2">{t("Resources.PostProcessings.header")}</Heading>
      <Button
        title={t("Resources.PostProcessings.add")}
        to="/resources/materials/add"
        variant="secondary"
        size="sm"
      />
      <Divider />
      <Heading variant="h3">{t("Resources.PostProcessings.own")}</Heading>
      <ResourceTable
        nodes={ownAdditionalRequirements.data}
        nodeType="additionalRequirement"
      />
      <Divider />
      <Heading variant="h3">{t("Resources.PostProcessings.all")}</Heading>
      <ResourceTable
        nodes={allAdditionalrequirements.data}
        nodeType="additionalRequirement"
      />
    </Container>
  );
};

export default ResourcesPostProcessings;
