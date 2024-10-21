import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import useOrganization from "@/hooks/useOrganization";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";
import useGetOrganizationUsers from "@/api/Organization/Querys/useGetOrganizationUsers";
import HomeProgressItem, { HomeProgressItemData } from "./ProgressItem";
import HomeContainer from "./Container";

interface HomeOrgaAccountProgressProps {}

const HomeOrgaAccountProgress: React.FC<HomeOrgaAccountProgressProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();
  const getAllNodeNeighbours = useGetAllOrgaNodeNeighbors(
    organization.hashedID
  );
  const userQuery = useGetOrganizationUsers();

  const items: HomeProgressItemData[] = [
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.general"),
      finished: organization.name !== "",
      link: "organization#OrganizationInfo",
    },
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.services"),
      finished:
        organization.supportedServices !== undefined &&
        organization.supportedServices.length > 0,
      link: "organization#OrganizationInfo",
    },
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.resources"),
      finished:
        getAllNodeNeighbours.data !== undefined &&
        getAllNodeNeighbours.data.length > 0,
      link: "resources",
    },
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.priorities"),
      finished:
        organization.details.priorities !== undefined &&
        organization.details.priorities.length > 0,
      link: "organization#PrioritiesForm",
    },
    {
      title: t(
        "Home.components.HomeOrgaAccountProgress.items.notificationSettings"
      ),
      finished:
        organization.details.notificationSettings !== undefined &&
        organization.details.notificationSettings.organization !== undefined &&
        organization.details.notificationSettings.organization.length > 0,
      link: "organization#NotificationForm",
    },
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.branding"),
      finished:
        organization.details.branding !== undefined &&
        organization.details.branding.logo_url !== undefined &&
        organization.details.branding.logo_url !== "" &&
        organization.details.branding.colors.page_background !== undefined &&
        organization.details.branding.colors.page_background !== "",
      link: "organization#OrganizationInfo",
    },
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.adresses"),
      finished:
        organization.details.addresses !== undefined &&
        organization.details.addresses.length > 0,
      link: "organization/#OrganizationAddress",
    },
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.user"),
      finished: userQuery.data !== undefined && userQuery.data.length > 0,
      link: "organization/#OrganizationUserTable",
    },
  ];

  const allFinished = items.every((item) => item.finished);

  if (allFinished) return null;

  return (
    <HomeContainer>
      <Heading variant="h2">
        {t("Home.components.HomeOrgaAccountProgress.todo")}
      </Heading>
      <Divider />
      <Container width="full" direction="col">
        <Text className="text-black">
          {t("Home.components.HomeOrgaAccountProgress.progress", {
            count: items.filter((item) => item.finished).length,
            total: items.length,
          })}
        </Text>
        <Container
          width="full"
          direction="row"
          className="max-w-4xl flex-wrap gap-3"
        >
          {items.map((item, index) => (
            <HomeProgressItem key={index} item={item} />
          ))}
        </Container>
      </Container>
      <Button
        title={t("Home.components.HomeOrgaAccountProgress.button.orga")}
        size="sm"
        to="organization"
      />
    </HomeContainer>
  );
};

export default HomeOrgaAccountProgress;
