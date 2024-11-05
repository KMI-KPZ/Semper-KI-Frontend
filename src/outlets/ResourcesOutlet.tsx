import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import useOrganization from "@/hooks/useOrganization";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { Button, Container, Heading, Text } from "@component-library/index";
import { useTranslation } from "react-i18next";

interface ResourcesOutletProps {}

const ResourcesOutlet: React.FC<PropsWithChildren<ResourcesOutletProps>> = (
  props
) => {
  const { children } = props;
  const { organization } = useOrganization();
  const { t } = useTranslation();

  if (organization.supportedServices.includes(ServiceType.MANUFACTURING))
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  else
    return (
      <Container direction="col" className="h-full w-full">
        <Heading variant="h2">
          {t("outlets.ResourcesOutlet.notSelected")}
        </Heading>
        <Text>{t("outlets.ResourcesOutlet.subText")}</Text>
        <Button
          title={t("outlets.ResourcesOutlet.button.toOrgaProfile")}
          size="sm"
          variant="primary"
          to="/organization"
        />
      </Container>
    );
};

export default ResourcesOutlet;
