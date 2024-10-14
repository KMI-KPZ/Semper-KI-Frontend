import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";

import AdminResourcesButtons from "./Buttons";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";

interface AdminResourcesOverViewProps {}

const AdminResourcesOverView: React.FC<AdminResourcesOverViewProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <BackButtonContainer>
        <Heading variant="h1">{t("Admin.Resources.OverView.title")}</Heading>
      </BackButtonContainer>
      <AdminResourcesButtons />
    </Container>
  );
};

export default AdminResourcesOverView;
