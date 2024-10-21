import { Button, Container, Divider, Text } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "./Container";
import useOrganization from "@/hooks/useOrganization";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";
import useGetOrganizationUsers from "@/api/Organization/Querys/useGetOrganizationUsers";
import { useNavigate } from "react-router-dom";

interface HomeOrganizationProps {}

interface HomeOrgaProgressItem {
  title: string;
  finished: boolean;
  link: string;
}

const HomeOrganization: React.FC<HomeOrganizationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();
  const getAllNodeNeighbours = useGetAllOrgaNodeNeighbors(
    organization.hashedID
  );
  const navigate = useNavigate();
  const userQuery = useGetOrganizationUsers();

  const items: HomeOrgaProgressItem[] = [
    {
      title: t("Home.components.Organization.items.general"),
      finished: organization.name !== "",
      link: "/organization#OrganizationInfo",
    },
    {
      title: t("Home.components.Organization.items.services"),
      finished:
        organization.supportedServices !== undefined &&
        organization.supportedServices.length > 0,
      link: "/organization#OrganizationInfo",
    },
    {
      title: t("Home.components.Organization.items.resources"),
      finished:
        getAllNodeNeighbours.data !== undefined &&
        getAllNodeNeighbours.data.length > 0,
      link: "/resources",
    },
    {
      title: t("Home.components.Organization.items.priorities"),
      finished:
        organization.details.priorities !== undefined &&
        organization.details.priorities.length > 0,
      link: "/organization#PrioritiesForm",
    },
    {
      title: t("Home.components.Organization.items.notificationSettings"),
      finished:
        organization.details.notificationSettings !== undefined &&
        organization.details.notificationSettings.organization !== undefined &&
        organization.details.notificationSettings.organization.length > 0,
      link: "/organization#NotificationForm",
    },
    {
      title: t("Home.components.Organization.items.branding"),
      finished:
        organization.details.branding !== undefined &&
        organization.details.branding.logo_url !== undefined &&
        organization.details.branding.logo_url !== "" &&
        organization.details.branding.colors.page_background !== undefined &&
        organization.details.branding.colors.page_background !== "",
      link: "/organization#OrganizationInfo",
    },
    {
      title: t("Home.components.Organization.items.adresses"),
      finished:
        organization.details.addresses !== undefined &&
        organization.details.addresses.length > 0,
      link: "/organization/#OrganizationAddress",
    },
    {
      title: t("Home.components.Organization.items.user"),
      finished: userQuery.data !== undefined && userQuery.data.length > 0,
      link: "/organization/#OrganizationUserTable",
    },
  ];

  return (
    <HomeContainer className="flex-col gap-5 bg-white p-10 ">
      <Heading variant="h2">{t("Home.components.Organization.title")}</Heading>

      <Divider />
      <Container width="full" direction="col">
        <Heading variant="h3">{t("Home.components.Organization.todo")}</Heading>
        <Text className="text-black">
          {t("Home.components.Organization.progress", {
            count: items.filter((item) => item.finished).length,
            total: items.length,
          })}
        </Text>
        <Container width="fit" direction="col" className="gap-3">
          {items.map((item, index) => (
            <Container
              key={index}
              width="full"
              onClick={() => navigate(item.link)}
              className={`flex items-center justify-start rounded-md border-2 p-3 text-black  duration-300 hover:scale-105 hover:cursor-pointer ${
                item.finished ? "border-green-500" : "border-red-500"
              }`}
            >
              <Text>{item.finished ? "✅" : "❌"}</Text>
              <Text>{item.title}</Text>
            </Container>
          ))}
        </Container>
      </Container>
      <Divider />

      <Container width="full">
        <Button
          title={t("Home.components.Organization.button.edit")}
          to="/organization"
        />
      </Container>
    </HomeContainer>
  );
};

export default HomeOrganization;
