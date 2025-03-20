import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import useOrganization from "@/hooks/useOrganization";
import useGetAllOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetAllOrgaNodeNeighbors";
import useGetOrganizationUsers from "@/api/Organization/Querys/useGetOrganizationUsers";
import { HomeProgressItemData } from "./ProgressItem";
import HomeContainer from "./Container";
import Flowchart from "./FlowChart";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";
import { gradientStyle } from "@component-library/Container/GrayContainer";

interface HomeOrgaAccountProgressProps {}

const HomeOrgaProgress: React.FC<HomeOrgaAccountProgressProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();
  const getAllNodeNeighbours = useGetAllOrgaNodeNeighbors(
    organization.hashedID
  );
  const userQuery = useGetOrganizationUsers();
  const updateOrga = useUpdateOrganization();

  const items: HomeProgressItemData[] = [
    {
      title: t("Home.components.HomeOrgaAccountProgress.items.general"),
      finished: organization.name !== "",
      link: "organization#OrganizationInfo",
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
  ];

  const allFinished = items.every((item) => item.finished);
  const [showFlow, setShowFlow] = React.useState(!allFinished);

  useEffect(() => {
    if (allFinished) {
      setShowFlow(false);
    }
  }, [allFinished]);

  const handleOnButtonClickShow = () => {
    setShowFlow((prev) => !prev);
  };

  const handleOnButtonClickHide = () => {
    updateOrga.mutate({
      changes: {
        todos: { show: false },
      },
    });
  };

  return (
    <HomeContainer
      style={gradientStyle}
      className="rounded-md bg-transparent text-white"
    >
      <Heading variant="h2" className="text-white">
        {t("Home.components.HomeOrgaAccountProgress.todo")}
      </Heading>
      <Text className="text-white">
        {t("Home.components.HomeOrgaAccountProgress.progress", {
          count: items.filter((item) => item.finished).length,
          total: items.length,
        })}
      </Text>
      {showFlow ? <Flowchart items={items} /> : null}
      <Container width="full" direction="row" justify="center">
        <Button
          title={t("Home.components.HomeOrgaAccountProgress.button.orga")}
          size="xs"
          variant="primary"
        />
        <Button
          title={
            showFlow === true
              ? t("general.button.showLess")
              : t("general.button.showMore")
          }
          onClick={handleOnButtonClickShow}
          size="xs"
        />
        <Button
          title={t("Home.components.HomeUserProgress.button.hide")}
          size="xs"
          onClick={handleOnButtonClickHide}
        />
      </Container>
    </HomeContainer>
  );
};

export default HomeOrgaProgress;
