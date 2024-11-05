import { Button, Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "./Container";
import useUser, { UserType } from "@/hooks/useUser";

interface HomeOrgaResourcesProps {}

const HomeOrgaResources: React.FC<HomeOrgaResourcesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();

  if (user.usertype !== UserType.ORGANIZATION) return null;

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.components.Resources.title")}</Heading>
      <Container width="full">
        <Button
          title={t("Home.components.Resources.button.overview")}
          to="/resources"
        />
        <Button
          title={t("Home.components.Resources.button.printer")}
          to="/resources/printers"
        />
        <Button
          title={t("Home.components.Resources.button.materials")}
          to="/resources/materials"
        />
        <Button
          title={t("Home.components.Resources.button.postprocessing")}
          to="/resources/postprocessings"
        />
      </Container>
    </HomeContainer>
  );
};

export default HomeOrgaResources;
