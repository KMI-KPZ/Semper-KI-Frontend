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

import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetOrgaNodes from "@/api/Resources/Organization/Querys/useGetOrgaNodes";

interface ResourcesPostProcessingsProps {}

const ResourcesPostProcessings: React.FC<ResourcesPostProcessingsProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const additionalrequirements = useGetOrgaNodes("additionalRequirement");
  if (additionalrequirements.isLoading) return <LoadingAnimation />;
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
          width="fit"
          variant="secondary"
          size="sm"
        />
      </Container>
      <ResourceTable
        nodes={additionalrequirements.data?.filter(
          (node) => node.createdBy !== "SYSTEM"
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
